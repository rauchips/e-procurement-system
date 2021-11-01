const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const committeeSchema = mongoose.Schema( {
  name: String,
  telephone: String,
  email: String,
  password: String,
  selected: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  tender: {
    type:mongoose.Schema.Types.ObjectId,
    default: null,
    ref: 'tenders'
  }
})

committeeSchema.pre('save', async function(next) {
  if(!this.isModified('password')) next()
  this.password = await bcrypt.hash(this.password,12)
  next();
});

module.exports = mongoose.model('committee', committeeSchema);