const express = require("express");
const session = require("express-session");
require("dotenv").config();
const cors = require("cors");
const dbconn = require("./config/dbconn");
const initRoutes = require("./routes");
const app = express();
const compression = require("compression");
const startCron = require("./config/nodecron.config");
//require("./config/redis.config");

app.use(
  compression({
    threshold: 0,
  })
);

app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);

app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initRoutes(app);
dbconn();
startCron();

const PORT = process.env.PORT || 7777;
app.listen(5000, () => console.log(":::::SERVER READY ON " + PORT));
