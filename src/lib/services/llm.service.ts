import z from "zod";
import { zodResponseFormat } from "openai/helpers/zod.js";
import client from "../llm/client";
import OutputSchema from "../llm/schema";
import { mkdirSync, appendFileSync, readFileSync } from "node:fs";
import path from "node:path";

type Output = z.infer<typeof OutputSchema>;
type CallResult =
  | { success: true; data: Output }
  | { success: false; rawOutput: string; error: string };

const PROMPT_VERSION = "triage-v1";
const SYSTEM_PROMPT = readFileSync(
  `./src/lib/prompts/${PROMPT_VERSION}.md`,
  "utf-8",
);

class LLMService {
  triage = async (prompt: string): Promise<CallResult> => {
    // Skip LLM call if LLM_STUB is 1
    if (parseInt(process.env.LLM_STUB!) === 1) {
      return {
        success: true,
        data: {
          category: "billing",
          urgency: "low",
          confidence: 0.75,
          reason: "This is a short sentence.",
        },
      };
    }

    // Ensure that prompt length is < 2000
    if (!prompt || prompt.length > 2000) {
      throw new Error("Prompt length too long.");
    }

    try {
      const raw = await this.#call(prompt);
      const parsed = this.#validate(raw);

      // Try one more attempt
      if (!parsed.success) {
        const newPrompt = `
          Your previous output has caused an error due to ${parsed.error}

          Try to answer the query: """${prompt}""" again with the goal to evade
          the error from happening again.
          `;
        const newRaw = await this.#call(newPrompt);
        const newParsed = this.#validate(newRaw);

        // Throw error and quarantin if failed again
        if (!newParsed.success) {
          this.#quarantine(newPrompt, newParsed.rawOutput, newParsed.error);
          throw new Error(newParsed.error);
        }

        return newParsed;
      }

      return parsed;
    } catch (err) {
      throw err;
    }
  };

  #call = async (prompt: string) => {
    try {
      const res = await client.chat.completions.create({
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
      });

      return res.choices[0]?.message?.content ?? "";
    } catch (err) {
      throw err;
    }
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
