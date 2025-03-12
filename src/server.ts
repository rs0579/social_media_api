import express from 'express';
// Run npm install mongodb and require mongodb and MongoClient class
import { MongoClient } from 'mongodb';

const app = express();
const PORT = process.env.PORT || 3001;

// Connection string to local instance of MongoDB
const connectionStringURI = `mongodb://127.0.0.1:27017`;

// Initialize a new instance of MongoClient
const client = new MongoClient(connectionStringURI);

// Create variable to hold our database name
const dbName = 'social_networkDB';

// Use connect method to connect to the mongo server
await client.connect()
.catch(err => {console.log(err)});

// const db = client.db(dbName);

app.use(express.urlencoded({ extended: true }));
// Built in Express function that parses incoming requests to JSON
app.use(express.json());



app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});