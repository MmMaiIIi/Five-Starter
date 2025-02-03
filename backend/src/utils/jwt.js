const jwt = require('jsonwebtoken');
require('dotenv').config();

function generateToken(user) {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
}
  
module.exports = { generateToken };