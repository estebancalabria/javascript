//import readline from 'readline-sync'; //Jhonson
const readline = require('readline-sync');

const nombre = readline.question('Cual es tu nombre? ');
const apellido = readline.question('Cual es tu apellido? ');

console.log(`Hola ${nombre} ${apellido}`);