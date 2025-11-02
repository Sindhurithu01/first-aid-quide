const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ✅ Your backend API routes
app.use('/api/firstaid', require('./routes/firstaidRoutes'));

app.get('/', (req, res) => {
  res.send('✅ First Aid backend is live!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
