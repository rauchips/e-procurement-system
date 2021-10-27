const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const vendorSchema = mongoose.Schema({
  company: String,
  telephone: String,
  address: String,
  DOR: String,
  representative: {
    name: String,
    email: String,
    password: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

vendorSchema.pre('save', async function(next) {
  if(!this.isModified('representative.password')) next()
  this.representative.password = await bcrypt.hash(this.representative.password,12)
  next();
});

module.exports = mongoose.model('vendors', vendorSchema);