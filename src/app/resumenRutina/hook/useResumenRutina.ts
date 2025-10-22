import { useEffect, useState } from "react";
import { ResumenRutina } from "@/interface/ResumenRutina";

export const useResumenRutina = () => {
  const [historial, setHistorial] = useState<ResumenRutina[]>([]);

  const cargarHistorial = () => {
    const data = localStorage.getItem("historialRutinas");
    if (data) {
      try {
        const parsed: ResumenRutina[] = JSON.parse(data);
        setHistorial(parsed);
      } catch (err) {
        console.error("Error al parsear historial:", err);
      }
    } else {
      setHistorial([]);
    }
  };

  useEffect(() => {
    cargarHistorial(); // 📥 Carga inicial

    // 🧭 Escucha cambios globales del localStorage
    const handler = (e: StorageEvent) => {
      if (e.key === "historialRutinas") {
        cargarHistorial();
      }
    };

    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  return { historial };
};
