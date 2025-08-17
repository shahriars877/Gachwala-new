const mongoose = require('mongoose');

// The Fix: Use a consistent variable name (PascalCase is convention for schemas)
const UserSchema = new mongoose.Schema({
  // I've added the 'name' field to match your registration form
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    enum: ['user', 'admin'], 
    default: 'user' 
  }
}, { timestamps: true }); // It's good practice to add timestamps

// Now this line will work because 'UserSchema' is correctly defined above
module.exports = mongoose.model('User', UserSchema);