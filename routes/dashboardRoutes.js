// module.exports = router;
const express = require('express');
const router = express.Router();
const Product = require('../models/productsModel'); // adjust path if needed

// GET Vendor Dashboard
router.get('/dashboard', async (req, res) => {
  try {
    const products = await Product.find();

    const stats = {
      totalSales: 50000000, // placeholder
      totalOrders: 15000000, // placeholder
      totalStock: products.reduce((sum, p) => sum + (p.price * p.quantity), 0),
      outOfStock: products.filter(p => p.quantity === 0).length
    };

    res.render('dashboard', { // make sure pug file is vendor.pug
      products,
      stats,
      success: req.query.success
    });
  } catch (err) {
    res.status(500).send("Error loading dashboard: " + err.message);
  }
});

// POST: Add Product
router.post('/dashboard', async (req, res) => {
  try {
    const { name, category, price, quantity, color } = req.body;
    if (!name || !category || !price || !quantity || !color) {
      return res.status(400).send("All fields required");
    }

    await Product.create({ name, category, price, quantity, color });
    res.redirect('/dashboard?success=true');
  } catch (err) {
    res.status(500).send("Error adding product: " + err.message);
  }
});

module.exports = router;