interface Persona {
    nombre: string
    edad: number
}

let persona : Persona = {
    nombre: "Juan",
    edad: 25
}


function sumar(a: number, b: number): number {
    return a + b
}

//console.log(sumar("1", "dos")) // 3
console.log(sumar(1, 2)) // 3
console.log(persona.nombre);