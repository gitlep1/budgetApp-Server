const mongoose = require("mongoose");
// const db = require("./config/db");
const app = require("./app");

require("dotenv").config();
const PORT = process.env.PORT || 4000;
const db = process.env.DATABASE_URL;

mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
