const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  item_name: {
    required: true,
    type: String,
  },
  amount: {
    required: true,
    type: Number,
  },
  date: {
    required: true,
    type: String,
  },
  from: {
    required: true,
    type: String,
  },
  category: {
    required: true,
    type: String,
  },
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    Uique: true,
  },

  transactions: [transactionSchema],
});

module.exports = {
  Transaction: mongoose.model("Transaction", transactionSchema),
  User: mongoose.model("User", userSchema),
};
