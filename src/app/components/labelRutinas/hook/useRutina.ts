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

  // 🔹 Carga rutina, local o remota
  const fetchRutina = async (forzarActualizacion = false) => {
    const id_cliente = localStorage.getItem("id_cliente") || "";
    if (!id_cliente) {
      setError("Usuario no identificado");
      setLoading(false);
      return;
    }

    // 1️⃣ Primero intentamos desde el localStorage (si no se fuerza actualización)
    if (!forzarActualizacion) {
      const local = localStorage.getItem("rutinaGuardada");
      if (local) {
        try {
          const rutinaLocal = JSON.parse(local);
          setRutina(rutinaLocal);
          setLoading(false);
          return; // salimos sin pedir al backend
        } catch (err) {
          console.warn("Error al leer rutina local, se descarga nueva.",err);
          localStorage.removeItem("rutinaGuardada");
        }
      }
    }

    // 2️⃣ Si no hay rutina local o se fuerza actualización, la pedimos al backend
    try {
      const res = await fetch(`/api/getRutina?id_cliente=${id_cliente}`);
      const result = (await res.json()) as ApiResponse;

      if (!res.ok) {
        setError("Error al obtener la rutina");
      } else if ("error" in result) {
        setError(result.error);
      } else if ("sinRutina" in result) {
        setRutina([]);
      } else {
        const nuevaRutina = [result.rutina];
        setRutina(nuevaRutina);
        localStorage.setItem("rutinaGuardada", JSON.stringify(nuevaRutina)); // 💾 guardamos localmente
      }
    } catch (err) {
      console.error(err);
      setError("Error de red al cargar la rutina");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Cargar rutina al montar el componente
  useEffect(() => {
    fetchRutina(false); // primero busca en localStorage
  }, []);

  return { rutina, loading, error, fetchRutina, setLoading };
};
