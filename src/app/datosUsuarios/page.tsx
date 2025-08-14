"use client";
import { useUsuario } from "../datosUsuarios/hook/useUsuario"; // Importamos el hook
import { Usuario } from "../../interface/usuario"; // Asegurate que sea la ruta correcta
import { useState } from "react";
import Image from "next/image"
import { useRouter } from 'next/navigation';
import Footer from "../components/footer/footer";

import ModalEditarUsuario from "../components/editDatosUsuario/editDatosUsuario"; // Ruta donde guardamos el modal para editar los datos del usuario

export default function DatosUsuario() {
  const { loading, error, usuarios, fetchClientes } = useUsuario();
  const [ showModalEditar , setShowModalEditar ] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<Usuario | null>(null);

  const router = useRouter();

  const handleEditar = (usuario: Usuario) => {
    setUsuarioSeleccionado(usuario);
    setShowModalEditar(true);
    fetchClientes() // Llamamos a la función para actualizar los datos después de editar
  }
  
  const handleAvisoLegal = () => {
    router.push("/legales/aviso_legal")
  }

  const handlePoliticas = () => {
    router.push("/legales/politicas_privacidad")
  }

  const handleTeam = () => {
    router.push("/legales/team")
  }

  if (loading) {
      return <>
                <Image 
                  src="/backGrounds/bg-usuarios-app.png" 
                  alt="logo warrior" 
                  width={1000} 
                  height={1000} 
                  className="rounded-t-lg shadow-xl m-0 p-0 filter brightness-50"
                  priority 
                />
                <Footer/>
              </>;
    }
  return (
    <div className="text-white text-white p-4 w-full bg-gray-900 min-h-screen">

      
 

      {usuarios.map((usuario) => (
        <div
          key={usuario.id}
          className="text-white p-4 rounded shadow mt-2 mb-20 "
        >
          <div className=" rounded p-4 shadow-lg shadow-red-50/80 bg-gradient-to-t from-red-300 to-blue-950 ">
          
            <div className="grid col-2 flex justify-center items-center">
              <div className="grid col-1 flex justify-center items-center mb-4 ">
                <Image 
                  src="/icons/profile_user.png" 
                  alt="logo warrior" 
                  width={100} 
                  height={100} 
                  className="border bg-white rounded-full object-cover"
                  priority 
                  />
              </div>
              
              <div>
                <h2 className="mb-1 flex justify-center items-center">
                  <strong className="text-3xl text-italic pb-2"> {usuario.username}</strong> 
                </h2>
              </div>
            </div>

            <div className=" rounded-lg p-4 bg-stone-800 ">  
              <div className="grid grid-cols-2 gap-2">
                <div className="col-start-1 col-end-3  border-t border-gray-300 pt-4">
                  <h2 className="text-2xl">
                    <strong> {usuario.clientes?.nombre} {usuario.clientes?.apellido}</strong>
                  </h2>
                </div>

                <div className="col-span-2 col-end-7">
                  <button 
                      onClick={() => handleEditar(usuario)}
                      className="bg-indigo-100 mb-2 p-1 rounded-md"
                      >
                        <Image 
                        src="/icons/edit.png" 
                        alt="logo warrior" 
                        width={20} 
                        height={20} 
                        className="rounded-t-lg shadow-xl m-0 p-0"
                        priority 
                        />
                    </button> 
                </div>
              </div>
              <div className="mt-4 border-t border-gray-300 pt-4">
                <h2 className="mb-2">
                  <strong>Email:</strong> {usuario.clientes?.mail}
                </h2>
                <h2 className="mb-2">
                  <strong>Teléfono:</strong> {usuario.clientes?.celular}
                </h2>
                <h2>
                  <strong>Fecha de Nacimiento:</strong>
                  {usuario.clientes?.fecha_nacimiento}
                </h2>
                <h2>
                  <strong>Grupo sanguíneo:</strong>
                  {usuario.clientes?.grupo_sanguineo?.grupo}
                </h2>
                <h2>
                  <strong>Factor sanguíneo:</strong> RH{" "}
                  {usuario.clientes?.factor_sanguineo?.factor}
                </h2>
                <h2>
                  <strong>Observaciones de salud:</strong>{" "}
                  {usuario.clientes?.obs_salud}
                </h2>
              </div>
            </div>
          </div>
          <br />
          <div className="border bg-grey-300 rounded-lg p-4 mt-6 bg-gradient-to-t from-neutral-300 to-neutral-600 flex justify-center items-center">
            <button onClick={handleAvisoLegal}>
              <div className="mr-2">
                Legales
              </div>
            </button>  
            <button onClick={handlePoliticas}>
              <div className="mr-2">
                Privacidad
              </div>
            </button>           
            <button onClick={handleTeam}>
              <div className="mr-2">
                Team
              </div>
            </button>              
          </div>
            <footer>
              <Footer/>
            </footer>  
        </div>
      ))}

      {/* Modal para meditar los datos de usuario */}
      {showModalEditar && usuarioSeleccionado && (
        <ModalEditarUsuario
          usuario={usuarioSeleccionado}
          onSave={(clienteActualizado) => {
            fetchClientes();
            console.log(clienteActualizado);
            setShowModalEditar(false);
            setUsuarioSeleccionado(null);
          }}
          onClose={() => {
            setShowModalEditar(false);
            setUsuarioSeleccionado(null);
          }}
        />
      )}
    </div>
     
  );
}

