const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root Route (Render Health Check)
app.get('/', (req, res) => {
    res.status(200).send('🚀 MagnitB2B Backend Server is Running!');
});

// Sample API Route
app.post('/api/lead', (req, res) => {
    console.log('Received data:', req.body);
    res.status(200).json({ success: true, message: 'Data received successfully!' });
});

// Dynamic Port Binding for Render
const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get('/', (req, res) => {
    res.status(200).send('🚀 MagnitB2B Backend Server is Running!');
});

// Sample API Route
app.post('/api/lead', (req, res) => {
    console.log('Received data:', req.body);
    res.status(200).json({ success: true, message: 'Data received successfully!' });
});

// Dynamic Port Binding for Render
const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();

// 1. Security Middleware
app.use(helmet());

// 2. CORS Configuration (Allowed origins update karein)
const allowedOrigins = [
    'https://ashapak4418-collab.github.io', // Aapka frontend domain
    'http://localhost:3000',
    'http://127.0.0.1:5500'
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('CORS policy breach: Access denied.'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// 3. Rate Limiter (Max 100 requests per 15 minutes per IP)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100,
    message: { success: false, message: 'Too many requests, please try again later.' }
});
app.use('/api/', limiter);

// 4. Body Parsers
app.use(express.json({ limit: '10kb' })); 
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// 5. Health Check Endpoint
app.get('/', (req, res) => {
    res.status(200).json({ 
        status: 'online', 
        service: 'MagnitB2B Backend API',
        timestamp: new Date()
    });
});

// 6. Sample API Routes
app.post('/api/lead', (req, res) => {
    try {
        const data = req.body;
        console.log('Production Lead Data Received:', data);
        
        res.status(200).json({ 
            success: true, 
            message: 'Lead received successfully!' 
        });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// 7. Global 404 Handler
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Route not found' });
});

// 8. Server Dynamic Binding
const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Production Server listening on port ${PORT}`);
});