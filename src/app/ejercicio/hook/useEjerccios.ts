import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { EjercicioSeleccionado } from "@/interface/ejercicioSeleccionado";
import { ResumenRutina } from "@/interface/ResumenRutina";

export const useEjercicio = () => {
  const router = useRouter();
  const [ejercicios, setEjercicios] = useState<EjercicioSeleccionado[]>([]);
  const [tiempo, setTiempo] = useState<number>(0);
  const [activo, setActivo] = useState<boolean>(false);

  // ⏱️ Iniciar cronómetro
  useEffect(() => {
    let intervalo: NodeJS.Timeout;

    if (activo) {
      intervalo = setInterval(() => {
        setTiempo((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(intervalo);
  }, [activo]);

  // ⏮️ Cargar rutina desde localStorage
  useEffect(() => {
    const rutinaGuardada = localStorage.getItem("rutinaDelDia");
    if (rutinaGuardada) {
      setEjercicios(JSON.parse(rutinaGuardada));
    } else {
      alert("No hay rutina cargada");
      router.push("/usuario");
    }
  }, [router]);

  // 🧠 Formato de tiempo tipo 00:03:21
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

  // 📝 Editar observación
  const actualizarObservacion = (index: number, texto: string) => {
    const actualizados = [...ejercicios];
    actualizados[index].observaciones = texto;
    setEjercicios(actualizados);
  };

  // 🔚 Finalizar rutina
  const finalizarRutina = () => {
    // 👉 Guardar resumen en localStorage
    const resumen: ResumenRutina = {
      fecha: new Date().toISOString().split("T")[0],
      ejercicios: ejercicios.map((ej) => ({
        nombre: ej.nombre,
        completado: ej.completado,
        observaciones: ej.observaciones || "",
      })),
      duracion: tiempo,
    };

    const historial = JSON.parse(localStorage.getItem("historialRutinas") || "[]");
    historial.push(resumen);
    localStorage.setItem("historialRutinas", JSON.stringify(historial));

    // Limpiar rutina activa
    localStorage.removeItem("rutinaDelDia");
    router.push("/usuario");
}
    return {
        ejercicios,
        tiempo,
        activo,
        formatTiempo,
        toggleCompletado,
        actualizarObservacion,
        finalizarRutina,
        setActivo,
        setTiempo,
        };
};