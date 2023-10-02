const express = require('express');
const router = express.Router();
const Product = require('../../models/Product');

// @route   GET api/products
// @desc    Get all products
// @access  Public
router.get('/', async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (err) {
      res.status(500).json({ msg: 'Server Error' });
    }
});

// @route   POST api/products
// @desc    Create a new product
// @access  Public
router.post('/', async (req, res) => {
    const newProduct = new Product({
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      stockQuantity: req.body.stockQuantity,
      imageUrl: req.body.imageUrl,
      onSale: req.body.onSale,
      // Add other fields here
    });
  
    try {
      const product = await newProduct.save();
      res.json(product);
    } catch (err) {
      res.status(500).json({ msg: 'Server Error' });
    }
});

// @route   PUT api/products/:id
// @desc    Update a product
// @access  Public
router.put('/:id', async (req, res) => {
  try {
      const product = await Product.findById(req.params.id);
      console.log("Received ID:", req.params.id);

      if (!product) {
          return res.status(404).json({ msg: 'Product not found' });
         
      }

      // Update fields
      product.name = req.body.name || product.name;
      product.category = req.body.category || product.category;
      product.price = req.body.price || product.price;
      product.stockQuantity = req.body.stockQuantity || product.stockQuantity;
      product.imageUrl = req.body.imageUrl || product.imageUrl;
      product.onSale = req.body.onSale || product.onSale;
      // Add other fields to update here

      await product.save();

      res.json(product);
  } catch (err) {
    console.error(err.message);  // Log the error message
    res.status(500).json({ msg: 'Server Error' });
    console.log("Received ID:", req.params.id);
  }  
});

// @route   DELETE api/products/:id
// @desc    Delete a product
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    // Delete the product
    await Product.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Product deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

  
module.exports = router;