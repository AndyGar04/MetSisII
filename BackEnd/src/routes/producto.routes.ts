import { Router } from "express";
import ProductoController from "../../src/controllers/productos.controller";

const productoRoute = Router();

productoRoute.get("/", ProductoController.getProductos);
productoRoute.get("/:id", ProductoController.getProducto);
productoRoute.post("/", ProductoController.addProducto);
productoRoute.delete("/:id", ProductoController.deleteProducto);

// Distintas rutas PUT
productoRoute.put("/:id", ProductoController.editProducto); // editar todo el producto
productoRoute.put("/:id/precio", ProductoController.editProductoPrecio); // editar solo precio
productoRoute.put("/:id/cantidad", ProductoController.editProductoCantidad); // editar solo cantidad

export default productoRoute;
