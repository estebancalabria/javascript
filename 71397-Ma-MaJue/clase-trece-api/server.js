//Voy a a hacer un servidor express en el puerto 3000

//Importaciones
const express = require('express');
//import express from 'express';

//Variables Globales y constantes
const PORT = 3000;
//express es una funcion par crear un objeto servidor
const app = express();

//Agregarmos los middleware.
//Middleware para que express pueda interpretar los datos que vienen en el body de una peticion
//Esto se pone para que parsea el body de la peticion y lo convierte en un objeto json
app.use(express.json());

//Esto simularia mi base de datos que la tengo en memoria
let productos = [
    {id :1 , nombre: 'television lcd 32', cantidad: 3, precio: 300},
    {id :2 , nombre: 'mouse', cantidad: 5, precio: 5},
    {id :3 , nombre: 'heladera', cantidad: 2, precio: 500},
    {id :4 , nombre: 'monitor', cantidad: 4, precio: 80},
];

//Registramos un callback para la ruta raiz
app.get('/', (req, res) => {
    console.log(`GET ${req.url}`);
    res.send('Hola mundo desde express');
});

app.get('/html', (req, res) => {
    console.log(`GET ${req.url}`);
    res.send('<h1>Hola mundo desde express en un h1</h1>');
});

//API REST
//GET /api/productos
app.get('/api/producto', (req, res) => {
    console.log(`GET ${req.url}`);
    res.json(productos);
});

//El : se utiliza para definir un parametro en la url
app.get('/api/producto/:id', (req, res) => {
    console.log(`GET ${req.url}`);
    let id = req.params.id;
    let producto = productos.find(p => p.id == id);
    if (producto) {
        res.json(producto);
    } else {
        res.status(404).send('Producto no encontrado');
    }
});
   
app.post('/api/producto', (req, res) => {
    console.log(`POST ${req.url}`);
    let producto = req.body;
    console.log(`BODY RECIBIDO ${JSON.stringify(producto)}`)

    
    //producto.id = Math.max(...productos.map(p => p.id)) + 1; //Esta linea es pro
    //Vamos a descomponerla
    //1) El map me devuelve un array con los id de los productos (convierte un array en otro)
    lista_ids = productos.map(p => p.id);
    //2) Math.max me devuelve el mayor de los elementos de un array
    //El max recibe como parametros una lista de elementos separados por comas, no un array
    //El operador ... es el operador de propagacion, que convierte un array en una lista de elementos separados por comas
    max_id = Math.max(...lista_ids);
    producto.id = max_id + 1;
    
    productos.push(producto);
    res.status(201).json(producto);
});

app.delete('/api/producto/:id', (req, res) => {
    console.log(`${req.method} ${req.url}`);
    let id = req.params.id;
    let index = productos.findIndex(p => p.id == id);
    if (index != -1) {
        //productos.splice(index, 1);
        //Sino con un filter
        productos = productos.filter(p => p.id != id);
        res.status(200).send(`Producto ${id} eliminado`);
    } else {
        res.status(404).send('Producto no encontrado');
    }
});

//Escuchando el puerto 3000: Programa principal
app.listen(PORT, () => {
    //Funcion que se ejecuta cuando el servidor se inicia
    console.log('Server on port 3000');
});