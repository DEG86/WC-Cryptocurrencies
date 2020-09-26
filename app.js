const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

//const swaggerSpec = require("./Swagger/api-docs");

const app = express();

const { router } = require("./Routes");

app.use(express.json());
app.use(helmet());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Cache-Control, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization, date-filter, filter, nofilter, values"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use(cors()); // enable `cors` to set HTTP response header: Access-Control-Allow-Origin: *
app.use(router);

module.exports = app;
