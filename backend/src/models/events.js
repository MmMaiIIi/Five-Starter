// /backend/src/models/events.js

const mongoose = require('mongoose');

// 定义事件的 Schema
const EventSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true, 
  },
  title: { 
    type: String, 
    required: true, 
  },
  description: { 
    type: String, 
    required: false, 
  },
  dueDate: { 
    type: Date, 
    required: true, 
  },
  priority: { 
    type: Number, 
    required: true, 
    enum: [1, 2, 3], // 可以根据需要调整优先级的数值范围，例如1为最高优先级
  },
  status: { 
    type: String, 
    required: true, 
    enum: ['Pending', 'InProgress', 'Completed'], // 状态可以是待处理、进行中、已完成
    default: 'Pending',
  },
  createdAt: { 
    type: Date, 
    default: Date.now, 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now, 
  },
});

// 在每次保存时自动更新 updatedAt 字段
EventSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// 创建事件模型
const Event = mongoose.model('Event', EventSchema);

module.exports = { Event };
