const { MongoClient } = require('mongodb');

let database;

exports.connectToDatabase = async () => {
    if (database) return database; // Return the existing connection if already connected

    try {
        const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.6facvzr.mongodb.net`;
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log('Connected successfully to MongoDB');

        database = client.db(process.env.MONGO_DATABASE); // Set the database
        return database;
    } catch (error) {
        console.error('Connection failed', error);
        throw error; // Throw error to handle it in the calling function
    }
};
