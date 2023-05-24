import pkg from "pg";

const {Pool} = pkg;

const pool = new Pool({
  allowExitOnIdle: true,
});

export const getPosts = async () => {
  const {rows} = await pool.query("SELECT * FROM posts ORDER BY id ASC");
  return rows;
};

export const createPost = async (titulo, url, descripcion) => {
  if (!titulo || !url || !descripcion) {
    throw new Error("Faltan datos");
  }
  const text =
    "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, 0) RETURNING *";
  const {rows} = await pool.query(text, [titulo, url, descripcion]);
  return rows;
};

export const likePost = async (id) => {
  const text = "UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING *";
  const {rows} = await pool.query(text, [id]);
  console.log(rows);
  return rows;
 
}