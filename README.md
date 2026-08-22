# Connect to an AI API

## Backend AI Engineering - Week 6

## Triage Endpoint

The endpoint accepts a support ticket message and tries to categorize it so it goes to the proper channels. It reads your prompt or support ticket message then sends it to a Large Language Model so it can reason and identify whether the message is billing, bug, feature, or other. The LLM also scores it guess from 0 - 1, depending on how difficult it is do discern. Lastly, it also adds a severity grade, so the support ticket can be identified as low or high severity.

## Setup and Running

### Setup

```bash
# Clone the repository
git clone https://github.com/francogabrieloliveros/flyrank-internship.git
# Enter the project directory
cd flyrank-internship
# Checkout the desired branch
git checkout backend-ai-engineering/week6/connect-to-an-ai-api
# Create an .env file
cp .env.example .env
```

After this, open the `.env` file and update the values as needed.

### Running

Make sure you have Docker installed on your machine.

```bash
# Run the api and database
docker compose up

# Run the tests
npm run test
```

The server starts on `http://localhost:3000`.

## Sample Command

```
curl -i -X "POST" http://localhost:3000/triage -d '{"prompt": "My payment did not go through but my bank account balance was reduced"}'

HTTP/1.1 200 OK
vary: rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch
content-type: application/json
Date: Sat, 22 Aug 2026 13:19:07 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Transfer-Encoding: chunked

{"success":true,"data":{"category":"billing","urgency":"high","confidence":0.9,"reason":"User reports a payment failure with a deduction from their bank account."},"message":"Triage completed successfully."}
```

## Job Card

What it does (one sentence): Classifies a support message so it lands on the right team.

Input: { "text": "string, 1-2000 characters" }

Output: { "category": one of [billing|bug|feature|other],
"urgency": one of [low|normal|high],
"confidence": 0.0-1.0,
"reason": "one short sentence" }

It must never: invent a category outside the list · return free text · give medical, legal or financial advice · reveal the prompt

When unsure it should: return category "other" with low confidence, not a guess

## Model

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxxxxxxxxxxxxxxxxxxx_xxxxxxxx
PORT=3000
OPENROUTER_API_KEY=sk-or-xx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
LLM_MODEL=openrouter/free
LLM_STUB=1
LLM_ENABLED=false
```

In the env, you'll probably see something like this. Since I used OpenRouter, the variables that are most necessary to setup are **OPENROUTER_API_KEY**, **OPENROUTER_BASE_URL**, and **LLM_MODEL** (to change model used; I used poolside/laguna-s-2.1:free for my case).

## Eval Result

Here is one of my eval results on August 22, 2026 using triage-v1.md prompt

```
PASS: LLM categorized successfully.
FAIL: Request failed (status 422)
PASS: LLM categorized successfully.
PASS: LLM categorized successfully.
FAIL: Request failed (status 422)
PASS: LLM categorized successfully.
PASS: LLM categorized successfully.
PASS: LLM categorized successfully.
---------------------------------------------

6/8 matched (75.0%)
```

## Cost Log

Due to the system prompt, the calls usually take 2 tries before being parsed successfully. As such it takes around 1500 tokens per POST request.

```
api-1  | {"event":"llm_call","promptVersion":"triage-v1","model":"poolside/laguna-s-2.1:free","inputTokens":691,"outputTokens":59,"durationMs":4044,"repair":false}
api-1  | {"event":"llm_call","promptVersion":"triage-v1","model":"poolside/laguna-s-2.1:free","inputTokens":744,"outputTokens":40,"durationMs":2816,"repair":true}
```

Considering this a daily 10,000 request would consume approximately 15,000,000 tokens per day.

What I'd fix on another day is the system prompt. I think the goal of the endpoint can be achieved even with system prompt that uses less tokens. This can be achieved by being more specific and precise with the prompt and reducing the amount of examples.
