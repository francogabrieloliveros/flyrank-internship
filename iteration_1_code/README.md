# Todo List API (Express)

A simple RESTful Todo List backend built with Express.js and in-memory storage.

## Setup

```bash
npm install
npm start
```

Server runs on `http://localhost:3000` by default (override with the `PORT` env var).

For auto-restart during development:

```bash
npm run dev
```

## Project Structure

```
todo-backend/
├── server.js                 # App entry point, middleware, error handling
├── routes/todoRoutes.js      # Route definitions
├── controllers/todoController.js  # Request handlers + validation
├── models/todoModel.js       # In-memory data store
└── package.json
```

## API Endpoints

| Method | Endpoint          | Description                          |
|--------|-------------------|---------------------------------------|
| GET    | `/api/todos`       | Get all todos (optional `?completed=true/false`) |
| GET    | `/api/todos/:id`    | Get a single todo by id               |
| POST   | `/api/todos`       | Create a new todo                     |
| PUT    | `/api/todos/:id`    | Update a todo (partial updates allowed) |
| DELETE | `/api/todos/:id`    | Delete a todo                         |

### Todo object

```json
{
  "id": 1,
  "title": "Buy milk",
  "description": "2% milk",
  "completed": false,
  "createdAt": "2026-07-16T00:00:00.000Z",
  "updatedAt": "2026-07-16T00:00:00.000Z"
}
```

### Example requests

**Create a todo**
```bash
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Buy milk", "description": "2% milk"}'
```

**Get all todos**
```bash
curl http://localhost:3000/api/todos
```

**Update a todo**
```bash
curl -X PUT http://localhost:3000/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

**Delete a todo**
```bash
curl -X DELETE http://localhost:3000/api/todos/1
```

## Notes

- Data is stored in memory and resets whenever the server restarts. Swap out `models/todoModel.js` for a real database (MongoDB, PostgreSQL, etc.) when you're ready to persist data.
- All responses follow the shape `{ success: boolean, data | error, ... }`.
- CORS is enabled for all origins by default — restrict this in production.
