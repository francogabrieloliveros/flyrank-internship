# Make it Do Something

## General AI Fluency - Week 6

## Url

https://flyrank-internship-8uff.vercel.app/

## Demo

https://github.com/user-attachments/assets/9313c485-30da-498b-addd-4e4aabff164c

## Explainer

Calico, my chat bot was another react component added to the layout.tsx so it can be seen in every page of the domain. Every time Calico is toggled open, it instantiates a new array for messages to be stored. Every time a user sends a message, a newly added route **api/chat** receives a POST request. The messages array is sent in the body of this request, which is then sent to an LLM. In the API, an OpenRouter LLM receives the users question, the previous messages, and a system prompt. The system prompt contains all the information about me that a recruiter might ask and also guardrails preventing it from answering unrelated questions. Once the OpenRouter LLM responds, its response is added to the messages array so the LLM can cross reference it in the future conversations.
