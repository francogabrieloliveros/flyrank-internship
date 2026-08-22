import z from "zod";
import { zodResponseFormat } from "openai/helpers/zod.js";
import client from "../llm/client";
import OutputSchema from "../llm/schema";

type Output = z.infer<typeof OutputSchema>;

class LLMService {
  triage = async (prompt: string): Promise<Output> => {
    // Skip LLM call if LLM_STUB is 1
    if (parseInt(process.env.LLM_STUB!) === 1) {
      return {
        category: "billing",
        urgency: "low",
        confidence: 0.75,
        reason: "This is a short sentence.",
      };
    }

    // Ensure that prompt length is < 2000
    if (!prompt || prompt.length > 2000) {
      throw new Error("Prompt length too long.");
    }

    try {
      const res = await client.chat.completions.create({
        model: process.env.LLM_MODEL!,
        messages: [{ role: "user", content: prompt }],
        response_format: zodResponseFormat(OutputSchema, "output"),
      });

      const text = res.choices[0].message.content;
      const json = JSON.parse(text!);

      return OutputSchema.parse(json);
    } catch (err) {
      throw err;
    }
  };
}

const llmServ = new LLMService();
export default llmServ;
