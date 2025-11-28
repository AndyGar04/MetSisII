import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom"; 
import Register from "../pages/Register";

describe("Register Page", () => {
  test("debe mostrar el formulario de registro", () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    // Título
    expect(screen.getByText(/crear cuenta/i)).toBeInTheDocument();

    // Inputs
    expect(screen.getByLabelText(/nombre completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();

    // Boton
    const boton = screen.getByRole("button", { name: /registrarse/i });
    expect(boton).toBeInTheDocument();
  });
});
