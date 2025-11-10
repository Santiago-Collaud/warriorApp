"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { EjercicioSeleccionado } from "@/interface/ejercicioSeleccionado";
import { ResumenRutina } from "@/interface/ResumenRutina";

export const useEjercicio = () => {
  const router = useRouter();

  const [ejercicios, setEjercicios] = useState<EjercicioSeleccionado[]>([]);
  const [tiempo, setTiempo] = useState<number>(0);
  const [activo, setActivo] = useState<boolean>(false);

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

  // 🧩 Cargar rutina del día o progreso guardado
  useEffect(() => {
    const progreso = JSON.parse(localStorage.getItem("progresoRutina") || "null");
    const rutina = JSON.parse(localStorage.getItem("rutinaDelDia") || "[]");
    const abs = localStorage.getItem("abdominalesDelDia");

    if (progreso?.ejercicios?.length) {
      setEjercicios(progreso.ejercicios);
      setTiempo(progreso.tiempo || 0);
      setAbCompletado(!!progreso.abCompletado);
    } else if (rutina.length > 0) {
      setEjercicios(rutina);
    } else {
      alert("⚠️ No hay rutina cargada.");
      router.push("/usuario");
    }

    if (abs) setNombreAbs(abs);
  }, [router]);

  const formatTiempo = (segundos: number) => {
    const hrs = Math.floor(segundos / 3600);
    const mins = Math.floor((segundos % 3600) / 60);
    const secs = segundos % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const toggleCompletado = (index: number) => {
    const actualizados = [...ejercicios];
    actualizados[index].completado = !actualizados[index].completado;
    setEjercicios(actualizados);
  };

  const toggleAbCompletado = () => setAbCompletado((prev) => !prev);

  const actualizarObservacion = (index: number, texto: string) => {
    setEjercicios((prev) => {
      const actualizado = prev.map((ej, i) =>
        i === index ? { ...ej, observaciones: texto } : ej
      );
      localStorage.setItem("rutinaDelDia", JSON.stringify(actualizado));
      return actualizado;
    });
  };

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
    historial.push(resumen);

    localStorage.setItem("historialRutinas", JSON.stringify(historial));
    localStorage.removeItem("rutinaDelDia");
    localStorage.removeItem("progresoRutina");
    localStorage.removeItem("abdominalesDelDia");

    router.push("/usuario");
  };

  return {
    ejercicios,
    setEjercicios,
    tiempo,
    setTiempo,
    activo,
    setActivo,
    formatTiempo,
    toggleCompletado,
    actualizarObservacion,
    finalizarRutina,
    nombreAbs,
    abCompletado,
    toggleAbCompletado,
  };
};

