const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS

// MongoDB connection
const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/cineconnect';
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

// API endpoint for user registration
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;
  const newUser = new User({ username, email, password });
  try {
    await newUser.save();
    res.status(201).send('User registered successfully!');
  } catch (error) {
    res.status(500).send('Error registering user');
  }
});

app.listen(port, () => {
  console.log(`User service listening at http://localhost:${port}`);
});
