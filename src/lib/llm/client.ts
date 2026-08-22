import OpenAI from "openai";

const client = new OpenAI({
  baseURL: process.env.OPENROUTER_BASE_URL,
  apiKey: process.env.OPENROUTER_API_KEY,
  maxRetries: 0,
  timeout: 30000,
});

export default client;
