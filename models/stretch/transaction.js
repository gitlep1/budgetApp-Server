const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  itemName: {
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

module.exports = mongoose.model("Transaction", transactionSchema);
