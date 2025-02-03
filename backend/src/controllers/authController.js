const { User } = require('../models/users');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwt');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.register = async (req, res) => {
    const { username, password } = req.body;
    
    console.log(username, password);

    const user = await User.findOne({ username: username });
    if (user) {
        return res.status(400).json({ error: 'Username already exists' });
    }

    const newUser = new User({ username, password });
    await newUser.save();

    const token = generateToken(newUser);
    res.status(201).json({ newUser, token });
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if(!user || !(await user.comparePassword(password))) {
        return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user);
    res.status(200).json({ token });
};