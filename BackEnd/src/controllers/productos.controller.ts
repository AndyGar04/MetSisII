import { Request, Response } from "express";
import productoService from "../services/producto.service";
import { Producto } from "../models/producto";
import { Categoria } from "../models/categoria";

class ProductoController {

    public async getProducto(req: Request, res: Response) {
        try {
            const id = req.params.id;
            if (!id) return res.status(400).json({ message: "ID requerido" });

            const producto = await productoService.getProducto(id);
            
            if (!producto) {
                return res.status(404).json({ message: "Producto no encontrado" });
            }

            return res.status(200).json(producto);
        } catch (error) {
            return res.status(500).json({ message: "Error interno del servidor", error });
        }
    }

    public async getProductos(req: Request, res: Response) {
        try {
            const productos = await productoService.getProductos();
            return res.status(200).json(productos);
        } catch (error) {
            return res.status(500).json({ message: "Error al listar productos" });
        }
    }

    public async addProducto(req: Request, res: Response) {
        try {
            const { id, nombre, categoria, cantidad, precio } = req.body;

            if (!id || !nombre || !categoria || cantidad === undefined || precio === undefined) {
                return res.status(400).json({ message: "Faltan datos requeridos (id, nombre, categoria, cantidad, precio)" });
            }

            if (typeof nombre !== 'string' || nombre.trim() === '') {
                return res.status(400).json({ message: "El nombre debe ser un texto válido" });
            }

            if (isNaN(cantidad) || cantidad < 0) {
                return res.status(400).json({ message: "La cantidad debe ser un número mayor o igual a 0" });
            }

            if (isNaN(precio) || precio < 0) {
                return res.status(400).json({ message: "El precio debe ser un número positivo" });
            }

            if (!categoria.id || !categoria.nombre) {
                return res.status(400).json({ message: "La categoría enviada es inválida" });
            }

            try {
                const productoExiste = await productoService.getProducto(id);
                if (productoExiste) {
                    return res.status(409).json({ message: `El producto con id ${id} ya existe` });
                }
            } catch (ignored) {
                // No existe, continuamos felices
            }

            const nuevaCategoria = new Categoria(categoria.id, categoria.nombre);
            const nuevoProducto = new Producto(id, nombre, nuevaCategoria, cantidad, precio);

            const result = await productoService.addProducto(nuevoProducto);
            return res.status(201).json(result);

        } catch (error) {
            return res.status(500).json({ message: "Error al crear producto", error });
        }
    }

    public async editProducto(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const { nombre, categoria, cantidad, precio } = req.body;

            if (!id) return res.status(400).json({ message: "ID no definido" });

            if (!nombre || !categoria || cantidad === undefined || precio === undefined) {
                return res.status(400).json({ message: "Faltan datos para editar" });
            }
            if (precio < 0 || cantidad < 0) {
                return res.status(400).json({ message: "Precio o cantidad invalidos" });
            }

            const prodEditado = await productoService.editProduto(id, nombre, categoria, cantidad, precio);
            return res.status(200).json(prodEditado);

        } catch (error) {
            return res.status(404).json({ message: "Error al editar o producto no encontrado" });
        }
    }

    public async deleteProducto(req: Request, res: Response) {
        try {
            const id = req.params.id;
            if (!id) return res.status(400).json({ message: "ID requerido" });

            await productoService.deleteProducto(id);
            return res.status(200).json({ message: "Producto eliminado" });
        } catch (error) {
            return res.status(404).json({ message: "No se pudo eliminar el producto" });
        }
    }
}

export default new ProductoController();