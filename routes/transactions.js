const express = require("express");
const transactionsDB = require("../models/transactions");

// Set a router for transactions
const transactionsRoute = express.Router();

// Get all transactions
transactionsRoute.get("/", (req, res) => {
  console.log("Respond to transactions/");
  res.json(transactionsDB);
});

// Get one individual transaction.
transactionsRoute.get("/:id", (req, res) => {
  console.log("Respond to transactions/:id");
  const { id } = req.params;
  if (id > transactionsDB.length) {
    res.redirect(`/`);
  }
  res.json(transactionsDB[id]);
});

// Create a new transaction.
transactionsRoute.post("/", (req, res) => {
  console.log("Respond to POST");
  transactionsDB.push(req.body);
  res.status(201).json(transactionsDB);
});

// Delete an existing transaction from the database
transactionsRoute.delete("/:id", (req, res) => {
  console.log("Respond to DELETE");

  const { id } = req.params;

  if (!transactionsDB[id]) {
    console.log("error for deleting. The inputted invalid id was: " + id);
    res.status(404).json({
      error: "What you are looking for does not exist hence we can't delete it",
    });
  }

  transactionsDB.splice(req.params.id, 1);
  res.status(200).json(transactionsDB);
});

// Update existing transactions in the database
transactionsRoute.put("/:id", (req, res) => {
  const { id } = req.params;
  if (!transactionsDB[id]) {
    res.status(404).json({ error: `${id} does not exist` });
  }
  transactionsDB[id] = req.body;
  res.status(200).json(transactionsDB);
});

module.exports = transactionsRoute;
