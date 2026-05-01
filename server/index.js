const express = require('express');
const cors = require('cors');
require('dotenv').config();
const authController = require('./controllers/authController');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.post('/api/login', authController.login);

// Health Check
app.get('/', (req, res) => {
    res.send('Hybrid Backend API is running...');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
