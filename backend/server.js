const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// load env variables first
dotenv.config();

// import routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');

const app = express();

// connect to mongodb
connectDB();

// middleware setup
app.use(cors()); // allow cross origin requests from frontend
app.use(express.json()); // parse json request body

// api routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

// basic route to test server is running
app.get('/', (req, res) => {
    res.json({ message: 'Naksh Jewels API is running!' });
});

// error handling middleware - catches all unhandled errors
app.use((err, req, res, next) => {
    console.error('Server error:', err.stack);
    res.status(500).json({ 
        message: 'Something went wrong on server!',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// 404 handler for routes that dont exist
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
