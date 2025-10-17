export class Task {
    constructor(
        protected tarea: string, 
        protected cumplida: boolean = false,
        protected id: string = "" 
    ){}

   // Getter y Setter de id
    public getId(): string {
        return this.id;
    }
    public setId(id: string): void {
        this.id = id;
    }

    // Getter y Setter de tarea
    public getTarea(): string {
        return this.tarea;
    }
    public setTarea(tarea: string): void {
        this.tarea = tarea;
    }

    // Getter y Setter de cumplida
    public isCumplida(): boolean {
        return this.cumplida;
    }
    public setCumplida(cumplida: boolean): void {
        this.cumplida = cumplida;
    }

}