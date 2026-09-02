# Your First Background Job

## Backend AI Engineering - Week 7

This is an API that accepts a request instantly and does the rest of the slow work in the background with Inngest.

## Installation & Running

```bash
# INSTALLATION
# clone the repo and go to it
git clone https://github.com/francogabrieloliveros/flyrank-internship.git && cd flyrank-internship

# access the right branch
git checkout backend-ai-engineering/week7/your-first-background-job
```

```bash
# RUNNING
# install packages first
npm i

# run
npm run dev
```

```bash
# on a separate terminal, run the Inngest Dev Server

npx inngest-cli@latest dev -u http://localhost:3000/api/inngest
```

## Endpoints

| Method | Path           | Body                         | Response                                                                                   |
| ------ | -------------- | ---------------------------- | ------------------------------------------------------------------------------------------ |
| GET    | `/health`      | —                            | `200` → `{ "status": "ok"}                                                                 |
| POST   | `/reports`     | `{ "topic": "cats" }`        | `202` → `{ "id": "...", "status": "pending" }`. `400` if `topic` missing (no job created). |
| GET    | `/reports/:id` | —                            | `200` → the saved report object (`pending` or `done` + `result`). `404` if `id` not found. |
| POST   | `/api/inngest` | (used internally by Inngest) | Endpoint Inngest calls to invoke functions.                                                |

## Functions

| Function      | Trigger                          | What it does                                                                                                                                                |
| ------------- | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `say-hello`   | Event: `test/hello`              | Sleeps 5s, returns `"Hello from the background!"`                                                                                                           |
| `make-report` | Event: `report/requested`        | Sleeps 8s, then builds the report and marks it `done`. Throws if `topic === "fail"`, triggering retries (`retries: 2`) with backoff before ending `failed`. |
| `heartbeat`   | Cron: `* * * * *` (every minute) | Counts reports by status (`pending` / `done` / `failed`) and logs a one-line summary.                                                                       |

## Proof: fast accept + polling

```bash
$ curl -i -X POST http://localhost:3000/reports -H "Content-Type: application/json" -d '{"topic":"cats"}'

HTTP/1.1 202 Accepted
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 64
ETag: W/"40-ZW15kkT3nY5llDKCqmnhcvBXNdU"
Date: Wed, 02 Sep 2026 12:15:18 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"id":"ef0d206a-7c52-4229-bd30-6078a7d8fb92","status":"pending"}

$ curl http://localhost:3000/reports/ef0d206a-7c52-4229-bd30-6078a7d8fb92
{"id":"ef0d206a-7c52-4229-bd30-6078a7d8fb92","topic":"cats","status":"pending"}

# ~10 seconds later

$ curl http://localhost:3000/reports/ef0d206a-7c52-4229-bd30-6078a7d8fb92
{"id":"ef0d206a-7c52-4229-bd30-6078a7d8fb92","topic":"cats","status":"done","result":"Report about cats: here are some fascinating facts..."}
```

## Stage 3: retries vs. bad input

A missing `topic` is a malformed request since it is used by the job, hence rejection with `400`. On the other hand, a wrong moment is when the user input was valid but an error occured. Maybe the job has a problem right now or there was an interruption. In such cases, it's worth to perform a retry since the job might succeed later.

## Stage 4 — cron expressions

An expression that runs every day at 08:00 is `0 8 * * *`: minute 0, hour 8, every day, every month, every day-of-week. An expression that runs every Sunday at 22:00 is `0 22 * * 0` — minute 0, hour 22, on day-of-week 0 (Sunday).

## Dashboard screenshot

<img width="1785" height="573" alt="Image" src="https://github.com/user-attachments/assets/5ca3fab1-2cab-4342-9b42-040781a7f42b" />
