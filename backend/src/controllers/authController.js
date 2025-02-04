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

        res.cookie('token', token, { 
            httpOnly: true,
            sameSite: 'Strict',
            maxAge: 60 * 60 * 24 * 7 // 7 days
        });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }   
};

// login with cookie to keep token in client side
exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username: username });
        console.log(user);
        if(!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = generateToken(user);

        res.cookie('token', token, { 
            httpOnly: true,
            sameSite: 'Strict',
            maxAge: 60 * 60 * 24 * 7 // 7 days
        });

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// logout with cookie to remove token in client side
exports.logout = (req, res) => {
    res.clearCookie('token', {httpOnly: true});
    res.status(200).json({ message: 'Logout successful' });
};