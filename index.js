import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { MongoClient } from "mongodb";
const app = express();
// =============== Variables =======================//



//    "/" port for "hello world"
const PORT = 4000;
// ============== MONGO CONNECTION ==================//

// const MONGO_URL = "mongodb://127.0.0.1";
const MONGO_URL = process.env.MONGO_URL;

const client = new MongoClient(MONGO_URL); // dial
// Top level await
await client.connect(); // call
console.log("Mongo is connected !!!  ");

// ============== EXPRESS ========================//

app.get("/", function (request, response) {
  response.send("Hello 🌏");
});

// /movies/ port for sample data (movie details)
// app.get("/movies", function(request, response){
//     response.send(sample)
// })

// app.use() Intercept-> apply middeware -> converting body to JSON
// express.json() -> middleware to inform the datatype
app.use(express.json())

// =========== Get All movie ====================//

app.get("/movies", async function (request, response) {
  const movies = await client.db("moviestrailer").collection("list").find({}).toArray();
  console.log(movies);
  response.send(movies);
});

//============= Get Movie by id from MongoDB ========================//

app.get("/movies/:id", async function (request, response) {
  const { id } = request.params;
  console.log(id);
  const movie = await client
    .db("moviestrailer")
    .collection("list")
    .findOne({ id: id });
  movie ? response.send(movie) : response.status(404).send("Movie not found");
});

// =============== Post data from MongoDb =========================//
app.post("/movies",  async function (request, response) {
  const data = request.body;
  console.log(data);
  const result = await client
    .db("moviestrailer")
    .collection("list")
    .insertMany(data);
  response.send(result);
});


// ============= Delete Movie ====================//
app.delete("/movies/:id", async function (request, response) {
  const { id } = request.params;
  console.log(id);
  const movie = await client
    .db("moviestrailer")
    .collection("list")
    .deleteOne({ id: id });

  response.send(movie)
})


// ==================== Update Movie=============//
app.put("/movies/:id", async function(request, response){
  const{id}= request.params;
  const data=request.body;
  const result = await client.db("moviestrailer").collection("list").updateOne({id:id},{$set:data})
response.send(result);
})

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
