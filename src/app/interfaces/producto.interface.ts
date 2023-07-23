import { Talla } from "./talla.interface";
import { Colegio } from "./colegio.interface";

export interface Producto{
    id: number;
    nombre: string;
    descripcion: string;
    colegio: Colegio;
    talla: Talla[];
}