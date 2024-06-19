const {MongoClient} = require('mongodb');

const url = 'mongodb+srv://{user and password }@cluster0.uiqihbz.mongodb.net/oyebusy?retryWrites=true&w=majority&appName=Cluster0';
let client;


async function connectToMongoDB() {
  try {
    client = await MongoClient.connect(url,);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
  }
}
function getClient() {
  return client;
}

module.exports = { connectToMongoDB, getClient };





