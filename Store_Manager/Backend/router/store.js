const express = require("express");
const router = express.Router();
const Store = require("../models/Store");

// Add Store
router.post("/add", async (req, res) => {
  try {
    const { userID, name, category, address, city, image } = req.body;
    const newStore = new Store({ userID, name, category, address, city, image });
    await newStore.save();
    res.status(201).json(newStore);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Get all stores for a user
router.get("/get/:userID", async (req, res) => {
  try {
    const stores = await Store.find({ userID: req.params.userID });
    res.status(200).json(stores);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
