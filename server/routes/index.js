const auth = require("./auth");

const initRoutes = (app) => {
  app.use("/api/auth", auth);
};

module.exports = initRoutes;
