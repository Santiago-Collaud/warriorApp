import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { EjercicioSeleccionado } from "@/interface/ejercicioSeleccionado";
import { ResumenRutina } from "@/interface/ResumenRutina";
import { Rutina } from "@/interface/rutina";

export const useEjercicio = () => {
  const router = useRouter();
  const [ejercicios, setEjercicios] = useState<EjercicioSeleccionado[]>([]);
  const [tiempo, setTiempo] = useState<number>(0);
  const [activo, setActivo] = useState<boolean>(false);

  // ✅ Estado para abdominales
  const [abCompletado, setAbCompletado] = useState<boolean>(false);
  const [nombreAbs, setNombreAbs] = useState<string | null>(null);

  // ⏱️ Cronómetro
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (activo) {
      interval = setInterval(() => {
        setTiempo((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [activo]);

  // ⏮️ Cargar rutina o progreso guardado
  useEffect(() => {
    const rutinaGuardada: EjercicioSeleccionado[] = JSON.parse(
      localStorage.getItem("rutinaDelDia") || "[]"
    );

    // 🟢 Si hay progreso guardado, priorizar ese
    const progresoGuardado = localStorage.getItem("progresoRutina");
    if (progresoGuardado) {
      const data = JSON.parse(progresoGuardado);
      setEjercicios(data.ejercicios || []);
      setTiempo(data.tiempo || 0);
      if (data.abCompletado !== undefined) setAbCompletado(data.abCompletado);
      return; // Evita cargar desde cero
    }

    // 🔄 Si no hay progreso, cargar rutina normalmente
    const historial: ResumenRutina[] = JSON.parse(
      localStorage.getItem("historialRutinas") || "[]"
    );
    const hoy = new Date().toISOString().split("T")[0];
    const rutinaHistorial = historial.find((r) => r.fecha === hoy);

    // Buscar abdominales del día
    const rutinaCompleta: Rutina[] = JSON.parse(
      localStorage.getItem("rutinaGuardada") || "[]"
    );

    if (rutinaCompleta.length > 0) {
      const diaActual = rutinaCompleta[0].dias.find((d) =>
        d.ejercicios.some((ej) =>
          rutinaGuardada.some((re) => re.nombre === ej.nombre)
        )
      );
      if (diaActual?.abdominales) {
        setNombreAbs(diaActual.abdominales);
      }
    }

    // Merge de ejercicios con historial
    const ejerciciosMerged = rutinaGuardada.map((ej) => {
      const delHistorial = rutinaHistorial?.ejercicios.find(
        (h) => h.nombre === ej.nombre
      );
      return {
        ...ej,
        observaciones: delHistorial?.observaciones || ej.observaciones || "",
        completado: false, // empieza limpia si no hay progreso
      };
    });

    if (ejerciciosMerged.length > 0) {
      setEjercicios(ejerciciosMerged);
    } else {
      alert("No hay rutina cargada");
      router.push("/usuario");
    }

    const tiempoGuardado = localStorage.getItem("tiempoRutina");
    if (tiempoGuardado) setTiempo(Number(tiempoGuardado));
  }, [router, nombreAbs]);

  // 🧠 Formatear tiempo
  const formatTiempo = (segundos: number) => {
    const hrs = Math.floor(segundos / 3600);
    const mins = Math.floor((segundos % 3600) / 60);
    const secs = segundos % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // ✅ Cambiar estado de completado
  const toggleCompletado = (index: number) => {
    const actualizados = [...ejercicios];
    actualizados[index].completado = !actualizados[index].completado;
    setEjercicios(actualizados);
  };

  // 🧘‍♂️ Toggle abdominales
  const toggleAbCompletado = () => setAbCompletado((prev) => !prev);

  // 📝 Actualizar observación
  const actualizarObservacion = (index: number, texto: string) => {
    setEjercicios((prev) => {
      const actualizado = prev.map((ej, i) =>
        i === index ? { ...ej, observaciones: texto } : ej
      );
      localStorage.setItem("rutinaDelDia", JSON.stringify(actualizado));
      return actualizado;
    });
  };

  // 🔚 Finalizar rutina
  const finalizarRutina = () => {
    const resumen: ResumenRutina = {
      fecha: new Date().toISOString().split("T")[0],
      ejercicios: [
        ...ejercicios.map((ej) => ({
          nombre: ej.nombre,
          completado: ej.completado,
          observaciones: ej.observaciones || "",
        })),
        ...(nombreAbs
          ? [{ nombre: nombreAbs, completado: abCompletado }]
          : []),
      ],
      duracion: tiempo,
    };

    const historial: ResumenRutina[] = JSON.parse(
      localStorage.getItem("historialRutinas") || "[]"
    );

    const indexExistente = historial.findIndex(
      (r) => r.fecha === resumen.fecha
    );

    if (indexExistente >= 0) historial[indexExistente] = resumen;
    else historial.push(resumen);

    localStorage.setItem("historialRutinas", JSON.stringify(historial));
    localStorage.removeItem("rutinaDelDia");
    router.push("/usuario");
  };

  return {
    ejercicios,
    setEjercicios,
    tiempo,
    activo,
    nombreAbs,
    abCompletado,
    formatTiempo,
    toggleCompletado,
    toggleAbCompletado,
    actualizarObservacion,
    finalizarRutina,
    setActivo,
    setTiempo,
  };
};
