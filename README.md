# Connecting to the Database

## Backend AI Engineering - Week 3

## Task API

A task management API that allows CRUD operations. It also comes with an interactive Swagger UI for exploring the API.

## Setup and Running

### Setup

```bash
# Clone the repository
git clone https://github.com/francogabrieloliveros/flyrank-internship.git
# Enter the project directory
cd flyrank-internship
# Checkout the desired branch
git checkout backend-ai-engineering/week3/containerize-your-stack
# Create an .env file
cp .env.example .env
```

After this, open the `.env` file and update the DATABASE_URL as needed.

### Running

Make sure you have Docker installed on your machine.

```bash
# Run the api and database
docker compose up
```

The server starts on `http://localhost:3000`. Interactive docs are available at `http://localhost:3000/docs`.

## Data In Volume

<img width="545" height="235" alt="Image" src="https://github.com/user-attachments/assets/10ca59e6-e984-4635-9ae5-d1fe16130313" />

## Endpoints

| Method | Path         | Description                | Body                                     | Success | Error(s) |
| ------ | ------------ | -------------------------- | ---------------------------------------- | ------- | -------- |
| GET    | `/`          | API info                   | —                                        | 200     | —        |
| GET    | `/health`    | Health check               | —                                        | 200     | —        |
| GET    | `/tasks`     | List all tasks             | —                                        | 200     | —        |
| GET    | `/tasks/:id` | Get a single task by ID    | —                                        | 200     | 404      |
| POST   | `/tasks`     | Create a new task          | `{ "title": string }`                    | 201     | 400      |
| PUT    | `/tasks/:id` | Update a task's title/done | `{ "title"?: string, "done"?: boolean }` | 200     | 400, 404 |
| DELETE | `/tasks/:id` | Delete a task              | —                                        | 204     | 404      |

## Example request

```

$ curl -i http://localhost:3000/tasks

HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 201
ETag: W/"c9-D7X2X2uWAff8Iz8qWp8d9/W5IKU"
Date: Fri, 17 Jul 2026 03:06:31 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"success":true,"message":"Tasks retrieved successfully.","data":[{"id":1,"title":"Finish BE-01","done":true},{"id":2,"title":"Finish FL-03","done":false},{"id":3,"title":"Feed the dog","done":false}]}⏎

```

## Swagger UI Screenshots

Try out the API endpoints interactively [here](http://localhost:3000/docs) after running the server.

**/**

<img width="814" height="806" alt="Image" src="https://github.com/user-attachments/assets/f7b28e3d-6f63-4cdf-b89c-aacb4345218e" />

---

**/health**

<img width="808" height="763" alt="Image" src="https://github.com/user-attachments/assets/a83b81c9-d0ba-43a7-af37-21d9bbb90071" />

---

**/tasks**

<img width="813" height="1004" alt="Image" src="https://github.com/user-attachments/assets/14c8bb1d-d260-4863-b459-989a94538d74" />

---

**/tasks/:id**

<img width="811" height="936" alt="Image" src="https://github.com/user-attachments/assets/17053828-d302-4a6b-8b82-675ed6e3f7fa" />

---

**/tasks**

<img width="812" height="1005" alt="Image" src="https://github.com/user-attachments/assets/2b3b1325-58c4-44fa-880e-79b3c2872949" />

---

**/tasks/:id**

<img width="810" height="1003" alt="Image" src="https://github.com/user-attachments/assets/311acb48-2815-4b7c-98e0-895e67780e0d" />

---

**/tasks/:id**

<img width="811" height="727" alt="Image" src="https://github.com/user-attachments/assets/1abbcf60-74c6-46a5-993d-650af3fcb949" />
