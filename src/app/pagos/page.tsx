"use client";
import { usePago } from "./hook/usePagos";
import Footer from "../components/footer/footer";
import Image from "next/image";

const LabelDatosUsuario = () => {
 
  const { loading, error, pagos} = usePago(); // Desestructuramos el hook
  const username=localStorage.getItem("username");

  return (
    <div className="text-white px-2 sm:px-4 py-4 max-w-full bg-gray-900 min-h-screen">
      <h1 className="text-xl font-bold mb-4">Pagos de {username}</h1>

      {loading && <p>Cargando...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && pagos.length > 0 && (
        <div>
          {pagos.map((pago,index) => (
          <div key={index} 
                className="list-row flex items-center justify-between rounded-lg shadow mb-2">
                  <ul className="list bg-stone-950 rounded-box shadow-md w-full">
                    <li className="list-row">
                      <div className="size-20 text-3xl font-thin opacity-50 tabular-nums flex-cols border rounded-box">
                        <div className="text-center">
                          {pago.id_mes}
                        </div>
                        <div className="text-center">
                          {pago.year}
                        </div>
                        
                      </div>
                      <div>
                        <Image
                          className="size-20 rounded-box"
                          src="https://res.cloudinary.com/ddvc5vscj/image/upload/v1739921735/LogoWarriorGym_dhm7hi.jpg"
                          alt="Logo Warrior Gym"
                          width={80}
                          height={80} 
                        />
                      </div>
                        

                      <div className="list-col-grow">
                        <div className="text-lg font-thin tabular-nums flex-cols m-0 p-0">
                          <div className="m-0 p-0">
                            Monto: ${pago.monto}
                          </div>
                        </div>
                        
                        <div className="text-lg font-thin tabular-nums flex-cols m-0 p-0">
                          <div className="m-0 p-0">
                            Fecha de pago: 
                          </div>
                          <div className="flex justify-end m-0 p-0">
                            {new Date(pago.created_at).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
            </div>
          ))}
        </div>
      )}

      {!loading && pagos.length === 0 && !error && (
        <p>No hay pagos registrados.</p>
      )}
      <Footer/>
    </div>


  );
};

export default LabelDatosUsuario;
