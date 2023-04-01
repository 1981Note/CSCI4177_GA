import mongodb from "mongodb"
import dotenv from "dotenv"

dotenv.config()

const MongoClient = mongodb.MongoClient;

export default class DbConnection {
    
    constructor() {
      this.client = null;
      this.db = null;
    }
  
    async connect() {
      try {
        this.client = await MongoClient.connect(
          process.env.URI,
          {
            maxPoolSize: 50,
            wtimeoutMS: 2500,
            useNewUrlParser: true,
          }
        );
        console.log("Successfully connected to the database");
        this.db = this.client.db("flight");
      } catch (err) {
        console.error(err.stack);
        process.exit(1);
      }
    }
}