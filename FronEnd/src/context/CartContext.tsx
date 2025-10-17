// src/context/CartContext.tsx
import React, { createContext, useState } from "react";
import type { ReactNode } from "react"; // ⬅️ Importación de tipo

type Producto = {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
};

type CartContextType = {
  cart: Producto[];
  addToCart: (producto: Producto) => void;
};

export const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Producto[]>([]);

  const addToCart = (producto: Producto) => {
    setCart((prev) => [...prev, producto]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}