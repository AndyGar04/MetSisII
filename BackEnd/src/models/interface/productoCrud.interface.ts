import { Producto } from "../producto";
import { Categoria } from "../categoria";

export interface ProductoCrud {
    getProductos():Promise<Array<Producto>>;
    getProductosCategoria(categoria: Categoria):Promise<Array<Producto>>;
    getProducto(id:string):Promise<Producto>;
    addProducto(producto: Producto):Promise<Producto>;
    deleteProducto(id:string):void;
    editProduto(id:string, nombre:string, categoria: Categoria, cantidad: number, precio:number):Promise<Producto>;
    size():number;
}