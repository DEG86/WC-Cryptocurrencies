const { Schema } = require("mongoose");

module.exports.userSchema = new Schema({
  name: String,
  lastname: String,
  username: String,
  password: String,
  currency: { type: Schema.Types.ObjectId, ref: "currencies" },
  cryptocurrencies: [
    { type: Schema.Types.ObjectId, ref: "users_cryptocurrencies" },
  ],
});
