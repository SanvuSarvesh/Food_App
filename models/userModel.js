const mongoose = require('mongoose')

// User Schema
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is required."]
  },
  email: {
    type: String,
    required: [true, "email is required."],
    unique: true
  },
  password: {
    type: String,
    required: [true, "password is required."]
  },
  firstname: {
    type: String,
    required: [true, "firstname is required."]
  },
  lastname: {
    type: String,
    required: [true, "lastname is required."]
  },
  mobileNo: {
    type: String,
    required: [true]
  },
  address: {
    type: Array
  },
  userType: {
    type: String,
    required: [true, "userType is required."],
    default: "NON_ADMIN",
    enum: ["ADMIN", "CAPTAIN", "NON_ADMIN"]
  }
}, { timestamps: true })

module.exports = mongoose.model('user', userSchema);