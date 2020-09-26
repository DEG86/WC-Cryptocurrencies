const jwt = require("jsonwebtoken");

module.exports.generate = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXP_TIME,
  });

module.exports.verify = (token) => {
  try {
    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    throw "Invalid Token";
  }
};
