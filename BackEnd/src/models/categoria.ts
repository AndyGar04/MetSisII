export class Categoria {
    constructor(
        protected nombre: string,
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
}