const {
  agregarPosts,
  obtenerPosts,
  editarLike,
  eliminarPost,
} = require("./posts");

const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

app.listen(3000, console.log("Servidor encendido"));

app.get("/", () => {
  try {
    res.sendFile(`${__dirname}/index.html`);
  } catch (error) {
    res.send(error);
  }
});

app.get("/posts", async (req, res) => {
  try {
    const posts = await obtenerPosts();
    res.json(posts);
  } catch (error) {
    res.send(error);
  }
});

app.post("/posts", async (req, res) => {
  try {
    const { titulo, url, descripcion, likes } = req.body;
    await agregarPosts(titulo, url, descripcion, likes);
    res.send("Post agregado exitosamente.");
  } catch (error) {
    res.send(error);
  }
});

app.put("/posts/like/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await editarLike(id);
    res.send("Actualización exitosa.");
  } catch (error) {
    res.send(error);
  }
});

app.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await eliminarPost(id);
    res.send(`Post con ID ${id} eliminado.`);
  } catch (error) {
    res.send(error);
  }
});
