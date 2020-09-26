const mongoose = require("mongoose");

const uri = process.env.URI_DATABASE;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 4,
  })
  .then(() => console.log(" Database Connected "))
  .catch((error) => console.error(`Cant connect to database: ${error.stack}`));
