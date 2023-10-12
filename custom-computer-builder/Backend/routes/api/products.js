const express = require('express');
const router = express.Router();
const Product = require('../../models/Product');

// Validate productTags to be a comma-separated list
const isValidProductTags = (tags) => {
  return typeof tags === 'string' && /^[a-zA-Z0-9,]+$/.test(tags);
};

// @route   GET api/products
// @desc    Get all products with optional search, sort, and filter
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { search, sort, category, productTags, page = 1, limit = 15 } = req.query;

    let query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { productTags: { $in: [new RegExp(search, 'i')] } }
      ];
    }
    if (category) {
      query.category = category;
    }
    if (productTags) {
      if (isValidProductTags(productTags)) {
        query.productTags = { $all: productTags.split(',') };
      } else {
        return res.status(400).json({ msg: 'Invalid productTags format' });
      }
    }

    let sortObj = {};
    if (sort) {
      const [field, order] = sort.split('_');
      sortObj[field] = order === 'asc' ? 1 : -1;
    }

    const products = await Product.find(query)
      .sort(sortObj)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});


// @route   POST api/products
// @desc    Create new products (supports bulk insert)
// @access  Public
router.post('/', async (req, res) => {
  // Check if the request body is an array
  if (Array.isArray(req.body)) {
    try {
      // Bulk insert using Model.insertMany()
      const products = await Product.insertMany(req.body);
      res.json(products);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server Error' });
    }
  } else {
    // Existing logic for inserting a single product
    const newProduct = new Product({
      name: req.body.name,
      category: req.body.category,
      productTags: req.body.productTags,  
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
      console.error(err.message);  // Log the error message
      res.status(500).json({ msg: 'Server Error' });
    }
  }
});

// @route   GET api/products/onsale
// @desc    Get all products that are on sale
// @access  Public
router.get('/onsale', async (req, res) => {
  try {
    // Fetch products where 'onSale' is true
    const products = await Product.find({ onSale: true });
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
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
      product.subCategory = req.body.subCategory || product.subCategory;
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