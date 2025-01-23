const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const storeRoutes = require('./routes/storeRoutes');

dotenv.config(); // Ensure this is called before using any environment variables

const app = express();
app.use(express.json());

// Database connection
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Database connected'))
.catch((error) => {
  console.error('Database connection error:', error);
  process.exit(1); // Exit the process if the database connection fails
});

// Routes
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/stores', storeRoutes);

// ...existing code...

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
