const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 🔧 Corrected route file
const firstAidRoutes = require('./routes/firstAidRoutes');  // ✅ FIXED
app.use('/api/firstaid', firstAidRoutes);

mongoose.connect('mongodb://localhost:27017/firstaid', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));
const path = require('path');

// Serve static files from the Angular app
app.use(express.static(path.join(__dirname, 'public')));

// Handle all other routes and return Angular's index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
app.get('/', (req, res) => {
  res.send('First Aid Guide Backend is Running!');
});
