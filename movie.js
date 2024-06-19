const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const { getClient } = require("./db");

router.post("/add-movie", async (req, res) => {
  try {
    const client = getClient();
    const db = client.db("movie-database");
    const result = await db.collection("movies").insertOne(req.body);

    if (!result || !result.insertedId) {
      return res.status(500).json({ error: "Failed to add movie" });
    }

    const insertedMovie = await db
      .collection("movies")
      .findOne({ _id: result.insertedId });
    res.status(201).json(insertedMovie);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/get-all", async (req, res) => {
  try {
    const client = getClient();
    const db = client.db("movie-database");
    const movies = await db.collection("movies").find().toArray();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/get-single/:id", async (req, res) => {
  try {
    const client = getClient();
    const db = client.db("movie-database");
    const movieId = req.params.id;

    if (!movieId) {
      return res.status(400).json({ error: "Movie ID is required" });
    }

    const movie = await db
      .collection("movies")
      .findOne({ _id: new ObjectId(movieId) });

    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    res.json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/get-paginated", async (req, res) => {
  try {
    const client = getClient();
    const db = client.db("movie-database");
    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 10;
    const skip = (page - 1) * size;

    const movies = await db
      .collection("movies")
      .find()
      .skip(skip)
      .limit(size)
      .toArray();

    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
