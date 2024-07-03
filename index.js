// index.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const contactRouter = require('./routes/contact'); // Ensure correct path

// Create an instance of express
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use routes
app.use('/api', contactRouter); // Use contactRouter, not just contact

// Connection to MongoDB using mongoose
const connectToDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/mydatabase', {
      
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Could not connect to MongoDB...', error);
    process.exit(1);
  }
};

connectToDB();

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started successfully on port ${port}`);
});
