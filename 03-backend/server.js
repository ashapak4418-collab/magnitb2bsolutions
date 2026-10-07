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