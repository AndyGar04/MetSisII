import { useEffect, useState } from "react";
import { getProductos, getCategorias } from "./api";
import { ShoppingBag, Search, ShoppingCart, Trash2 } from "lucide-react";

function App() {
  const [productos, setProductos] = useState<any[]>([]);
  const [categorias, setCategorias] = useState<any[]>([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busqueda, setBusqueda] = useState("");
  const [carrito, setCarrito] = useState<any[]>([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prod, cat] = await Promise.all([getProductos(), getCategorias()]);
        setProductos(prod);
        setCategorias(cat);
      } catch {
        setError("No se pudo conectar con el backend 😢");
      }
    };
    fetchData();
  }, []);

  const productosFiltrados = productos.filter(
    (p) =>
      (!categoriaSeleccionada || p.categoriaId === categoriaSeleccionada) &&
      p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const agregarAlCarrito = (producto: any) => {
    setCarrito((prev) => [...prev, producto]);
  };

  const eliminarDelCarrito = (id: number) => {
    setCarrito((prev) => prev.filter((p) => p.id !== id));
  };

  const total = carrito.reduce((acc, p) => acc + p.precio, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-sans">
      {/* Header */}
      <header className="flex items-center justify-between px-10 py-5 bg-white shadow-md sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <ShoppingBag size={30} className="text-indigo-600" />
          <h1 className="text-3xl font-bold text-gray-800">Tienda Online</h1>
        </div>

        <div className="flex items-center gap-4">
          {/* Buscador */}
          <div className="flex items-center bg-gray-100 rounded-xl px-3 py-1">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Buscar producto..."
              className="bg-transparent outline-none px-2 text-sm"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>

          {/* Botón carrito */}
          <div className="relative">
            <button
              onClick={() => setMostrarCarrito(!mostrarCarrito)}
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition"
            >
              <ShoppingCart size={18} />
              <span>({carrito.length})</span>
            </button>

            {mostrarCarrito && (
              <div className="absolute right-0 mt-3 w-72 bg-white border rounded-xl shadow-lg p-4 z-30">
                <h3 className="font-semibold text-lg text-gray-700 mb-2">🛒 Carrito</h3>
                {carrito.length === 0 ? (
                  <p className="text-gray-500 text-sm">Tu carrito está vacío</p>
                ) : (
                  <ul className="space-y-2 max-h-60 overflow-y-auto">
                    {carrito.map((item, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center border-b pb-1"
                      >
                        <span className="text-sm">{item.nombre}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-indigo-600">
                            ${item.precio}
                          </span>
                          <button
                            onClick={() => eliminarDelCarrito(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}

                {carrito.length > 0 && (
                  <div className="mt-3 border-t pt-2 text-right">
                    <p className="text-gray-700 font-semibold">Total: ${total.toFixed(2)}</p>
                    <button className="mt-2 bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 text-sm">
                      Finalizar compra
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col md:flex-row gap-10 p-10">
        {/* Categorías */}
        <aside className="md:w-64 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">
            Categorías
          </h2>
          <ul className="space-y-2">
            {categorias.map((c) => (
              <li
                key={c.id}
                onClick={() => setCategoriaSeleccionada(c.id)}
                className={`cursor-pointer px-3 py-2 rounded-lg transition ${
                  categoriaSeleccionada === c.id
                    ? "bg-indigo-100 text-indigo-700 font-medium"
                    : "hover:bg-indigo-50 text-gray-600"
                }`}
              >
                {c.nombre}
              </li>
            ))}
          </ul>
        </aside>

        {/* Productos */}
        <section className="flex-1 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">
            Productos
          </h2>

          {error && <p className="text-red-600 mb-4">{error}</p>}

          {productosFiltrados.length === 0 ? (
            <p className="text-gray-500">No se encontraron productos</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {productosFiltrados.map((p) => (
                <div
                  key={p.id}
                  className="bg-white border rounded-2xl p-4 shadow-sm hover:shadow-xl transition-transform hover:-translate-y-1"
                >
                  <img
                    src={p.imagen || "https://via.placeholder.com/300x200"}
                    alt={p.nombre}
                    className="w-full h-40 object-cover rounded-xl mb-3"
                  />
                  <h3 className="font-semibold text-lg text-gray-800">{p.nombre}</h3>
                  <p className="text-gray-600 text-sm mb-1">Stock: {p.stock}</p>
                  <p className="text-indigo-600 font-bold text-lg">${p.precio}</p>
                  <button
                    onClick={() => agregarAlCarrito(p)}
                    className="mt-3 w-full bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 transition"
                  >
                    Agregar al carrito
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 py-4">
        © 2025 Tienda Online
      </footer>
    </div>
  );
}

export default App;
