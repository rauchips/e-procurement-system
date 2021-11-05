const mongoose = require('mongoose');

const tenderSchema = mongoose.Schema({
  title: String,
  category: String,
  description: String,
  status: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },  
  closingAt: String,
  rep: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'entities'
  },
  committee:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'committee'
  }],
})

module.exports = mongoose.model('tenders', tenderSchema);