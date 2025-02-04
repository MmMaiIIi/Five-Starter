const { User } = require('../models/users');
const { generateToken } = require('../utils/jwt');

exports.register = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username: username });
        if (user) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        const newUser = new User({ username, password });
        await newUser.save();

        const token = generateToken(newUser);
        res.status(201).json({ newUser, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }   
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username: username });
        if(!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = generateToken(user);
        res.status(200).json({ token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.logout = (req, res) => {
    // TODO: Implement logout functionality
    res.status(200).json({ message: 'Logout successful' });
};