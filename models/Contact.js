const mongoose = require('mongoose');

// Create schema
const contactSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: true
  },
  firstName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
    trim: true,
    validate: {
      validator: function (value) {
        return /^[a-zA-Z]+$/.test(value);
      },
      message: "First name must contain alphabetic characters"
    }
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
    trim: true,
    validate: {
      validator: function (value) {
        return /^[a-zA-Z]+$/.test(value);
      },
      message: "Last name must contain alphabetic characters"
    }
  },
  email: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function (value) {
        return /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value);
      },
      message: "Email is not valid"
    }
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^[0-9]{10}$/.test(value);
      },
      message: "Phone number must be 10 digits"
    }
  },
  age: {
    type: Number,
    required: true,
    min: 1,
    max: 120
  },
  grade: {
    type: String,
    required: true,
    trim: true
  }
});

// Export the schema
module.exports = mongoose.model('Contact', contactSchema);
