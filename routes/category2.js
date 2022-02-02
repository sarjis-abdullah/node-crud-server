const express = require("express");
const app = express.Router();

const { Category } = require("../models")
const Model = Category;
app.get("/category", async (req, res) => {
  try {
    const items = await Model.findAll();

    return res.json(items);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

app.post("/category", async (req, res) => {
  console.log(1111)
  const { name, userId } = req.body;
  try {
    const item = await Model.create({ name, userId });

    return res.json(item);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

app.delete("/category/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const item = await Model.findOne({ where: { id } });

    await item.destroy();

    return res.json({ message: "Item deleted!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

app.put("/category/:id", async (req, res) => {
  const id = req.params.id;
  const { name, userId } = req.body;
  try {
    const item = await Model.findOne({ where: { id } });

    item.name = name;
    item.userId = userId;

    await item.save();

    return res.json(item);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = app;
