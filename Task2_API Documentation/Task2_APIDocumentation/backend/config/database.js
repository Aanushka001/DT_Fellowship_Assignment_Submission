import { MongoClient } from 'mongodb';

const connectDB = async () => {
  try {
    const client = new MongoClient('mongodb://localhost:27017');
    await client.connect();
    
    console.log('Connected to MongoDB');
    return client.db('nudgeDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
