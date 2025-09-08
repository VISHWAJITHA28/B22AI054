// loggingMiddleware.js
// This middleware logs requests and responses for debugging and monitoring purposes.

const loggingMiddleware = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  res.on('finish', () => {
    console.log(`Response Status: ${res.statusCode}`);
  });
  next();
};

module.exports = loggingMiddleware;
