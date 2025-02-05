// backend/src/controllers/taskController.js

const { Task } = require('../models/tasks');

exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user._id }).sort({ dueDate: 1 }); // sort by dueDate in ascending order
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
  }
};

exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findById({_id: req.params.id, userId: req.user._id}); 
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addTask = async (req, res) => {
    const {name, description, dueDate, priority, status} = req.body;
    try {
        const newTask = new Task({
            userId: req.user._id,
            title: name,
            description: description,
            dueDate: dueDate,
            priority: priority,
            status: status,
        })
        await newTask.save();
        console.log(newTask);
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateTask = async (req, res) => {
    const {name, description, dueDate, priority, status} = req.body;
    try {
        const task = await Task.findByIdAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            { $set: { title: name, description: description, dueDate: dueDate, priority: priority, status: status } },
            { new: true }
        );
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete({ _id: req.params.id, userId: req.user._id });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



