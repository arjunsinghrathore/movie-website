const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.USER_SERVICE_PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from the frontend
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
}));

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  res.on('finish', () => {
    console.log(`${res.statusCode} ${res.statusMessage}`);
  });
  next();
});

// MongoDB connection
const mongoUrl = process.env.MONGO_URL;
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch((error) => {
  console.error('Error connecting to MongoDB Atlas:', error);
});

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
});

const User = mongoose.model('User', userSchema);

// API endpoint for user registration
app.post('/api/register', async (req, res) => {
  console.log('Register endpoint hit');
  const { username, email, password } = req.body;

  try {
    // Check if username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      if (existingUser.username === username) {
        return res.status(400).send('Username already exists');
      } else if (existingUser.email === email) {
        return res.status(400).send('Email already exists');
      }
    }

    const newUser = new User({ username, email, password });
    await newUser.save();
    console.log('User registered successfully');
    res.status(201).send('User registered successfully!');
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Error registering user');
  }
});

// API endpoint for user login
app.post('/api/login', async (req, res) => {
  console.log('Login endpoint hit');
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send('Email does not exist');
    }
    if (user.password !== password) {
      return res.status(400).send('Incorrect password');
    }
    console.log('User logged in successfully');
    res.status(200).send('Login successful');
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).send('Error logging in user');
  }
});

app.listen(port, () => {
  console.log(`User service listening at http://localhost:${port}`);
});
