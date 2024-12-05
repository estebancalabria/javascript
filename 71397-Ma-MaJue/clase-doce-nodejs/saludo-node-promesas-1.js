//Asi se importa un modulo (librerias) en node
//La liberia se llama 'readline' ya viene con node
const readline = require('readline');   
//import readline from 'readline'; //ES6

//console.log(typeof readline);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//Cambio la forma "callback" por "promesas"
function leerNombre() {
    return new Promise((resolve) => {
        rl.question('Cual es tu nombre? ', (nombre) => {
            resolve(nombre);
        });
    });
}

//Forma Con Then
leerNombre().then((nombre) => {
    console.log(`Hola ${nombre}`);
    rl.close();
});
