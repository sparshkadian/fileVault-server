const globalErrorHandler = (err, req, res, next) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stackTrace: err.stack,
  });
};

export default globalErrorHandler;
