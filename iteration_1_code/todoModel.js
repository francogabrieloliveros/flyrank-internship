// In-memory data store for todos.
// Swap this out for a real database (MongoDB, PostgreSQL, etc.) in production.

let todos = [];
let nextId = 1;

function getAll() {
  return todos;
}

function getById(id) {
  return todos.find((todo) => todo.id === id);
}

function create({ title, description = '', completed = false }) {
  const todo = {
    id: nextId++,
    title,
    description,
    completed,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  todos.push(todo);
  return todo;
}

function update(id, updates) {
  const todo = getById(id);
  if (!todo) return null;

  if (updates.title !== undefined) todo.title = updates.title;
  if (updates.description !== undefined) todo.description = updates.description;
  if (updates.completed !== undefined) todo.completed = updates.completed;
  todo.updatedAt = new Date().toISOString();

  return todo;
}

function remove(id) {
  const index = todos.findIndex((todo) => todo.id === id);
  if (index === -1) return false;
  todos.splice(index, 1);
  return true;
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
