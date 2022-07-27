const express = require("express");

const cors = require("cors");
const app = express();

const transactionController = require("./controllers/transactions");
const transactionMemberController = require("./controllers/transactionsMember");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the budgetting app");
});

app.use("/transactions", transactionController);
app.use("/transactions-members", transactionMemberController);

app.get("*", (req, res) => {
  res.status(404).send("Transaction not found");
});

module.exports = app;
