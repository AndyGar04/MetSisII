import React from 'react';

export default function Home() {
  const productos = [
    // Usar una ruta relativa a la carpeta 'public'
    { id: 1, nombre: "Laptop Gamer", precio: 12000000, imagen: "/img/compu.png" },
    { id: 2, nombre: "Auriculares", precio: 200000, imagen: "/img/auriculares.png" },
    { id: 3, nombre: "Mouse Pro", precio: 8000, imagen: "/img/mouse.png" },
  ];

  return (
    <div className="container mx-auto p-6 mt-24">
      <h2 className="text-4xl font-extrabold mb-10 text-center text-gray-800">Catalogo de Productos</h2>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {productos.map(prod => (
          <div key={prod.id} className="bg-white rounded-2xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
            <div className="overflow-hidden rounded-xl">
              <img src={prod.imagen} alt={prod.nombre} className="w-full h-48 object-cover hover:scale-110 transition-transform duration-500" />
            </div>
            <h3 className="text-xl font-semibold mt-4 text-gray-800">{prod.nombre}</h3>
            <p className="text-gray-500 mt-2 text-lg">${prod.precio}</p>
            <button className="mt-5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-full shadow-lg hover:from-indigo-600 hover:to-blue-500 transition-all duration-300">
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
