import { Request, Response } from "express";
import categoriaService from "../services/categoria.service.js";
import { Categoria } from "../models/categoria.js";

class CategoriaController { 
    public async getCategoria (req: Request, res: Response){
        const id = req.params.id;
        if(!id){
            res.status(402).json({message:"Id no parametrizado"});
        }else{
            try{
                const categoria = await categoriaService.getCategoria(id);
                res.status(200).json(categoria);
            }catch(error){
                if(error instanceof Error){
                    res.status(404).json({
                        message: error.message
                    })
                }
            }
        }
    }

    public async getCategorias (req: Request, res: Response){
        const categorias = await categoriaService.getCategorias();
        res.status(200).json(categorias); 
    }

    public async addCategoria(req: Request, res: Response){
        const categoria = req.body;
        const nuevaCategoria = await categoriaService.addCategoria(categoria);
        res.status(202).json(nuevaCategoria);
    }

    public deleteCategoria(req: Request, res: Response){
        const id = req.params.id;
        if(!id){
            res.status(402).json({message: "Id no definido"});
        }else{
            try{
                categoriaService.deleteCategoria(id);
                res.status(200).json({message: "Tarea eliminada"});
            }catch(error){
                if (error instanceof Error){
                    res.status(404).json({message: error});
                }
            }
        }
    }

    public async editCategoria(req: Request, res: Response){
        const id = req.params.id;
        const nombre = req.body.nombre;
        if(!id){
            res.status(402).json(
                {message: "Id no definido"}
            );
            if(!nombre){
                res.status(402).json(
                {message: "Categoria incorrecta"}
            );
            }
        }else{
            try{
                const categoriaModificada = await categoriaService.editCategoria(id, nombre);
                res.status(200).json(categoriaModificada);
            }catch(error){
                if(error instanceof Error)
                    res.status(404).json({message:error.message})
            }
        } 
    }

    public size(req:Request, res:Response){
        res.status(200).json({size: categoriaService.size()})
    }
}

export default new CategoriaController();