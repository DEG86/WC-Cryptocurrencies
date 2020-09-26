const { Schema } = require("mongoose");

module.exports.currencyShema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  shortname: String,
});
