const db = require('../config/db');

const Todo = {
  async create({ title, description, status, userId }) {
    const query = `INSERT INTO todos (title, description, status, user_id) VALUES (?, ?, ?, ?)`;
    const [result] = await db.execute(query, [
      title, 
      description || '', 
      status || 'Pending', 
      userId
    ]);
    return result.insertId;
  },

  async findAll() {
    const query = `SELECT * FROM todos ORDER BY created_at DESC`;
    const [rows] = await db.execute(query);
    return rows;
  },

  async findByUserId(userId) {
    const query = `SELECT * FROM todos WHERE user_id = ? ORDER BY created_at DESC`;
    const [rows] = await db.execute(query, [userId]);
    return rows;
  },

  async findById(id) {
    const query = `SELECT * FROM todos WHERE id = ?`;
    const [rows] = await db.execute(query, [id]);
    return rows[0];
  },

  async update(id, { title, description, status }) {
    const query = `UPDATE todos SET title = ?, description = ?, status = ? WHERE id = ?`;
    const [result] = await db.execute(query, [title, description, status, id]);
    return result.affectedRows;
  },

  async delete(id) {
    const query = `DELETE FROM todos WHERE id = ?`;
    const [result] = await db.execute(query, [id]);
    return result.affectedRows;
  }
};

module.exports = Todo;