const mongoose = require('mongoose');

const progressLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['task', 'habit'], required: true },
  referenceId: { type: mongoose.Schema.Types.ObjectId, required: true }, // taskId or habitId
  date: { type: Date, required: true },
  status: { type: String, enum: ['completed', 'missed'], required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ProgressLog', progressLogSchema);
