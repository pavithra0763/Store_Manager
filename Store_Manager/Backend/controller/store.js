const Store = require("../models/Store");

// Add Store
exports.addStore = async (req, res) => {
  try {
    const { userID, name, category, address, city, image } = req.body;

    if (!userID || !name || !category || !address || !city || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newStore = new Store({
      userID,
      name,
      category,
      address,
      city,
      image,
    });

    await newStore.save();
    res.status(201).json({ message: "Store added successfully", store: newStore });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all stores by user
exports.getAllStores = async (req, res) => {
  try {
    const { userID } = req.params;
    const stores = await Store.find({ userID });
    res.json(stores);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
