const { Schema } = require("mongoose");

module.exports.userSchema = new Schema({
  name: String,
  lastname: String,
  username: String,
  password: String,
  preferred_currency: [{ type: Schema.Types.ObjectId, ref: "currencyShema" }],
  cryptocurrencies: [
    { type: Schema.Types.ObjectId, ref: "userCryptocurrencySchema" },
  ],
});
