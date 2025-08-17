// File: server/routes/products.js

const express = require('express');
const Product = require('../models/Product');
const { isAuth, isAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

// Get all products (with optional filtering by category or featured status)
router.get('/', async (req, res) => {
  try {
    const { category, featured } = req.query;
    const filter = {};

    if (category) {
      filter.category = category;
    }
    if (featured) {
      // Assuming you have an 'isFeatured' field in your Product model
      filter.isFeatured = true; 
    }

    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single product by ID (Public)
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Add product (Admin only)
router.post('/', isAuth, isAdmin, async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a product (Admin only)
router.delete('/:id', isAuth, isAdmin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.deleteOne();
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;
