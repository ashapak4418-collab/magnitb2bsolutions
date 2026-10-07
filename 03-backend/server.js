const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check Route
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
        Head Admin: <strong style="color: #007bff;">Ashapak Atar (7020955003)</strong>
    </p>

    <!-- Section 1: Turnover Commission Calculator -->
    <div style="background: #f8f9fa; padding: 15px; border-radius: 6px; margin-bottom: 20px; border-left: 4px solid #28a745;">
        <h3 style="margin-top: 0; color: #28a745; font-size: 16px;">📊 Stockist/Distributor Commission Calculator (0.8%)</h3>
        <label style="font-size: 14px; color: #333;">Enter Monthly Turnover (₹):</label><br>
        <input type="number" id="turnoverInput" placeholder="e.g. 500000" style="padding: 8px; width: 220px; margin-top: 5px; border: 1px solid #ccc; border-radius: 4px;">
        <button onclick="calculateCommission()" style="padding: 8px 15px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; margin-left: 5px;">Calculate</button>
        <p id="commissionResult" style="margin-top: 10px; font-weight: bold; color: #333;"></p>
    </div>

    <!-- Section 2: Retailer Subscription Registration -->
    <div style="background: #f8f9fa; padding: 15px; border-radius: 6px; margin-bottom: 20px; border-left: 4px solid #007bff;">
        <h3 style="margin-top: 0; color: #007bff; font-size: 16px;">🛒 Retailer Subscription Activation</h3>
        <input type="text" id="retailerName" placeholder="Retailer / Kirana Shop Name" style="padding: 8px; width: 220px; margin-right: 5px; margin-bottom: 8px; border: 1px solid #ccc; border-radius: 4px;"><br>
        <select id="subPlan" style="padding: 8px; width: 234px; margin-bottom: 8px; border: 1px solid #ccc; border-radius: 4px;">
            <option value="199">Monthly Plan - ₹199</option>
            <option value="444">Quarterly Plan - ₹444</option>
            <option value="786">6 Months Plan - ₹786</option>
            <option value="1389">Yearly Plan - ₹1389</option>
        </select><br>
        <button onclick="registerRetailer()" style="padding: 8px 15px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">Activate Subscription</button>
        <p id="subResult" style="margin-top: 10px; font-size: 14px; color: #333;"></p>
    </div>

</div>

<!-- JavaScript Logic -->
<script>
    // 1. Commission Calculation Function (0.8%)
    function calculateCommission() {
        let turnover = document.getElementById('turnoverInput').value;
        if(turnover === "" || turnover <= 0) {
            document.getElementById('commissionResult').innerHTML = "Kripya sahi turnover amount enter karein.";
            return;
        }
        let commission = turnover * 0.008; // 0.8%
        document.getElementById('commissionResult').innerHTML = 
            "Platform Earnings (0.8%): <span style='color: #28a745;'>₹" + commission.toLocaleString('en-IN') + "</span>";
    }

    // 2. Retailer Subscription Registration Function
    function registerRetailer() {
        let name = document.getElementById('retailerName').value;
        let planPrice = document.getElementById('subPlan').value;
        
        if(name.trim() === "") {
            alert("Kripya shop ka naam enter karein.");
            return;
        }

        document.getElementById('subResult').innerHTML = 
            "✅ Success! <strong>" + name + "</strong> ka plan (₹" + planPrice + ") activate ho gaya hai. Managed under Admin: Ashapak Atar (7020955003).";
        
        // Input fields clear karna
        document.getElementById('retailerName').value = "";
    }
</script>// Array to store solar leads temporarily (Database like MongoDB can be attached later)
let solarLeads = [];

// API Endpoint to capture Solar Leads
app.post('/api/solar-lead', (req, res) => {
    const { name, phone, type, district } = req.body;
    
    if (!name || !phone) {
        return res.status(400).json({ success: false, message: 'Name and phone are required.' });
    }

    const newLead = {
        leadId: `#SL-${Math.floor(1000 + Math.random() * 9000)}`,
        name,
        phone,
        type,
        district,
        status: 'Lead Generated - Pending Partner Route',
        timestamp: new Date()
    };

    solarLeads.push(newLead);
    res.json({ success: true, message: 'Solar lead successfully captured!', lead: newLead });
});

// API Endpoint to get all solar leads for admin
app.get('/api/solar-leads', (req, res) => {
    res.json(solarLeads);
});// Array to store registered solar partners/companies
let solarPartners = [];

