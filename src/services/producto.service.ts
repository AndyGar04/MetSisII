import { Categoria } from "../models/categoria.js";
import { ProductoCrud } from "../models/interface/productoCrud.interface.js";
import { Producto } from "../models/producto.js";
import ProductoModel from "./../models/implementations/mockProductos.js";

class ProductoService implements ProductoCrud{
    getProducto(id: string): Promise<Producto> {
        return ProductoModel.getProducto(id);
    }
    getProductos(): Promise<Array<Producto>> {
        return ProductoModel.getProductos();
    }
    getProductosCategoria(categoria: Categoria): Promise<Array<Producto>> {
        return ProductoModel.getProductosCategoria(categoria);
    }
    addProducto(producto: Producto): Promise<Producto> {
        return ProductoModel.addProducto(producto);
    }
    editProduto(id: string, nombre: string, categoria: Categoria, cantidad: number, precio: number): Promise<Producto> {
        return ProductoModel.editProduto(id, nombre, categoria, cantidad, precio);
    }
    editProductoCantidad(id: string, cantidad: number): Promise<Producto> {
        return ProductoModel.editProductoCantidad(id, cantidad);
    }
    editProductoPrecio(id: string, precio: number): Promise<Producto> {
        return ProductoModel.editProductoPrecio(id, precio);
    }
    deleteProducto(id: string): Promise<void> {
        return ProductoModel.deleteProducto(id);
    }
    size(): number {
        return ProductoModel.size();
    }
}
export default new ProductoService();