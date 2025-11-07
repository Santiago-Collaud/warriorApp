import { EjercicioSeleccionado } from "@/interface/ejercicioSeleccionado";

export const useGuardarProgreso = () => {
  const guardarProgreso = (data: {
    ejercicios: EjercicioSeleccionado[];
    tiempo: number;
    abCompletado?: boolean;
  }) => {
    localStorage.setItem("progresoRutina", JSON.stringify(data));
  };

  const cargarProgreso = () => {
    const data = localStorage.getItem("progresoRutina");
    return data ? JSON.parse(data) : null;
  };

  const limpiarProgreso = () => {
    localStorage.removeItem("progresoRutina");
  };

  return { guardarProgreso, cargarProgreso, limpiarProgreso };
};

