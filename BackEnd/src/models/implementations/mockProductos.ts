import { ProductoCrud } from "../interface/productoCrud.interface.js";
import { Producto } from "../producto.js";
import { Categoria } from "../categoria.js";

export class MockProducto implements ProductoCrud{
    protected tam: number;
    protected container: Array<Producto>;
    protected id: number;
    constructor(){
        this.id = 1;
        this.tam = 0;
        this.container = new Array<Producto>;
    }

    getProductos(): Promise<Array<Producto>> {
        return new Promise<Array<Producto>>((resolve)=>{
            resolve(this.container);
        });
    }

    getProducto(id: string): Promise<Producto> {
        return new Promise<Producto>((resolve, rejects)=>{
            const resultadoBusqueda = this.container.find((producto: Producto)=>{
                return producto.getId() == id;
            });
            if (!resultadoBusqueda){
                rejects(new Error("No esta el id"));
            }else{
                resolve(resultadoBusqueda);
            }
        })
    }

    getProductosCategoria(categoria: Categoria): Promise<Array<Producto>> {
        return new Promise<Array<Producto>>((resolve, reject) => {
        const resultadoBusqueda: Array<Producto> = this.container.filter((producto: Producto) => {
            return producto.getCategoria() === categoria;
        });

        if (resultadoBusqueda.length === 0) {
            reject(new Error("No hay productos con esa categoría"));
        } else {
            resolve(resultadoBusqueda);
        }
    });
    }

    addProducto(producto: Producto): Promise<Producto> {
        return new Promise<Producto>((resolve)=>{
            producto.setId((this.id + ""));
            this.container.push(producto);
            this.id++;
            this.tam++;
            resolve(producto);
        });
    }

    deleteProducto(id: string): Promise<void> {
        return new Promise<void>((resolve, rejects) => {
            const index = this.container.findIndex((p: Producto) => p.getId() == id);

            if (index === -1) {
                rejects(new Error("No existe el producto con ese id"));
            } else {
                this.container.splice(index, 1);
                this.tam--;
                resolve();
            }
        }); 
    }

    editProduto(id: string, nombre: string, categoria: Categoria, cantidad: number, precio: number): Promise<Producto> {
        return new Promise<Producto>((resolve, rejects)=>{
            const productoAModificar = this.container.find(
                (produto: Producto) => produto.getId()==id
            );
            if(!productoAModificar){
                rejects(new Error("El producto no fue encontrado"));
            }else{
                productoAModificar.setNombre(nombre);
                productoAModificar.setCategoria(categoria);
                productoAModificar.setCantidad(cantidad);
                productoAModificar.setPrecio(precio);
                resolve(productoAModificar);
            }
        });
    }
    
    size(): number {
        return this.container.length;
    }

}

export default new MockProducto();