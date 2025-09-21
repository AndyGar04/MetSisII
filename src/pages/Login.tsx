import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Formulario de Login enviado");

        navigate("/home");
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
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="email"
                            id="email"
                            required
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
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="password"
                            id="password"
                            required
                        />
                    </div>
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
