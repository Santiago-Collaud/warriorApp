import { useEffect, useState } from "react";
import { Pago } from "@/interface/pago";

export const usePago = () => {

    const [pagos, setPagos] = useState<Pago[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
    const fetchPagos = async () => {
      const id_cliente = localStorage.getItem("id_cliente") || "";

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

    fetchPagos();
  }, []);


    return { pagos, loading, error };
    
};