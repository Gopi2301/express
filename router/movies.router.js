import express from "express";
const router = express.Router()
import {client} from "../index.js";
import { allMovies, findMovies, createMovies, deleteMovie } from "../service/movies.service.js";
// =========== Get All movie ====================//
router.get("/", async function (request, response) {
    const movies = await allMovies();
    console.log(movies);
    response.send(movies);
  });
//============= Get Movie by id ========================//

router.get("/:id", async function (request, response) {
    const { id } = request.params;
    console.log(id);
    const movie = await findMovies(id);
    movie ? response.send(movie) : response.status(404).send("Movie not found");
  });
  
// =============== Post data from MongoDb =========================//
router.post("/",  async function (request, response) {
    const data = request.body;
    console.log(data);
    const result = await createMovies(data);
    response.send(result);
  });
// ============= Delete Movie ====================//
router.delete("/:id", async function (request, response) {
    const { id } = request.params;
    console.log(id);
    const movie = await deleteMovie(id);
  
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


