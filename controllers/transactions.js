const express = require("express");

const transaction = express.Router();
const transactionArray = require("../models/test/transaction");
// const Model = require("../models/stretch/transaction");

transaction.use("/:id", (req, res, next) => {
  if (!transactionArray[req.params.id]) {
    return res.status(404).send("Transaction not found");
  }
  next();
});

transaction.get("/", (req, res) => {
  res.json(transactionArray);
});

transaction.get("/:id", (req, res) => {
  let id = req.params.id;

  if (transactionArray[id]) {
    res.json(transactionArray[id]);
  } else {
    res.status(404).redirect("/transaction-error");
  }
});

transaction.post("/", (req, res) => {
  const newTransaction = {
    item_name: req.body.item_name,
    amount: req.body.amount,
    date: req.body.date,
    from: req.body.from,
    category: req.body.category,
  };
  if (
    typeof newTransaction.item_name === "string" &&
    typeof newTransaction.amount === "number" &&
    typeof newTransaction.date === "string" &&
    typeof newTransaction.from === "string" &&
    typeof newTransaction.category === "string"
  ) {
    transactionArray.push(newTransaction);
    res.json(newTransaction);
  } else {
    res.status(400).send("Error: Invalid transaction datatypes");
  }
});

// DO MONGODB AS A STRETCH GOAL WITH SCHEMA AND MODEL
// transaction.use("/:id", (req, res, next) => {
//   Model.findById(req.params.id).then((transaction) => {
//     if (transaction) {
//       req.transaction = transaction;
//       next();
//     } else {
//       res.status(404).send("No transaction with that id was found");
//     }
//   });
// });

// transaction.get("/", async (req, res) => {
//   try {
//     await Model.find({}).then((transactions) => {
//       res.json(transactions);
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

module.exports = transaction;
