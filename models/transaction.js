const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  date: String,
  category: String,
  source: String,
  amount: Number,
  description: String,
});

const Transaction = mongoose.model("Transaction", schema);
module.exports = Transaction;
