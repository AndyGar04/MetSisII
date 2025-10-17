import { Categoria } from "./categoria";

export class Producto {
    constructor(
        protected nombre: string,
        protected categoria: Categoria,
        protected cantidad: number,
        protected precio: number,
        protected id: string = "" 
    ){}

   // Getter y Setter de id
    public getId(): string {
        return this.id;
    }
    public setId(id: string): void {
        this.id = id;
    }

    // Getter y Setter de nombre
    public getNombre(): string {
        return this.nombre;
    }
    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }

    // Getter y Setter de precio
    public getPrecio(): number {
        return this.precio;
    }
    public setPrecio(precio: number): void {
        this.precio = precio;
    }

    //Getter y Setter de cantidad
    public getCantidad(): number{
        return this.cantidad;
    }
    public setCantidad(cantidad: number): void{
        this.cantidad = cantidad;
    }

    public getCategoria(): Categoria{
        return this.categoria;
    }
    public setCategoria(categoria: Categoria): void{
        this.categoria = categoria;
    }
}