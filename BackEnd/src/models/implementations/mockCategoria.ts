import { CategoriaCrud } from "../interface/categoriaCrud.interface";
import { Categoria } from "../categoria";

export class MockCategoria implements CategoriaCrud{
    protected tam: number;
    protected container: Array<Categoria>;
    protected id: number;
    constructor(){
        this.id=1;
        this.tam = 0;
        this.container = new Array<Categoria>;
    }

    getCategorias(): Promise<Array<Categoria>> {
        return new Promise<Array<Categoria>>((resolve)=>{
            resolve(this.container);
        });
    }

    getCategoria(id:string): Promise<Categoria> {
        return new Promise<Categoria>((resolve, rejects)=>{
            const resultado = this.container.find((categoria: Categoria)=>{
            return categoria.getId() == id;
            });
            if (!resultado){
                rejects(new Error("No existe dicho id"));
            }else{
                resolve(resultado);
            }
        });
    }

    addCategoria(categoria: Categoria): Promise<Categoria> {
        return new Promise<Categoria>((resolve)=>{
            categoria.setId((this.id) + "");
            this.container.push(categoria);
            this.id++;
            this.tam++;
            resolve(categoria);
        });
    }

    deleteCategoria(id: string): Promise<void> {
        return new Promise<void>((resolve, rejects)=>{
            const index = this.container.findIndex((categoria: Categoria) => categoria.getId() === id);
            if (index === -1) {
                rejects(new Error("No existe una Categoria con ese id"));
            }else{
                this.container.splice(index, 1);
                this.tam--;
            }
        });
    }

    editCategoria(id: string, nombre: string): Promise<Categoria> {
        return new Promise<Categoria>((resolve, rejects)=>{
            const categoriaEncontrada = this.container.find(
                (categoria:Categoria)=> categoria.getId()==id
            );
            if (!categoriaEncontrada){
                rejects(new Error("Esta categoria no fue encontrada"));
            }else{
                categoriaEncontrada.setNombre(nombre);
                resolve(categoriaEncontrada);
            }
        });
    }
    size(): number {
        return this.tam;
    }
    
}

export default new MockCategoria();