const express = require("express");
const jwt = require("jsonwebtoken");
const Task = require("../models/Task");
const crypto = require("crypto");

const router = express.Router();
const JWT_SECRET = crypto.randomBytes(64).toString("hex");



const auth = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ error: "Token is not valid" });
  }
};



router.get("/", auth, async (req, res) => {
  const tasks = await Task.find({ user: req.user });
  res.json(tasks);
});



router.post("/", auth, async (req, res) => {
  const { title } = req.body;
  const task = new Task({ user: req.user, title });
  await task.save();
  res.status(201).json(task);
});



router.put("/:id/complete", auth, async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, { completed: true }, { new: true });
  res.json(task);
});



router.delete("/:id", auth, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
});


router.delete("/", auth, async (req, res) => {
  await Task.deleteMany({ user: req.user });
  res.json({ message: "All tasks cleared" });
});

module.exports = router;
