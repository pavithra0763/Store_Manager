const mongoose = require("mongoose");
const Product = require("./models/Product");

async function seed() {
  try {
    await mongoose.connect("mongodb+srv://adminhamza:adminhamza123%26@cluster0.pzcviot.mongodb.net/InventoryManagementApp?retryWrites=true&w=majority");
    console.log("✅ Connected to DB");

    await Product.create([
      {
        name: "Laptop",
        price: 50000,
        quantity: 10,
        stock: 10,
        manufacturer: "Dell",
        userID: "64a123456789abcdef123456" // <-- replace with a real user _id from your users collection
      },
      {
        name: "Mouse",
        price: 500,
        quantity: 100,
        stock: 100,
        manufacturer: "Logitech",
        userID: "64a123456789abcdef123456"
      },
      {
        name: "Keyboard",
        price: 1500,
        quantity: 50,
        stock: 50,
        manufacturer: "HP",
        userID: "64a123456789abcdef123456"
      }
    ]);

    console.log("✅ Products inserted");
    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Error:", err);
  }
}

seed();
