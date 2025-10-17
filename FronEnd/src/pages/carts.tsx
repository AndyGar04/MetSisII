import React from "react";

export default function Cart() {
  return (
    <div className="container mx-auto p-6 mt-24">
      <h2 className="text-4xl font-extrabold mb-10 text-center text-gray-800">
        🛒 Carrito de Compras
      </h2>

      <div className="bg-white p-6 rounded-2xl shadow-lg max-w-2xl mx-auto">
        <p className="text-gray-600 text-center">
          Tu carrito está vacio por ahora.
        </p>
      </div>
    </div>
  );
}
