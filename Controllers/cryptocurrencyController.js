const axios = require("axios");
const { userModel } = require("../DataBase/Models");

module.exports.getMarkets = async (req, res) => {
  const message = {
    message: "",
    errors: [],
    data: undefined,
  };

  try {
    const iduser = req.iduser;
    const { page, per_page } = req.query;
    const user = await userModel.findById(iduser).populate("currency");

    const markets = await getMarket(
      user.currency.shortname,
      per_page || 25,
      page || 1
    );

    const data = markets.map((market) => ({
      simbolo: market.symbol,
      precio: market.current_price,
      nombre: market.name,
      imagen: market.image,
      fechaHoraUltimaActualizacion: market.last_updated,
    }));

    message.message = `criptomonedas disponibles, valor en ${user.currency.shortname}`;
    message.data = data;
    res.json(message).status(200);
  } catch (error) {
    message.message = "No se puede resalizar la consulta";
    message.errors.push("No se puede resalizar la consulta");
    res.json(message).status(400);
  }
};

module.exports.getTop = async (req, res) => {
  const message = {
    message: "",
    errors: [],
    data: undefined,
  };

  try {
    const iduser = req.iduser;
    const { top, order } = req.query;
    const user = await userModel
      .findById(iduser)
      .populate("currency")
      .populate("cryptocurrencies");

    if (top > 25) throw "top debe de ser menoer o igual a 25";

    const idCryptoCurrUser = user.cryptocurrencies
      .map((cryptocurrencies) => cryptocurrencies.idcryptocurrency)
      .join(", ");

    const marketInARS = await getMarket("ars", 100, 1, idCryptoCurrUser);
    const marketInUSD = await getMarket("usd", 100, 1, idCryptoCurrUser);
    const marketInEUR = await getMarket("eur", 100, 1, idCryptoCurrUser);

    let totalMerkets = marketInARS.map((cryptocurrency, index) => ({
      simbolo: cryptocurrency.symbol,
      nombre: cryptocurrency.name,
      ars: cryptocurrency.current_price,
      usd: marketInUSD[index].current_price,
      eur: marketInEUR[index].current_price,
      imagen: cryptocurrency.image,
      fechaHoraUltimaActualizacion: cryptocurrency.last_updated,
    }));

    if (order === "asc") {
      totalMerkets = totalMerkets
        .sort(ascFunction(user.currency.shortname)) //ordena por la monde predeterminada del usuario
        .slice(top.toInt);
    } else {
      totalMerkets = totalMerkets
        .sort(descFunction(user.currency.shortname)) //ordena por la monde predeterminada del usuario
        .slice(top.toInt);
    }
    message.message = `top ${top} de criptomonedas de ${user.name}`;
    message.data = totalMerkets;
    res.json(message).status(200);
  } catch (error) {
    message.message = "No se puede resalizar la consulta";
    message.errors.push(error);
    res.json(message).status(400);
  }
};

const getMarket = async (currency, per_page = 25, page = 1, ids = null) => {
  const params = {
    vs_currency: currency,
    ...(ids ? { ids: ids } : null),
    per_page: per_page,
    page: page,
    sparkline: false,
  };
  return (
    await axios.get("https://api.coingecko.com/api/v3/coins/markets", {
      params,
    })
  ).data;
};

const descFunction = (key) => (a, b) => b[key] - a[key];
const ascFunction = (key) => (a, b) => a[key] - b[key];