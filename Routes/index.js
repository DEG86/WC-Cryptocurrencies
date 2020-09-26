const router = require("express").Router();

const userController = require("../Controllers/userController");
const cryptocurrencyController = require("../Controllers/cryptocurrencyController");
const { validateToken } = require("../Middleware");

router.post("/api/usu/singup", userController.create);
router.post("/api/usu/login", userController.login);
router.post(
  "/api/usu/crypto",
  validateToken,
  userController.addCryptocurrencies
);

router.get("/api/market", validateToken, cryptocurrencyController.getMarkets);
router.get("/api/markettop", validateToken, cryptocurrencyController.getTop);

module.exports = {
  router,
};
