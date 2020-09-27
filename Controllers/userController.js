const db = require("mongoose");
const axios = require("axios");

const { userModel, usersCryptocurrenciesModel } = require("../DataBase/Models");
const { encryptData, comperaEncrypt } = require("../Utils/encrypt");
const checkCurrency = require("../Utils/checkCurrency");
const tk = require("../Utils/token");
const validatePass = require("../Utils/validatePass");

module.exports.create = async (req, res) => {
  const message = {
    message: "",
    errors: [],
    data: undefined,
  };
  const { name, lastname, username, password, preferred_currency } = req.body;
  const session = await db.startSession();
  session.startTransaction();

  try {
    if (!password || !validatePass(password))
      throw `La clave debe contener al menos 8 caracteres`;

    const checkUniqueUser = await userModel.findOne({ username });
    if (!username || checkUniqueUser)
      throw !username
        ? "Debe de especificar el nombre de usurio"
        : `El nombre de usuario ${username} ya existe`;

    if (!preferred_currency) throw "Debe especificra su moneda de preferencia";
    const idcurrency = await checkCurrency(preferred_currency);
    if (!idcurrency)
      throw `La moneda ${preferred_currency} no es soportada por el sistema`;

    const encryptPass = await encryptData(password);
    const newUser = new userModel({
      name,
      lastname,
      username,
      password: encryptPass,
      currency: idcurrency,
    });
    await newUser.save();
    const token = tk.generate({ _id: newUser._id });
    await session.commitTransaction();
    message.message = "Usuria registrado con exito";
    message.data = { token };
    res.status(200).json(message);
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
    message.message = "Error al registrar el usuario";
    message.errors.push(error);
    res.status(400).json(message);
  } finally {
    session.endSession();
  }
};

module.exports.login = async (req, res) => {
  const message = {
    message: "",
    errors: [],
    data: undefined,
  };
  const { username, password } = req.body;
  try {
    if (!username) throw "Debe de especificar el usuario";
    const checkUser = await userModel.findOne({ username });
    if (!checkUser) throw "Usuario no registrado";
    if (!password) throw "Debe ingresar la clave";
    const checkPass = await comperaEncrypt(password, checkUser.password);
    if (!checkPass) throw "Contraseña errada";
    const token = tk.generate({ _id: checkUser._id });
    message.message = "Usuario Auntenticado";
    message.data = { token };
    res.status(200).json(message);
  } catch (error) {
    message.message = "No se Puedo Autenticar el usuario";
    message.errors.push(error);
    res.status(401).json(message);
  }
};

module.exports.addCryptocurrencies = async (req, res) => {
  const message = {
    message: "",
    errors: [],
    data: undefined,
  };
  const iduser = req.iduser;
  const newCryptos = req.body.cryptocurrencies;

  // cryptomonedas soportadas
  const cryptoList = (
    await axios.get("https://api.coingecko.com/api/v3/coins/list")
  ).data;

  // se comparan y se guardan las crypotomonedas soportadas con las ingresadas por el usurio
  const userCrypto = newCryptos.map(
    (newCrypto) =>
      cryptoList.filter(
        (crypto) => crypto.symbol === newCrypto || crypto.name === newCrypto
      )[0]
  );

  // se listan las cryptomonedas no soportadas
  const noSuportCrypto = [];
  userCrypto.forEach((element, index) => {
    if (!element) noSuportCrypto.push(newCryptos[index]);
  });
  const session = await db.startSession();
  session.startTransaction();
  try {
    if (noSuportCrypto.length)
      throw `Cryptomonedas no soprtadas: ${noSuportCrypto.join(", ")}`;

    // se buscan cryptomonedas repetidas por el usuario
    const usesCrypto = [];
    await Promise.all(
      userCrypto.map(async (crypto) => {
        let data = await usersCryptocurrenciesModel.findOne({
          idcryptocurrency: crypto.id,
        });
        if (data) usesCrypto.push(crypto.id);
      })
    );
    if (usesCrypto.length)
      throw `Ya tiene vinculadas las siguientes cryptomonedas: ${usesCrypto.join(
        ", "
      )}`;

    const newUserCrypto_idsMoong = await Promise.all(
      userCrypto.map(async (crypto) => {
        let newUserCrypto = new usersCryptocurrenciesModel({
          iduser,
          idcryptocurrency: crypto.id,
        });
        await newUserCrypto.save();
        return newUserCrypto._id;
      })
    );

    const user = await userModel.findById(iduser).populate("cryptocurrencies");

    user.cryptocurrencies.forEach((cryptocurrencies) =>
      newUserCrypto_idsMoong.push(cryptocurrencies._id)
    );

    let updateUser = await userModel.findOneAndUpdate(
      { _id: iduser },
      { cryptocurrencies: newUserCrypto_idsMoong },
      { useFindAndModify: false }
    );

    message.message = "Cryptomonedas agregadas correctamente";
    message.data = { userCrypto };
    //await session.abortTransaction();
    await session.commitTransaction();
    res.status(200).json(message);
  } catch (error) {
    await session.abortTransaction();
    message.message = "Error al agregar cryptomonedas";
    message.errors.push(error);
    res.status(400).json(message);
  } finally {
    session.endSession();
  }
};
