const API_URL = "http://localhost:3000";

export async function getTareas() {
  const res = await fetch(`${API_URL}/api/task`);
  if (!res.ok) throw new Error("Error al obtener tareas");
  return res.json();
}

export async function getProductos() {
  const res = await fetch(`${API_URL}/api/productos`);
  if (!res.ok) throw new Error("Error al obtener productos");
  return res.json();
}

export async function getCategorias() {
  const res = await fetch(`${API_URL}/api/categorias`);
  if (!res.ok) throw new Error("Error al obtener categorías");
  return res.json();
}

// CRUD de Productos para el dashboard de admin
export async function createProducto(producto: {
  nombre: string;
  categoria: string;
  cantidad: number;
  precio: number;
}) {
  const res = await fetch(`${API_URL}/api/productos`, {
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
  const res = await fetch(`${API_URL}/api/productos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto),
  });
  if (!res.ok) throw new Error("Error al actualizar producto");
  return res.json();
}

export async function deleteProducto(id: string) {
  const res = await fetch(`${API_URL}/api/productos/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar producto");
  return res.json();
}
