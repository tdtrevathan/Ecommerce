const { ObjectId } = require('mongodb');

const databseConnectionService = require('./databaseConnectionService')

exports.getProduct = async (itemGuid) => {
    const database = await databseConnectionService.connectToDatabase();
    const products = database.collection('products');
    
    const objectId = new ObjectId('66807765dddbd02946487020');
    const query = { _id: objectId };
    const product = await products.findOne(query)
    console.log(product);

    return product;
}