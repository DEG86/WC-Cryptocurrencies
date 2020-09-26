const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  info: {
    title: "Wolox Challenge Cryptocurrencies",
    version: "1.0.0",
    description: "API Cryptocurrencies",
  },
};

const options = {
  swagger: "2.0",
  swaggerDefinition,
  apis: ["./Swagger/Specs/*.js"],
};

module.exports.swaggerSpec = swaggerJSDoc(options);
