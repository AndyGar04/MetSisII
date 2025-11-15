import { Routes, Route, Link } from "react-router-dom";
import { TiendaPage } from "./pages/TiendaPage";
import { AdminLogin } from "./pages/AdminLogin";
import { AdminDashboard } from "./pages/AdminDashboard";
import { RequireAdmin } from "./components/RequireAdmin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<TiendaPage />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin/dashboard"
        element={
          <RequireAdmin>
            <AdminDashboard />
          </RequireAdmin>
        }
      />
      <Route
        path="*"
        element={
          <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-4xl font-bold mb-4">404 - Página no encontrada</h1>
            <Link
              to="/"
              className="text-blue-500 hover:underline"
            >
              Volver a la tienda
            </Link>
          </div>
        }
      />
    </Routes>
  );
}

export default App;