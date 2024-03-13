// Import the necessary modules
const { MongoClient } = require('mongodb');

// Define the DBClient class
class DBClient {
  constructor() {
    // Set up the MongoDB connection using environment variables or defaults
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';

    // Create a new MongoClient instance
    this.client = new MongoClient(`mongodb://${host}:${port}/${database}`);
  }

  // Check if the connection to MongoDB is alive
  isAlive() {
    // Return true if the client is connected, false otherwise
    return this.client.isConnected();
  }

  // Get the number of documents in the users collection
  async nbUsers() {
    try {
      // Connect to the client
      await this.client.connect();
      // Get the number of user documents
      const db = this.client.db();
      const users = db.collection('users');
      return await users.countDocuments();
    } finally {
      // Close the connection
      await this.client.close();
    }
  }

  // Get the number of documents in the files collection
  async nbFiles() {
    try {
      // Connect to the client
      await this.client.connect();
      // Get the number of file documents
      const db = this.client.db();
      const files = db.collection('files');
      return await files.countDocuments();
    } finally {
      // Close the connection
      await this.client.close();
    }
  }
}

// Export an instance of DBClient called dbClient
const dbClient = new DBClient();
module.exports = dbClient;

