const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors'); // Add this line
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const storeRoutes = require('./routes/storeRoutes');
const db = require('./models');
const config = require('./config');

dotenv.config(); // Ensure this is called before using any environment variables

const app = express();
app.use(express.json());
app.use(cors({ origin: config.corsOrigin })); // Add this line

// Database initialization
async function initializeDatabase() {
  if (config.dbChoice === 'mongo') {
    await mongoose.connect(config.dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');
  } else if (config.dbChoice === 'sqlite') {
    await db.sequelize.sync({ force: true });
    console.log('SQLite tables created');
  } else {
    throw new Error('Invalid database choice');
  }
}

// Routes
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/stores', storeRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to initialize database:', err);
  process.exit(1);
});

module.exports = app;
