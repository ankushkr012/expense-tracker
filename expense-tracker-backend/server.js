const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const expenseRoutes = require('./routes/expenses');

const app = express();

// Connect to MongoDB
connectDB();


// ✅ Secure CORS Setup
const corsOptions = {
  origin: [
    "http://localhost:3000",          // local frontend (dev)
    "https://expensetracker-apps.netlify.app/" // deployed frontend (prod)
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
};
app.use(cors(corsOptions));



// Middleware

app.use(express.json()); // Parses incoming JSON requests


// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);
app.use("/uploads", express.static("uploads"));


// Health Check Route (optional but good for Render)
app.get('/health', (req, res) => {
  res.status(200).json({ message: "Backend running fine 🚀" });
});

// Default Route (Optional)
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server started successfully on port ${PORT}`);
});
