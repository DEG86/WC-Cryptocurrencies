const { Schema } = require("mongoose");

module.exports.userCryptocurrencySchema = new Schema({
  iduser: String,
  idcryptocurrency: String,
});
