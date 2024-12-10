"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); //Forma de importar en ES6
//const express = require('express');  //Forma de importar en ES5
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
let productos = [
    { id: 1, nombre: 'Silla', categoria: 'Muebles', precio: 100 },
    { id: 2, nombre: 'Mesa', categoria: 'Muebles', precio: 150 },
    { id: 3, nombre: 'TV', categoria: 'Electro', precio: 500 },
    { id: 4, nombre: 'Laptop', categoria: 'Tech', precio: 1000 },
];
app.get('/', (req, res) => {
    let mensaje = 'Bienvenidos a mi Server';
    res.send(mensaje);
});
app.get('/api/producto', (req, res) => {
    res.json(productos);
});
app.post('/api/producto', (req, res) => {
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
