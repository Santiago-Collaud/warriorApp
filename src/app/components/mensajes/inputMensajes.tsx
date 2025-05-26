'use client';

import { useState } from "react";
import { useGetAdmins } from "@/app/components/mensajes/hook/useGetAdmin";
import { useMensajeSend } from "@/app/components/mensajes/hook/useMensajesSend";

interface Props {
  id_emisor_cliente: number; // viene del cliente autenticado
  onMensajeEnviado?: () => void; // para refrescar los mensajes si querés
}

export default function MensajeInput({ id_emisor_cliente, onMensajeEnviado }: Props) {
  const { admins, loading: loadingAdmins, error } = useGetAdmins();
  const { enviarMensaje, loading } = useMensajeSend();

  const [contenido, setContenido] = useState("");
  const [id_receptor_admin, setIdReceptorAdmin] = useState<number | null>(null);

  const handleSend = async () => {
    if (!contenido.trim() || !id_receptor_admin) return;

    const resultado = await enviarMensaje({
      contenido,
      id_emisor_cliente,
      id_receptor_admin,
    });

    if (resultado) {
      
      alert("Mensaje enviado con éxito");
      setContenido(""); // limpia el mensaje
      onMensajeEnviado?.(); // refresca los mensajes si se pasó
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-600 rounded shadow  border border-gray-300">
      <h2 className="text-lg font-bold mb-2">Enviar mensaje</h2>

      {loadingAdmins && <p>Cargando administradores...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      <select
        value={id_receptor_admin || ""}
        onChange={(e) => setIdReceptorAdmin(Number(e.target.value))}
        className="w-full mb-2 p-2 border rounded darck:bg-gray-700 dark:text-white bg-gray-700 text-gray-800"
      >
        <option value="">Seleccionar administrador</option>
        {admins.map((admin) => (
          <option key={admin.id_usuario} value={admin.id_usuario}>
            {admin.nombre}
          </option>
        ))}
      </select>

      <textarea
        value={contenido}
        onChange={(e) => setContenido(e.target.value)}
        placeholder="Escribe tu mensaje..."
        className="w-full p-2 border rounded mb-2"
        rows={3}
      />

      <button
        onClick={handleSend}
        disabled={loading || !contenido.trim() || !id_receptor_admin}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Enviando..." : "Enviar"}
      </button>
    </div>
  );
}
