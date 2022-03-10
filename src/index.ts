import express from "express";
import dotenv from "dotenv";

dotenv.config();
const dbo = require("./db/conn");
const app = express();
const port = process.env.PORT || 25565;

app.use(express.json());
app.use(require("./routes/app"));

// get driver connection
 
app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err: Error) {
    if (err) console.error(err);
  });

  console.log(`Server is running on port: ${port}`);
});