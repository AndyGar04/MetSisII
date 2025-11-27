import {Router} from 'express';
import ProductoController from './../controllers/productos.controller';

const productoRoute = Router();

productoRoute.get("/", ProductoController.getProductos);
productoRoute.get("/:id", ProductoController.getProducto);
productoRoute.post("/", ProductoController.addProducto);
productoRoute.delete("/:id", ProductoController.deleteProducto);
productoRoute.put("/:id", ProductoController.editProducto);

export default productoRoute;