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
function leerLinea(titulo) {
    return new Promise((resolve) => {
        rl.question(titulo, (nombre) => {
            resolve(nombre);
        });
    });
}

//IIFE : Immediately Invoked Function Expression
(async () => {
    const nombre = await leerLinea('Cual es tu nombre? ');
    const apellido = await leerLinea('Cual es tu apellido? ');
    console.log(`Hola ${nombre} ${apellido}`);
    rl.close();
})();
