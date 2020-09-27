const assert = require("assert");
const request = require("supertest");
const { response } = require("../app");
const app = require("../app");

describe("WC_Cryptocurrencies test", () => {
  let token;
  it("test: create user without username on /api/singup", (done) => {
    request(app)
      .post("/api/singup")
      .send({
        name: "Carlos",
        lastname: "Perez",
        password: "1234abcd",
        preferred_currency: "ard",
      })
      .end((error, response) => {
        assert(
          response.body.errors[0] === "Debe de especificar el nombre de usurio"
        );
        done();
      });
  });
  it("test: create user with short password on /api/singup", (done) => {
    request(app)
      .post("/api/singup")
      .send({
        name: "Carlos",
        lastname: "Perez",
        username: "CarPer",
        password: "1234",
        preferred_currency: "ars",
      })
      .end((error, response) => {
        assert(
          response.body.errors[0] ===
            "La clave debe contener al menos 8 caracteres"
        );
        done();
      });
  });
  it("test: create user without currency on /api/singup", (done) => {
    request(app)
      .post("/api/singup")
      .send({
        name: "Carlos",
        lastname: "Perez",
        username: "CarPer",
        password: "1234abcd",
      })
      .end((error, response) => {
        assert(
          response.body.errors[0] ===
            "Debe especificra su moneda de preferencia"
        );
        done();
      });
  });
  it("test: create user with wrong currency on /api/singup", (done) => {
    request(app)
      .post("/api/singup")
      .send({
        name: "Carlos",
        lastname: "Perez",
        username: "CarPer",
        password: "1234abcd",
        preferred_currency: "cop",
      })
      .end((error, response) => {
        assert(
          response.body.errors[0] ===
            "La moneda cop no es soportada por el sistema"
        );
        done();
      });
  });
  it("test: create user on /api/singup", (done) => {
    request(app)
      .post("/api/singup")
      .send({
        name: "Carlos",
        lastname: "Perez",
        username: "CarPer",
        password: "1234abcd",
        preferred_currency: "eur",
      })
      .end((error, response) => {
        assert(response.body.data.hasOwnProperty("token"));
        done();
      });
  });
  it("test: create user with existing username /api/singup", (done) => {
    request(app)
      .post("/api/singup")
      .send({
        name: "Carmaycol",
        lastname: "Perry",
        username: "CarPer",
        password: "trescasas",
        preferred_currency: "usd",
      })
      .end((error, response) => {
        assert(
          response.body.errors[0] === "El nombre de usuario CarPer ya existe"
        );
        done();
      });
  });
  it("test: login user without username /api/login", (done) => {
    request(app)
      .post("/api/login")
      .send({
        password: "1234abcd",
      })
      .end((error, response) => {
        assert(response.body.errors[0] === "Debe de especificar el usuario");
        done();
      });
  });
  it("test: login user with wrong username /api/login", (done) => {
    request(app)
      .post("/api/login")
      .send({
        username: "CarPer8",
        password: "1234abcd",
      })
      .end((error, response) => {
        assert(response.body.errors[0] === "Usuario no registrado");
        done();
      });
  });
  it("test: login user without password /api/login", (done) => {
    request(app)
      .post("/api/login")
      .send({
        username: "CarPer",
      })
      .end((error, response) => {
        assert(response.body.errors[0] === "Debe ingresar la clave");
        done();
      });
  });
  it("test: login user with wrong password /api/login", (done) => {
    request(app)
      .post("/api/login")
      .send({
        username: "CarPer",
        password: "123a4bcd",
      })
      .end((error, response) => {
        assert(response.body.errors[0] === "Contraseña errada");
        done();
      });
  });
  it("test: login user /api/login", (done) => {
    request(app)
      .post("/api/login")
      .send({
        username: "CarPer",
        password: "1234abcd",
      })
      .end((error, response) => {
        token = response.body.data.token;
        assert(response.body.data.hasOwnProperty("token"));
        done();
      });
  });
  it("test: add cryptocurrencies to user /api/usu/crypto", (done) => {
    request(app)
      .post("/api/usu/crypto")
      .send({
        cryptocurrencies: [
          "btc",
          "eth",
          "usdt",
          "xrp",
          "bch",
          "link",
          "dot",
          "bnb",
          "cro",
          "bsv",
          "ltc",
          "ada",
          "usdc",
          "eos",
          "trx",
          "okb",
          "xmr",
          "xtz",
        ],
      })
      .set("authorization", token)
      .end((error, response) => {
        assert(
          response.body.message === "Cryptomonedas agregadas correctamente"
        );
        done();
      });
  });
  it("test: add existing cryptocurrencies to user /api/usu/crypto", (done) => {
    request(app)
      .post("/api/usu/crypto")
      .send({
        cryptocurrencies: ["btc", "eth", "xtz"],
      })
      .set("authorization", token)
      .end((error, response) => {
        assert(
          response.body.errors[0].slice(0, 49) ===
            "Ya tiene vinculadas las siguientes cryptomonedas:"
        );
        done();
      });
  });
  it("test: add unsupport cryptocurrencies to user /api/usu/crypto", (done) => {
    request(app)
      .post("/api/usu/crypto")
      .send({
        cryptocurrencies: ["btc2", "ethw", "xtza"],
      })
      .set("authorization", token)
      .end((error, response) => {
        assert(
          response.body.errors[0].slice(0, 27) === "Cryptomonedas no soprtadas:"
        );
        done();
      });
  });
  it("test: set wrong token /api/usu/crypto", (done) => {
    request(app)
      .post("/api/usu/crypto")
      .send({
        cryptocurrencies: ["btc2", "ethw", "xtza"],
      })
      .set("authorization", token.replace("a", "1"))
      .end((error, response) => {
        assert(response.body.errors[0] === "Invalid Token");
        done();
      });
  });
  it("test: get cryptocurrencies market with wrong token /api/market", (done) => {
    request(app)
      .get("/api/market")
      .set("authorization", token.replace("a", "b"))
      .query({ per_page: 25 })
      .query({ page: 1 })
      .end((error, response) => {
        assert(response.body.errors[0] === "Invalid Token");
        done();
      });
  });
  it("test: get 30 cryptocurrencies market /api/market", (done) => {
    request(app)
      .get("/api/market")
      .set("authorization", token)
      .query({ per_page: 30 })
      .query({ page: 1 })
      .end((error, response) => {
        assert(response.body.data.length === 30);
        done();
      });
  });
  it("test: get top cryptocurrencies user with wrontoken /api/markettop", (done) => {
    request(app)
      .get("/api/markettop")
      .set("authorization", token.replace("b", "r"))
      .query({ top: 25 })
      .end((error, response) => {
        assert(response.body.errors[0] === "Invalid Token");
        done();
      });
  });
  it("test: get top 15 cryptocurrencies user /api/markettop", (done) => {
    request(app)
      .get("/api/markettop")
      .set("authorization", token)
      .query({ top: 15 })
      .end((error, response) => {
        assert(response.body.data.length === 15);
        done();
      });
  });
  it("test: get top 30 cryptocurrencies user /api/markettop", (done) => {
    request(app)
      .get("/api/markettop")
      .set("authorization", token)
      .query({ top: 30 })
      .end((error, response) => {
        assert(
          response.body.errors[0] === "top debe de ser un número entre 1 y 25"
        );
        done();
      });
  });
});
