const express = require("express");
const app = express.Router();

const { User } = require("../models")
app.get("/user", async (req, res) => {
  try {
    const users = await User.findAll();

    return res.json(users);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

app.post("/user", async (req, res) => {
  const { name, email } = req.body;
  const Model = User;
  try {
    const user = await Model.create({ name, email });

    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

app.delete("/user/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findOne({ where: { id } });

    await user.destroy();

    return res.json({ message: "User deleted!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

app.put("/user/:id", async (req, res) => {
  const id = req.params.id;
  const { name, email } = req.body;
  try {
    const user = await User.findOne({ where: { id } });

    user.name = name;
    user.email = email;

    await user.save();

    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = app;
