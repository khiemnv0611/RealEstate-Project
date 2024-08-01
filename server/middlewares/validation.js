const { throwErrorWithStatus } = require("./errorHandler");

const validateDto = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    // Kiểm tra error.details trước khi truy cập
    const message =
      error.details && error.details.length > 0
        ? error.details[0].message.replaceAll('"', "") // Xóa dấu "
        : error.message.replaceAll('"', ""); // Xóa dấu "
    throwErrorWithStatus(403, message, res, next);
  }
  next();
};

module.exports = validateDto;
