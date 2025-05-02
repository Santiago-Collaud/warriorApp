import { useEffect, useState } from "react";
import { Rutina } from "@/interface/rutina";

type ApiResponse =
  | { rutina: Rutina }
  | { sinRutina: true }
  | { error: string };

export const useRutina = () => {
  const [rutina, setRutina] = useState<Rutina[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRutina = async () => {
    const id_cliente = localStorage.getItem("id_cliente") || "";
    if (!id_cliente) {
      setError("Usuario no identificado");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`/api/getRutina?id_cliente=${id_cliente}`);
      const result = (await res.json()) as ApiResponse;

      if (!res.ok) {
        setError("Error al obtener la rutina");
      } else if ("error" in result) {
        setError(result.error);
      } else if ("sinRutina" in result) {
        setRutina([]); // no hay rutina
      } else {
        // Aquí envolvemos en array para mantener tu state como Rutina[]
        setRutina([result.rutina]);
      }
    } catch (err) {
      console.error(err);
      setError("Error de red al cargar la rutina");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRutina();
  }, []);

  return { rutina, loading, error };
};