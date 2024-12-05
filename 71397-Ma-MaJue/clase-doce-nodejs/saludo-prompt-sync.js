//import createPromptFunction from 'prompt-sync'; (Para Jhonson)
const createPromptFunction = require('prompt-sync');  

const prompt = createPromptFunction();

const nombre = prompt('Cual es tu nombre? ');
const apellido = prompt('Cual es tu apellido? ');

console.log(`Hola ${nombre} ${apellido}`);