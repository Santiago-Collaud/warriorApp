"use Client";
//import { useState, useEffect } from "react";
import { useMensaje } from "@/app/components/mensajes/hook/useMensaje"; // Importamos el hook

const LabelMensajes = () => {
const { loading, error, mensajes } = useMensaje();

return (
    <div className="text-white p-4 ">
      <h1 className="text-xl font-bold mb-4">Mesajes</h1>
      <div className="overflow-y-auto h-screen">
        <div className="border border-gray-300 bg-zinc-500 rounded-lg p-4 mb-4">
          {mensajes.map((msg) => (
            <div key={msg.id}
              className="mb-2 p-2 border-b border-gray-300">
              <div className="chat chat-start">
                <div className="chat-bubble text-white">
                  <strong>
                    {msg.emisor_cliente?.nombre ||
                    msg.receptor_admin?.nombre ||
                    "Yo"}
                    :</strong>
                <div className="text-lg text-gray-300">
                    {msg.contenido}
                </div>
                
                <div className="text-s text-gray-300">
                  {new Date(msg.created_at).toLocaleString()}
                </div> 
                </div>
              
              </div>
                
            </div>
          ))}
      </div>
      </div>
      
      
      <div className="border border-gray-300 bg-zinc-500 rounded-lg p-4 mb-4">
        <h1>para escribir</h1>
      </div>
      
    </div>
)
}
export default LabelMensajes;