const mongoose = require('mongoose');

const evaluationSchema = mongoose.Schema({
  category: String,
  verdict: String,
  status: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },  
  closingAt: String,
  tender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'tenders'
  },
  vendor:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'vendors',
    default: null
  },
})

module.exports = mongoose.model('evaluations', evaluationSchema);