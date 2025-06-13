"use client";
import Image from "next/image";
import { useRouter } from 'next/navigation';


const LogoutButton = () => {
    const router = useRouter();

    const handleLogout = async () => {
        alert("boton logout")
        router.push('/');
        //localStorage.clear(); //BORARDO DE LOCALSTORAGE
        localStorage.removeItem('id_usuario'); //BORRANDO UN ITEM DE LOCALSTORAGE
        localStorage.removeItem('id_cliente');
        localStorage.removeItem('jwt_token');
        //localStorage.removeItem('historialRutinas');
    }
  
  return (
    <div className="flex flex-col items-center">
        <button 
          onClick={handleLogout}
          className="bg-slate-700 mt-2 p-1 rounded-md">
            <Image 
             src="/icons/logout.png" 
             alt="logo warrior" 
             width={35} 
             height={35} 
             className="rounded-t-lg shadow-xl"
             priority 
             />
        </button>
        <h3 className="text-white text-sm">Salir</h3>
    </div>
  );
};

export default LogoutButton;