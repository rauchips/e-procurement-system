const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const govEntitySchema = mongoose.Schema({
  entity: String,
  telephone: String,
  county: String,
  address: String,
  website: String,
  representative: {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

govEntitySchema.pre('save', async function(next) {
  if(!this.isModified('representative.password')) next()
  this.representative.password = await bcrypt.hash(this.representative.password,12)
  next();
});

module.exports = mongoose.model('entities', govEntitySchema);