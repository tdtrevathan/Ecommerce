const { ObjectId } = require('mongodb');

const databseConnectionService = require('../Services/databaseConnectionService')

exports.getProduct = async (itemGuid) => {
    const database = await databseConnectionService.connectToDatabase();
    const collection = database.collection('products');
    
    const objectId = new ObjectId(itemGuid);
    const query = { _id: objectId };
    const product = await collection.findOne(query)

    return product;
}

exports.getAll = async () => {
    const database = await databseConnectionService.connectToDatabase();
    const collection = database.collection('products');
    
    const products = await collection.find({}).limit(10).toArray();

    return products;
}