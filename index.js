require("dotenv").config();

const app = require("./app");
const port = process.env.PORT || 3000;
require("./DataBase");

(async () => {
  await app.listen(port);
  console.log(`   🚀    Server at http://localhost:${port}`);
})();
