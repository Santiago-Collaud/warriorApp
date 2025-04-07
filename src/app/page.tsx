"use client";
import { useState } from "react";
import Image from "next/image";
import InstallButton from "../../components/installButton/InstallButton";
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [mail, setMail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [modalNuevoUsuario, setModalNuevoUsuario] = useState(false);
  const [modalAviso, setModalAviso] = useState(false);
  const router = useRouter();
  
  // Define el estado is_verify a nivel superior (si es necesario cambiarlo)
  const [is_verify] = useState(true);

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    //console.log("front", username ," ",password)
    if(password === '1234')
      alert("Debe cambiar su contraseña");

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_name: username, pass: password }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        setError(error);
        setLoading(false); // Desactivar loading si hay error
        return;
      }
      
      // Guardar en el localStorage una vez que la autenticación es exitosa
      const { user, token } = await response.json();

      

      //Guardar el id_usuario y el token en el localStorage
      //console.log("id_usuario",user.id_usuario)
      localStorage.setItem('id_usuario', user.id_usuario);
      localStorage.setItem('jwt_token', token);

      //const id_user_debug = localStorage.getItem('id_usuario')
      //console.log("id_usuario en login:",id_user_debug)

      // Redirigir al admin
      router.push('/usuario');
    } catch (err) {
      setError('Error al iniciar sesión');
      console.error('Error al iniciar sesión:', err);
    } finally {
      setLoading(false); // Desactivar loading después de la solicitud
    }
  };

  // Esta función se ejecutará al enviar el formulario del modal
  const handleAviso = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setModalNuevoUsuario(false);
    setModalAviso(true);
  };

  const handleConfirm = async () => {
    if (!nombre || !apellido || !username) {
      alert("Faltan completar campos");
      return;
    }
    try {
      const response = await fetch('/api/solicitudUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: nombre || null,
          apellido: apellido || null,
          mail: mail || null,
          username: username || null,
          is_verify, // Usa el valor definido a nivel superior
        }),
      });
      const result = await response.json();
      if (response.ok) {
        alert('Cliente registrado correctamente');
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Error al registrar el cliente:', error);
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
          <div>
            <InstallButton />
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Contraseña"
            className="w-full p-3 mb-4 bg-gray-700 text-white rounded focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex justify-end pb-2">
            <button onClick={() => setModalNuevoUsuario(true)}>crear cuenta</button>
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition disabled:opacity-50"
          >
            {loading ? "Cargando..." : "Ingresar"}
          </button>
        </div>
      </div>

      {/* MODAL SOLICITUD NEW USER */}
      {modalNuevoUsuario && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h1 className="text-center text-xl font-semibold mb-4">Nuevo Usuario</h1>
            <form onSubmit={handleAviso}>
              <h3 className="font-italic">Nombre</h3>
              <input
                type="text"
                placeholder="Nombre"
                className="input input-bordered w-full mb-4"
                onChange={(e) => setNombre(e.target.value)}
                required
              />
              <h3 className="font-italic">Apellido</h3>
              <input
                type="text"
                placeholder="Apellido"
                className="input input-bordered w-full mb-4"
                onChange={(e) => setApellido(e.target.value)}
                required
              />
              <h3 className="font-italic">Nombre de usuario</h3>
              <input
                type="text"
                placeholder="Username"
                className="input input-bordered border w-full mb-4"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <h3 className="font-italic">Mail</h3>
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered w-full mb-4"
                onChange={(e) => setMail(e.target.value)}
                required
              />
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setModalNuevoUsuario(false)}
                  className="btn btn-primary w-auto"
                >
                  Cerrar
                </button>
                <button type="submit" className="btn btn-primary w-auto">
                  Solicitar Usuario
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL AVISO ANTES DE ENVIAR */}
      {modalAviso && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h1 className="text-center text-xl font-semibold mb-4">Nuevo Usuario</h1>
            <p>Se necesita confirmar el envío del formulario para generar el nuevo usuario de Warrior Gym APP</p>
            <p>Nombre: <strong>{nombre}</strong></p>
            <p>Apellido: <strong>{apellido}</strong></p>
            <p>Nombre de usuario: <strong>{username}</strong></p>
            <p>Email: {mail}</p>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setModalAviso(false)}
                className="btn btn-primary w-auto"
              >
                Cerrar
              </button>
              <button
                type="button"
                className="btn btn-primary w-auto"
                onClick={() => {
                  setModalAviso(false);
                  handleConfirm();
                }}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
