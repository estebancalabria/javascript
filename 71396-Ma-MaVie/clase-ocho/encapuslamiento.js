

//En javascript por defecto no se usa el encapsulamiento, 
//pero puede haber situaciones donde lo necesitemos
// //En javascript no hay niveles de visibilidad como en otros lenguajes
// class Persona {

//     //Opcion 1 para encapsulamiento, usar _ para indicar que es privado
//     //es un encapsilamiento por convencion de codigo
//     _nombre = '';
//     _apellido = '';

//     constructor(nombre, apellido){
//         this._nombre = nombre;
//         this._apellido = apellido;
//     }

//     saludar(){
//         console.log(`Hola, soy ${this._nombre} ${this._apellido}`);
//     }
// }

// class Persona {

//     //Opcion 2 para encapsulamiento, usar # para indicar que es privado
//     //es un encapsilamiento por convencion de codigo
//     #nombre = '';
//     #apellido = '';

//     constructor(nombre, apellido){
//         this.#nombre = nombre;
//         this.#apellido = apellido;
//     }

//     saludar(){
//         console.log(`Hola, soy ${this.#nombre} ${this.#apellido}`);
//     }
// }

//Opcion 3 : Utilizar un Proxy para encapsular los atributos
//Un proxy es un intermediario
// let proxyPersonaHandler = {

//     get(target, prop, receiver){
//         console.log(`Lectura de la propiedad: ${prop}`);
//         return target[prop];
//     },

//     set(target, prop, value){
//         console.log(`Escritura de la propiedad: ${prop} con valor ${value}`);
//         target[prop] = value;
//     }   
// }

//Asi creo un proxy a un objeto persona
//let p = new Proxy(new Persona("Juan", "Perez"), proxyPersonaHandler)

//El problema es que hay que elegir si usar un proxy o no
//Quiero que siempre que se use la clase persona se use el proxy
//LA persona puede crear personas o proxys


//Modulos de Javascript
//Se implementan con IFFE
(function(){
    //Esta variable es una variable Privada dentro de mi ifee
    let nombre_iffe = 'Juan'; //Es solo accesible dentro de la funcion

    //Ahora esta clase es privada dentro de mi IIFE
    //El iffe es necesario para que no se conozca la clase Persona fuera
    //de este contexto
    class Persona {
            //Opcion 1 para encapsulamiento, usar _ para indicar que es privado
            //es un encapsilamiento por convencion de codigo
            _nombre = '';
            _apellido = '';
        
            constructor(nombre, apellido){
                this._nombre = nombre;
                this._apellido = apellido;
            }
        
            //Si quisiera que se acceda puedo hacer un getter
            //getNombre(){
            //    return this._nombre;
            //}

            saludar(){
                //Puedo acceder a la variable _nombre solo dentro de los metodo de la clase
                console.log(`Hola, soy ${this._nombre} ${this._apellido}`);
            }
    }

    let proxyPersonaHandler = {
            get(target, prop, receiver){
                if (prop.startsWith('_')) {
                    throw new Error(`Acceso denegado a la propiedad privada "${prop}"`);
                }

                console.log(`Lectura de la propiedad: ${prop}`);
                
                //return target[prop];
                //Es lo mismo que hacer
                return Reflect.get(target,prop);
            },
        
            set(target, prop, value){
                if (prop.startsWith('_')) {
                    throw new Error(`No se puede modificar la propiedad privada "${prop}"`);
                }

                //Es mas facil usar Reflect ya que se fija la cadena de prototipos
                //y demas que si lo que quiero hacer yo me queda un choclo de coigo
                if (!Reflect.has(target, prop)) {
                    throw new Error(`La propiedad "${prop}" no existe en el objeto`);
                }
                //Con este codigo
                //persona.edad = 21;
                //encapuslamiento.js:115 Uncaught Error: La propiedad "edad" no existe en el objeto
                //at Object.set (encapuslamiento.js:115:27)
                //at <anonymous>:1:14


                console.log(`Escritura de la propiedad: ${prop} con valor ${value}`);
                target[prop] = value;
            }   
        }



    //Exporto la clase persona
    //El objeto window es el objeto global en el navegador
    //Cargandola de Window la saco del IIFE

    window.Persona = function(nombre, apellido){
        return new Proxy(new Persona(nombre, apellido), proxyPersonaHandler);
    }

})();
