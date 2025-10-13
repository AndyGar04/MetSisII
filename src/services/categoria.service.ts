import { CategoriaCrud } from "../models/interface/categoriaCrud.interface.js";
import { Categoria } from "../models/categoria.js";
import CategoriaModel from './../models/implementations/mockCategoria.js';

class CategoriaService implements CategoriaCrud{
    getCategoria(id: string): Promise<Categoria> {
        return CategoriaModel.getCategoria(id);
    }
    getCategorias(): Promise<Array<Categoria>> {
        return CategoriaModel.getCategorias();
    }
    addCategoria(categoria: Categoria): Promise<Categoria> {
        return CategoriaModel.addCategoria(categoria);
    }
    deleteCategoria(id: string): Promise<void> {
        return CategoriaModel.deleteCategoria(id);
    }
    editCategoria(id: string, nombre: string): Promise<Categoria> {
        return CategoriaModel.editCategoria(id, nombre);
    }
    size(): number {
        return CategoriaModel.size();
    }
}

export default new CategoriaService();