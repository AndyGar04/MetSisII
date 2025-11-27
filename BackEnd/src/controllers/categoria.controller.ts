import { Request, Response } from "express";
import categoriaService from "../services/categoria.service";
import { Categoria } from "../models/categoria";

class CategoriaController { 
    
    public async getCategoria(req: Request, res: Response) {
        try {
            const id = req.params.id;
            
            if (!id) {
                return res.status(400).json({ message: "Id no parametrizado" });
            }

            const categoria = await categoriaService.getCategoria(id);
            
            if (!categoria) {
                return res.status(404).json({ message: "categoria no encontrada" }); 
            }

            return res.status(200).json(categoria);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Error desconocido";
            return res.status(500).json({ message: errorMessage });
        }
    }

    public async getCategorias(req: Request, res: Response) {
        try {
            const categorias = await categoriaService.getCategorias();
            return res.status(200).json(categorias); 
        } catch (error) {
            return res.status(500).json({ message: "Error al obtener categorias" });
        }
    }

    public async addCategoria(req: Request, res: Response) {
        try {
            const { id, nombre } = req.body;

            if (!id || !nombre) {
                return res.status(400).json({ message: "Faltan datos requeridos: id y nombre" });
            }
            
            if (typeof nombre !== 'string' || nombre.trim().length === 0) {
                return res.status(400).json({ message: "El nombre debe ser un texto válido" });
            }

            const categoria = new Categoria(id, nombre);
            const nuevaCategoria = await categoriaService.addCategoria(categoria);
            
            return res.status(201).json(nuevaCategoria);
        } catch (error) {
            return res.status(500).json({ message: "Error al agregar categoria", error });
        }    
    }

    public async deleteCategoria(req: Request, res: Response) {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({ message: "Id no definido" });
            }

            await categoriaService.deleteCategoria(id);
            return res.status(200).json({ message: "categoria eliminada" });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Error al eliminar";
            return res.status(404).json({ message: errorMessage });
        }
    }

    public async editCategoria(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const { nombre } = req.body;

            if (!id) {
                return res.status(400).json({ message: "Id no definido" });
            }

            if (!nombre || typeof nombre !== 'string' || nombre.trim().length === 0) {
                return res.status(400).json({ message: "Nombre de categoria inválido" });
            }

            const categoriaModificada = await categoriaService.editCategoria(id, nombre);
            return res.status(200).json(categoriaModificada);

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Error al editar";
            return res.status(404).json({ message: errorMessage });
        } 
    }

    public size(req: Request, res: Response) {
        return res.status(200).json({ size: categoriaService.size() });
    }
}

export default new CategoriaController();