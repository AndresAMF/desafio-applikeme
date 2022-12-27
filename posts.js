const {Pool} = require('pg')

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'sudo',
    database: 'likeme',
    allowExitOnIdle: true
})


const agregarPosts = async(titulo, url, descripcion, likes) => {
    const consulta = "INSERT INTO posts values (DEFAULT, $1, $2, $3, $4)"
    const values = [titulo, url, descripcion, likes]
    await pool.query(consulta, values)
    console.log(url, titulo)
}


const obtenerPosts = async() => {
    const {rows} = await pool.query("SELECT * FROM posts")
    console.log(rows)
    return rows
}

module.exports = {agregarPosts, obtenerPosts}