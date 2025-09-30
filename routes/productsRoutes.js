const express = require("express");
const router = express.Router();
const Product = require("../models/productsModel");

// GET dashboard with all products
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.render("form", { products });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// POST new product via AJAX
router.post("/products", async (req, res) => {
  try {
    const { name, category, price, quantity, color } = req.body;
    const newProduct = new Product({ name, category, price, quantity, color });
    const savedProduct = await newProduct.save();
    res.json({ success: true, product: savedProduct });
  } catch (err) {
    console.error(err);
    res.json({ success: false, error: err.message });
  }
});

module.exports = router;
