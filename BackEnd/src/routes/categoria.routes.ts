import {Router} from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import CategoriaController from './../controllers/categoria.controller';

const categoriaRoute = Router();

categoriaRoute.get("/", CategoriaController.getCategorias);
categoriaRoute.get("/:id", CategoriaController.getCategoria);
categoriaRoute.post("/", authMiddleware, CategoriaController.addCategoria);
categoriaRoute.delete("/:id", authMiddleware, CategoriaController.deleteCategoria);
categoriaRoute.put("/:id", authMiddleware, CategoriaController.editCategoria);

//Funcionan!

export default categoriaRoute;