const { model } = require("mongoose");
const { userSchema } = require("../Schemas/userSchema");
const { currencyShema } = require("../Schemas/currencySchema");
const {
  userCryptocurrencySchema,
} = require("../Schemas/userCryptocurrencySchema");

module.exports = {
  userModel: model("users", userSchema),
  currencyModel: model("currencies", currencyShema),
  usersCryptocurrenciesModel: model(
    "users_cryptocurrencies",
    userCryptocurrencySchema
  ),
};
