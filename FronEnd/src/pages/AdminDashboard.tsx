import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { LogOut, User, Plus, Edit2, Trash2, Package, Tags } from "lucide-react";
import {
  getProductos,
  getCategorias,
  createProducto,
  updateProducto,
  deleteProducto,
  createCategoria,
  updateCategoria,
  deleteCategoria,
} from "../api";

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

type TabType = "productos" | "categorias";

export function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("productos");

  // Estado Productos
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loadingProductos, setLoadingProductos] = useState(true);

  // Estado Categorías
  const [loadingCategorias, setLoadingCategorias] = useState(true);

  // Modal Producto
  const [showProductoModal, setShowProductoModal] = useState(false);
  const [editingProducto, setEditingProducto] = useState<Producto | null>(null);
  const [productoForm, setProductoForm] = useState({
    nombre: "",
    categoriaId: "",
    cantidad: 0,
    precio: 0,
  });

  // Modal Categoría
  const [showCategoriaModal, setShowCategoriaModal] = useState(false);
  const [editingCategoria, setEditingCategoria] = useState<Categoria | null>(null);
  const [categoriaForm, setCategoriaForm] = useState({ nombre: "" });

  // Cargar datos
  useEffect(() => {
    fetchProductos();
    fetchCategorias();
  }, []);

  const fetchProductos = async () => {
    try {
      const data = await getProductos();
      setProductos(data);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    } finally {
      setLoadingProductos(false);
    }
  };

  const fetchCategorias = async () => {
    try {
      const data = await getCategorias();
      setCategorias(data);
    } catch (error) {
      console.error("Error al cargar categorías:", error);
    } finally {
      setLoadingCategorias(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  // Handlers Productos
  const openProductoModal = (producto?: Producto) => {
    if (producto) {
      setEditingProducto(producto);
      setProductoForm({
        nombre: producto.nombre,
        categoriaId: producto.categoria.id,
        cantidad: producto.cantidad,
        precio: producto.precio,
      });
    } else {
      setEditingProducto(null);
      setProductoForm({ nombre: "", categoriaId: "", cantidad: 0, precio: 0 });
    }
    setShowProductoModal(true);
  };

  const handleSaveProducto = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const categoria = categorias.find((c) => c.id === productoForm.categoriaId);
      if (!categoria) {
        alert("Selecciona una categoría válida");
        return;
      }

      const productoData = {
        id: editingProducto?.id || String(Date.now()),
        nombre: productoForm.nombre,
        categoria: { id: categoria.id, nombre: categoria.nombre },
        cantidad: productoForm.cantidad,
        precio: productoForm.precio,
      };

      if (editingProducto) {
        await updateProducto(editingProducto.id, productoData);
      } else {
        await createProducto(productoData);
      }

      setShowProductoModal(false);
      fetchProductos();
    } catch (error) {
      console.error("Error al guardar producto:", error);
      alert("Error al guardar producto");
    }
  };

  const handleDeleteProducto = async (id: string) => {
    if (confirm("¿Estás seguro de eliminar este producto?")) {
      try {
        await deleteProducto(id);
        fetchProductos();
      } catch (error) {
        console.error("Error al eliminar producto:", error);
        alert("Error al eliminar producto");
      }
    }
  };

  // Handlers Categorías
  const openCategoriaModal = (categoria?: Categoria) => {
    if (categoria) {
      setEditingCategoria(categoria);
      setCategoriaForm({ nombre: categoria.nombre });
    } else {
      setEditingCategoria(null);
      setCategoriaForm({ nombre: "" });
    }
    setShowCategoriaModal(true);
  };

  const handleSaveCategoria = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCategoria) {
        await updateCategoria(editingCategoria.id, categoriaForm);
      } else {
        await createCategoria(categoriaForm);
      }

      setShowCategoriaModal(false);
      fetchCategorias();
      fetchProductos(); // Actualizar productos también
    } catch (error) {
      console.error("Error al guardar categoría:", error);
      alert("Error al guardar categoría");
    }
  };

  const handleDeleteCategoria = async (id: string) => {
    if (confirm("¿Estás seguro de eliminar esta categoría?")) {
      try {
        await deleteCategoria(id);
        fetchCategorias();
        fetchProductos();
      } catch (error) {
        console.error("Error al eliminar categoría:", error);
        alert("Error al eliminar categoría");
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <User className="text-blue-600" size={24} />
            <div>
              <h2 className="font-semibold text-gray-800">{user?.name}</h2>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            <LogOut size={18} />
            Cerrar Sesión
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Panel de Administración</h1>

          {/* Tabs */}
          <div className="flex gap-4 mb-6 border-b">
            <button
              onClick={() => setActiveTab("productos")}
              className={`flex items-center gap-2 px-4 py-2 font-medium transition ${
                activeTab === "productos"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              <Package size={20} />
              Productos
            </button>
            <button
              onClick={() => setActiveTab("categorias")}
              className={`flex items-center gap-2 px-4 py-2 font-medium transition ${
                activeTab === "categorias"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              <Tags size={20} />
              Categorías
            </button>
          </div>

          {/* Contenido Productos */}
          {activeTab === "productos" && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-700">Lista de Productos</h2>
                <button
                  onClick={() => openProductoModal()}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  <Plus size={18} />
                  Nuevo Producto
                </button>
              </div>

              {loadingProductos ? (
                <p className="text-gray-500">Cargando productos...</p>
              ) : productos.length === 0 ? (
                <p className="text-gray-500">No hay productos registrados</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="text-left p-3 border">ID</th>
                        <th className="text-left p-3 border">Nombre</th>
                        <th className="text-left p-3 border">Categoría</th>
                        <th className="text-left p-3 border">Cantidad</th>
                        <th className="text-left p-3 border">Precio</th>
                        <th className="text-left p-3 border">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productos.map((prod) => (
                        <tr key={prod.id} className="hover:bg-gray-50">
                          <td className="p-3 border">{prod.id}</td>
                          <td className="p-3 border">{prod.nombre}</td>
                          <td className="p-3 border">{prod.categoria.nombre}</td>
                          <td className="p-3 border">{prod.cantidad}</td>
                          <td className="p-3 border">${prod.precio.toLocaleString()}</td>
                          <td className="p-3 border">
                            <div className="flex gap-2">
                              <button
                                onClick={() => openProductoModal(prod)}
                                className="text-blue-600 hover:text-blue-800"
                              >
                                <Edit2 size={18} />
                              </button>
                              <button
                                onClick={() => handleDeleteProducto(prod.id)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Contenido Categorías */}
          {activeTab === "categorias" && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-700">Lista de Categorías</h2>
                <button
                  onClick={() => openCategoriaModal()}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  <Plus size={18} />
                  Nueva Categoría
                </button>
              </div>

              {loadingCategorias ? (
                <p className="text-gray-500">Cargando categorías...</p>
              ) : categorias.length === 0 ? (
                <p className="text-gray-500">No hay categorías registradas</p>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {categorias.map((cat) => (
                    <div
                      key={cat.id}
                      className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-500">ID: {cat.id}</p>
                          <p className="font-semibold text-lg text-gray-800">{cat.nombre}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => openCategoriaModal(cat)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteCategoria(cat.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Modal Producto */}
      {showProductoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">
              {editingProducto ? "Editar Producto" : "Nuevo Producto"}
            </h3>
            <form onSubmit={handleSaveProducto}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Nombre</label>
                <input
                  type="text"
                  value={productoForm.nombre}
                  onChange={(e) => setProductoForm({ ...productoForm, nombre: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Categoría</label>
                <select
                  value={productoForm.categoriaId}
                  onChange={(e) => setProductoForm({ ...productoForm, categoriaId: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                  required
                >
                  <option value="">Selecciona una categoría</option>
                  {categorias.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Cantidad</label>
                <input
                  type="number"
                  value={productoForm.cantidad}
                  onChange={(e) =>
                    setProductoForm({ ...productoForm, cantidad: parseInt(e.target.value) })
                  }
                  className="w-full border rounded-lg px-3 py-2"
                  required
                  min="0"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Precio</label>
                <input
                  type="number"
                  value={productoForm.precio}
                  onChange={(e) =>
                    setProductoForm({ ...productoForm, precio: parseFloat(e.target.value) })
                  }
                  className="w-full border rounded-lg px-3 py-2"
                  required
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setShowProductoModal(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Categoría */}
      {showCategoriaModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">
              {editingCategoria ? "Editar Categoría" : "Nueva Categoría"}
            </h3>
            <form onSubmit={handleSaveCategoria}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Nombre</label>
                <input
                  type="text"
                  value={categoriaForm.nombre}
                  onChange={(e) => setCategoriaForm({ nombre: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                  required
                />
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setShowCategoriaModal(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;  