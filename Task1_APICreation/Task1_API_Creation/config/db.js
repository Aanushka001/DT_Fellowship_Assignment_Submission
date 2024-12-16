import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const client = new MongoClient(uri);

export async function connectDB() {
    try {
        await client.connect();
        console.log("Successfully connected to MongoDB");
        const db = client.db('eventDB');
        return db;
    } catch (error) {
        console.error('Error connecting to the database:', error);
        throw error;
    }
}
