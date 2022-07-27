const express = require("express");

const user = express.Router();
const transaction = express.Router();
const { Transaction, User } = require("../models/stretch/transaction");

// TRANSACTION ROUTES \\
transaction.use("/transaction/:id", (req, res, next) => {
  const transactionID = Transaction.findById(req.params.id);
  if (!transactionID) {
    return res.status(404).send("Transaction not found");
  }
  next();
});

transaction.use("/user/:id", (req, res, next) => {
  const userID = User.findById(req.params.id);
  if (!userID) {
    return res.status(404).send("User not found");
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

  console.log(data);

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

// USER ROUTES \\

transaction.get("/users", async (req, res) => {
  try {
    const data = await User.find();
    res.json(data);
    console.log("===== GET USERS: ", data, "=====");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

transaction.get("/user/:id", async (req, res) => {
  try {
    const data = await User.findById(req.params.id);
    res.json(data);
    console.log("===== GET MATCHING USER: ", data, "=====");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

transaction.post("/users", async (req, res) => {
  const data = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  });

  console.log(data);

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
    console.log("===== INCOMING USER: ", dataToSave, "=====");
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

transaction.put("/user/:id", async (req, res) => {
  const updatedData = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  };

  if (
    typeof updatedData.username === "string" &&
    typeof updatedData.password === "string" &&
    typeof updatedData.email === "string"
  ) {
    try {
      const dataToUpdate = await User.findByIdAndUpdate(
        req.params.id,
        updatedData,
        { new: true }
      );

      console.log("===== UPDATING USER: ", dataToUpdate, "=====");
      res.json(dataToUpdate);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  } else {
    res.status(400).send("Error: Invalid transaction datatypes");
  }
});

transaction.delete("/user/:id", async (req, res) => {
  try {
    const dataToDelete = await User.findByIdAndDelete(req.params.id);
    console.log("===== DELETING USER: ", dataToDelete, "=====");
    res.json(dataToDelete);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = transaction;
