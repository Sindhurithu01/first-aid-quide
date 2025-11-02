const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

// ✅ Enable CORS so your Vercel frontend can talk to Render backend
app.use(cors({
  origin: 'https://first-aid-quide.vercel.app', // your Vercel URL
  methods: ['GET', 'POST'],
}));

// ✅ Body parser
app.use(express.json());

// --- API routes ---
const firstAidRoutes = require('./routes/firstAidRoutes');
app.use('/api/first-aid', firstAidRoutes);

// ✅ Simple /login endpoint for testing frontend navigation
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // You can change this logic later to connect to DB or real auth
  if (username === 'admin' && password === '1234') {
    res.json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// --- Serve Angular frontend if you ever host it inside backend ---
app.use(express.static(path.join(__dirname, 'public')));

// This route is optional since frontend is on Vercel
app.get('/', (req, res) => {
  res.send('✅ First Aid backend is live and ready for API calls!');
});

// ✅ No wildcard here (you’re hosting frontend separately)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
