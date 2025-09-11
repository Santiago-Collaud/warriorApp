"use client";
import Image from "next/image";
import { useRouter } from 'next/navigation';

import LogoutButton from "../logOutButton/logoutButton";

export default function Footer() {
  const router = useRouter();

  const handleUsuario = async () => {
    //alert("boton usuario")
    router.push("/datosUsuarios")
  }

  const handleRutinas = async () => {
    //alert("boton rutinas")
    router.push("/rutina")
  }

  const handleResumen = async () => {
    //alert("boton rutinas")
    router.push("/resumenRutina")
  }

  const handlePagos = async () => {
    //alert("boton pagos")
    router.push("/pagos")
  }

  const handleNovedades = async () => {
    //alert("boton novedades")
    router.push("/novedades")
  }

  return (
     <div className=" text-black p-1 mt-auto rounded">
      <footer className="fixed bottom-0 left-0 w-full max-w-[420px] flex justify-between items-center px-4 py-2 bg-slate-900 z-50">
          
        <div className="flex flex-col items-center">
          <button 
            onClick={handleRutinas}
            className="bg-slate-700 mt-2 p-1 rounded-md"
            >
              <Image 
              src="/icons/rutina.png" 
              alt="logo warrior" 
              width={35} 
              height={35} 
              className="rounded-t-lg shadow-xl"
              priority 
              />
          </button>
          <h3 className="text-white text-sm">Rutina</h3>
        </div>

        <div className="flex flex-col items-center">
          <button 
            onClick={handleResumen}
            className="bg-slate-700 mt-2 p-1 rounded-md"
            >
              <Image 
              src="/icons/registo.png" 
              alt="logo warrior" 
              width={35} 
              height={35} 
              className="rounded-t-lg shadow-xl"
              priority 
              />
          </button>
          <h3 className="text-white text-sm">Historial</h3>
        </div>
          
        <div className="flex flex-col items-center">
          <button 
            onClick={handlePagos}
            className="bg-slate-700 mt-2 p-1 rounded-md"
            >
              <Image 
              src="/icons/pagos.png" 
              alt="logo warrior" 
              width={35} 
              height={35} 
              className="rounded-t-lg shadow-xl"
              priority 
              />
          </button>
          <h3 className="text-white text-sm">Pagos</h3>
        </div>    

        <div className="flex flex-col items-center">
          <button 
            onClick={handleNovedades}
            className="bg-slate-700 mt-2 p-1 rounded-md"
            >
              <Image 
              src="/icons/novedades.png" 
              alt="logo warrior" 
              width={35} 
              height={35} 
              className="rounded-t-lg shadow-xl"
              priority 
              />
          </button>
          <h3 className="text-white text-sm">Novedades</h3>
        </div> 
        
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
          <h4 className="text-white text-sm">Usuario</h4>
        </div>

        <div>
          <LogoutButton />
        </div>
      </footer>
    </div>   
);
}