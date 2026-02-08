const jwt = require('jsonwebtoken');

// middleware to check if user is authenticated
// checks for Bearer token in Authorization header
const auth = async (req, res, next) => {
    try {
        // get token from header
        const authHeader = req.header('Authorization');
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }

        // extract token (remove 'Bearer ' part)
        const token = authHeader.replace('Bearer ', '');

        // verify token using secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // add user id to request object so routes can use it
        req.userId = decoded.userId;
        next();
    } catch (error) {
        // token is invalid or expired
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = auth;
