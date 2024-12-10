import express from 'express';  //Forma de importar en ES6
import {Request, Response} from 'express';  
import { Producto } from './productos.interface';
//const express = require('express');  //Forma de importar en ES5

const app = express();
const port = 3000;

app.use(express.json());

let productos : Producto[] = [
    {id: 1, nombre: 'Silla', categoria: 'Muebles', precio: 100},
    {id: 2, nombre: 'Mesa', categoria: 'Muebles', precio: 150},
    {id: 3, nombre: 'TV', categoria: 'Electro', precio: 500},
    {id: 4, nombre: 'Laptop', categoria: 'Tech', precio: 1000},
];

app.get('/', (req : Request , res : Response) => {
    let mensaje : String = 'Bienvenidos a mi Server';
    res.send(mensaje);
});


app.get('/api/producto', (req : Request , res : Response) => {
    res.json(productos);
});

app.post('/api/producto', (req : Request<Producto> , res : Response) => {
    const producto = req.body;

    //Typescript valida en tiempo de ejecucion no en tiempo de compilacion
    //Aca nos fijamos si el objeto tiene las propiedades que se esperan
    if (!producto.nombre || !producto.categoria || !producto.precio) {
        res.status(400).send('Faltan datos');
        return;
    }

    producto.id = Math.max(...productos.map(p => p.id)) + 1;
    productos.push(producto);

    res.json(producto);
});

app.listen(port, () => {
  console.log(`Server corriendo en http://localhost:${port}`);
});