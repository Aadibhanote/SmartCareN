const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/smartcare';

  if (!process.env.MONGODB_URI && process.env.NODE_ENV === 'production') {
    console.error('FATAL: MONGODB_URI environment variable is missing in production.');
    process.exit(1);
  }

  // Safety check: Validate URI format without exposing credentials in logs
  if (uri.startsWith('mongodb+srv://') && !uri.includes('@')) {
    console.error('ERROR: MONGODB_URI format is invalid. Check username/password formatting.');
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host} (DB: ${conn.connection.name})`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    if (error.message.includes('querySrv ENOTFOUND')) {
      console.error('DIAGNOSTIC: DNS resolution failed for MongoDB Atlas SRV record. Verify your cluster hostname in MONGODB_URI.');
    } else if (error.message.includes('bad auth') || error.message.includes('authentication failed')) {
      console.error('DIAGNOSTIC: Authentication failed. Verify Atlas username and password (ensure special characters like @ in password are URL-encoded as %40).');
    }
    process.exit(1);
  }
};

module.exports = connectDB;
