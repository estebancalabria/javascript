//var numero = 10;
//Mucho codigo despues..
//var numero = 10;  //No tira error. Puedo reescribir variables lo cual puede ser un problema

//let numero = 10;
//Mucho codigo despues..
//let numero = 20; //Tira error. No puedo reescribir variables

let numero = 10;
console.log("let numero = 10;");
console.log(">>>>>>>>>> " +  typeof numero); //number

let numerof = 10.5;
console.log("let numerof = 10.5;")
console.log(">>>>>>>>>> " +  typeof numerof); //number

let numeroNan = NaN;
console.log("let numeroNan = NaN;");
console.log(">>>>>>>>>> " +  typeof numeroNan); //number

let numeroInf = Infinity;
console.log("let numeroInf = Infinity;");
console.log(">>>>>>>>>> " +  typeof numeroInf); //number

let numeroInfM = -Infinity;
console.log("let numeroInfM = -Infinity;");
console.log(">>>>>>>>>> " +  typeof numeroInfM); //number


let palabra = "Hola";
console.log("let palabra = `Hola`;")
console.log(">>>>>>>>>> " +  typeof palabra); //string

let respuesta = true;
console.log("let respuesta = true;");
console.log(">>>>>>>>>> " +  typeof respuesta); //boolean

let objeto = { nombre: "Juan", edad: 30 };
console.log("let objeto = { nombre: 'Juan', edad: 30 };");
console.log(">>>>>>>>>> " +  typeof objeto); //object
console.log(">>>>>>>>>>>>>> " +  objeto.constructor.name); //object

//Tipos "especiales" 
let nulo = null;
console.log("let nulo = null;");
console.log(">>>>>>>>>> " +  typeof nulo); //object

//Tipos "especiales" 
let undef = undefined;
console.log("let undef = undefined;");
console.log(">>>>>>>>>> " +  typeof undef); //undefined

let nada;
console.log("let nada;");
console.log(">>>>>>>>>> " +  typeof nada); //undefined

let fecha = new Date();
console.log("let fecha = new Date();");
console.log(">>>>>>>>>> " +  typeof fecha); //object
console.log(">>>>>>>>>>>>>> " +  fecha.constructor.name); //object

let func = function() {};
console.log("let func = function() {};");
console.log(">>>>>>>>>> " +  typeof func); //function

let bigint = 1234563244343354545454n;
console.log("let bigint = 1234563244343354545454n;");
console.log(">>>>>>>>>> " +  typeof bigint); //bigint

let arr = [1, 2, 3, 4];
console.log("let arr = [1, 2, 3, 4];");
console.log(">>>>>>>>>> " +  typeof arr); //object
console.log(">>>>>>>>>>>>>> " +  arr.constructor.name); //object