const API_URL = "http://localhost:3000";

export async function getProductos() {
  const res = await fetch(`${API_URL}/productos`);
  if (!res.ok) throw new Error("Error al obtener productos");
  return res.json();
}

export async function getCategorias() {
  const res = await fetch(`${API_URL}/categorias`);
  if (!res.ok) throw new Error("Error al obtener categorías");
  return res.json();
}

// CRUD de Productos para Admin
export async function createProducto(producto: {
  nombre: string;
  categoria: string;
  cantidad: number;
  precio: number;
}) {
  const res = await fetch(`${API_URL}/productos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto),
  });
  if (!res.ok) throw new Error("Error al crear producto");
  return res.json();
}

export async function updateProducto(
  id: string,
  producto: {
    nombre: string;
    categoria: string;
    cantidad: number;
    precio: number;
  }
) {
  const res = await fetch(`${API_URL}/productos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto),
  });
  if (!res.ok) throw new Error("Error al actualizar producto");
  return res.json();
}

export async function deleteProducto(id: string) {
  const res = await fetch(`${API_URL}/productos/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar producto");
  return res.json();
}

// CRUD de Categorías para Admin
export async function createCategoria(categoria: { nombre: string }) {
  const res = await fetch(`${API_URL}/categorias`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(categoria),
  });
  if (!res.ok) throw new Error("Error al crear categoría");
  return res.json();
}

export async function updateCategoria(id: string, categoria: { nombre: string }) {
  const res = await fetch(`${API_URL}/categorias/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(categoria),
  });
  if (!res.ok) throw new Error("Error al actualizar categoría");
  return res.json();
}

export async function deleteCategoria(id: string) {
  const res = await fetch(`${API_URL}/categorias/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar categoría");
  return res.json();
}
