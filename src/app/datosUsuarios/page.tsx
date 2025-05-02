"use client";
import { useUsuario } from "../datosUsuarios/hook/useUsuario"; // Importamos el hook
import { Usuario } from "../../interface/usuario"; // Asegurate que sea la ruta correcta

import { useState } from "react";
import Image from "next/image";

import ModalEditarUsuario from "../components/editDatosUsuario/editDatosUsuario"; // Ruta donde guardamos el modal para editar los datos del usuario

export default function DatosUsuario() {
  const { loading, error, usuarios, fetchClientes } = useUsuario();
  const [ showModalEditar , setShowModalEditar ] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<Usuario | null>(null);

  const handleEditar = (usuario: Usuario) => {
    setUsuarioSeleccionado(usuario);
    setShowModalEditar(true);
    fetchClientes() // Llamamos a la función para actualizar los datos después de editar
  }

  return (
    <div className="text-white text-white p-4 w-full">

      {loading && <p>Cargando...</p>}
      {error && <p>Error: {error}</p>}
 

      {usuarios.map((usuario) => (
        <div
          key={usuario.id}
          className="bg-gray-200 text-black p-4 mt-4 rounded shadow"
        >
          <div className="border flex grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center justify-center">
              datos personales
            </div>
            <div className="flex items-center justify-end ">
              <button 
                onClick={() => handleEditar(usuario)}
                className="bg-indigo-100 m-2 p-1 rounded-md"
                >
                  <Image 
                  src="/icons/edit.png" 
                  alt="logo warrior" 
                  width={20} 
                  height={20} 
                  className="rounded-t-lg shadow-xl"
                  priority 
                  />
              </button> 
            </div>
          </div>
          <h2>
            <strong>Usuario:</strong> {usuario.username}
          </h2>
          <h2>
            <strong>Nombre:</strong> {usuario.clientes?.nombre}
          </h2>
          <h2>
            <strong>Apellido:</strong> {usuario.clientes?.apellido}
          </h2>
          <h2>
            <strong>Email:</strong> {usuario.clientes?.mail}
          </h2>
          <h2>
            <strong>Teléfono:</strong> {usuario.clientes?.celular}
          </h2>
          <h2>
            <strong>Fecha de Nacimiento:</strong>{" "}
            {usuario.clientes?.fecha_nacimiento}
          </h2>
          <h2>
            <strong>Grupo sanguíneo:</strong>{" "}
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

