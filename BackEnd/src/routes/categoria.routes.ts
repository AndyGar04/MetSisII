import {Router} from 'express';
import CategoriaController from './../../src/controllers/categoria.controller'

const categoriaRoute = Router();

categoriaRoute.get("/", CategoriaController.getCategorias);
categoriaRoute.get("/:id", CategoriaController.getCategoria);
categoriaRoute.post("/", CategoriaController.addCategoria);
categoriaRoute.delete("/:id", CategoriaController.deleteCategoria);
categoriaRoute.put("/:id", CategoriaController.editCategoria);

//Funcionan!

export default categoriaRoute;