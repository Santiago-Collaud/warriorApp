"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation';

import LogoutButton from "../components/logOutButton/logoutButton";
import LabelDatosUsuario from "../components/labelDatosUsuario/labelUsuario";
import LabelPagos from "../components/pagos/labelPagos";
import LabelRutina from "../components/labelRutinas/labelRutina";
import LabelMensajes from "../components/mensajes/labelMensajes";


export default function UserPage() {
  const [showDatosClientes, setShowDatosCliente] = useState(false);
  const [showPagos, setShowPagos] = useState(false);
  const [showMensajes, setShowMensajes] = useState(false);

  const router = useRouter();

  const handleUsuario = async () => {
    //alert("boton usuario")
    setShowDatosCliente(true)
  }

  const handleRutinas = async () => {
    //alert("boton rutinas")
    router.push("/resumenRutina")
  }

  const handlePagos = async () => {
    //alert("boton pagos")
    setShowPagos(true)
  }

  const handleMensajes = async () => {
    alert("boton mensajes")
    setShowMensajes(true)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div>
        <header className="bg-gray-200 p-2 flex justify-center shadow-md rounded-md">
            <Image 
              src="/icons/warrior_Title-PNG.png" 
              alt="logo warrior" 
              width={300} 
              height={300} 
              className="rounded-t-lg shadow-xl m-4"
              priority 
              />   
              <div className="flex items-center ml-auto mr-4">
                <LogoutButton/>
              </div>         
          </header>
      </div>
          <div>
            <LabelRutina />
          </div>
     <div className="bg-gray-200 text-black p-2 mt-auto ">
      <footer className="flex justify-between">
          <button 
            onClick={handleUsuario}
            className="bg-indigo-100 m-2 p-1 rounded-md"
            >
              <Image 
              src="/icons/usuario.png" 
              alt="logo warrior" 
              width={50} 
              height={50} 
              className="rounded-t-lg shadow-xl"
              priority 
              />
          </button>
          <button 
            onClick={handleRutinas}
            className="bg-indigo-100 m-2 p-1 rounded-md"
            >
              <Image 
              src="/icons/cronometro.png" 
              alt="logo warrior" 
              width={50} 
              height={50} 
              className="rounded-t-lg shadow-xl"
              priority 
              />
          </button>
          <button 
            onClick={handlePagos}
            className="bg-indigo-100 m-2 p-1 rounded-md"
            >
              <Image 
              src="/icons/metodo-de-pago.png" 
              alt="logo warrior" 
              width={50} 
              height={50} 
              className="rounded-t-lg shadow-xl"
              priority 
              />
          </button>
          <button 
            onClick={handleMensajes}
            className="bg-indigo-100 m-2 p-1 rounded-md"
            >
             <Image 
              src="/icons/noticias.png" 
              alt="logo warrior" 
              width={50} 
              height={50} 
              className="rounded-t-lg shadow-xl"
              priority 
              />
          </button>
        </footer>

      {/* Modal para mostrar los datos del usuario */}
        {showDatosClientes && (
        <div className="modal modal-open">
          <div className="modal-box">
            <div className='flex justify-end'>
              <button className='text-white btn btn-sm btn-circle btn-ghost absolute right-1 top-1' onClick={() => setShowDatosCliente(false)}>
                X
              </button>
            </div>
            <LabelDatosUsuario />
          </div> 
        </div>
      )}

      {/* Modal para mostrar los pagos */}
      {showPagos && (
        <div className="modal modal-open">
          <div className="modal-box">
            <div className='flex justify-end'>
              <button className='text-white btn btn-sm btn-circle btn-ghost absolute right-1 top-1' onClick={() => setShowPagos(false)}>
                X
              </button>
            </div>
            <LabelPagos />
          </div> 
        </div>
      )}
     </div>

        {/* Modal para mostrar los mensajes */}
      {showMensajes && (
        <div className="modal modal-open">
          <div className="modal-box">
            <div className='flex justify-end'>
              <button className='text-white btn btn-sm btn-circle btn-ghost absolute right-1 top-1' onClick={() => setShowMensajes(false)}>
                X
              </button>
              <LabelMensajes />
            </div>
          </div> 
        </div>
      )}
     </div>
);

}