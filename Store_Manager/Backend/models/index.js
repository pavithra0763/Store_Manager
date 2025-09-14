const mongoose = require("mongoose");

// 🔑 Replace with your actual Atlas credentials
// Example with password containing special chars (like &):
// You must URL encode it. (& → %26, @ → %40, etc.)
const uri = "mongodb+srv://adminhamza:adminhamza123%26@cluster0.pzcviot.mongodb.net/InventoryManagementApp?retryWrites=true&w=majority&appName=Cluster0";

function main() {
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Successfully connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
}

module.exports = { main };
