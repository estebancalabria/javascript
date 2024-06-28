//Primero hago todo los import / require
const express = require('express');
require('dotenv').config();
const cors = require('cors');

//Declaro las constantes
const PORT = process.env.PORT || 3000;

let peliculas = [
    { id:1, titulo: "The Shawshank Redemption", director: "Frank Darabont" },
    { id:2, titulo: "The Godfather", director: "Francis Ford Coppola" }
];

function guardarPeliculasEnArchivo() {
    const fs = require('fs');
    fs.writeFileSync('peliculas.json', JSON.stringify(peliculas, null, 2));
}

function leerPeliculasDeArchivo() {
    const fs = require('fs');
    if (fs.existsSync('peliculas.json')) {
        const data = fs.readFileSync('peliculas.json');
        peliculas = JSON.parse(data);
    }
}

leerPeliculasDeArchivo();

console.log("Bienvenidos a Javascript con Node.js");

const app = express();

//Middleware
//Intercepta todas las peticiones y parse el body y lo convierte en JSON
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    console.log(` ${req.method} -  ${req.url}`)
    res.send(`
        <html>
        <body>
            <h1> Bienvenidos a la API de Peliculas </h1>
            <p> /api/pelicula - para obtener todas las peliculas </p>
            <p> /api/pelicula/:id - para obtener una pelicula por id </p>
            <p> /api/pelicula - POST para agregar una pelicula </p>
            <p> /api/pelicula/:id - DELETE para eliminar una pelicula por id </p>
            <p> /api/pelicula/:id - PUT para modificar una pelicula por id </p>
        </body>
        </html>
    `);
});

app.get('/api/pelicula', (req, res) => {
    console.log(` ${req.method} -  ${req.url}`)
    res.send(peliculas);
});

app.get('/api/pelicula/:id', (req, res) => {
    console.log(` ${req.method} -  ${req.url}`)

    const id = parseInt(req.params.id);
    const pelicula = peliculas.find(p => p.id === id);
    if (pelicula) {
        res.send(pelicula);
    } else {
        res.status(404).send({ error: 'Pelicula no encontrada' });
    }

});

app.post('/api/pelicula', (req, res) => {
    console.log(` ${req.method} -  ${req.url}`)
    const pelicula = req.body;

    if (!pelicula.titulo || !pelicula.director) {
        res.status(400).send({ error: 'Faltan datos' });
        return;
    }

    //Evitar no ingresar dos veces una pelicula con el mismo titulo
    const index = peliculas.findIndex(p => p.titulo.trim().toLowerCase() === pelicula.titulo.trim().toLowerCase());
    if (index !== -1) {
        res.status(400).send({ error: 'Pelicula ya existe' });
        return;
    }

    // peliculas.map(p => p.id) [{id:1, pelicula..}, {id:2, pelicula}, ...] => [1, 2, 3, 4, 5]
    // El metodo Math.max recibe una cantidad indeterminada de parametros y devuelve el mayor
    // ...[1,2,3] => 1, 2, 3
    pelicula.id = Math.max(...peliculas.map(p => p.id), 0) + 1;

    peliculas.push(pelicula);

    res.status(201).send(pelicula);
    //peliculas.push(pelicula);
    //res.status(201).send(pelicula);
    guardarPeliculasEnArchivo();
});

app.delete('/api/pelicula/:id', (req, res) => {
    console.log(` ${req.method} -  ${req.url}`)
    const id = parseInt(req.params.id);
 
    const index = peliculas.findIndex(p => p.id === id);
    if (index === -1) {
        res.status(404).send({ error: 'Pelicula no encontrada' });
    } else {
        //peliculas.splice(index, 1);
        peliculas = peliculas.filter(p => p.id !== id);
        res.send({ success: true });
    }
    
    guardarPeliculasEnArchivo();
});

app.put('/api/pelicula/:id', (req, res) => {
    console.log(` ${req.method} -  ${req.url}`)
    const id = parseInt(req.params.id);
    
    const pelicula = req.body;
    pelicula.id = id;


    if (!pelicula.titulo || !pelicula.director) {
        res.status(400).send({ error: 'Faltan datos' });
        return;
    }

    const index = peliculas.findIndex(p => p.id === id);
    if (index === -1) {
        res.status(404).send({ error: 'Pelicula no encontrada' });
    } else {
        peliculas[index] = pelicula;
        res.send(pelicula);
    }

    guardarPeliculasEnArchivo();
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

