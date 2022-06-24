const mongoose = require("mongoose");
require("dotenv").config({ path: ".env" });
console.log(process.env.MONGO_URL);
mongoose.connect(
  `${process.env.MONGO_URL}/${process.env.MONGO_DB}?retryWrites=true&w=majority`
);
