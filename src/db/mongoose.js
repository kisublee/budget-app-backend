// Pull Mongoose
const mongoose = require("mongoose");

// Dependencies.
const dotenv = require("dotenv");

// Configuration.
dotenv.config();
const URL = process.env.MONGO_URL;

console.log(URL);
mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch(() => {
    console.log("Database connection failed!");
  });
