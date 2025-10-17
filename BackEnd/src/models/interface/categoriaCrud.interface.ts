import { Categoria } from "../categoria";

export interface CategoriaCrud {
    getCategorias():Promise<Array<Categoria>>;
    getCategoria(id:string):Promise<Categoria>;
    addCategoria(categoria: Categoria):Promise<Categoria>;
    deleteCategoria(id:string):void;
    editCategoria(id:string,nombre:string):Promise<Categoria>;
    size():number;
}