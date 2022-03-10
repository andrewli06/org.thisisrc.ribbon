import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const cxn_uri: string = process.env.MONGO || "";
const client = new MongoClient(cxn_uri);
let _db: any;
 
module.exports = {
  connectToServer: function (callback: any) {
    client.connect(function (err, db) {
      // Verify we got a good "db" object
      if (db)
      {
        _db = db.db("thisisrc");
        console.log("Successfully connected to MongoDB."); 
      }
      return callback(err);
         });
  },
 
  getDb: function () {
    return _db;
  },
};