const bcrypt = require("bcryptjs");

module.exports.encryptData = async (data) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(data, salt);
};

module.exports.comperaEncrypt = async (passIn, passDB) =>
  await bcrypt.compare(passIn, passDB);
