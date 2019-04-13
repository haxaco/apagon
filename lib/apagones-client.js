const MongoClient = require('mongodb').MongoClient;

class ApagonesClient {
  constructor(db) {
    this.db = db;
  }
  async insert(data) {
    try {
      if(Array.isArray(data)) {
        return await this.db.collection('apagones').insertMany(data);
      }
      return await this.db.collection('apagones').insertOne(data);
    } catch(error) {
      throw error;
    }
  }
  async find(query={}) {
    try {
      return await this.db.collection('apagones').find(query).toArray();
    } catch (error) {
      throw error;
    }
  }
}

async function getApagonesDBClient() {
  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    return new ApagonesClient(client.db());
  } catch(error) {
    throw error;
  }
}

module.exports = getApagonesDBClient;