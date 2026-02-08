// validation middleware for request body
// checks if required feilds are present

// validate cart item request body
const validateCartItem = (req, res, next) => {
    const { productId, title, price, image, quantity } = req.body;

    // check required fields
    if (!productId) {
        return res.status(400).json({ message: 'productId is required' });
    }
    if (!title) {
        return res.status(400).json({ message: 'title is required' });
    }
    if (!price || typeof price !== 'number') {
        return res.status(400).json({ message: 'price is required and must be a number' });
    }
    if (!image) {
        return res.status(400).json({ message: 'image is required' });
    }
    if (quantity && (typeof quantity !== 'number' || quantity < 1)) {
        return res.status(400).json({ message: 'quantity must be a positive number' });
    }

    next();
};

// validate user registration
const validateRegister = (req, res, next) => {
    const { email, password, name } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'email is required' });
    }
    // basic email check - just checking for @ symbol
    if (!email.includes('@')) {
        return res.status(400).json({ message: 'please enter a valid email' });
    }
    if (!password || password.length < 6) {
        return res.status(400).json({ message: 'password must be atleast 6 characters' });
    }
    if (!name) {
        return res.status(400).json({ message: 'name is required' });
    }

    next();
};

// validate login
const validateLogin = (req, res, next) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'email is required' });
    }
    if (!password) {
        return res.status(400).json({ message: 'password is required' });
    }

    next();
};

module.exports = {
    validateCartItem,
    validateRegister,
    validateLogin
};
