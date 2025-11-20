import { Edit, Trash2 } from "lucide-react";

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

interface ProductoRowProps {
  producto: Producto;
  onEdit: (producto: Producto) => void;
  onDelete: (id: string) => void;
}

export function ProductoRow({ producto, onEdit, onDelete }: ProductoRowProps) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="font-medium text-gray-900">{producto.nombre}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
          {producto.categoria.nombre}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-gray-900">
        ${producto.precio.toFixed(2)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${
            producto.cantidad > 10
              ? "bg-green-100 text-green-800"
              : producto.cantidad > 0
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {producto.cantidad} unidades
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button
          onClick={() => onEdit(producto)}
          className="text-blue-600 hover:text-blue-900 mr-4"
          title="Editar producto"
        >
          <Edit size={18} />
        </button>
        <button
          onClick={() => onDelete(producto.id)}
          className="text-red-600 hover:text-red-900"
          title="Eliminar producto"
        >
          <Trash2 size={18} />
        </button>
      </td>
    </tr>
  );
}
