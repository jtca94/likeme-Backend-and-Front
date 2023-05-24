import express from "express";
import {getPosts, createPost, likePost} from "./db/database.js";
import cors from "cors";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors(
  {
    origin: process.env.FRONTEND_URL,
    optionsSuccessStatus: 200
  }
))
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
//see if server is running ok
app.get("/", (req, res) => {
  res.send("running");
});
//get methods
app.get("/posts", async (req, res) => {
  try {
    const results = await getPosts();
    res.json(results);
  } catch (error) {
    res.json({ok: false, error: error.message});
  }
});
//post methods
app.post("/posts", async (req, res) => {
  try {
    const {titulo, url, descripcion} = req.body;
    const result = await createPost(titulo, url, descripcion);
    res.status(201).json({ ok: true, result: result });
    console.log(result)
  } catch (error) {
    res.json({ok: false, error: error.message});
  }
});
//put method
app.put("/posts/like/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await likePost(id);
    res.json({ ok: true, result: result });

  } catch (error) {
    res.json({ok: false, error: error.message});
  }

});