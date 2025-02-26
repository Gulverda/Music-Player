const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./db');
const songRoutes = require('./routes/songRoutes/songRoutes');
const artistRoutes = require('./routes/artistRoutes/artistRoutes');
const albumRoutes = require('./routes/albumRoutes/albumRoutes');
const path = require('path');


dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// Use the imported routes
app.use('/api/songs', songRoutes);
app.use('/api/artists', artistRoutes);
app.use('/api/albums', albumRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
