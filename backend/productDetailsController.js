const { ObjectId } = require('mongodb');

const databseConnectionService = require('./databaseConnectionService')

exports.getProduct = async (itemGuid) => {
    console.log('itemGuid',itemGuid)
    const database = await databseConnectionService.connectToDatabase();
    const collection = database.collection('products');
    
    const objectId = new ObjectId(itemGuid);
    const query = { _id: objectId };
    const product = await collection.findOne(query)
    console.log('result product', product)
    return product;
}

exports.getAll = async () => {
    const database = await databseConnectionService.connectToDatabase();
    const collection = database.collection('products');
    
    const products = await collection.find({}).limit(10).toArray();

    return products;
}