const express = require('express');
const Cart = require('../models/Cart');
const auth = require('../middleware/auth');
const { validateCartItem } = require('../middleware/validation');

const router = express.Router();

// @route   GET /api/cart
// @desc    Get user's cart items
// @access  Private (needs auth token)
router.get('/', auth, async (req, res) => {
    try {
        const cartItems = await Cart.find({ userId: req.userId });
        
        // calculate total price
        const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        res.json({
            success: true,
            count: cartItems.length,
            total: parseFloat(total.toFixed(2)),
            items: cartItems
        });
    } catch (error) {
        console.error('Error getting cart:', error);
        res.status(500).json({ message: 'Error fetching cart items' });
    }
});

// @route   POST /api/cart
// @desc    Add item to cart or update quantity if exists
// @access  Private
router.post('/', auth, validateCartItem, async (req, res) => {
    try {
        const { productId, title, price, image, quantity = 1 } = req.body;

        // check if item already in cart
        let cartItem = await Cart.findOne({ 
            userId: req.userId, 
            productId 
        });

        if (cartItem) {
            // item exists, update quantity
            cartItem.quantity += quantity;
            await cartItem.save();
            
            res.json({
                success: true,
                message: 'Cart item quantity updated',
                item: cartItem
            });
        } else {
            // create new cart item
            cartItem = new Cart({
                userId: req.userId,
                productId,
                title,
                price,
                image,
                quantity
            });

            await cartItem.save();
            
            res.status(201).json({
                success: true,
                message: 'Item added to cart',
                item: cartItem
            });
        }
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ message: 'Error adding item to cart' });
    }
});

// @route   PUT /api/cart/:id
// @desc    Update cart item quantity
// @access  Private
router.put('/:id', auth, async (req, res) => {
    try {
        const { quantity } = req.body;

        if (!quantity || quantity < 1) {
            return res.status(400).json({ message: 'Quantity must be atleast 1' });
        }

        const cartItem = await Cart.findOne({ 
            _id: req.params.id, 
            userId: req.userId 
        });

        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        cartItem.quantity = quantity;
        await cartItem.save();

        res.json({
            success: true,
            message: 'Cart item updated',
            item: cartItem
        });
    } catch (error) {
        console.error('Error updating cart:', error);
        res.status(500).json({ message: 'Error updating cart item' });
    }
});

// @route   DELETE /api/cart/:id
// @desc    Remove item from cart
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const cartItem = await Cart.findOneAndDelete({ 
            _id: req.params.id, 
            userId: req.userId 
        });

        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        res.json({
            success: true,
            message: 'Item removed from cart'
        });
    } catch (error) {
        console.error('Error removing from cart:', error);
        res.status(500).json({ message: 'Error removing item from cart' });
    }
});

module.exports = router;
