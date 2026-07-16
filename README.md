# The Prompt Ladder

## General AI Fluency - Week 2

Hi! Although my prompts were a bit short, I tried to provide as much context and tried my best to avoid bundling by providing a single improvement per iteration.

### Baseline Prompt

**Prompt:** Write backend code

**Response:** I'd love to help — but "backend code" could mean a lot of things. Let me narrow it down.

---

### Iteration 1

**Prompt:** Write the backend code for a todo list application using ExpressJS.

**[Response (Code)](https://github.com/francogabrieloliveros/flyrank-internship/tree/general-ai-fluency/week2/the-prompt-ladder/iteration_1_code)**

**Response (Excerpt):** I built a complete Express.js backend for a todo list app with a layered structure (routes, controllers, models), using in-memory storage for simplicity. It supports full CRUD via GET/POST /api/todos and GET/PUT/DELETE /api/todos/:id, plus filtering by completion status, input validation, and consistent JSON error responses. I installed dependencies, started the server, and tested every endpoint with curl (create, list, filter, update, delete, and error cases) to confirm it all worked, then packaged the files with a README covering setup and API usage into /mnt/user-data/outputs/todo-backend.

**Notes:** A specific goal was added to the prompt. It used the memory as the storage which is bad for backends; and thought the database would be relational so it used SQL. Moreover, due to Claude's reasoning and tool capabilities, it tested the endpoints automatically which slowed down its response. It also idependently modularized the files. It is amazing, but too amazing for the task I require it to do. Lastly, I had to make another prompt to make it summarize what it did.

---

### Iteration 2

**Prompt:** Write the backend code for a todo list application using ExpressJS. Place everything in a single app.tsx file. Make sure to separate routes, models, and controllers. After sending the code, write a 1 paragraph comprehensive, concise, and short summary of everything you did in first person perspective.

**[Response (Code)](https://github.com/francogabrieloliveros/flyrank-internship/blob/general-ai-fluency/week2/the-prompt-ladder/iteration_2_code/app.tsx)**

**Response (Excerpt):** I built a single-file Express + TypeScript backend for a todo list, organized into Model, Controller, Routes, and App sections. I created a TodoModel to manage an in-memory store with CRUD methods, a TodoController to validate requests and return proper status codes (200/201/204/400/404), and routes mapping REST endpoints (GET/POST /, GET/PUT/DELETE /:id) to those controller methods under /api/todos. I then tied it all together in the app with JSON middleware, a health check, 404 handling, and centralized error handling.

**Notes:** Several specified output formats was added. As specified, a summary was sent after the code. Routes, models, and controllers were also separated; however, the controllers were bundled into one parent class. Its still using an in-memory storage and defines a model using its own convention. Lastly, it still tested the endpoints slowing down the response.

---

### Iteration 3

**Prompt:** Write the backend code for a todo list application using ExpressJS. Place everything in a single app.tsx file. Make sure to separate routes, models, and controllers. Do not perform endpoint testing. Do not bundle controllers into a single parent class. Use MONGODB_URI from an env file as the connection string. Use Mongoose for the model. After sending the code, write a 1 paragraph comprehensive, concise, and short summary of everything you did in first person perspective.

**[Response (Code)](https://github.com/francogabrieloliveros/flyrank-internship/blob/general-ai-fluency/week2/the-prompt-ladder/iteration_3_code/app.tsx)**

**Response (Excerpt):** I built a complete Todo List backend in a single app.tsx file, organized into clearly delineated sections rather than separate files: a Mongoose Todo model (title, description, completed, timestamps) with its own TypeScript interface; five standalone controller functions (getTodos, getTodoById, createTodo, updateTodo, deleteTodo) kept independent rather than grouped into one parent class; an Express Router wiring those controllers to /api/todos REST endpoints (GET, GET/:id, POST, PUT/:id, DELETE); and an app bootstrap section that loads MONGODB_URI from a .env file via dotenv, connects to MongoDB with Mongoose, sets up JSON parsing, 404 handling, and centralized error handling, then starts the server — all without any endpoint tests included, as requested.

**Notes:** Several constraints were added. The response is faster now without the end point testing. Controllers were also not bundled. MongoDB and Mongoose was also used. However, the error handling was a bit lacking. All errors that are not 404 goes to 500, which is incomprehensive. For updates, you are also required to return a complete object containing all fields.

---

### Iteration 4

**Prompt:** Write the backend code for a todo list application using ExpressJS.

Tech Stack:

- ExpressJS
- Mongoose
- MongoDB (via MONGODB_URI from .env)

Constraints:

- No endpoint testing
- Controllers not bundled into a single parent class
- Use MONGODB_URI from an env file as the connection string
- Use Mongoose for the model

Quality Criteria:

- All responses must follow the format { success: boolean, data?: any, error?: string}
- Centralized error handling but with conditional checks inside. Make sure to handle CastErrors and ValidationErrors returning status 400 with appropriate error messages.
- When updating todos, make sure that omitting fields in the request body do not turn values to undefined.
- GetTodos should respond with todos sorted; where unfinished todos come first and completed todos come last; and each category should be sorted by creationDate

Output Format:

- Place everything in a single app.tsx file where routes, models, and controllers are separated
- After sending the code, write a 1 paragraph comprehensive, concise, and short summary of everything you did in first person perspective.

**[Response (Code)](https://github.com/francogabrieloliveros/flyrank-internship/blob/general-ai-fluency/week2/the-prompt-ladder/iteration_4_code/app.tsx)**

**Response (Excerpt):** I built a single-file Express + Mongoose backend for a todo list app, structured internally into clearly separated sections (model, controllers, routes, error handler, app setup) even though everything lives in app.tsx. I defined a Todo Mongoose schema with title, description, and completed fields plus timestamps, and connected to MongoDB using MONGODB_URI loaded via dotenv. Each controller (getTodos, getTodoById, createTodo, updateTodo, deleteTodo) is a standalone function wrapped in an asyncHandler utility that forwards errors to a centralized error-handling middleware, which contains conditional checks to return 400 responses with clear messages for CastError, ValidationError, and duplicate-key errors, and a 500 fallback for anything else — with every response consistently shaped as { success, data?, error? }. getTodos sorts results with .sort({ completed: 1, createdAt: 1 }) so unfinished todos come first and completed ones last, ordered by creation date within each group, while updateTodo uses a buildUpdatePayload helper that only includes fields actually present in the request body (via $set), ensuring omitted fields are never overwritten with undefined.

**Notes:** I reformated the prompt by separating improvements. Quality Criteria was also added. Claude made an asyncHandler wrapper for all controllers so error handling is centralized. This error handler caters CastError, ValidationError, and DuplicateKeyError with 500 for unexpected errors. The payload also limits to allowed fields and responses are now uniform. The code is already good; the only thing it lacks is endpoint testing which was excluded for fast responses first.

---

### Iteration 5

**Prompt:** Write the backend code for a todo list application using ExpressJS.

Tech Stack:

- ExpressJS
- Mongoose
- MongoDB (via MONGODB_URI from .env)

Constraints:

- Controllers not bundled into a single parent class
- Use MONGODB_URI from an env file as the connection string
- Use Mongoose for the model

Quality Criteria:

- All responses must follow the format { success: boolean, data?: any, error?: string}
- Centralized error handling but with conditional checks inside. Make sure to handle CastErrors and ValidationErrors returning status 400 with appropriate error messages.
- When updating todos, make sure that omitting fields in the request body do not turn values to undefined.
- GetTodos should respond with todos sorted; where unfinished todos come first and completed todos come last; and each category should be sorted by creationDate

Verification Requiremeents:

- Assume a local MongoDB instance and the environment has a valid `PORT` and `MONGODB_URI`.
- Perform curl commands and test all individual endpoints.
- Should an error occur, revisit the code and try to fix the error, then re-run the tests.
- Once all tests pass, you may proceed to respond in the specified format.

Output Format:

- Place everything in a single app.tsx file where routes, models, and controllers are separated
- After sending the code, write a 1 paragraph comprehensive, concise, and short summary of everything you did in first person perspective.

**[Response (Code)](https://github.com/francogabrieloliveros/flyrank-internship/blob/general-ai-fluency/week2/the-prompt-ladder/iteration_5_code/app.tsx)**

**Response (Excerpt):** I built a single-file Express + Mongoose todo backend (app.tsx) with clearly separated sections — a Mongoose Todo model (title, description, completed, createdAt), five standalone controller functions (create/get all/get one/update/delete, none bundled into a class), an Express router mounted at /api, and a centralized error-handling middleware that checks err.name for CastError and ValidationError and returns 400 with a descriptive message (falling back to 500 otherwise) — every response follows the { success, data?, error? } shape, getTodos sorts by completed ascending then createdAt ascending so unfinished todos come first and each group is chronologically ordered, and updateTodo builds a sparse $set object containing only keys actually present in the request body so omitted fields are left untouched rather than becoming undefined. Regarding verification: the sandbox's network egress is locked to package registries only (no fastdl.mongodb.org or similar), so I couldn't stand up a real mongod or mongodb-memory-server instance to curl against directly — I confirmed this by attempting the download, which failed with a 403; instead I wrote a Supertest harness that swaps in an in-memory stand-in for the Mongoose Todo model (replicating its CastError/ValidationError throwing behavior) and ran 15 assertions through the real Express app and real controllers/routes/error-handler, covering creation, validation failures, sort order, get-by-id, 404s, invalid-ObjectId casting, partial updates, and deletion — all of which passed — and I also fixed a minor cosmetic issue where the dotenv v17 package prints a promotional log line, silencing it via the quiet option.

**Notes:** With the code looking good, I can only think of adding tests for verification before Claude sends the code. Claude actually ran its own MongoDB instance before writing the code. It used supertest for endpoint testing. One error actually occurred once, then it fixed it before sending the final code.
