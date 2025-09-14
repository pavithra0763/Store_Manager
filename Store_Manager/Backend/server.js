const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Models
const User = require("./models/users");

// Routers
const storeRoutes = require("./router/store");
const productRoutes = require("./router/product");

const app = express();
const PORT = 4000;

// MongoDB URI
const uri =
  "mongodb+srv://rsathis005_db_user:Sathis123@cluster0.gliwnnp.mongodb.net/InventoryManagementApp?retryWrites=true&w=majority";

// Connect to MongoDB
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Middleware
app.use(cors());
app.use(express.json());

// ----------------- Auth -----------------
app.post("/api/register", async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) return res.status(400).send("User already exists");

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      phoneNumber: req.body.phoneNumber,
      imageUrl: req.body.imageUrl,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).send("Server error");
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).send("Invalid Credentials");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).send("Invalid Credentials");

    res.status(200).json(user);
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).send("Server error");
  }
});

// ----------------- Routers -----------------
app.use("/api/store", storeRoutes);     // ✅ Store routes
app.use("/api/product", productRoutes); // ✅ Product routes

// ----------------- Test -----------------
app.get("/api/test", (req, res) => {
  res.send("Backend is working!");
});

// ----------------- Start Server -----------------
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
