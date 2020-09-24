const mongoose = require("mongoose");

const uri = `mongodb+srv://${process.env.USER_NAME_DB}:${process.env.USER_PASS_DB}@cluster0.jqvst.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 4,
  })
  .then(() => console.log(" Database Connected "))
  .catch((error) => console.error(`Cant connect to database: ${error.stack}`));
