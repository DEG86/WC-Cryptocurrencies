const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

//const swaggerSpec = require("./Swagger/api-docs");

const app = express();

const { router } = require("./Routes");

app.use(express.json());
app.use(helmet());

app.use(cors()); // enable `cors` to set HTTP response header: Access-Control-Allow-Origin: *
app.use(router);

const { swaggerSpec } = require("./Swagger");
const swaggerUi = require("swagger-ui-express");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;
