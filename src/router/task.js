const express = require("express");
const auth = require("../middleware/auth");
const Task = require("../db/schemas/tasks");

const router = new express.Router();

router.post("/tasks", auth, async (req, res) => {
  // const task = new Task(req.body);
  const task = new Task({ ...req.body, owner: req.user._id });
  try {
    await task.save();
    console.log("saved");
    res.send(task);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

router.get("/tasks", auth, async (req, res) => {
  try {
    const match = {};
    const sort = {};
    if (req.query.completed) {
      match.completed = req.query.completed === "true";
    }
    if (req.query.sortBy) {
      const parts = req.query.sortBy.split(":");
      sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
    }
    const query = req.query;
    await req.user.populate({
      path: "tasks",
      match,
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort,
      },
    });
    res.send(req.user.tasks);
    // res.send(task);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

router.get("/task/:id", auth, async (req, res) => {
  const _id = req.params.id;
  console.log(_id, req.user._id);
  try {
    const task = await Task.findOne({ _id, owner: req.user._id });
    console.log("task");
    if (!task) return res.status(404).send("Task not found");
    res.send(task);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.put("/task/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const verifyUpdate = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!verifyUpdate) return res.status(400).send("Invalid parameter");
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    console.log("update task", task);
    if (!task) return res.status(404).send("Task not found");
    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();

    res.send(task);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete("/task/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) return res.status(404).send("Task not found");
    res.send(task);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
