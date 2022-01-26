// Pull in app.js.
const app = require("./app");

// Pull MongoDB
require("./db/mongoose");

// Dependencies.
const dotenv = require("dotenv");

// Configuration.
dotenv.config();
const PORT = process.env.PORT;

app.listen(PORT || 5000, () => {
  console.log("Successfully listening on: " + PORT);
});
