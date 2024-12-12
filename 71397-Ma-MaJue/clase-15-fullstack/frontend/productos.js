// script.js

const API_URL = 'http://localhost:3000/api/producto';

// Función para obtener productos del servidor
async function fetchProducts() {
    try {
        const response = await fetch(API_URL);
        const productos = await response.json();
        renderProducts(productos);
    } catch (error) {
        console.error('Error al obtener los productos:', error);
    }
}

// Función para renderizar productos en la tabla
function renderProducts(productos) {
    const tableBody = document.querySelector('#product-table tbody');
    tableBody.innerHTML = ''; // Limpia contenido previo
    productos.forEach(producto => {
        const row = `
            <tr>
                <td>${producto.id}</td>
                <td>${producto.nombre}</td>
                <td>${producto.descripcion}</td>
                <td>$${producto.precio.toFixed(2)}</td>
            </tr>
        `;
        tableBody.insertAdjacentHTML('beforeend', row);
    });
}

// Inicializar la carga de productos
fetchProducts();
