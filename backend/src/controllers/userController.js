const { User } = require('../models/users');
const { Task } = require('../models/tasks');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getRecommendations = async (req, res) => {
    try {
        const tasks = await Task.find({
            userId: req.user._id,
            status: 'Pending',
            dueDate: { $lte: new Date() },
        })
        .sort({ dueDate: 1 }) // sort by dueDate in ascending order
        .sort({ priority: -1 }) // sort by priority in descending order
        .limit(5); // at most 5 tasks

         res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
