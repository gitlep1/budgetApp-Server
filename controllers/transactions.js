const express = require("express");

const transaction = express.Router();
const transactionArray = require("../models/test/transaction");

transaction.use("/:id", (req, res, next) => {
  let id = req.params.id;

  if (!transactionArray[id]) {
    return res.status(404).redirect("/transaction-error");
  }
  next();
});

transaction.get("/", (req, res) => {
  res.json(transactionArray);
  console.log("===== GET TRANSACTIONS: ", transactionArray, "=====");
});

transaction.get("/:id", (req, res) => {
  let id = req.params.id;

  if (transactionArray[id]) {
    res.json(transactionArray[id]);
    console.log(
      "===== GET MATCHING TRANSACTION: ",
      transactionArray[id],
      "====="
    );
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
    typeof Number(newTransaction.amount) === "number" &&
    typeof newTransaction.date === "string" &&
    typeof newTransaction.from === "string" &&
    typeof newTransaction.category === "string"
  ) {
    transactionArray.push(newTransaction);
    res.json(newTransaction);
    console.log("===== INCOMING TRANSACTION: ", newTransaction, "=====");
  } else {
    res.status(400).send("Error: Invalid transaction datatypes");
  }
});

transaction.put("/:id", (req, res) => {
  let id = req.params.id;

  let updatedTransaction = {
    item_name: req.body.item_name,
    amount: req.body.amount,
    date: req.body.date,
    from: req.body.from,
    category: req.body.category,
  };

  if (
    typeof updatedTransaction.item_name === "string" &&
    typeof Number(updatedTransaction.amount) === "number" &&
    typeof updatedTransaction.date === "string" &&
    typeof updatedTransaction.from === "string" &&
    typeof updatedTransaction.category === "string"
  ) {
    transactionArray[id] = updatedTransaction;
    res.json(updatedTransaction);
    console.log("===== UPDATING TRANSACTION: ", updatedTransaction, "=====");
  } else {
    res.status(400).send("Error: Invalid transaction datatypes");
  }
});

transaction.delete("/:id", (req, res) => {
  let id = req.params.id;

  if (transactionArray[id]) {
    transactionArray.splice(id, 1);
    res.status(204).send("Transaction deleted");
    console.log("===== DELETED TRANSACTION =====");
  } else {
    res.status(404).redirect("/transaction-error");
  }
});

module.exports = transaction;
