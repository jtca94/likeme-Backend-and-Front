import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import {getPosts, createPost, likePost, deletePost, pool} from "./db/database.js";

const app = express();
// Middleware
app.use(express.json());
// CORS
app.use(cors(
  {
    origin: process.env.FRONTEND_URL,
    optionsSuccessStatus: 200
  }
))

//ROUTES
//see if server is running ok
app.get("/", (req, res) => {
  res.send("running");
});
//get methods
app.get("/posts", async (req, res, next) => {
  try {
    const results = await getPosts();
    res.json(results);
  } catch (err) {
    next(err);
  }
});
//post methods
app.post("/posts", async (req, res, next) => {
  try {
    const {titulo, url, descripcion} = req.body;
    const result = await createPost(titulo, url, descripcion);
    res.status(201).json({ ok: true, result: result });
    console.log(result)
  } catch (err) {
    next(err);
  }
});
//put method
app.put("/posts/like/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await likePost(id);
    res.json({ ok: true, result: result });

  } catch (err) {
    next(err);
  }
});
//delete method
app.delete("/posts/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deletePost(id);
    res.json({ ok: true, result: result });
  } catch (err) {
    next(err);
  }
});

// Error handling middleware at the end of pipeline (after routes)
app.use((err, req, res, next) => {
  console.error(err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ ok: false, error: err.message });
});

// Start server and check connection with database

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  pool.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      process.exit(1);
    }
    console.log('Database connected successfully!');
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});