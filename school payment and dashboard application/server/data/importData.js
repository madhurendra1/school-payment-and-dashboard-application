const fs = require('fs');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Transaction = require('../models/Transaction');

dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected for data import'))
  .catch((err) => console.error('MongoDB connection error:', err));

// CSV File Path
const filePath = './data/transactions.csv';

// Import Data
const importData = async () => {
  const transactions = [];
  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => {
      transactions.push(row);
    })
    .on('end', async () => {
      try {
        console.log('transactions get : '+transactions);
        await Transaction.insertMany(transactions);
        console.log('Data imported successfully');
        mongoose.connection.close();
      } catch (err) {
        console.error('Error importing data:', err);
      }
    });
};

importData();
