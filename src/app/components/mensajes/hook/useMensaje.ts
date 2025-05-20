import { useEffect, useState } from "react";
import { Mensajes } from "../../../../interface/mensajes"; 

export const useMensaje = () => {
    const [mensajes, setMensajes] = useState<Mensajes[]>([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const fetchMensajes = async () => {
        const id_usuario = localStorage.getItem("id_usuario") || "";
        
        console.log("id_usuario front", id_usuario);

        try {
        const response = await fetch(`/api/mensajes/getMensajes?id_usuario=${id_usuario}`);
        const result = await response.json();

        console.log("result", result);

        if (response.ok) {
            setMensajes(result.mensajes);
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
    
    return { mensajes, loading, error };
}