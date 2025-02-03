// /backend/src/models/users.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Userschema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String },
  googleId: { type: String, unique: true, sparse: true }, // sparse: true means that the field is not require
})

Userschema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();    
  }
  user.password = await bcrypt.hash(user.password, 10);
});             

Userschema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', Userschema); 

module.exports = { User };