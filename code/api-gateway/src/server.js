const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const proxyRoutes = require('./routes/proxyRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

// Security Middleware
app.use(helmet());
app.use(cors());

// Rate Limiting to prevent DDoS/Brute force
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX) || 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests from this IP, please try again later.' }
});
app.use(limiter);

// Gateway Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', service: 'API Gateway' });
});

// Route handling & Proxying
app.use('/', proxyRoutes);

// Global Error Handler for Gateway
app.use((err, req, res, next) => {
  console.error('Gateway Error:', err);
  res.status(500).json({ error: 'API Gateway encountered an error.' });
});

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});