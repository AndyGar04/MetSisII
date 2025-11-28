import { Categoria } from "./categoria";

export class Producto {
    constructor(
        protected id: string,
        protected nombre: string,
        protected categoria: Categoria,
        protected cantidad: number,
        protected precio: number 
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

    // Método para serialización JSON
    public toJSON() {
        return {
            id: this.id,
            nombre: this.nombre,
            categoria: {
                id: this.categoria.getId(),
                nombre: this.categoria.getNombre()
            },
            cantidad: this.cantidad,
            precio: this.precio
        };
    }
}