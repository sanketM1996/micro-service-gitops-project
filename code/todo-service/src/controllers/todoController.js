const Todo = require('../models/todoModel');

// GET all todos (Admins/Managers see all; standard Users see only their own)
exports.getTodos = async (req, res) => {
  try {
    const userId = req.headers['x-user-id'];
    const userRole = req.headers['x-user-role'];

    let todos;
    if (userRole === 'Admin' || userRole === 'Manager') {
      todos = await Todo.findAll();
    } else {
      todos = await Todo.findByUserId(userId);
    }

    res.status(200).json({ success: true, count: todos.length, data: todos });
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// GET single todo by ID
exports.getTodoById = async (req, res) => {
  try {
    const todoId = req.params.id;
    const userId = req.headers['x-user-id'];
    const userRole = req.headers['x-user-role'];

    const todo = await Todo.findById(todoId);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    // Resource Ownership Check: Regular users can only read their own tasks
    if (userRole === 'User' && todo.user_id !== parseInt(userId)) {
      return res.status(403).json({ error: 'Access denied: You do not own this todo' });
    }

    res.status(200).json({ success: true, data: todo });
  } catch (error) {
    console.error('Error fetching todo:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// CREATE a new todo
exports.createTodo = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const userId = req.headers['x-user-id'];

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const todoId = await Todo.create({
      title,
      description,
      status,
      userId
    });

    res.status(201).json({
      success: true,
      message: 'Todo created successfully',
      data: { id: todoId, title, description, status: status || 'Pending', user_id: userId }
    });
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// UPDATE an existing todo
exports.updateTodo = async (req, res) => {
  try {
    const todoId = req.params.id;
    const { title, description, status } = req.body;
    const userId = req.headers['x-user-id'];
    const userRole = req.headers['x-user-role'];

    const existingTodo = await Todo.findById(todoId);
    if (!existingTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    // Resource Ownership Check
    if (userRole === 'User' && existingTodo.user_id !== parseInt(userId)) {
      return res.status(403).json({ error: 'Access denied: You cannot modify another user\'s todo' });
    }

    const updated = await Todo.update(todoId, {
      title: title || existingTodo.title,
      description: description !== undefined ? description : existingTodo.description,
      status: status || existingTodo.status
    });

    if (updated === 0) {
      return res.status(400).json({ error: 'Failed to update todo' });
    }

    res.status(200).json({
      success: true,
      message: 'Todo updated successfully'
    });
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// DELETE a todo
exports.deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.id;
    const userId = req.headers['x-user-id'];
    const userRole = req.headers['x-user-role'];

    const existingTodo = await Todo.findById(todoId);
    if (!existingTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    // Resource Ownership Check (Admins can delete any task, Users only their own)
    if (userRole === 'User' && existingTodo.user_id !== parseInt(userId)) {
      return res.status(403).json({ error: 'Access denied: You cannot delete another user\'s todo' });
    }

    await Todo.delete(todoId);

    res.status(200).json({
      success: true,
      message: 'Todo deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};