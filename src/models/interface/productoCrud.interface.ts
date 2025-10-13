import { Producto } from "../producto.js";
import { Categoria } from "../categoria.js";

export interface ProductoCrud {
    getProductos():Promise<Array<Producto>>;
    getProductosCategoria(categoria: Categoria):Promise<Array<Producto>>;
    getProducto(id:string):Promise<Producto>;
    addProducto(producto: Producto):Promise<Producto>;
    deleteProducto(id:string):void;
    editProduto(id:string, nombre:string, categoria: Categoria, cantidad: number, precio:number):Promise<Producto>;
    editProductoPrecio(id:string, precio:number):Promise<Producto>;
    editProductoCantidad(id: string, cantidad: number): Promise<Producto>;
    size():number;
}