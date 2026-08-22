import z from "zod";
import path from "node:path";
import client from "../llm/client";
import OpenAI from "openai/index.js";
import OutputSchema from "../llm/schema";
import { zodResponseFormat } from "openai/helpers/zod.js";
import { mkdirSync, appendFileSync, readFileSync } from "node:fs";

type Output = z.infer<typeof OutputSchema>;
type CallResult =
  | { success: true; data: Output }
  | { success: false; rawOutput: string; error: string };

const MAX_ATTEMPTS = 3;
const PROMPT_VERSION = "triage-v1";
const SYSTEM_PROMPT = readFileSync(
  `./src/lib/prompts/${PROMPT_VERSION}.md`,
  "utf-8",
);

export class LLMUnavailableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "LLMUnavailableError";
  }
}

class LLMService {
  triage = async (prompt: string): Promise<CallResult> => {
    // Skip LLM call if LLM_STUB is 1 or LLM is disabled
    if (
      parseInt(process.env.LLM_STUB!) === 1 ||
      process.env.LLM_ENABLED === "false"
    ) {
      console.log(
        JSON.stringify({
          event: "llm_call_skipped",
          reason: "LLM_ENABLED=false",
        }),
      );

      return {
        success: true,
        data: {
          category: "other",
          urgency: "low",
          confidence: 0,
          reason: "Fallback value.",
        },
      };
    }

    // Ensure that prompt length is < 2000
    if (!prompt || prompt.length > 2000) {
      throw new Error("Prompt length too long.");
    }

    try {
      const raw = await this.#call(prompt, false);
      const parsed = this.#validate(raw);

      // Try one more attempt
      if (!parsed.success) {
        const newPrompt = `
          Your previous output has caused an error due to ${parsed.error}
          Try to answer the query: """${prompt}""" again with the goal to evade
          the error from happening again.
          `;
        const newRaw = await this.#call(newPrompt, true);
        const newParsed = this.#validate(newRaw);

        // Throw error and quarantine if failed again
        if (!newParsed.success) {
          this.#quarantine(newPrompt, newParsed.rawOutput, newParsed.error);
          throw new Error(newParsed.error);
        }
        return newParsed;
      }

      return parsed;
    } catch (err) {
      throw this.#mapTransportError(err);
    }
  };

  #call = async (prompt: string, isRepair: boolean) => {
    const startedAt = Date.now();

    const res = await this.#callWithRetry(() =>
      client.chat.completions.create({
        model: process.env.LLM_MODEL!,
        messages: [
          {
            role: "system",
            content: SYSTEM_PROMPT,
          },
          { role: "user", content: prompt },
        ],
        temperature: 0,
        response_format: zodResponseFormat(OutputSchema, "output"),
      }),
    );

    console.log(
      JSON.stringify({
        event: "llm_call",
        promptVersion: PROMPT_VERSION,
        model: process.env.LLM_MODEL,
        inputTokens: res.usage?.prompt_tokens ?? null,
        outputTokens: res.usage?.completion_tokens ?? null,
        durationMs: Date.now() - startedAt,
        repair: isRepair,
      }),
    );

    return res.choices[0]?.message?.content ?? "";
  };

  // Retries timeouts, 429, and 5xx only — never 400/401/403. Exponential
  // backoff with jitter (1s/2s/4s), honoring Retry-After when present.
  #callWithRetry = async <T>(fn: () => Promise<T>): Promise<T> => {
    let lastErr: unknown;

    for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
      try {
        return await fn();
      } catch (err) {
        lastErr = err;

        if (!this.#isRetryable(err)) throw err;

        const isLastAttempt = attempt === MAX_ATTEMPTS - 1;
        if (isLastAttempt) break;

        const waitMs = this.#getRetryAfterMs(err) ?? this.#backoffMs(attempt);
        console.warn(
          `[llm] attempt ${attempt + 1}/${MAX_ATTEMPTS} failed, retrying in ${Math.round(waitMs)}ms: ${(err as Error).message}`,
        );
        await new Promise((resolve) => setTimeout(resolve, waitMs));
      }
    }

    throw lastErr;
  };

  #isRetryable = (err: unknown): boolean => {
    if (err instanceof OpenAI.APIConnectionTimeoutError) return true;
    if (err instanceof OpenAI.APIConnectionError) return true;
    if (err instanceof OpenAI.APIError) {
      const status = err.status;
      return status === 429 || (!!status && status >= 500 && status < 600);
    }
    return false;
  };

  #getRetryAfterMs = (err: unknown): number | null => {
    if (err instanceof OpenAI.APIError) {
      const headers = (err as { headers?: Headers }).headers;
      const retryAfter = headers?.get?.("retry-after");
      if (retryAfter) {
        const seconds = Number(retryAfter);
        if (!Number.isNaN(seconds)) return seconds * 1000;
      }
    }
    return null;
  };

  #backoffMs = (attempt: number): number => {
    const base = 1000 * Math.pow(2, attempt);
    return base + Math.random() * 250;
  };

  #mapTransportError = (err: unknown): Error => {
    if (
      err instanceof OpenAI.APIConnectionTimeoutError ||
      err instanceof OpenAI.APIConnectionError ||
      (err instanceof OpenAI.APIError &&
        (err.status === 429 || (!!err.status && err.status >= 500)))
    ) {
      return new LLMUnavailableError(
        "The model provider did not respond in time.",
      );
    }
    return err instanceof Error ? err : new Error(String(err));
  };

  #validate = (raw: string): CallResult => {
    try {
      const json = JSON.parse(raw);
      return { success: true, data: OutputSchema.parse(json) };
    } catch (err) {
      return { success: false, rawOutput: raw, error: (err as Error).message };
    }
  };

  #quarantine = (input: string, rawOutput: string, error: string): void => {
    try {
      const entry = {
        timestamp: new Date().toISOString(),
        promptVersion: PROMPT_VERSION,
        input,
        rawOutput,
        error,
      };
      const logPath = path.join(process.cwd(), "logs/quarantine.jsonl");
      mkdirSync(path.dirname(logPath), { recursive: true });
      appendFileSync(logPath, JSON.stringify(entry) + "\n");
    } catch (logErr) {
      console.error("Failed to write quarantine log:", logErr);
    }
  };
}

const llmServ = new LLMService();
export default llmServ;
