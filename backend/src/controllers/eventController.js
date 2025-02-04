// backend/src/controllers/eventController.js

const Event = require('../models/events');
const { verifyToken } = require('../middlewares/userMiddlewares');

exports.getALLEvents = async (req, res) => {
    const tokenValid = await verifyToken(req, res);
    if (!tokenValid) return;

    try {
        const events = await Event.find({ userId: req.user._id }).sort({ dueDate: 1 });
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
  }
};

exports.addEvent = async (req, res) => {
    const {name, description, dueDate, priority, status} = req.body;
    try {
        const newEvent = new Event({
            userId: req.user._id,
            title: name,
            description: description,
            dueDate: dueDate,
            priority: priority,
            status: status,
        })
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};