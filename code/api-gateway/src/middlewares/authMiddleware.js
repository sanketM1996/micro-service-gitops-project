const axios = require('axios');
require('dotenv').config();

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://localhost:4001';

const authenticateAndAuthorize = (requiredRoles = []) => {
  return async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
      }

      // Validate token with Auth Service
      const response = await axios.get(`${AUTH_SERVICE_URL}/api/auth/validate`, {
        headers: { Authorization: authHeader }
      });

      if (!response.data || !response.data.valid) {
        return res.status(401).json({ error: 'Invalid or expired token.' });
      }

      const user = response.data.user;

      // Check Role-Based Access Control (RBAC) if roles are specified
      if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
        return res.status(403).json({ error: 'Forbidden: You do not have permission to access this resource.' });
      }

      // Inject user metadata into headers for downstream microservices
      req.headers['x-user-id'] = user.id;
      req.headers['x-user-email'] = user.email;
      req.headers['x-user-role'] = user.role;

      next();
    } catch (error) {
      if (error.response) {
        return res.status(error.response.status).json(error.response.data);
      }
      console.error('Auth Gateway Error:', error.message);
      return res.status(500).json({ error: 'Internal server error during authentication.' });
    }
  };
};

module.exports = authenticateAndAuthorize;