const { Schema } = require("mongoose");

module.exports.userCryptocurrencySchema = new Schema({
  _id: Schema.Types.ObjectId,
  iduser: String,
  idcryptocurrency: String,
});
