const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const todoRoutes = require('./routes/todoRoutes');
const db = require('./config/db');

const app = express();
const PORT = process.env.PORT || 4002;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/todos', todoRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', service: 'Todo Service' });
});

// Test database connection and start server
db.getConnection()
  .then((connection) => {
    console.log('MySQL Todo Database connected successfully.');
    connection.release();
    app.listen(PORT, () => {
      console.log(`Todo Service running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the MySQL Todo database:', err.message);
    process.exit(1);
  });