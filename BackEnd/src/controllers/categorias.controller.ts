import { Request, Response } from "express";
import categoriaService from "../services/categoria.service";
import { Categoria } from "../models/categoria";

class CategoriaController {
    public async getCategorias(req: Request, res: Response) {
        const categorias = await categoriaService.getCategorias();
        res.status(200).json(categorias);
    }

    public async getCategoria(req: Request, res: Response) {
        const id = req.params.id;
        try {
            if (!id || typeof id !== "string") {
                return res.status(400).json({ message: "El ID es requerido y debe ser un string" });
            }
            const categoria = await categoriaService.getCategoria(id);
            res.status(200).json(categoria);
        } catch (error) {
            res.status(404).json({ message: "Categoría no encontrada" });
        }
    }

    public async addCategoria(req: Request, res: Response) {
        try {
            const { nombre } = req.body;
            const nuevaCategoria = new Categoria(nombre);
            const categoriaCreada = await categoriaService.addCategoria(nuevaCategoria);
            res.status(201).json(categoriaCreada);
        } catch (error) {
            res.status(500).json({ message: "Error al crear la categoría" });
        }
    }

    public async deleteCategoria(req: Request, res: Response) {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ message: "El ID es requerido" });
        }
        try {
            await categoriaService.deleteCategoria(id);
            res.status(200).json({ message: "Categoría eliminada" });
        } catch (error) {
            res.status(404).json({ message: "No se encontró la categoría" });
        }
    }

    public async editCategoria(req: Request, res: Response) {
        const id = req.params.id;
        const { nombre } = req.body;
        if (!id || typeof id !== "string") {
            return res.status(400).json({ message: "El ID es requerido y debe ser un string" });
        }
        if (!nombre) {
            return res.status(400).json({ message: "El nombre es requerido" });
        }
        try {
            const categoriaModificada = await categoriaService.editCategoria(id, nombre);
            res.status(200).json(categoriaModificada);
        } catch (error) {
            res.status(404).json({ message: "Error al modificar la categoría" });
        }
    }
}

export default new CategoriaController();
