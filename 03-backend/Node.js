const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// In-memory database (Aap ise baad me MongoDB ya Firebase se connect kar sakte hain)
let partners = [];
let orders = [];

// 1. Partner Onboarding API Endpoint
app.post('/api/onboard', (req, res) => {
    const { name, phone, role, district } = req.body;
    if (!name || !phone) {
        return res.status(400).json({ success: false, message: 'Name and phone are required.' });
    }
    
    const newPartner = { id: Date.now(), name, phone, role, district };
    partners.push(newPartner);
    res.json({ success: true, message: 'Partner successfully registered!', partner: newPartner });
});

// Get all partners
app.get('/api/partners', (req, res) => {
    res.json(partners);
});

// 2. Order Placement & Tracking API Endpoint
app.post('/api/order', (req, res) => {
    const { chainLevel, district, itemDesc } = req.body;
    if (!itemDesc) {
        return res.status(400).json({ success: false, message: 'Item description is required.' });
    }

    const newOrder = {
        orderId: `#BH-${Math.floor(100 + Math.random() * 900)}`,
        chainLevel,
        district,
        itemDesc,
        status: 'Self-Dispatched by Partner',
        timestamp: new Date()
    };

    orders.push(newOrder);
    res.json({ success: true, message: 'Order placed successfully!', order: newOrder });
});

// Get all orders
app.get('/api/orders', (req, res) => {
    res.json(orders);
});

// Start Server on Port 3000
const PORT = process.mainModule ? 3000 : 3000;
app.listen(PORT, () => {
    console.log(`MagnitB2BSolutions Barshi Hub Server running on port ${PORT}`);
});