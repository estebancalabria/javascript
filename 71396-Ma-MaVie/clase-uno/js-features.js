
//OJO con los tipos de datos. Javascript hace conversioes sin que nos demos vcuenta
let suma = 4 + "7";
console.log("let suma = 4 + '7';");
console.log(">>>>>>>>>> " + suma); //47. Convierte el 4 a string y concatena
console.log(">>>>>>>>>> " + typeof suma); //string

let sumaBien = 4 + parseInt("7"); //Conversion Explicita
//let sumaBien = 4 + Number("7"); //Otra forma de hacer la conversión
console.log("let sumaBien = 4 + parseInt('7');");
console.log(">>>>>>>>>> " + sumaBien); // Convierte el 7 a número y suma

let yahora = 4 + parseInt("Siete");
console.log("let yahora = 4 + parseInt('Siete');");
console.log(">>>>>>>>>> " + yahora); //NaN. No se puede convertir "Siete" a número

//Otro features => Template Strings (Strings interpolados)
let nombre = "Juan";
console.log("Me llamo " + nombre); //cuando concatenamos muchos strings es dificil de leer
console.log(`Me llamo ${nombre}`); //Con los template strings es más fácil de leer
                                   // Se` hacen con una comilla especial ` (backtick) [alt+96]

//Dividir un string en varias líneas                                   
//console.log("Me 
//            llamo
//            Juan"); //Esto no funciona. Hay que hacerlo con template strings
console.log(`Me 
llamo 
${nombre}`);
//Atentos a esta extension : https://marketplace.visualstudio.com/items?itemName=fractalbrew.backticks

//Valores truthy y falsy

if ("false") {   //Cuanquier string no vacio es true (truthy)
    console.log("if 'false') Es verdad");
}

if (""){ //String vacio es false (falsy)
    console.log("esto no se muestra nunca");
}else{
    console.log("if <StringVacio> Es falso");
}

if (32232332) {   //Cualquier número distinto de 0 es true (truthy) salvo NaN
    console.log("if 32232332 Es verdad");
}

if (undefined) { //undefined es false (falsy)
    console.log("esto no se muestra nunca");
}else{  
    console.log("if undefined Es falsy");
}

if (NaN) { //NaN es false (falsy)
    console.log("esto no se muestra nunca");
}else{
    console.log("if NaN Es falsy");
}

if ([]){ //Array vacio es true (truthy)}
    console.log("if [] Es verdad");
}