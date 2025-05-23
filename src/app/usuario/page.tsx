"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation';

import LogoutButton from "../components/logOutButton/logoutButton";
import LabelRutina from "../components/labelRutinas/labelRutina";
import LabelMensajes from "../components/mensajes/labelMensajes";


export default function UserPage() {
  
  const [showMensajes, setShowMensajes] = useState(false);

  const router = useRouter();

  const handleUsuario = async () => {
    //alert("boton usuario")
    router.push("/datosUsuarios")
  }

  const handleRutinas = async () => {
    //alert("boton rutinas")
    router.push("/resumenRutina")
  }

  const handlePagos = async () => {
    //alert("boton pagos")
    router.push("/pagos")
  }

  const handleMensajes = async () => {
    //alert("boton mensajes")
    setShowMensajes(true)
    //router.push("/mensajes")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div>
        <header className="bg-slate-900 p-2 flex justify-center shadow-md rounded-md">
            <Image 
              src="/icons/warrior_Title-PNG.png" 
              alt="logo warrior" 
              width={300} 
              height={300} 
              className="rounded-t shadow-xl m-1 opacity-75"
              priority 
              />
              <div className="ml-3 mr-auto mt-3">
                <LogoutButton />  
              </div>     
                 
          </header>
          
      </div>
          <div>
            <LabelRutina />
          </div>

     <div className="bg-slate-900 text-black p-1 mt-auto rounded ">
      <footer className="flex justify-between opacity-75">

        <div className="flex flex-col items-center">
          <button 
            onClick={handleUsuario}
            className="bg-slate-700 mt-2 p-1 rounded-md"
            >
              <Image 
              src="/icons/usuario.png" 
              alt="logo warrior" 
              width={35} 
              height={35} 
              className="rounded-t-lg shadow-xl"
              priority 
              />
          </button>
          <h3 className="text-white">usuario</h3>
        </div>
          
        <div className="flex flex-col items-center">
          <button 
            onClick={handleRutinas}
            className="bg-slate-700 mt-2 p-1 rounded-md"
            >
              <Image 
              src="/icons/cronometro.png" 
              alt="logo warrior" 
              width={35} 
              height={35} 
              className="rounded-t-lg shadow-xl"
              priority 
              />
          </button>
          <h3 className="text-white">Registro</h3>
        </div>
          
        <div className="flex flex-col items-center">
          <button 
            onClick={handlePagos}
            className="bg-slate-700 mt-2 p-1 rounded-md"
            >
              <Image 
              src="/icons/metodo-de-pago.png" 
              alt="logo warrior" 
              width={35} 
              height={35} 
              className="rounded-t-lg shadow-xl"
              priority 
              />
          </button>
          <h3 className="text-white">Pagos</h3>
        </div>
          
        <div className="flex flex-col items-center">
          <button 
            onClick={handleMensajes}
            className="bg-slate-700 mt-2 p-1 rounded-md"
            >
             <Image 
              src="/icons/noticias.png" 
              alt="logo warrior" 
              width={35} 
              height={35} 
              className="rounded-t-lg shadow-xl"
              priority 
              />
          </button>
          <h3 className="text-white">Mensajes</h3>
        </div>         
      </footer>
     </div>

        {/* Modal para mostrar los mensajes */}
      {showMensajes && (
        <div className="modal modal-open">
          <div className="modal-box">
            <div className='flex justify-end'>
              <button 
                className='text-white btn btn-sm btn-circle btn-ghost absolute right-1 top-1' 
                onClick={() => setShowMensajes(false)}>
                X
              </button>
            </div>
            <LabelMensajes />
          </div> 
        </div>
      )}
     </div>
);

}