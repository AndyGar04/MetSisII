import { ProductoCrud } from "../interface/productoCrud.interface";
import { Producto } from "../producto";
import { Categoria } from "../categoria";

export class MockProducto implements ProductoCrud{
    protected tam: number;
    protected container: Array<Producto>;
    protected id: number;
    constructor(){
        this.id = 21;
        this.tam = 20;
        this.container = new Array<Producto>;
        this.initializeProductos();
    }

    private initializeProductos(): void {
        // Mapa de categorías con sus IDs reales
        const categoriasMap: { [key: string]: { id: string, nombre: string } } = {
            "Electrónica": { id: "1", nombre: "Electrónica" },
            "Ropa": { id: "2", nombre: "Ropa" },
            "Alimentos": { id: "3", nombre: "Alimentos" },
            "Deportes": { id: "4", nombre: "Deportes" },
            "Hogar": { id: "5", nombre: "Hogar" },
            "Juguetes": { id: "6", nombre: "Juguetes" },
            "Libros": { id: "7", nombre: "Libros" },
            "Belleza": { id: "8", nombre: "Belleza" }
        };

        const productosIniciales = [
            { id: "1", nombre: "Laptop HP", categoria: "Electrónica", cantidad: 15, precio: 899.99 },
            { id: "2", nombre: "Mouse Logitech", categoria: "Electrónica", cantidad: 50, precio: 25.99 },
            { id: "3", nombre: "Teclado Mecánico", categoria: "Electrónica", cantidad: 30, precio: 79.99 },
            { id: "4", nombre: "Camiseta Deportiva", categoria: "Ropa", cantidad: 100, precio: 19.99 },
            { id: "5", nombre: "Pantalón Jeans", categoria: "Ropa", cantidad: 75, precio: 49.99 },
            { id: "6", nombre: "Zapatillas Nike", categoria: "Ropa", cantidad: 40, precio: 89.99 },
            { id: "7", nombre: "Arroz 1kg", categoria: "Alimentos", cantidad: 200, precio: 2.99 },
            { id: "8", nombre: "Aceite de Oliva", categoria: "Alimentos", cantidad: 80, precio: 8.99 },
            { id: "9", nombre: "Pasta 500g", categoria: "Alimentos", cantidad: 150, precio: 1.99 },
            { id: "10", nombre: "Balón de Fútbol", categoria: "Deportes", cantidad: 25, precio: 29.99 },
            { id: "11", nombre: "Raqueta de Tenis", categoria: "Deportes", cantidad: 20, precio: 79.99 },
            { id: "12", nombre: "Pesas 5kg", categoria: "Deportes", cantidad: 35, precio: 34.99 },
            { id: "13", nombre: "Sábanas Queen", categoria: "Hogar", cantidad: 45, precio: 39.99 },
            { id: "14", nombre: "Toallas de Baño", categoria: "Hogar", cantidad: 60, precio: 12.99 },
            { id: "15", nombre: "Lámpara LED", categoria: "Hogar", cantidad: 55, precio: 24.99 },
            { id: "16", nombre: "Muñeca Barbie", categoria: "Juguetes", cantidad: 70, precio: 19.99 },
            { id: "17", nombre: "Lego Star Wars", categoria: "Juguetes", cantidad: 30, precio: 59.99 },
            { id: "18", nombre: "El Principito", categoria: "Libros", cantidad: 90, precio: 12.99 },
            { id: "19", nombre: "Harry Potter Set", categoria: "Libros", cantidad: 40, precio: 89.99 },
            { id: "20", nombre: "Crema Facial", categoria: "Belleza", cantidad: 85, precio: 24.99 }
        ];

        productosIniciales.forEach(prod => {
            const catInfo = categoriasMap[prod.categoria];
            if (!catInfo) {
                throw new Error(`Categoría no encontrada: ${prod.categoria}`);
            }
            const categoria = new Categoria(catInfo.id, catInfo.nombre);
            const producto = new Producto(prod.id, prod.nombre, categoria, prod.cantidad, prod.precio);
            this.container.push(producto);
        });
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
            return producto.getCategoria().getNombre() === categoria.getNombre();
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