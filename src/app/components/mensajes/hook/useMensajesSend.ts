import { useState } from "react";
import { sendMensaje } from "@/interface/mensajes/sendMensajes";


export const useMensajeSend = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const enviarMensaje = async (mensaje: sendMensaje) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/mensajes/setMensajes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mensaje),
      });

      const result = await response.json();

      if(response.ok) {
        //alert("Mensaje enviado correctamente");
       //console.log("Mensaje enviado correctamente:", result);
       return true;
      }

      if (!response.ok) {
        setError(result.error || "Error al enviar el mensaje");
        return null;
      }

      return result.mensaje; // o result.mensaje según el backend
    } catch (err) {
      console.error("Error al enviar mensaje", err);
      setError("Error de red o servidor");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { enviarMensaje, loading, error };
};