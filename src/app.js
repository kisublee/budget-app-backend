const express = require("express");
const cors = require("cors");
const app = express();

const transactions = require("../routes/transactions");
app.use(express.json());
app.use(cors());

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
