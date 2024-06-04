const errorHandler = (err, req, res, next) => {

  const statusCode = err.code && err.code !== 200 ? err.code : 500;

  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
};

module.exports = errorHandler;
