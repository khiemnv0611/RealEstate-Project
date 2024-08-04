const {
  errHandler,
  badRequestException,
} = require("../middlewares/errorHandler");
const auth = require("./auth");
const user = require("./user");

const initRoutes = (app) => {
  app.use("/api/auth", auth);
  app.use("/api/user", user);

  // Middleware xử lý lỗi
  app.use("/", badRequestException);
  app.use(errHandler);
};

module.exports = initRoutes;
