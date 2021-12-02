const mongoose = require('mongoose');

const fileSchema = mongoose.Schema({
  filename: String,
  createdAt:{
    type: Date,
    default: Date.now
  },
  tender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'tenders'
  },
})

module.exports = mongoose.model('files', fileSchema);