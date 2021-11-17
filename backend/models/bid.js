const mongoose = require('mongoose');

const bidSchema = mongoose.Schema({
  document: String,
  status: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },  
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'vendors'
  },
  tender:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'tenders'
  },
})

module.exports = mongoose.model('bids', bidSchema);