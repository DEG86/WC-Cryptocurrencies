require("dotenv").config();
const seeder = require("mongoose-seed");

const uri = process.env.URI_DATABASE;

// Connect to MongoDB via Mongoose
seeder.connect(uri, function () {
  // Load Mongoose models
  seeder.loadModels(["./Mongo/Models/index.js"]);

  // Clear specified collections
  seeder.clearModels(
    ["users", "currencies", "users_cryptocurrencies"],
    function () {
      // Callback to populate DB once collections have been cleared
      seeder.populateModels(data, function (error, done) {
        if (error) return console.error(`Seed DB error: ${error}`);
        if (done) return console.log(`Seed DB done: ${done}`);
        seeder.disconnect();
      });
    }
  );
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
