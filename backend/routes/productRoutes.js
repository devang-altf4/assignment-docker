const express = require('express');

const router = express.Router();

// @route   GET /api/products
// @desc    Get all products from dummyjson api
// @access  Public
router.get('/', async (req, res) => {
    try {
        // fetch products from dummyjson - they have nice product images
        const response = await fetch('https://dummyjson.com/products?limit=20');
        
        if (!response.ok) {
            throw new Error('Failed to fetch from dummyjson');
        }

        const data = await response.json();
        
        // return products array
        res.json({
            success: true,
            count: data.products.length,
            products: data.products
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ 
            success: false,
            message: 'Error fetching products from external api' 
        });
    }
});

// @route   GET /api/products/:id
// @desc    Get single product by id
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        
        if (!response.ok) {
            return res.status(404).json({ 
                success: false,
                message: 'Product not found' 
            });
        }

        const product = await response.json();
        
        res.json({
            success: true,
            product
        });
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ 
            success: false,
            message: 'Error fetching product' 
        });
    }
});

module.exports = router;
