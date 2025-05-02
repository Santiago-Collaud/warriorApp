import { useEffect, useState } from "react";
import { Pago } from "@/interface/pago";

export const usePago = () => {

    const [pagos, setPagos] = useState<Pago[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    const fetchPagos = async () => {
      //const id_usuario = localStorage.getItem("id_usuario") || ""; // Asumiendo que `id_usuario` es el mismo que `id_cliente`
      const id_cliente = localStorage.getItem("id_cliente") || ""; // Asumiendo que `id_cliente` es el mismo que `id_usuario`
      //const id_cliente = 1 ////TENES EL PROBLEMA EN EL ID_CLIENTE DESDE EL LOCAL
      //console.log("id_cliente front", id_cliente);
  
      try {
        const response = await fetch(`/api/pagos/getPagosById?id_cliente=${id_cliente}`);
        const result = await response.json();
  
        if (response.ok && !result.sinPagos) {
          setPagos(result.pagos);
        } else if (result.sinPagos) {
          setPagos([]);
          setError(result.mensaje);
        } else {
          setError(result.error || "Error al obtener los pagos.");
        }
      } catch (err) {
        console.error("Error al cargar pagos", err);
        setError("Error al cargar los pagos");
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchPagos();
    }, []);

    return { pagos, loading, error };
    
};