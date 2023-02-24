import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { MongoClient } from "mongodb";
import moviesRouter from './router/movies.router.js';
const app = express();
const PORT = process.env.PORT //Auto-Assignable;

// ============== MONGO CONNECTION ==================//

// const MONGO_URL = "mongodb://127.0.0.1";
const MONGO_URL = process.env.MONGO_URL;

export const client = new MongoClient(MONGO_URL); // dial
// Top level await
await client.connect(); // call
console.log("Mongo is connected !!!  ");

// ============== EXPRESS ========================//

app.get("/", function (request, response) {
  response.send("Hello 🌏");
});


// app.use() Intercept-> apply middeware -> converting body to JSON
// express.json() -> middleware to inform the datatype
app.use(express.json())



app.use("/movies",moviesRouter);
app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
