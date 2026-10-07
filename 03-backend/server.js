require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();

// 1. Security Headers
app.use(helmet());

// 2. CORS Configuration
const allowedOrigins = [
    'https://ashapak4418-collab.github.io',
    'http://localhost:3000',
    'http://127.0.0.1:5500'
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('CORS Policy Restriction: Access Denied'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// 3. Rate Limiting (100 requests / 15 minutes)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100,
    message: { success: false, message: 'Too many requests, please try again later.' }
});
app.use('/api/', limiter);

// 4. Body Parsers
app.use(express.json({ limit: '10kb' })); 
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// 5. Health Check Route
app.get('/', (req, res) => {
    res.status(200).json({ 
        status: 'online', 
        service: 'MagnitB2B Production API',
        timestamp: new Date()
    });
});

// 6. Lead Submission API Route
app.post('/api/lead', (req, res) => {
    try {
        const data = req.body;
        console.log('Production Lead Received:', data);
        res.status(200).json({ success: true, message: 'Data received successfully!' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// 7. Global 404 Route
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Endpoint not found' });
});

// 8. Dynamic Port Binding
const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Production Server running on port ${PORT}`);
});