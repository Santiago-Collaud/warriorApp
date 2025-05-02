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
    <div>
        <button onClick={handleLogout}>
            <Image 
             src="/icons/logout.png" 
             alt="logo warrior" 
             width={50} 
             height={50} 
             className="rounded-t-lg"
             priority 
             />
        </button>
    </div>
  );
};

export default LogoutButton;