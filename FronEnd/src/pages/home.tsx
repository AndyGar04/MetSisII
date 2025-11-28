import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { getProductos, getCategorias } from "../api";

interface Producto {
  id: string;
  nombre: string;
  precio: number;
  cantidad: number;
  categoria: {
    id: string;
    nombre: string;
  };
}

interface Categoria {
  id: string;
  nombre: string;
}

export default function Home() {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>("Todas");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productosData, categoriasData] = await Promise.all([
          getProductos(),
          getCategorias()
        ]);
        setProductos(productosData);
        setCategorias(categoriasData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al cargar datos");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const productosFiltrados = categoriaSeleccionada === "Todas"
    ? productos
    : productos.filter(p => {
        const match = p.categoria?.nombre === categoriaSeleccionada;
        console.log(`Producto: ${p.nombre}, Categoría: "${p.categoria?.nombre}", Buscando: "${categoriaSeleccionada}", Match: ${match}`);
        return match;
      });

  console.log("Categoría seleccionada:", categoriaSeleccionada);
  console.log("Productos totales:", productos.length);
  console.log("Productos filtrados:", productosFiltrados.length);

  const handleAddToCart = (producto: Producto) => {
    addToCart({ 
      id: parseInt(producto.id), 
      nombre: producto.nombre, 
      precio: producto.precio, 
      imagen: "/img/producto-default.png",
      cantidad: 1 
    });
    navigate("/cart");
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6 mt-24 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6 mt-24 text-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 mt-24">
      <h2 className="text-4xl font-extrabold mb-6 text-center text-gray-800">
        Catálogo de Productos
      </h2>
      
      {/* Filtro de Categorías */}
      <div className="mb-8 flex justify-center">
        <div className="inline-flex flex-wrap gap-2 bg-white p-4 rounded-lg shadow-md">
          <button
            onClick={() => setCategoriaSeleccionada("Todas")}
            className={`px-4 py-2 rounded-full transition-all duration-300 ${
              categoriaSeleccionada === "Todas"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Todas
          </button>
          {categorias.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoriaSeleccionada(cat.nombre)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                categoriaSeleccionada === cat.nombre
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {cat.nombre}
            </button>
          ))}
        </div>
      </div>

      {/* Productos */}
      {productosFiltrados.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          No hay productos en esta categoría
        </div>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {productosFiltrados.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-2xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300"
            >
              <div className="overflow-hidden rounded-xl bg-gray-100">
                <div className="w-full h-48 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">{prod.categoria.nombre}</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold mt-4 text-gray-800">
                {prod.nombre}
              </h3>
              <p className="text-gray-500 text-sm mt-1">{prod.categoria.nombre}</p>
              <p className="text-gray-700 mt-2 text-lg font-bold">${prod.precio.toLocaleString()}</p>
              <p className="text-gray-500 text-sm">Stock: {prod.cantidad}</p>
              <button
                onClick={() => handleAddToCart(prod)}
                disabled={prod.cantidad === 0}
                className={`mt-5 px-6 py-2 rounded-full shadow-lg transition-all duration-300 ${
                  prod.cantidad === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-blue-500"
                }`}
              >
                {prod.cantidad === 0 ? "Sin Stock" : "Agregar al carrito"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
