//const express = require('express');
import express from 'express';
import cors from 'cors';

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(cors());

let productos = [
    { id: 1, nombre: 'producto 1', descripcion: "Producto Hermoso", precio: 100 },
    { id: 2, nombre: 'producto 2', descripcion: "Producto Hermoso", precio: 200 },
    { id: 3, nombre: 'producto 3', descripcion: "Producto Hermoso", precio: 300 },
    { id: 4, nombre: 'producto 4', descripcion: "Producto Hermoso", precio: 400 },
    { id: 5, nombre: 'producto 5', descripcion: "Producto Hermoso", precio: 500 }
]

app.get('/api/producto', (req, res) => {
    console.log('GET /api/producto');
    res.json(productos);
});

app.post('/api/producto', (req, res) => {
    console.log('POST /api/producto');
    const producto = req.body;
    producto.id = Math.max(...productos.map(p => p.id)) + 1;
    //Valido que tenga los campos necesarios
    if (!producto.nombre || !producto.descripcion || !producto.precio) {
        res.status(400).json({ error: 'Faltan campos requeridos' });
        return;
    }
    productos.push(producto);
    res.status(201).json(producto);
});

app.listen(PORT, () => {
    console.log(`Servidor disponible en http://localhost:${PORT}`);
});