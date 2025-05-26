import { useEffect, useState } from "react";
import { getMensajes } from "../../../../interface/mensajes/getMensajes"; 

export const useMensajeGet = () => {
    const [getMensajes, setGetMensajes] = useState<getMensajes[]>([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const fetchMensajes = async (id_cliente?: string | number) => {
        const id = id_cliente || localStorage.getItem("id_cliente") || "";

        if (!id) {
            setError("ID del cliente no disponible");
            return;
        }

        setLoading(true); // ✅ Agregado: activa el loading
        setError(null);   // ✅ Opcional: limpia el error previo

        //console.log("id_cliente front", id_cliente);

        try {
            const response = await fetch(`/api/mensajes/getMensajes?id_cliente=${id}`);
            const result = await response.json();

            //console.log("result", result);

            if (response.ok) {
                setGetMensajes(result.mensajes);
            } else {
                setError(result.error || "Error al obtener los mensajes");
            }
        } catch (err) {
        console.error("Error al cargar mensajes", err);
        setError("Error al cargar los mensajes");
        } finally {
        setLoading(false);
        }
    };
    

    useEffect(() => {
        fetchMensajes();
    }, []);
    
    return { getMensajes, loading, error , fetchMensajes };
}