//Asi se importa un modulo (librerias) en node
//La liberia se llama 'readline' ya viene con node
const readline = require('readline');   
//import readline from 'readline'; //ES6

//console.log(typeof readline);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//Cuando tengo un metodo cuyo parametro es una funcion se le llama callback
rl.question('Cual es tu nombre? ', (nombre) => {
    console.log(`Hola ${nombre}`);
    rl.close();
});
