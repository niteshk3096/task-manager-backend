const mongoose = require("mongoose");
require("dotenv").config({ path: ".env" });
console.log(process.env.MONGO_URL);
mongoose.connect(
  `${process.env.MONGO_URL}/${process.env.MONGO_DB}?retryWrites=true&w=majority`
);

// const user = new Users({
//   name: "Nitesh 4",
//   email: "Nitesh4@gmail.com",
//   password: "nitesh@96",
// });

// user
//   .save()
//   .then((data) => {
//     console.log("saved", data);
//   })
//   .catch((data) => {
//     console.log("failed", data);
//   });

// const task = new Tasks({
//   description: "      Setup the folder structire React Native      ",
// });

// task
//   .save()
//   .then((data) => {
//     console.log("saved", data);
//   })
//   .catch((data) => {
//     console.log("failed", data);
//   });
