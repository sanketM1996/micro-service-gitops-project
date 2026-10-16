const db = require('../config/db');

const User = {
  async create({ name, email, hashedPassword, role }) {
    const query = `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`;
    const [result] = await db.execute(query, [name, email, hashedPassword, role || 'User']);
    return result.insertId;
  },

  async findByEmail(email) {
    const query = `SELECT * FROM users WHERE email = ?`;
    const [rows] = await db.execute(query, [email]);
    return rows[0];
  },

  async findById(id) {
    const query = `SELECT id, name, email, role, created_at FROM users WHERE id = ?`;
    const [rows] = await db.execute(query, [id]);
    return rows[0];
  }
};

module.exports = User;