"use client";
import { useState } from "react";
import Image from "next/image";


export default function UserPage() {
  const handleUsuario = async () => {
    alert("boton usuario")
  }

  const handleRutinas = async () => {
    alert("boton rutinas")
  }

  const handlePagos = async () => {
    alert("boton pagos")
  }

  const handleNoticias = async () => {
    alert("boton usuario")
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
              className="rounded-t-lg shadow-xl"
              priority 
              />
          </header>
      </div>
          <div>

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
            onClick={handleNoticias}
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
     </div>
        
    </div>
);

}