const express = require("express");
const req = require("express/lib/request");
const User = require("../db/schemas/users");
const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/user/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.getUserToken();
    res.send({ user, token });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    let data = await user.save();
    const token = await user.getUserToken();
    res.status(201).send({ user, token });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/users/me", auth, async (req, res) => {
  // try {
  //   const data = await User.find({});
  //   res.send(data);
  // } catch (err) {
  //   res.status(400).send(err);
  // }
  res.send(req.user);
});

router.post("/user/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token != req.token;
    });
    await req.user.save();
    res.send("Logout");
  } catch (err) {
    res.status(500).send("Error");
  }
});
router.post("/user/logoutall", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send("Logout");
  } catch (err) {
    res.status(500).send("Error");
  }
});

router.put("/user/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "age", "password"];
  const verifyUpdate = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!verifyUpdate) return res.status(400).send("Invalid parameter");
  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(req.user);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete("/user/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
