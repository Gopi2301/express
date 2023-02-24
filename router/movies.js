import express from "express";
const router = express.Router()
import {client} from "../index.js";
// =========== Get All movie ====================//
router.get("/", async function (request, response) {
    const movies = await client.db("moviestrailer").collection("list").find({}).toArray();
    console.log(movies);
    response.send(movies);
  });
//============= Get Movie by id ========================//

router.get("/:id", async function (request, response) {
    const { id } = request.params;
    console.log(id);
    const movie = await client
      .db("moviestrailer")
      .collection("list")
      .findOne({ id: id });
    movie ? response.send(movie) : response.status(404).send("Movie not found");
  });
  
// =============== Post data from MongoDb =========================//
router.post("/",  async function (request, response) {
    const data = request.body;
    console.log(data);
    const result = await client
      .db("moviestrailer")
      .collection("list")
      .insertMany(data);
    response.send(result);
  });
// ============= Delete Movie ====================//
router.delete("/:id", async function (request, response) {
    const { id } = request.params;
    console.log(id);
    const movie = await client
      .db("moviestrailer")
      .collection("list")
      .deleteOne({ id: id });
  
    response.send(movie)
  })  

// ==================== Update Movie=============//

router.put("/:id", async function(request, response){
    const{id}= request.params;
    const data=request.body;
    const result = await client.db("moviestrailer").collection("list").updateOne({id:id},{$set:data})
  response.send(result);
  })

  export default router;