import React, { useState } from "react"; //metimos useState
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    //para guardar los datos del formulario(email, contra y errores)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    
    //borre la funcion handleSubmit vieja y meti esta nueva
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Esto ya lo tenías, previene recarga
    setError(null);     // Limpiamos errores viejos

    try {
      //llama la api del backend (url a checkear)
      const response = await fetch('/api/auth/login', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      //manejamos la respuesta
      if (response.ok) {
        // exito, guardamos el token
        console.log('Login exitoso!', data.token);
        localStorage.setItem('token', data.token);
        
        //redirigimos 
        navigate("/home"); 

      } else {
        //mostramos el error que nos da el back
        setError(data.message || 'Usuario o contraseña incorrecta');
      }

    } catch (err) {
      //error de red, como caida del servidor
      console.error('Error de red:', err);
      setError('No se pudo conectar al servidor.');
    }
  };

    return (
        <div className="container mx-auto p-6 mt-16 flex justify-center items-center min-h-[70vh]">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
                    Iniciar Sesión
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label
                            className="block text-gray-700 text-sm font-semibold mb-2"
                            htmlFor="email"
                        >
                            Correo Electrónico
                        </label>
                        <input
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                            type="email"
                            id="email"
                            required
                            value={email} //nueva linea
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} //mismo de arriba
                        />
                    </div>
                    <div>
                        <label
                            className="block text-gray-700 text-sm font-semibold mb-2"
                            htmlFor="password"
                        >
                            Contraseña
                        </label>
                        <input
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                            type="password"
                            id="password"
                            required
                            value={password} //nueva linea
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} //mismo de arriba
                        />
                    </div>
                    {error && (
                        <p className="text-red-500 text-sm text-center mb-4">
                        {error}
                    </p>
)}
                    <button
                        type="submit"
                        className="w-full mt-5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-full font-bold shadow-lg hover:from-indigo-600 hover:to-blue-500 transition-all duration-300"
                    >
                        Iniciar Sesión
                    </button>
                </form>

               
                <p className="text-sm text-center text-gray-600 mt-6">
                    ¿No tenés cuenta?{" "}
                    <Link
                        to="/register"
                        className="text-blue-600 font-semibold hover:underline"
                    >
                        Crear una cuenta
                    </Link>
                </p>
            </div>
        </div>
    );
}
