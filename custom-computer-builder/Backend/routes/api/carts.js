const express = require('express');
const router = express.Router();
const Cart = require('../../models/Cart');

// @route   GET api/carts
// @desc    Get all carts
// @access  Public
router.get('/', async (req, res) => {
    try {
        const carts = await Cart.find().populate('user').populate('items.product');
        res.json(carts);
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