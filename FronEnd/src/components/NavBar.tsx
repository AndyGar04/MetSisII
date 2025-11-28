import { useState } from 'react';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <a href="#" className="text-2xl font-bold text-indigo-600">Mi Tienda</a>

          <div className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Inicio</a>
            <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Productos</a>
            <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">🛒</a>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-indigo-600 focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden px-2 pt-2 pb-4 space-y-2 bg-white shadow-lg">
          <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-indigo-50">Inicio</a>
          <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-indigo-50">Productos</a>
          <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-indigo-50">Carrito</a>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
