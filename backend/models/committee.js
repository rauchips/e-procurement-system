const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const committeeSchema = mongoose.Schema( {
  name: String,
  telephone: String,
  email: String,
  password: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
})

committeeSchema.pre('save', async function(next) {
  if(!this.isModified('password')) next()
  this.password = await bcrypt.hash(this.password,12)
  next();
});

module.exports = mongoose.model('committee', committeeSchema);