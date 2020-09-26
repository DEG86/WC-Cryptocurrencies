const tk = require("../Utils/token");

module.exports.validateToken = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const tokenData = tk.verify(authorization);
    req.iduser = tokenData._id;
    next();
  } catch (error) {
    const message = {
      message: "Usuario no autorizado",
      errors: ["Invalid Token"],
      data: undefined,
    };
    return res.send(message).status(401);
  }
};
