const express = require('express');
const router = express.Router();
const Order = require('../../models/Order');

// @route   GET api/orders
// @desc    Get all orders
// @access  Public
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find().populate('user').populate('items.product');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ msg: 'Server Error' });
    }
});

// @route   POST api/orders
// @desc    Create a new order
// @access  Public
router.post('/', async (req, res) => {
    const newOrder = new Order({
        user: req.body.user,
        items: req.body.items,
        status: req.body.status,
        paymentMethod: req.body.paymentMethod
    });

    try {
        const order = await newOrder.save();
        res.json(order);
    } catch (err) {
        res.status(500).json({ msg: 'Server Error' });
    }
});

// @route   PUT api/orders/:id
// @desc    Update an order
// @access  Public
router.put('/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ msg: 'Order not found' });
        }

        // Update fields
        order.user = req.body.user || order.user;
        order.items = req.body.items || order.items;
        order.status = req.body.status || order.status;
        order.paymentMethod = req.body.paymentMethod || order.paymentMethod;

        await order.save();

        res.json(order);
    } catch (err) {
        res.status(500).json({ msg: 'Server Error' });
    }
});

// @route   DELETE api/orders/:id
// @desc    Delete an order
// @access  Public
router.delete('/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ msg: 'Order not found' });
        }

        await Order.findByIdAndRemove(req.params.id);

        res.json({ msg: 'Order deleted' });
    } catch (err) {
        console.error(err.message);  // Log the error message
        res.status(500).json({ msg: 'Server Error' });
        console.log("Received ID:", req.params.id);
    }
});


module.exports = router;