import { Router } from "express";
import CategoriaController from "../../src/controllers/categorias.controller";

const categoriaRoute = Router();

categoriaRoute.get("/", (req, res) => CategoriaController.getCategorias(req, res));
categoriaRoute.get("/:id", (req, res) => CategoriaController.getCategoria(req, res));
categoriaRoute.post("/", (req, res) => CategoriaController.addCategoria(req, res));
categoriaRoute.delete("/:id", (req, res) => CategoriaController.deleteCategoria(req, res));
categoriaRoute.put("/:id", (req, res) => CategoriaController.editCategoria(req, res));

export default categoriaRoute;
