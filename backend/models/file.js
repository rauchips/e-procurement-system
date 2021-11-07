const mongoose = require('mongoose');

const fileSchema = mongoose.Schema({
  filename: {
    type: String,
    required: true
  },
  createdAt:{
    type: Date,
    default: Date.now
  },
  entity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'entities'
  },
})

module.exports = mongoose.model('files', fileSchema);