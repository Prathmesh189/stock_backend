const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/auth');

const authMiddleware = (req, res, next) => {
  // Extract token from the Authorization header
  const token = req.header('Authorization')?.split(' ')[1];

  // Check if token is provided
  if (!token) {
    return res.status(401).json({ status: 0, message: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, jwtSecret);
    // Store decoded user information in request object
    req.user = decoded;
    // Proceed to next middleware or route handler
    next();
  } catch (error) {
    // Handle invalid token
    res.status(400).json({ status: 0, message: 'Invalid token.' });
  }
};

module.exports = authMiddleware;
