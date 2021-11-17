const mongoose = require('mongoose');

const bidSchema = mongoose.Schema({
  document: String,
  status: {
    type: Boolean,
    default: false
  },
  tender:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'tenders'
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