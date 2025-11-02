const express = require('express');
const path = require('path');
const app = express();

// Body parser
app.use(express.json());

// --- API routes ---
const firstAidRoutes = require('./routes/firstAidRoutes');
app.use('/api/first-aid', firstAidRoutes);

// --- Serve Angular frontend ---
app.use(express.static(path.join(__dirname, 'public','browser')));

// ✅ Fix: use "*" instead of /.*/
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public','browser', 'index.html'));
});
app.get('/', (req, res) => {
  res.send('✅ First Aid backend is live!');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
