const express = require("express");
const app = express();
require("./db/mongoose");

app.use(express.json());

const user = require("./router/user");
const task = require("./router/task");

app.use(user);
app.use(task);

app.listen(4000, () => {
  console.log("running");
});
