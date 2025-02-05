// /backend/src/models/tasks.js

const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
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
    enum: [1, 2, 3], // 3为最高优先级
    validate: {
      validator: function(value) {
        return [1, 2, 3].includes(value);  // 验证 priority 是否是 1, 2, 3
      },
      message: 'Priority must be 1, 2, or 3',
    },
  },
  status: { 
    type: String, 
    required: true, 
    enum: ['Pending', 'InProgress', 'Completed'], // 状态可以是待处理、进行中、已完成
    default: 'Pending',
    validate: {
      validator: function(value) {
        return ['Pending', 'InProgress', 'Completed'].includes(value);  // 验证 status 是否是有效的状态
      },
      message: 'Status must be "Pending", "InProgress", or "Completed"',
    },
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
TaskSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// 创建任务模型
const Task = mongoose.model('Task', TaskSchema);

module.exports = { Task };
