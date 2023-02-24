import { client } from "../index.js";

export async function deleteMovie(id) {
  return await client
    .db("moviestrailer")
    .collection("list")
    .deleteOne({ id: id });
}
export async function createMovies(data) {
  return await client
    .db("moviestrailer")
    .collection("list")
    .insertMany(data);
}
export async function findMovies(id) {
  return await client
    .db("moviestrailer")
    .collection("list")
    .findOne({ id: id });
}
export async function allMovies() {
  return await client.db("moviestrailer").collection("list").find({}).toArray();
}
