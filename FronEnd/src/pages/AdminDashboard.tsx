import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { LogOut, User, Plus, Package } from "lucide-react";
import { useEffect, useState } from "react";
import {
  getProductos,
  getCategorias,
  createProducto,
  updateProducto,
  deleteProducto,
} from "../api";
import { ProductosTable, ProductoModal } from "../components/admin";

// Las interfaces son para definir como vienen los datos de la API
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

export function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [editingProducto, setEditingProducto] = useState<Producto | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [productosData, categoriasData] = await Promise.all([
        getProductos(),
        getCategorias(),
      ]);
      setProductos(productosData);
      setCategorias(categoriasData);
      setError(null);
    } catch (err) {
      setError("Error al cargar los datos");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const openCreateModal = () => {
    setEditingProducto(null);
    setShowModal(true);
  };

  const openEditModal = (producto: Producto) => {
    setEditingProducto(producto);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProducto(null);
  };

  const handleSubmit = async (formData: {
    nombre: string;
    categoria: string;
    cantidad: number;
    precio: number;
  }) => {
    if (editingProducto) {
      await updateProducto(editingProducto.id, formData);
    } else {
      await createProducto(formData);
    }
    await loadData();
  };

  const handleDelete = async (id: string) => {
    if (confirm("¿Estás seguro de eliminar este producto?")) {
      try {
        await deleteProducto(id);
        await loadData();
      } catch (err) {
        console.error("Error al eliminar producto:", err);
        alert("Error al eliminar el producto");
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
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
          {/* Header con título y botón */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Gestión de Productos
              </h1>
              <p className="text-gray-600 mt-1">
                Administra el inventario de tu tienda
              </p>
            </div>
            <button
              onClick={openCreateModal}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              <Plus size={20} />
              Nuevo Producto
            </button>
          </div>

          {/* Estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
              <div className="flex items-center gap-3">
                <Package className="text-blue-600" size={32} />
                <div>
                  <p className="text-blue-600 text-sm">Total Productos</p>
                  <p className="text-2xl font-bold text-blue-800">
                    {productos.length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
              <div className="flex items-center gap-3">
                <Package className="text-purple-600" size={32} />
                <div>
                  <p className="text-purple-600 text-sm">Categorías</p>
                  <p className="text-2xl font-bold text-purple-800">
                    {categorias.length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabla de productos */}
          <ProductosTable
            productos={productos}
            loading={loading}
            error={error}
            onEdit={openEditModal}
            onDelete={handleDelete}
            onRetry={loadData}
            onCreate={openCreateModal}
          />
        </div>
      </main>

      {/* Modal */}
      <ProductoModal
        isOpen={showModal}
        onClose={closeModal}
        onSubmit={handleSubmit}
        producto={editingProducto}
        categorias={categorias}
      />
    </div>
  );
}

export default AdminDashboard;  