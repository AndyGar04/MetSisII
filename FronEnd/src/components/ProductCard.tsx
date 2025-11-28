import { useCart } from "../context/CartContext";

interface ProductCardProps {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  stock: number;
}

export default function ProductCard({ producto }: { producto: ProductCardProps }) {
  const { addToCart } = useCart();

  return (
    <div className="border rounded-xl p-4 shadow hover:shadow-lg bg-white flex flex-col">
      <h3 className="font-bold text-lg">{producto.nombre}</h3>
      <p className="text-gray-600 mb-2">💰 ${producto.precio}</p>
      <p className="text-sm text-gray-500 mb-4">Stock: {producto.stock}</p>
      <button
        onClick={() => addToCart({ ...producto, cantidad: 1 })}
        className="mt-auto bg-green-600 hover:bg-green-700 text-white font-medium px-3 py-1 rounded-lg"
      >
        ➕ Agregar al carrito
      </button>
    </div>
  );
}
