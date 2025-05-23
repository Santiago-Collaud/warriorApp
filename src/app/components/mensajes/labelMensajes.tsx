"use client";

import { useMensajeGet } from "@/app/components/mensajes/hook/useMensajeGet";
import { getMensajes as Mensaje } from "@/interface/mensajes/getMensajes";
import MensajeInput from "../mensajes/inputMensajes";

const LabelMensajes = () => {
  const { loading, error, getMensajes } = useMensajeGet();
  const usuarioId = Number(localStorage.getItem("usuarioId"));

  return (
    <div className="text-white p-4">
      <h1 className="text-xl font-bold mb-4">Mensajes</h1>

      <div className="overflow-y-auto h-screen">
        {loading && <p>Cargando mensajes...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && getMensajes.length === 0 && (
          <p>No hay mensajes disponibles.</p>
        )}

        {!loading && !error && getMensajes.length > 0 && (
          <div className="border border-gray-300 bg-zinc-500 rounded-lg p-4 mb-4">
            {getMensajes.map((msg: Mensaje) => (
              <div key={msg.id} className="p-2 mb-6">
                
                {/* MENSAJE CLIENTE */}
                {msg.contenido?.trim() && (
                  <div className="chat chat-end mb-2">
                    <div className="chat-bubble bg-zinc-900 text-white">
                      <strong>Yo</strong>
                      <div className="text-gray-300">{msg.contenido}</div>
                      <div className="text-sm text-gray-400">
                        {new Date(msg.created_at).toLocaleString()}
                      </div>
                    </div>
                  </div>
                )}

                {/* RESPUESTA ADMIN */}
                {msg.respuesta?.trim() && (
                  <div className="chat chat-start">
                    <div className="chat-bubble bg-blue-600 text-white">
                      <strong>{msg.id_receptor_admin?.nombre || "Admin"}</strong>
                      <div className="text-gray-300">{msg.respuesta}</div>
                      <div className="text-sm text-gray-200">
                        {msg.respuesta_created_at
                          ? new Date(msg.respuesta_created_at).toLocaleString()
                          : new Date(msg.created_at).toLocaleString()}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="border border-gray-300 bg-zinc-500 rounded-lg p-4 mb-4">
        <MensajeInput
          id_emisor_cliente={usuarioId}
          //onMensajeEnviado={fetchMensajes} // opcional, si querés refrescar los mensajes
        />
      </div>
    </div>
  );
};

export default LabelMensajes;

