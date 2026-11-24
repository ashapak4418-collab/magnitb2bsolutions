require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 5000;

// 1. Security Headers
app.use(helmet());

// 2. CORS Configuration
const allowedOrigins = [
  'https://magnitb2bsolutions-01-website-udiw.vercel.app',
  'https://ashapak4418-collab.github.io',
  'http://localhost:3000',
  'http://localhost:5173',
  'http://127.0.0.1:5500'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('CORS Policy Restriction: Access Denied'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// 3. Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, message: 'Too many requests, please try again later.' }
});
app.use('/api/', limiter);

// 4. Body Parser
app.use(express.json());

// 5. MongoDB Connection
if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Atlas connected'))
    .catch((err) => console.error('MongoDB connection error:', err.message));
} else {
  console.warn('MONGO_URI not set in environment variables');
}

// 6. Health Check Route
app.get('/', (req, res) => {
  res.json({ success: true, message: 'MagnitB2BSolutions Backend API is running' });
});

// 7. Generic Lead / Form Submission Route
const leadSchema = new mongoose.Schema({
  formType: { type: String, default: 'general' },
  payload: { type: mongoose.Schema.Types.Mixed, required: true },
  createdAt: { type: Date, default: Date.now }
});
const Lead = mongoose.models.Lead || mongoose.model('Lead', leadSchema);

app.post('/api/leads', async (req, res) => {
  try {
    const saved = await Lead.create({
      formType: req.body.formType || 'website-form',
      payload: req.body
    });
    res.status(201).json({ success: true, message: 'Submitted successfully', id: saved._id });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to save data', error: err.message });
  }
});

// 8. 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// 9. Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ success: false, message: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});