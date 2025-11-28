import {Router} from 'express';
import ProductoController from './../controllers/productos.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const productoRoute = Router();

productoRoute.get("/", ProductoController.getProductos);
productoRoute.get("/:id", ProductoController.getProducto);
productoRoute.post("/", authMiddleware, ProductoController.addProducto);
productoRoute.delete("/:id", authMiddleware, ProductoController.deleteProducto);
productoRoute.put("/:id", authMiddleware, ProductoController.editProducto);

export default productoRoute;