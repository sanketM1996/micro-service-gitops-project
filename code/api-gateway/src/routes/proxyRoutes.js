const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const authenticateAndAuthorize = require('../middlewares/authMiddleware');
require('dotenv').config();

const router = express.Router();

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://localhost:4001';
const TODO_SERVICE_URL = process.env.TODO_SERVICE_URL || 'http://localhost:4002';

// 1. PUBLIC ROUTES: Auth Service (Login & Register don't require pre-authentication)
router.use('/api/auth/login', createProxyMiddleware({
  target: AUTH_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: (path) => `/api/auth/login${path === '/' ? '' : path}`
}));

router.use('/api/auth/register', createProxyMiddleware({
  target: AUTH_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: (path) => `/api/auth/register${path === '/' ? '' : path}`
}));

// 2. PROTECTED ROUTE EXAMPLE: Auth validation or profile checks
router.get('/api/auth/validate', authenticateAndAuthorize(), createProxyMiddleware({
  target: AUTH_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: (path) => path === '/' ? '/api/auth/validate' : path
}));

// 3. PROTECTED ROUTES: Todo Service (Regular User & Manager/Admin access)
router.use(
  '/api/todos',
  authenticateAndAuthorize(['User', 'Manager', 'Admin']), // Any logged-in user can access standard todo operations
  createProxyMiddleware({
    target: TODO_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: (path) => `/api/todos${path === '/' ? '' : path}`
  })
);

// 4. PROTECTED ADMIN ROUTE EXAMPLE: Only Admins/Managers can view system-wide logs or metrics
router.use(
  '/api/admin/metrics',
  authenticateAndAuthorize(['Admin', 'Manager']),
  createProxyMiddleware({
    target: TODO_SERVICE_URL,
    changeOrigin: true
  })
);

module.exports = router;