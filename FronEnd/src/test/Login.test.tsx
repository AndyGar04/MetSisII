import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "../pages/Login";

test("debe mostrar el formulario de login", () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  // titulo
  const titulo = screen.getByRole("heading", { name: /iniciar sesión/i });
  expect(titulo).toBeInTheDocument();

  // inputs
  expect(screen.getByLabelText(/correo/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();

  // Boton
  expect(screen.getByRole("button", { name: /iniciar sesión/i })).toBeInTheDocument();
});
