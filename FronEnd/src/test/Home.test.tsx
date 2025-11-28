import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { CartProvider } from "../context/CartContext";
import Home from "../pages/home";
import { useNavigate } from "react-router-dom";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<any>("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
    BrowserRouter: ({ children }: any) => <div>{children}</div>
  };
});

describe("Home Component", () => {
  test("renderiza los productos correctamente", () => {
    render(
      <CartProvider>
        <Home />
      </CartProvider>
    );

    expect(screen.getByText(/laptop gamer/i)).toBeInTheDocument();
    expect(screen.getByText(/auriculares/i)).toBeInTheDocument();
    expect(screen.getByText(/mouse pro/i)).toBeInTheDocument();
  });

  test("agrega un producto y navega a /cart", () => {
    const mockNavigate = vi.fn();
    (useNavigate as any).mockReturnValue(mockNavigate);

    render(
      <CartProvider>
        <Home />
      </CartProvider>
    );

    const btn = screen.getAllByText(/agregar al carrito/i)[0];
    fireEvent.click(btn);

    expect(mockNavigate).toHaveBeenCalledWith("/cart");
  });
});
