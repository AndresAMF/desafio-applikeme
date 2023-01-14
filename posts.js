const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "sudo",
  database: "likeme",
  allowExitOnIdle: true,
});

const obtenerPosts = async () => {
  const { rows } = await pool.query("SELECT * FROM posts");
  console.log(rows);
  return rows;
};

const agregarPosts = async (titulo, url, descripcion, likes) => {
  likes = null ? (likes = 0) : (likes = 0);
  const consulta = "INSERT INTO posts values (DEFAULT, $1, $2, $3, $4)";
  const values = [titulo, url, descripcion, likes];
  await pool.query(consulta, values);
  console.log("Post agregado exitosamente");
};

const editarLike = async (id) => {
  const consulta = "UPDATE posts SET likes = likes + 1 WHERE id=$1";
  const values = [id];
  await pool.query(consulta, values);
  console.log(`Se ha agregado un like al post con id: ${id} exitosamente`);
};

const eliminarPost = async (id) => {
  const consulta = "DELETE FROM posts WHERE id = $1";
  const values = [id];
  await pool.query(consulta, values);
  console.log(`Post con ID ${id} eliminado.`);
};

module.exports = {
  agregarPosts,
  obtenerPosts,
  editarLike,
  eliminarPost,
};
