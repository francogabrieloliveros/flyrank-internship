# Agent Concepts and MCP Basics

## General AI Fluency - Week 4

## Three Tasks

1. Google Calendar

<img width="1855" height="1067" alt="Image" src="https://github.com/user-attachments/assets/61c4e43b-d83b-4802-a694-7a2b91d510b4" />

2. Gmail

<img width="1486" height="863" alt="Image" src="https://github.com/user-attachments/assets/ae205926-be9b-476e-80aa-3983a503767d" />

3. Figma

<img width="1856" height="1065" alt="Image" src="https://github.com/user-attachments/assets/05befc2f-4bef-4e1b-bfde-9de84b3efd82" />

## Explainer

An agent in a high-level context is an LLM that can autonomously choose and perform actions through reason when prompted to do so. Contrary to agentic systems, workflows have a specific expected/ predefined input and output. For example, making an LLM read a query and prompting it to respond only in strings "harmful" or "not harmful"; which can easily be differentiated and split by a code, whether to perform actions based on whether the query was harmful or not. However, agentic systems does not expect a specific format of input or output. It utilizes the LLM's ability to semantically analyze prompts and reason to choose what action to perform and whether to continue or discontinue. One of the best examples of agentic systems is Claude, when a user asks a question beyond its training data, it utilizes web search to find additional contexts that may potentially help answer the query. Despite not being directly instructed by the user to perform a web search, it deems itself unable to answer the question through reasoning; hence, its attempt to search for external input.

If you somehow were able to run Claude locally, or any other LLMs in this matter, you would probably not be able to use web search or any other capabilities you would see Claude do in the website. This is because raw LLMs have no ability to perform actions by themselves. With some exploration, you would know that Claude can do more than web search, write & run code, and preview files. Claude can also access your google drive files, edit your sheets, and summarize your slack unread notifications; all of which are beyond Anthropic's products. This is because of MCP, which stands for Model Context Protocol. As stated by the MCP docs, it is basically the USB-C port for AI applications; it allows LLMs to become agents, having access to tools, resources, and prompts. To exemplify this, let's think of GitHub and the millions of possible commands you can do with it. Back in the day, if you would like to make a tool that makes it easier to perform GitHub commands, you would have to implement a function for each command and for every scenario manually, memorize the syntax, and maintain your code if anything changes. But if GitHub releases its official MCP server, you can command an LLM through natural language to perform GitHub commands without worrying yourself about memorizing the command syntax.

An MCP system can also be separated into an MCP client and MCP server. An MCP client is what the user interacts with, knows the list of tools and resources the MCP server offers, and sends request for an MCP server to perform a specific action. On the other hand, the MCP server has the actual implementation and data, it can perform the action requested by the client and has access to the contents of the resources. Going back to the example earlier, when a user asks a question beyond Claude, through reasoning, it scans a list of tools and selects web search; this is the MCP client side of Claude, where it requests for the MCP server to perform a web search with this query. After the MCP server receives the request, it might hypothetically use a web scraper tool, scan the contents of a few websites, and return the results back to the MCP client. Then, the MCP client will send the results back to the LLM which it can use for context to answer the user's query.

Tools, resources, and prompts are also relevant to MCP. Tools are basically the actions chosen to run by the LLM, the functions that perform a predefined algorithm in order to achieve a specific result. Resources are files that are exposed by the MCP client/ server which access is determined by the application. Prompts are anything the user can write for the LLM, but they are pre-written for efficiency and convenience; and the user can choose when to use them.

The FL-04 build that I made was a system that uses the user's resume data, searches for jobs with a query, scores the resume against the job description, and adds good matches to a google sheet. It would definitely classify as a workflow; specifically, a prompt chaining workflow. I injected my resume details and job results to an LLM prompt and asked it to score them from 0-100. Then, through code, I identified whether the number response was higher than 50, before adding the job details to google sheets. Since the LLM did not decide what actions to perform in this scenario, I deem it as a workflow rather than an agent. If I were to make it an agent, I would make job search, resume rating, and google sheets add as tools. Moreover I would add the ability to modify my resume and make it fit better for the role specified.
