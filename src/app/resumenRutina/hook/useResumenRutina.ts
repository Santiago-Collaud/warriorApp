import { useEffect, useState } from "react";
import { ResumenRutina } from "@/interface/ResumenRutina";

export const useResumenRutina = () => {

    const [historial, setHistorial] = useState<ResumenRutina[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("historialRutinas");
    if (data) {
      try {
        const parsed: ResumenRutina[] = JSON.parse(data);
        setHistorial(parsed);
      } catch (err) {
        console.error("Error al parsear historial:", err);
      }
    }
  }, []);

  return {
    historial,
  }
}