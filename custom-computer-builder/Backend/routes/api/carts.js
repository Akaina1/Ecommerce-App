const express = require('express');
const router = express.Router();
const Cart = require('../../models/Cart');

// @route   GET api/carts/:userId
// @desc    Get cart for a specific user
// @access  Private 
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const cart = await Cart.findOne({ user: userId }).populate('items.product');
        if (!cart) {
            return res.status(404).json({ msg: 'Cart not found' });
        }
        res.json(cart);
    } catch (err) {
        res.status(500).json({ msg: 'Server Error' });
    }
});

// @route   POST api/carts
// @desc    Create a new cart
// @access  Public
router.post('/', async (req, res) => {
    const newCart = new Cart({
        user: req.body.user,
        items: req.body.items
    });

    try {
        const cart = await newCart.save();
        res.json(cart);
    } catch (err) {
        res.status(500).json({ msg: 'Server Error' });
    }
});

// @route   POST api/carts/:userId/add
// @desc    Add an item to an existing cart
// @access  Private (You may want to change this to private depending on your authentication setup)
router.post('/:userId/add', async (req, res) => {
    const { userId } = req.params;
    const { productId, quantity } = req.body;
  
    // Debug Logs
    console.log("UserID:", userId);
    console.log("ProductID:", productId);
    console.log("Quantity:", quantity);
  
    if (!userId || !productId || !quantity) {
      return res.status(400).json({ msg: 'Missing required fields' });
    }
  
    try {
      // Find the user's cart
      const cart = await Cart.findOne({ user: userId });
  
      // Debug Log
      console.log("User's Cart:", cart);
  
      if (!cart) {
        return res.status(404).json({ msg: 'Cart not found' });
      }
  
      // Check if the product already exists in the cart
      const productExists = cart.items.some(item => item.product.toString() === productId.toString());
  
      if (productExists) {
        // Update the quantity of the existing product
        cart.items = cart.items.map(item =>
          item.product.toString() === productId.toString()
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new product to the cart
        cart.items.push({ product: productId, quantity });
      }
  
      // Debug Log
      console.log("Updated Cart:", cart);
  
      // Save changes to the cart
      await cart.save();
  
      res.status(200).json({ message: 'Cart updated successfully', cart });
    } catch (err) {
      // Debug Logs
      console.error("Error:", err);
      res.status(500).json({ msg: 'Server Error' });
    }
  });
  


// @route   PUT api/carts/:id
// @desc    Update a cart
// @access  Public
router.put('/:id', async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.id);

        if (!cart) {
            return res.status(404).json({ msg: 'Cart not found' });
        }

        // Update fields
        cart.items = req.body.items || cart.items;
        // Add other fields to update here

        await cart.save();

        res.json(cart);
    } catch (err) {
        res.status(500).json({ msg: 'Server Error' });
    }
});

// @route   DELETE api/carts/:id
// @desc    Delete a cart
// @access  Public
router.delete('/:id', async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.id);

        if (!cart) {
            return res.status(404).json({ msg: 'Cart not found' });
        }

        await Cart.findByIdAndRemove(req.params.id);

        res.json({ msg: 'Cart deleted' });
    } catch (err) {
        res.status(500).json({ msg: 'Server Error' });
    }
});

module.exports = router;