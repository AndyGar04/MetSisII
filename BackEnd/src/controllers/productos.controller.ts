import { Request, Response } from 'express';
import ProductoService from '../services/producto.service';
import { Producto } from '../models/producto';
import { Categoria } from '../models/categoria';
import productoService from '../services/producto.service';
import categoriaService from '../services/categoria.service';

class ProductoController{
    public async getProducto(req: Request, res:Response){
        const id = req.params.id;
        if(!id){
            res.status(402).json({message: "Id no definido"});
        }else{
            try{
                const producto = await ProductoService.getProducto(id);
                res.status(200).json(producto);
            }catch(error){
                if (error instanceof Error){
                    res.status(404).json({
                        message: error.message
                    })
                }
            }
        }
    }

    public async getProductos(req: Request, res: Response){
        const producto = await ProductoService.getProductos();
        res.status(200).json(producto);
    }

    public async addProducto(req: Request, res: Response){
        try{
            const {id, nombre, categoria, cantidad, precio} = req.body;
            let categoriaInstancia: Categoria;

            if(!id){
                return res.status(402).json({message: "Id no definido"});
            }
            if(nombre === undefined || categoria === undefined || cantidad === undefined || precio === undefined || nombre === '' || categoria === '' || cantidad === '' || precio === ''){ 
                return  res.status(402).json({message: "Parametros incompletos"});
            }
            
            try{
                categoriaInstancia = await categoriaService.getCategoria(categoria.id);
            }catch(error){
                return res.status(404).json({message: "Categoria no encontrada"});
            }

            const nuevoProducto = new Producto(id, nombre, categoriaInstancia, cantidad, precio);
            const nuevoProductoCompleto = await ProductoService.addProducto(nuevoProducto);
            res.status(202).json(nuevoProductoCompleto);
        }catch(error){
            res.status(500).json({message: "Error al agregar producto", error})
        }
    }

    public async deleteProducto(req: Request, res: Response){
        const id = req.params.id;
        if(!id){
            res.status(402).json(
                {message: "Id no definido"}
            );
        }else{
            try{
                ProductoService.deleteProducto(id);
                res.status(200).json({message: "Producto eliminado"})
            }catch(error){
                if(error instanceof Error){
                    res.status(404).json({message:error});
                }
            }
        }
    }

    public async editProducto(req:Request, res:Response){
        const id = req.params.id;
        const nombre = req.body.nombre;
        const categoria = req.body.categoria;
        const cantidad = req.body.cantidad;
        const precio = req.body.precio;

        if(!id || !nombre || !categoria || !cantidad || !precio){
            res.status(402).json(
                    {message: "Parametros incorrectos"}
                );
            
        }else{
            try{
                const productoModificado = await productoService.editProduto(id, nombre, categoria, cantidad, precio);
                res.status(200).json(productoModificado);
            }catch(error){
                if(error instanceof Error)
                    res.status(404).json({message:error.message})
                }
        }    
    }

    public async editProductoPrecio(req:Request, res:Response){
        const id = req.params.id;
        const precio = req.body.precio;

        if(!id || !precio){
            res.status(402).json(
                    {message: "Parametros incorrectos"}
                );
            
        }else{
            try{
                const productoModificado = await productoService.editProductoPrecio(id, precio);
                res.status(200).json(productoModificado);
            }catch(error){
                if(error instanceof Error)
                    res.status(404).json({message:error.message})
                }
        }    
    }
    public async editProductoCantidad(req:Request, res:Response){
        const id = req.params.id;
        const cantidad = req.body.cantidad;

        if(!id || !cantidad){
            res.status(402).json(
                    {message: "Parametros incorrectos"}
                );
            
        }else{
            try{
                const productoModificado = await productoService.editProductoPrecio(id, cantidad);
                res.status(200).json(productoModificado);
            }catch(error){
                if(error instanceof Error)
                    res.status(404).json({message:error.message})
                }
        }    
    }

    public size(req:Request, res:Response){
        res.status(200).json({size: productoService.size()})
    }
} 
export default new ProductoController();