// API Endpoint to onboard solar companies or distributors
app.post('/api/solar-partner-onboard', (req, res) => {
    const { companyName, ownerName, phone, region } = req.body;
    
    if (!companyName || !phone) {
        return res.status(400).json({ success: false, message: 'Company name and phone are required.' });
    }

    const newPartner = {
        partnerId: `#SP-${Math.floor(1000 + Math.random() * 9000)}`,
        companyName,
        ownerName,
        phone,
        region,
        status: 'Active Partner',
        timestamp: new Date()
    };

    solarPartners.push(newPartner);
    res.json({ success: true, message: 'Solar partner onboarded successfully!', partner: newPartner });
});

// API Endpoint to get all registered solar partners
app.get('/api/solar-partners', (req, res) => {
    res.json(solarPartners);
});const express = require('express');
const app = express();
app.use(express.json());

// In-memory data storage (Aage ise MongoDB ya MySQL se replace kar sakte hain)
let leads = [];
let partners = [];
let ledger = [];

// 1. Lead Submit Endpoint (Solar & FMS)
app.post('/api/submit-lead', (req, res) => {
    const { clientName, phone, serviceType, district, category } = req.body;
    
    const newLead = {
        leadId: `#LD-${Math.floor(1000 + Math.random() * 9000)}`,
        clientName,
        phone,
        serviceType, // Solar Pump, C&I Solar, Housekeeping, Security, etc.
        district,    // Solapur, Dharashiv, Beed, Latur
        category,    // 'Solar' or 'FMS'
        status: 'Pending Assignment',
        assignedPartner: 'Unassigned',
        timestamp: new Date()
    };

    leads.push(newLead);
    res.json({ success: true, message: 'Lead successfully captured!', lead: newLead });
});

// 2. Partner Onboarding Endpoint
app.post('/api/onboard-partner', (req, res) => {
    const { companyName, ownerName, phone, district, vertical } = req.body;

    const newPartner = {
        partnerId: `#PRT-${Math.floor(1000 + Math.random() * 9000)}`,
        companyName,
        ownerName,
        phone,
        district,
        vertical, // 'Solar' or 'FMS'
        status: 'Active',
        timestamp: new Date()
    };

    partners.push(newPartner);
    res.json({ success: true, message: 'Partner successfully registered!', partner: newPartner });
});

// 3. Admin & Partner Dashboard Data API
app.get('/api/admin-dashboard', (req, res) => {
    res.json({
        totalLeads: leads.length,
        totalPartners: partners.length,
        leads: leads,
        partners: partners,
        ledger: ledger
    });
});

// 4. Commission & Payment Ledger Endpoint
app.post('/api/add-ledger', (req, res) => {
    const { leadId, partnerId, dealAmount, commissionAmount } = req.body;

    const entry = {
        txnId: `#TXN-${Math.floor(1000 + Math.random() * 9000)}`,
        leadId,
        partnerId,
        dealAmount,
        commissionAmount,
        paymentStatus: 'Pending Collection',
        timestamp: new Date()
    };

    ledger.push(entry);
    res.json({ success: true, message: 'Commission entry added to ledger!', entry });
});

app.listen(3000, () => {
    console.log('MagnitB2BSolutions Server running on port 3000');
});const express = require('express');
const mongoose = require('mongoose'); // MongoDB for permanent storage
const jwt = require('jsonwebtoken');   // For Security & Role-based Login
const app = express();
app.use(express.json());

