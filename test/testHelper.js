require("dotenv").config();
const seeder = require("mongoose-seed");
const mongoose = require("mongoose");

const uri = process.env.URI_TEST_DATABASE;

before(() => {
  it("seed test databaes", (done) => {
    seeder.connect(uri, function () {
      // Load Mongoose models
      seeder.loadModels(["./DataBase/Models/index.js"]);

      // Clear specified collections
      seeder.clearModels(
        ["users", "currencies", "users_cryptocurrencies"],
        function () {
          // Callback to populate DB once collections have been cleared
          seeder.populateModels(data, function (error, fin) {
            if (error) return console.error(`Seed DB error: ${error}`);
            if (fin) return console.log(`Seed DB done: ${fin}`);
            done();
            seeder.disconnect();
          });
        }
      );
    });
  });
  it("connecting to test database", (done) => {
    mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      poolSize: 4,
    });
    mongoose.connection
      .once("open", () => {
        done();
      })
      .on("error", (error) => {});
  });
});

const data = [
  {
    model: "currencies",
    documents: [
      {
        _id: "5bd761dcae323e45a93ccfe8",
        name: "Euro",
        shortname: "eur",
      },
      {
        _id: "5bd761dcae323e45a93ccfe9",
        name: "Dollar",
        shortname: "usd",
      },
      {
        _id: "5bd761dcae323e45a93ccfea",
        name: "Peso Argentino",
        shortname: "ars",
      },
    ],
  },
];
