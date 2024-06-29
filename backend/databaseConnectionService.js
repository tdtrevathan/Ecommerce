
// Connect to the database
exports.connectToDatabase = async () => {
    try {

        // Import the MongoDB module
        const { MongoClient } = require('mongodb');

        // Connection URI
        const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.6facvzr.mongodb.net`

        // Create a new MongoClient
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log('Connected successfully to MongoDB');

        // Specify the database and collection
        const database = client.db(process.env.MONGO_DATABASE); // replace with your database name
        return database;
    } catch (error) {
        console.error('Connection failed', error);
    } 
}