// 1. MongoDB Database Connection (Permanent Storage)
mongoose.connect('mongodb://localhost:27017/magnitb2b', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB Database'));

// Database Schemas
const LeadSchema = new mongoose.Schema({
    leadId: String,
    clientName: String,
    phone: String,
    serviceType: String,
    district: String,
    category: String,
    status: { type: String, default: 'Pending Assignment' },
    timestamp: { type: Date, default: Date.now }
});
const Lead = mongoose.model('Lead', LeadSchema);

const PartnerSchema = new mongoose.Schema({
    partnerId: String,
    companyName: String,
    ownerName: String,
    phone: String,
    district: String,
    vertical: String,
    status: { type: String, default: 'Active' },
    timestamp: { type: Date, default: Date.now }
});
const Partner = mongoose.model('Partner', PartnerSchema);

// 2. Lead Submit with WhatsApp Alert Simulation
app.post('/api/submit-lead', async (req, res) => {
    try {
        const { clientName, phone, serviceType, district, category } = req.body;
        
        const newLead = new Lead({
            leadId: `#LD-${Math.floor(1000 + Math.random() * 9000)}`,
            clientName,
            phone,
            serviceType,
            district,
            category
        });

        await newLead.save();

        // Find district partner to send WhatsApp Alert (Simulated API call)
        const matchedPartner = await Partner.findOne({ district: district, vertical: category });
        if(matchedPartner) {
            console.log(`[WhatsApp API] Sending alert to Partner ${matchedPartner.phone}: New lead in ${district} for ${serviceType}`);
        }

        res.json({ success: true, message: 'Lead saved permanently and alert triggered!', lead: newLead });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// 3. Partner Onboarding Endpoint
app.post('/api/onboard-partner', async (req, res) => {
    try {
        const { companyName, ownerName, phone, district, vertical } = req.body;
        const newPartner = new Partner({
            partnerId: `#PRT-${Math.floor(1000 + Math.random() * 9000)}`,
            companyName,
            ownerName,
            phone,
            district,
            vertical
        });

        await newPartner.save();
        res.json({ success: true, message: 'Partner registered successfully!', partner: newPartner });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// 4. Secure Admin Login Endpoint (JWT Authentication)
app.post('/api/admin-login', (req, res) => {
    const { username, password } = req.body;
    // Simple check (In production, use hashed passwords in DB)
    if (username === "admin" && password === "magnit2026") {
        const token = jwt.sign({ role: 'admin' }, 'SECRET_KEY_MAGNIT', { expiresIn: '1h' });
        return res.json({ success: true, token, message: 'Login successful' });
    }
    res.status(401).json({ success: false, message: 'Invalid Admin Credentials' });
});

app.listen(3000, () => {
    console.log('MagnitB2BSolutions Enterprise Server running on port 3000');
});
document.getElementById('onboardingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Form se data lena
    const leadData = {
        name: document.getElementById('partnerName').value,
        category: document.getElementById('partnerCategory').value,
        contact: document.getElementById('partnerContact').value,
        date: new Date().toLocaleString()
    };

    // Purani leads nikalna ya nayi list banana
    let leads = JSON.parse(localStorage.getItem('magnitLeads')) || [];
    leads.push(leadData);
    
    // LocalStorage mein save karna
    localStorage.setItem('magnitLeads', JSON.stringify(leads));

    alert('Lead Successfully Generated & Saved!');
    this.reset();
});
document.getElementById('solarLeadForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Form ki values lena (apne element IDs ke mutabiq check kar lein)
    let name = document.getElementById('solarName').value;
    let phone = document.getElementById('solarPhone').value;
    let requirement = document.getElementById('solarRequirement').value;
    let district = document.getElementById('solarDistrict').value;
    
    // Aapka WhatsApp Number (Ashapak Atar - 7020955003)
    let myWhatsAppNumber = "917020955003"; 
    
    // Message ka format
    let message = `New Solar Lead Received!%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Requirement:* ${requirement}%0A*District:* ${district}`;
    
    // WhatsApp URL open karna
    let whatsappURL = `https://wa.me/${myWhatsAppNumber}?text=${message}`;
    window.open(whatsappURL, '_blank');
});document.getElementById('solarLeadForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Form ki values lena (apne element IDs ke mutabiq check kar lein)
    let name = document.getElementById('solarName').value;
    let phone = document.getElementById('solarPhone').value;
    let requirement = document.getElementById('solarRequirement').value;
    let district = document.getElementById('solarDistrict').value;
    
    // Aapka WhatsApp Number (Ashapak Atar - 7020955003)
    let myWhatsAppNumber = "917020955003"; 
    
    // Message ka format
    let message = `New Solar Lead Received!%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Requirement:* ${requirement}%0A*District:* ${district}`;
    
    // WhatsApp URL open karna
    let whatsappURL = `https://wa.me/${myWhatsAppNumber}?text=${message}`;
    window.open(whatsappURL, '_blank');
});
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Leads store karne ke liye ek array (Database ki jagah temporary collection)
let leadsCollection = [];

// Form data receive karne ka API endpoint
app.post('/api/leads', (req, res) => {
    const leadData = req.body;
    leadsCollection.push(leadData);
    console.log("New Lead Saved:", leadData);
    res.status(200).json({ success: true, message: "Lead saved successfully!" });
});

// Saari leads ek sath dekhne ka API endpoint (Collection)
app.get('/api/leads', (req, res) => {
    res.json(leadsCollection);
});

// Server kis port par chal raha hai
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});