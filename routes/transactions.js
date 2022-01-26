const express = require("express");
const res = require("express/lib/response");
require("../src/db/mongoose");
// Set a router for transactions
const TransactionDB = require("../models/transaction");
const transactionsRoute = express.Router();

// Get all transactions
transactionsRoute.get("/", async (req, res) => {
  console.log("Respond to transactions/");

  try {
    const transactions = await TransactionDB.find({});
    console.log("Successfully responding to GET all");
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get one individual transaction.
transactionsRoute.get("/:id", async (req, res) => {
  console.log("Respond to transactions/:id");

  const { id } = req.params;

  try {
    const transaction = await TransactionDB.findById(id);
    if (!transaction) {
      return res.status(404).send();
    }
    console.log("Successfully responding to /:id");
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get transactions from specific category.
transactionsRoute.get("/category/:category", async (req, res) => {
  console.log("Respond to transactions/:category");

  const { category } = req.params;
  try {
    const transactions = await TransactionDB.find({ category: category });
    if (!transactions) {
      return res.status(500).send();
    }
    console.log("Successfully responding to /category/:category");
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Create a new transaction.
transactionsRoute.post("/", async (req, res) => {
  console.log("Respond to POST");
  const transaction = await new TransactionDB(req.body);
  try {
    // console.log("successfully created: ", transaction);
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete an existing transaction from the database
transactionsRoute.delete("/:id", async (req, res) => {
  console.log("Respond to DELETE");

  const { id } = req.params;

  try {
    const transaction = await TransactionDB.findByIdAndDelete(id);
    if (!transaction) {
      console.log(` ${id} does not exist hence we can't delete it`);
      return res.status(404).send();
    }
    console.log(`${id} has been successfully deleted`);
    res.json(transaction);
  } catch (error) {
    res.status(500).send();
  }
});

// Update existing transactions in the database
transactionsRoute.patch("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const transaction = await TransactionDB.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!transaction) {
      return res.status(404).send();
    }
    console.log("Successfully Updating:", id);
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = transactionsRoute;
