"use client";
import { useState,useEffect } from "react";
import Image from "next/image";
import InstallButton from "./components/installButton/InstallButton";
import CambiarPass from "./components/cambiarPass/cambiarPass";
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  //LOGIN
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //CAMBIO DE PASSWORD
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  //MOSTRAR LOS PASS
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  
  //CREAR CUENTA
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [mail, setMail] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  //MODALES
  const [modalNuevoUsuario, setModalNuevoUsuario] = useState(false);
  const [modalAviso, setModalAviso] = useState(false);
  const [modalCambioPass, setModalCambioPass] = useState(false);
  const [modalInstrucciones, setModalInstrucciones] = useState(false);
  const [modalOlvidePass, setModalOlvidePass] = useState(false);

  const router = useRouter();

  const [toggleAceptado, setToggleAceptado] = useState(false);
  
  // Define el estado is_verify a nivel superior (si es necesario cambiarlo)
  const [is_verify] = useState(false); // false para solicitar nuevo usuario, se cambia al momento de aceptar el admin

  const [rememberChecked, setRememberChecked] = useState(false);

useEffect(() => {
  const storedUsername = localStorage.getItem("username");
  if (storedUsername) {
    setUsername(storedUsername);
    setRememberChecked(true);
  }
}, []);

const rememberMe = (checked: boolean) => {
  setRememberChecked(checked);
  if (checked) {
    localStorage.setItem("username", username);
  } else {
    localStorage.removeItem("username");
  }
};

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    

    //console.log("front", username ," ",password)
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_name: username, pass: password }),
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        if (result.cambioRequerido) {
          alert("Cambio de contraseña requerido");
          setModalCambioPass(true);
          return;
        }
  
        setError(result.error || "Error desconocido");
        return;
      }
  
      const { user, token } = result;

      localStorage.setItem('id_usuario', user.id);

      //console.log("id_cliente setItem", user?.clientes?.id_cliente);
      localStorage.setItem('id_cliente', user?.clientes?.id_cliente);
      //console.log("localstotage",localStorage.getItem('id_cliente'));

      localStorage.setItem('jwt_token', token);

      router.push('/usuario');
    } catch (err) {
      setError("Error al iniciar sesión");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Esta función se ejecutará al enviar el formulario del modal
  const handleAviso = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //setModalNuevoUsuario(false);

    try {
      const response = await fetch(`/api/verificarUserName?username=${encodeURIComponent(username)}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      const result = await response.json();

      if (response.ok) {
      if (result.exists) {
        alert('El nombre de usuario ya está en uso. Por favor, elija otro.');
        return; // no cierra el modal actual
      } else {
        setModalNuevoUsuario(false);
        setModalAviso(true); // pasa a mostrar el modal de aviso
      }
    } else {
      alert(result.error || 'Error al verificar el nombre de usuario.');
    }
      
    }
    catch (error) {
      console.error('Error al verificar el username:', error);
      alert('Error al verificar el username. Por favor, inténtelo de nuevo más tarde.');
    }
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
        //alert('Cliente registrado correctamente, IMPORTANTE: revise su mail o contactese con el gimnasio para mas datos');
        setModalInstrucciones(true);
        setModalCambioPass(false);
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Error al registrar el cliente:', error);
    }
  };

  const handleCambioPass = async () => {
    if (!newPassword || !newPasswordConfirm) {
      alert("Los campos no pueden estar vacíos");
      if (newPassword !== newPasswordConfirm) {
        alert("Las contraseñas no coinciden");
        return;
      }
      return;
    }
    try {
      //console.log("username", username ," ",newPassword)
      
      const response = await fetch('/api/usuario/updatePass', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username || null,
          newPassword: newPassword || null,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        alert('cambio de contraseña correcto \nAhora escribe tu nueva contraseña \nA disftutar de WarriorApp');
        setModalCambioPass(false);
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
        className="min-h-screen flex items-center justify-center"
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
            className="w-full p-3 bg-gray-700 text-white rounded focus:outline-none"
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
          />
            <div className="mb-2 mt-1 flex items-center justify-end text-white">
            <label htmlFor="rememberMe" className="text-sm">Recordar usuario</label>
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberChecked}
                onChange={(e) => rememberMe(e.target.checked)}
                className="ml-1 toggle"
              />
              
            </div>

          <input
             type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            className="w-full p-3 mb-2 bg-gray-700 text-white rounded focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <div className="mb-4 flex items-center justify-end text-white">
          <label htmlFor="togglePassword" className="text-sm">Mostrar contraseña</label>
            <input
              type="checkbox"
              id="togglePassword"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className="ml-1 toggle"
            />
            
          </div>
          <div>
            <button onClick={() => setModalOlvidePass(true)} className="text-sm text-white hover:underline mb-4">
              olvidaste tu contraseña?
            </button>
             
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-sky-300 text-black font-bold py-3 pb-3 pt-4 rounded hover:bg-sky-100 transition disabled:opacity-50"
          > 
            {loading ? "Cargando..." : "Ingresar"}
          </button>

          <div className="flex justify-end pb-2 pt-2">
            <button 
              onClick={() => setModalNuevoUsuario(true)}
              className="w-full btn btn-outline btn-secondary text-sm "
              >crear cuenta</button>
          </div>
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
            <p className="text-italic p-2">Se necesita confirmar el envío del formulario para generar el nuevo usuario de Warrior Gym APP</p>
            <div className="border rounded p-2 mb-4">
              <p>Nombre: <strong>{nombre}</strong></p>
              <p>Apellido: <strong>{apellido}</strong></p>
              <p>Nombre de usuario: <strong>{username}</strong></p>
              <p>Email: {mail}</p>
            </div>
            
            <input
                type="checkbox"
                checked={toggleAceptado}
                onChange={() => setToggleAceptado(!toggleAceptado)}
                className="toggle"
              />
              <span className="ml-2 text-sm"> Acepto los términos y condiciones</span>
            
            <div className="flex justify-between mt-4">
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
                disabled={!toggleAceptado} // 🔒 solo se activa si el toggle está activado
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

      {/*MODAL CAMBIO DE PASS OBLIGATORIO */}
      {modalCambioPass && (
        <div className="modal modal-open">
        <div className="modal-box">
          <h1 className="text-center text-xl font-semibold mb-4">Cambio de contraseña OBLIGATORIO</h1>
          <p className="text-italic p-2">Es necesario actualizar su contraseña para ngresar al sistema</p>
          <div className="border rounded p-2 mb-4">
          
            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="Nueva Contraseña"
              className="w-full p-3 mb-4 bg-gray-700 text-white rounded focus:outline-none"
              value={newPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
            />
            <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              className="toggle toggle-error" // `toggle-error` es opcional, da color rojo
              id="togglePassword"
              checked={showNewPassword}
              onChange={() => setShowNewPassword(!showNewPassword)}
            />
            <label htmlFor="togglePassword" className="ml-2 text-sm">Mostrar contraseñas</label>
          </div>
            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="repetir Nueva Contraseña"
              className="w-full p-3 mb-4 bg-gray-700 text-white rounded focus:outline-none"
              value={newPasswordConfirm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPasswordConfirm(e.target.value)}
            />
            
          </div>
          
          <input
              type="checkbox"
              
              checked={toggleAceptado}
              onChange={() => setToggleAceptado(!toggleAceptado)}
              className="toggle"
            />
            <span className="ml-2 text-sm"> Acepto los términos y condiciones</span>
          
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={() => setModalCambioPass(false)}
              className="btn btn-primary w-auto"
            >
              Cerrar
            </button>
            
            <button
              type="button"
              className="btn btn-primary w-auto"
              disabled={!toggleAceptado} // 🔒 solo se activa si el toggle está activado
              onClick={() => {
                //setModalCambioPass(false);
                handleCambioPass();
              }}
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
      )}
      {/* MODAL INSTRUCCIONES POST ALTA USUARIO */}
      {modalInstrucciones && (
          <div className="modal modal-open">
          <div className="modal-box">
              <div className='flex justify-center mb-4 border rounded-lg bg-gray-200'>
                  <Image src="/icons/Alert.png" alt="Instrucciones" width={100} height={100} />
              </div>

              <h1 className="text-center text-2xl font-semibold mb-4 bg-gray-300 rounded-lg text-red-700">¡Listo! Solo falta un paso</h1>
              <p className="text-italic pl-2 pr-2">Tu solicitud ya llegó al administrador.</p>
              <p className="text-italic pl-2 pr-2">Cuando aprueben tu perfil, vas a recibir un mail con las instrucciones para acceder</p>
              <p className="text-italic pl-2 pr-2">Revise su correo electrónico </p>
              <p className="text-italic pl-2 pr-2">Si no lo ves en tu bandeja de entrada, revisá el spam o escribinos para que podamos ayudarte</p>
              <h1 className="text-italic pl-2 pr-2 mt-4 mb-2 text-lg shadow-lg border flex justify-center">Bienvenido a WarriorApp</h1>

              <div className="flex justify-end mt-4">
              <button
                  type="button"
                  onClick={() => setModalInstrucciones(false)}
                  className="btn btn-primary w-auto"
              >
                  Cerrar
              </button>
              </div>
          </div>
          </div>
      )}
      {/* MODAL OLVIDE CONTRASEÑA */}
      {modalOlvidePass && (
        <div className="modal modal-open">
          <div className="modal-box">
            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={() => setModalOlvidePass(false)}
                className="btn btn-primary w-auto"
              >
                X
              </button>
              </div>

            <div>
              <CambiarPass />
              {/* 
              <audio controls autoPlay>
                  <source src="http://sonic.host-live.com:8238/stream" type="audio/aac" />
                  Tu navegador no soporta el elemento de audio.
              </audio>*/}

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
