const errHandler = (error, req, res, next) => {
  const formattedMessage = error?.message?.replaceAll('"', "");
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    success: false,
    mes: formattedMessage,
  });
};

const throwErrorWithStatus = (code, message, res, next) => {
  const formattedMessage = message?.replaceAll('"', "");
  const error = new Error(formattedMessage);
  res.status(code);
  next(error);
};

const badRequestException = (req, res, next) => {
  const error = new Error(`Route ${req.originalUrl} not found.`);
  res.status(404);
  next(error);
};

module.exports = {
  errHandler,
  throwErrorWithStatus,
  badRequestException,
};
