express = require('express');
const {
    getAllEvents,
    getEventById,
    addEvent,
    updateEvent,
    deleteEvent,
    getUpcomingEvents,
  } = require('../controllers/eventController');

const router = express.Router();

// 获取所有事件（仅限认证用户）
router.get('/events', getAllEvents);

// 获取单个事件（通过事件ID）
router.get('/events/:id', getEventById);

// 创建新事件
router.post('/events', addEvent);

// 更新事件（通过事件ID）
router.put('/events/:id', updateEvent);

// 删除事件（通过事件ID）
router.delete('/events/:id', deleteEvent);

// 获取即将到来的事件
router.get('/events/upcoming', getUpcomingEvents);

module.exports = router;