import { Package } from "lucide-react";
import { ProductoRow } from "./ProductoRow";

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

interface ProductosTableProps {
  productos: Producto[];
  loading: boolean;
  error: string | null;
  onEdit: (producto: Producto) => void;
  onDelete: (id: string) => void;
  onRetry: () => void;
  onCreate: () => void;
}

export function ProductosTable({
  productos,
  loading,
  error,
  onEdit,
  onDelete,
  onRetry,
  onCreate,
}: ProductosTableProps) {
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
        <button
          onClick={onRetry}
          className="mt-4 text-blue-600 hover:underline"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (productos.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="mx-auto text-gray-400 mb-4" size={48} />
        <p className="text-gray-600">No hay productos cargados</p>
        <button
          onClick={onCreate}
          className="mt-4 text-blue-600 hover:underline"
        >
          Crear el primero
        </button>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Producto
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Categoría
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Precio
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Stock
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {productos.map((producto) => (
            <ProductoRow
              key={producto.id}
              producto={producto}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
