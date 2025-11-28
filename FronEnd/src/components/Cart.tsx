import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((acc: number, p: { precio: number; cantidad: number }) => acc + p.precio * p.cantidad, 0);

  return (
    <div className="fixed right-4 top-4 w-72 bg-white shadow-lg rounded-xl p-4 border">
      <h2 className="text-xl font-semibold mb-2">🛒 Carrito</h2>
      {cart.length === 0 ? (
        <p className="text-gray-500">Tu carrito está vacío</p>
      ) : (
        <>
          <ul className="divide-y">
            {cart.map((p: { id: number; nombre: string; cantidad: number; precio: number }) => (
              <li key={p.id} className="py-2 flex justify-between items-center">
                <div>
                  <p className="font-medium">{p.nombre}</p>
                  <p className="text-sm text-gray-600">
                    {p.cantidad} × ${p.precio}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(p.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✖
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-3 font-semibold text-right">Total: ${total}</p>
          <button
            onClick={clearCart}
            className="mt-3 w-full bg-red-600 hover:bg-red-700 text-white py-1 rounded-lg"
          >
            Vaciar carrito
          </button>
        </>
      )}
    </div>
  );
}
