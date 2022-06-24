const express = require("express");
require("dotenv").config({ path: ".env" });
const app = express();
require("./db/mongoose");

app.use(express.json());

const user = require("./router/user");
const task = require("./router/task");

app.use(user);
app.use(task);

app.listen(process.env.PORT, () => {
  console.log("running on " + `${process.env.PORT}`);
});
