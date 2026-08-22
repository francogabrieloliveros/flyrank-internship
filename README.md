# Build the Agent

## General AI Fluency - Week 5

## Installation & Running

Make sure that your API to be tested is already running before installation

### Installation

```bash
# Clone the repo
git clone https://github.com/francogabrieloliveros/flyrank-internship.git

# Open the file
cd flyrank-internship

# Go to the agent branch
git checkout general-ai-fluency/week5/build-the-agent

# Copy the .env.example file
cp .env.example .env
```

### Running

- Move the **openapi.json** to the same directory before running
- Setup the .env file, make sure that PORT and TARGET_PORT have the same port number and that you have an OPENROUTER_API_KEY from [openrouter](https://openrouter.ai)

```bash
# Install the dependencies
npm i

# Run
npm start
```

## Demo

## Build Log

### OpenAPI json parser

- Although the json file can be parsed with JSON.parse, openapi.json files usually use ref for referncing other objects which made it not simple to parse
- It was pretty easy to solve using Swagger's own parser

### Vercel AI SDK

- From the parsed json file, there was to much unecessary information
- The endpoints are in a single object
- After parsing from json, each endpoint and their corresponding methods were separated into different objects and added into a list
- The fetched schema was made into a zod type checker for more secure type checking
- The endpoints and schema would then be used by tools later on
- For now, executeRequest and validateResponse was added as tools
- At the end, there was to much files that I had to reorganize and rename files to the right semantics

### Created amd Connected Model

- Due to Vercel AI SDK's incompatibility with openrouter, I had to add another package that would make them compatible
- I added a createAgent function that would return a ToolAgentLoop with several tools and a system prompt
- I also fetched my openrouter api key and added it to the functionality
- I tested the agent at the main file for now by making it say hello to confirm connection

### Created a List of Object Context

- Used vercel AI's StepResult to add toolCall, toolResult, and toolNote chronologically in an array
- This context will be used by the agent to generate a sumarry

### Added generateReport

- The context from the previous function will be converted to a string and added to a prompt
- In this manner, the model can summarize all the result from the previous tool calls
- I tried to used generateObject from Vercel AI, but it was deprecated
- Changed to generateText
- I used zod schema to force the model to response in JSON format with proper data types
- The model did not respond with json schema at first so I had to specify it in the prompt
- The agent responded in json but it doesnt follow the schema so its causing a parse error
- I had to change to a model that supports "response_format" parameter, I tried about 5 free models
- I landed at nvidia/nemotron-3-super-120b-a12b:free

### Added Guardrails

- Ensured that the requests are only for localhost apis
- Since there is no tool that uses fs, no file mutation will occur
- I had to keep in mind that since I'm using openrouter free, I am limited to 50 requests per day and maximume 20 requests per minute
- I limited stopWhen isStep count 30 so if the api requires 30 tool calls, I'll still have room for summary
- This however limits the agent from testing large APIs with lots of endpoints, but that is the limit of the free budget
- I also added a rate limiter for the agent tool calls, where in every 20th step, it'll wait for 1 minute to avoid openrouter's rate limit
