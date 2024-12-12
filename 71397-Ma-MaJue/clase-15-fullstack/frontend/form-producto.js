// form-script.js

const API_URL = 'http://localhost:3000/api/producto';

// Maneja el evento de envío del formulario
document.getElementById('product-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita el comportamiento predeterminado del formulario

    // Obtiene los valores del formulario
    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value;
    const precio = parseFloat(document.getElementById('precio').value);

    // Crea el objeto del producto
    const nuevoProducto = { nombre, descripcion, precio };

    try {
        // Envía los datos al servidor
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevoProducto),
        });

        if (response.ok) {
            //alert('Producto añadido con éxito');
            //document.getElementById('product-form').reset(); // Limpia el formulario
            window.location.href = 'productos.html';
        } else {
            alert('Error al añadir el producto');
        }
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        alert('Error al conectar con el servidor');
    }
});

document.getElementById('volver').addEventListener('click', () => {
    window.location.href = 'productos.html';
});
