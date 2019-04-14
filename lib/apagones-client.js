const MongoClient = require('mongodb').MongoClient;

class ApagonesClient {
  constructor(db) {
    this.db = db;
  }
  async insert(collection, data) {
    try {
      if(Array.isArray(data)) {
        return await this.db.collection(collection).insertMany(data);
      }
      return await this.db.collection(collection).insertOne(data);
    } catch(error) {
      throw error;
    }
  }
  async find(collection, query={}) {
    try {
      return await this.db.collection(collection).find(query).toArray();
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