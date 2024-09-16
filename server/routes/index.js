const {
  errHandler,
  badRequestException,
} = require("../middlewares/errorHandler");
const auth = require("./auth");
const user = require("./user");
const properties = require("./property");
const propertyType = require("./propertyType");
const momoRoutes = require("./momo");

const initRoutes = (app) => {
  app.use("/api/auth", auth);
  app.use("/api/user", user);
  app.use("/api/properties", properties);
  app.use("/api/property-type", propertyType);
  app.use("/momo", momoRoutes);

  // Middleware xử lý lỗi
  app.use("/", badRequestException);
  app.use(errHandler);
};

module.exports = initRoutes;
