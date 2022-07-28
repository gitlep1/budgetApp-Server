const express = require("express");

const user = express.Router();
const { User } = require("../models/stretch/transaction");

user.use("/user/:id", (req, res, next) => {
  const userID = User.findById(req.params.id);
  if (!userID) {
    return res.status(404).send("User not found");
  }
  next();
});

user.get("/users", async (req, res) => {
  try {
    const data = await User.find();
    res.json(data);
    console.log("===== GET USERS: ", data, "=====");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

user.get("/user/:id", async (req, res) => {
  try {
    const data = await User.findById(req.params.id);
    res.json(data);
    console.log("===== GET MATCHING USER: ", data, "=====");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

user.post("/users", async (req, res) => {
  const data = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    transactions: req.body.transactions,
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

user.put("/user/:id", async (req, res) => {
  const updatedData = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    transactions: req.body.transactions,
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

user.delete("/user/:id", async (req, res) => {
  try {
    const dataToDelete = await User.findByIdAndDelete(req.params.id);
    console.log("===== DELETING USER: ", dataToDelete, "=====");
    res.json(dataToDelete);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = user;
