
export interface Producto {
    id : number;
    nombre : string;
    categoria : ("Muebles" | "Electro" | "Tech");
    precio : number;
}