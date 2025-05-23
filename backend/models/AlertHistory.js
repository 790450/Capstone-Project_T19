import mongoose from 'mongoose';

const alertHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
}, { timestamps: true }); // Includes createdAt and updatedAt

const AlertHistory = mongoose.model('AlertHistory', alertHistorySchema);

export default AlertHistory;