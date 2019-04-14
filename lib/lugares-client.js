const MongoClient = require('mongodb').MongoClient;

class LugaresClient {
  constructor(db) {
    this.db = db;
  }
  async insert(data) {
    try {
      if(Array.isArray(data)) {
        return await this.db.collection('lugares').insertMany(data);
      }
      return await this.db.collection('lugares').insertOne(data);
    } catch(error) {
      throw error;
    }
  }
  async find(query={}) {
    try {
      return await this.db.collection('lugares').find(query).toArray();
    } catch (error) {
      throw error;
    }
  }
}

async function getLugaresDBClient() {
  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    return new LugaresClient(client.db());
  } catch(error) {
    throw error;
  }
}

module.exports = getLugaresDBClient;