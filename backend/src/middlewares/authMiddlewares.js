const jwt = require('jsonwebtoken');
const { User } = require('../models/users');

exports.verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.header.authorization.split(' ').pop();
        if (!token) return res.status(401).json({ message: 'Token is missing' });

        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        user = await User.findById(id).select('-password');
        
        req.user = user;
        next()
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
}