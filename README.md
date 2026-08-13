# Design Your Personal Agent

## General AI Fluency - Week 5

### Endpoint Testing Agent with OpenAPI

This is an agent that ustilizes an OpenAPI.yaml spec to test the endpoints of a running http server. It will scan the yaml file and create different fetch requests for each endpoints including edge-cases. On cases of errors or weird responses, it will utilize different tools that it deems necessary. Every info per endpoint will be logged in a memory or storage as context such that the agent or another LLM can form a summary after testing most of the endpoints. After which, it can provide suggestions and found vulnerabilities.

<img width="860" height="629" alt="Image" src="https://github.com/user-attachments/assets/72c5a691-3ac6-4941-b29b-7e67428028ba" />

---

### 1. Job to be Done

The **Autonomous OpenAPI Spec & Security Stress Tester** is a headless agent that automatically discovers, stress-tests, and evaluates the resilience of local REST API endpoints.

Given an OpenAPI specification (`openapi.yaml` or `swagger.json`) and a local target base URL (e.g., `http://localhost:3000`), the agent reads the defined schemas, dynamically formulates valid and malicious test payloads (SQL injection strings, type mismatches, boundary overflows, missing headers), executes HTTP requests, monitors local server crash logs for unhandled exceptions (`HTTP 500`), and outputs a structured **Vulnerability & Incident Report**.

---

### 2. Target User & Usage Frequency

- **Target User:** Backend / Full-Stack Developer (Franco Gabriel P. Oliveros).
- **Usage Frequency:** During API development, or automated before pulling new backend code branches into main/production environments.

---

### 3. Tools and Data Needed with Access Plan

| Tool / Data Source            | Purpose                                                         | Access Plan |
| ----------------------------- | --------------------------------------------------------------- | ----------- |
| **`openapi.yaml`**            | Source of truth for API routes, methods, and schemas.           | Free        |
| **`Spec Parser Tool`**        | Parses YAML/JSON and exposes structured endpoints/types.        | Free        |
| **`Request Executor Tool`**   | Formulates and sends HTTP requests to the target.               | Free        |
| **`Server Logs Reader Tool`** | Captures backend stack traces upon unexpected crashes.          | Free        |
| **LLM Reasoning Engine**      | Strategic planning, edge-case payload generation, log analysis. | Limited     |

---

### 4. Draft System Instructions (Agent System Prompt)

```text
You are an expert Automated Security & API Reliability Testing Agent. Your goal is to systematically test local API endpoints defined in an OpenAPI specification to identify unhandled errors, validation failures, and server crashes.

OPERATIONAL LOOP:
1. INVOKE 'Spec Parser Tool' to read the provided OpenAPI spec file and list all available routes, methods, and expected schemas.
2. SELECT an endpoint to test. For each endpoint:
   a. Formulate a VALID payload to confirm happy-path functionality.
   b. Formulate INVALID / MALICIOUS payloads targeting edge cases (e.g., null values, boundary overflows, SQLi strings, malformed types).
3. INVOKE 'Request Executor Tool' to send the generated HTTP requests to the target local server.
4. OBSERVE the HTTP response status code and body.
5. IF the server returns a 500 Internal Server Error:
   a. INVOKE 'Server Logs Reader Tool' to fetch the latest stack trace.
   b. Correlate the specific payload sent with the root cause exception in the logs.
6. RECORD findings in memory.
7. REPEAT until all target endpoints are evaluated or max test loops are reached.
8. OUTPUT a final Markdown Vulnerability & Incident Report summarizing passed tests, edge cases handled (400 Bad Request), and critical crashes found (500 Internal Server Error).

```

---

### 5. Five Evaluation Cases (Defined Before Building)

1. **Happy Path Execution:**

- **Input:** Valid `POST /users` payload with all required fields present.
- **Expected Outcome:** Agent receives `HTTP 200/201`, marks endpoint as functional, and moves to edge-case testing.

2. **Schema Validation Enforcement (Handled Edge Case):**

- **Input:** `POST /users` payload with string passed into an integer field (`age: "invalid"`).
- **Expected Outcome:** Server returns `HTTP 400 Bad Request`. Agent records this as **Passed (Validation Enforced)**.

3. **Unhandled Exception & Crash Detection (Bug Found):**

- **Input:** `POST /users` payload with `age: -99999999` causing an unhandled arithmetic exception.
- **Expected Outcome:** Server returns `HTTP 500`. Agent automatically calls `Server Logs Reader Tool`, extracts the stack trace, and logs a **Critical Vulnerability** entry linking the payload to the log line.

4. **Missing Authentication / Authorization Check:**

- **Input:** Protected `DELETE /products/123` executed without an `Authorization` header.
- **Expected Outcome:** Agent flags a security warning if the response status is `200 OK` instead of `401 Unauthorized` or `403 Forbidden`.

5. **Malformed Spec / Graceful Degradation:**

- **Input:** `openapi.yaml` missing required `paths` or containing invalid YAML syntax.
- **Expected Outcome:** Spec Parser tool catches the error cleanly, and the agent outputs a readable error message without entering an infinite execution loop.

---

### 6. Risks and Guardrails

#### What the Agent Must Confirm:

- **Target Origin Check:** Must confirm the target base URL points strictly to a local environment (`localhost`, `127.0.0.1`, or `::1`) before sending any request payloads.
- **Max Test Loop Safeguard:** Must hard-stop testing after a maximum of **20 iterations per endpoint** to prevent runaway token usage or local resource exhaustion.

#### What the Agent Must NEVER Do:

- **No External Requests:** Must **never** execute HTTP requests against external domain names, production URLs, or non-loopback IP addresses.
- **No File Mutation:** Must **never** attempt to overwrite, delete, or modify the `openapi.yaml` spec file or the target backend source files.
- **No Destructive Database Commands:** Must **never** issue direct OS/shell commands to drop local databases outside of standard HTTP API endpoint calls.

---

### 7. Platform Choice & Justification

#### Selected Platform: **Scripted Agent (LangGraph/ Vercel AI SDK)**

#### Justification against Alternatives:

- **vs. Claude Cowork / Custom GPTs (Paid):** This path costs $0. By using an OpenRouter API LLM, the agent runs completely free with high rate limits.
- **vs. n8n Agent Workflow:** Visual workflow tools excel at static multi-app integrations, but struggle with low-level local hardware integration (capturing raw local terminal logs, parsing local file schemas, and managing custom recursive execution loops).
