const mongoose = require('mongoose');

const bidSchema = mongoose.Schema({
  filename: String,
  status: {
    type: Boolean,
    default: false
  },
  vendor:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'vendors'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('bids', bidSchema);