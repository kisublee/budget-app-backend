const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const transactions = require("../routes/transactions");
// const mongoose = require("mongoose");

// mongoose
//   .connect("mongodb://localhost:5000/budget-app", {
//     useNewUrlParser: true,
//   })
//   .then(() => {
//     .catch(() => {
//       console.log("Database connection failed!");
//     });

app.get("/", (_, res) => {
  console.log(`Responding to '/'`);
  res.send("Welcome to the best budget app");
});

app.use("/transactions", transactions);

app.get("*", (_, res) => {
  console.log("Invalid URL detected");
  res.status(404).json({ error: "Page not found" });
});

module.exports = app;
