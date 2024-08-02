const { throwErrorWithStatus } = require("./errorHandler");

const validateDto = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    // Kiểm tra error.details trước khi truy cập
    const message = error.details[0].message?.replaceAll('"', "");
    throwErrorWithStatus(403, message, res, next);
  }
  next();
};

module.exports = validateDto;
