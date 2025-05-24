// middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
    console.error(err);
    
    // Default error status and message
    const status = err.status || 500;
    const message = err.message || 'Internal server error';
    
    // Joi validation errors
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Validation error',
        errors: err.details.map(detail => detail.message)
      });
    }
    
    // JWT errors
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }
    
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    
    // Send error response
    res.status(status).json({ message });
  };
  
  module.exports = { errorHandler };