import { useCart } from "../context/CartContext";

export default function ProductCard({ producto }: { producto: any }) {
  const { addToCart } = useCart();

  return (
    <div className="border rounded-xl p-4 shadow hover:shadow-lg bg-white flex flex-col">
      <h3 className="font-bold text-lg">{producto.nombre}</h3>
      <p className="text-gray-600 mb-2">💰 ${producto.precio}</p>
      <p className="text-sm text-gray-500 mb-4">Stock: {producto.stock}</p>
      <button
        onClick={() => addToCart(producto)}
        className="mt-auto bg-green-600 hover:bg-green-700 text-white font-medium px-3 py-1 rounded-lg"
      >
        ➕ Agregar al carrito
      </button>
    </div>
  );
}
