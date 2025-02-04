const jwt = require('jsonwebtoken');
const { User } = require('../models/users');

exports.verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ message: 'Token is missing' });

        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(id).select('-password');
        res.json({ user: req.user, message: 'Token is valid' });
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
}