const errHandler = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    success: false,
    mes: error.message,
  });
};

const throwErrorWithStatus = (code, message, res, next) => {
  const error = new Error(message);
  res.status(code);
  next(error);
};

module.exports = {
  errHandler,
  throwErrorWithStatus,
};
