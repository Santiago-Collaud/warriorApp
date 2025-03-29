"use client";
import { useState } from "react";
import Image from "next/image";
import InstallButton from "../../components/installButton/InstallButton";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      // Simulación de autenticación (reemplázalo con una petición a tu API)
      if (username === "admin" && password === "1234") {
        alert("Login exitoso 🚀");
      } else {
        setError("Credenciales incorrectas");
      }
    } catch (err) {
      setError("Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
        <div 
          className="min-h-screen flex items-center justify-center bg-gray-900 px-6"
          style={{
            backgroundImage: "url('/backGrounds/background.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          
        <div className="w-full max-w-sm p-6 bg-gray-800 rounded-lg shadow-lg">
        <div >
            <InstallButton/>
          </div>
            <div className="flex justify-center p-4">
              <Image 
                src="/img/warriorPNG.png" 
                alt="logo warrior" 
                width={128} 
                height={128} 
                className="rounded-t-lg shadow-xl"
                priority 
              />
              
            </div>

            <h2 className="text-white text-center text-2xl font-semibold mb-6">Iniciar Sesión</h2>

            {error && <p className="text-red-400 text-center mb-4">{error}</p>}

            <input
              type="text"
              placeholder="Usuario"
              className="w-full p-3 mb-4 bg-gray-700 text-white rounded focus:outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            
            <input
              type="password"
              placeholder="Contraseña"
              className="w-full p-3 mb-4 bg-gray-700 text-white rounded focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition disabled:opacity-50"
            >
              {loading ? "Cargando..." : "Ingresar"}
            </button>
          </div>
        </div>
    </div>
    
);

}

