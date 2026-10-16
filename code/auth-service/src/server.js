const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const db = require('./config/db');

const app = express();
const PORT = process.env.PORT || 4001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', service: 'Auth Service' });
});

// Function to connect with retry logic
const connectWithRetry = async () => {
  const maxRetries = 5;
  let retries = 0;

  while (retries < maxRetries) {
    try {
      const connection = await db.getConnection();
      console.log('MySQL Database connected successfully.');
      connection.release();
      
      // Start the server only after successful connection
      app.listen(PORT, () => {
        console.log(`Auth Service running on port ${PORT}`);
      });
      return;
    } catch (err) {
      retries++;
      console.error(`Database connection failed (Attempt ${retries}/${maxRetries}): ${err.message}`);
      if (retries >= maxRetries) {
        console.error('Max retries reached. Exiting application.');
        process.exit(1);
      }
      console.log('Retrying in 3 seconds...');
      await new Promise((res) => setTimeout(res, 3000));
    }
  }
};

// Initialize connection
connectWithRetry();