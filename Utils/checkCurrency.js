const { currencyModel } = require("../DataBase/Models");

module.exports = async (currency) => {
  const data = (
    await currencyModel.find({
      $or: [{ name: currency }, { shortname: currency }],
    })
  )[0];
  if (data) return data._id;
  return undefined;
};
