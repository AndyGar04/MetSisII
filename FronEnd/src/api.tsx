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
