const express = require("express");

const transaction = express.Router();
const { Transaction } = require("../models/stretch/transaction");

transaction.use("/transaction/:id", (req, res, next) => {
  const transactionID = Transaction.findById(req.params.id);
  if (!transactionID) {
    return res.status(404).send("Transaction not found");
  }
  next();
});

transaction.get("/transactions", async (req, res) => {
  try {
    const data = await Transaction.find();
    res.json(data);
    console.log("===== GET TRANSACTIONS: ", data, "=====");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

transaction.get("/transaction/:id", async (req, res) => {
  try {
    const data = await Transaction.findById(req.params.id);
    res.json(data);
    console.log("===== GET MATCHING TRANSACTION: ", data, "=====");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

transaction.post("/transactions", async (req, res) => {
  const data = new Transaction({
    item_name: req.body.item_name,
    amount: req.body.amount,
    date: req.body.date,
    from: req.body.from,
    category: req.body.category,
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
    console.log("===== INCOMING TRANSACTION: ", dataToSave, "=====");
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

transaction.put("/transaction/:id", async (req, res) => {
  const updatedData = {
    item_name: req.body.item_name,
    amount: req.body.amount,
    date: req.body.date,
    from: req.body.from,
    category: req.body.category,
  };

  if (
    typeof updatedData.item_name === "string" &&
    typeof Number(updatedData.amount) === "number" &&
    typeof updatedData.date === "string" &&
    typeof updatedData.from === "string" &&
    typeof updatedData.category === "string"
  ) {
    try {
      const dataToUpdate = await Transaction.findByIdAndUpdate(
        req.params.id,
        updatedData,
        { new: true }
      );

      console.log("===== UPDATING TRANSACTION: ", dataToUpdate, "=====");
      res.json(dataToUpdate);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  } else {
    res.status(400).send("Error: Invalid transaction datatypes");
  }
});

transaction.delete("/transaction/:id", async (req, res) => {
  try {
    const dataToDelete = await Transaction.findByIdAndDelete(req.params.id);
    console.log("===== DELETING TRANSACTION: ", dataToDelete, "=====");
    res.json(dataToDelete);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = transaction;
