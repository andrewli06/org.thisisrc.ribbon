import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const CONN_URI: string = process.env.MONGO || "";
const client = new MongoClient(CONN_URI);
let _db: any;

export default {
  connectToServer () {
    client.connect((err, db) => {
      // Verify we got a good "db" object
      if (db)
      {
        _db = db.db("thisisrc");
      }
      return 1;
    });
  },

  getDb () {
    return _db;
  },
};