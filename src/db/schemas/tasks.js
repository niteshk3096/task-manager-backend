const mongoose = require("mongoose");
const validator = require("validator");

const tasksSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    module: {
      type: String,
      required: true,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

tasksSchema.methods.toJSON = function () {
  const task = this;
  console.log("task", task);
  const taskObject = task.toObject();
  delete taskObject.owner;
  return taskObject;
};

const Task = mongoose.model("Task", tasksSchema);
module.exports = Task;
