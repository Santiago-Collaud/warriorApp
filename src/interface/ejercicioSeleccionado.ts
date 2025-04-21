export interface EjercicioSeleccionado {
    nombre: string;
    series?: string;
    repeticiones?: string;
    completado: boolean;
    observaciones?: string; // si querés dejar notas durante el ejercicio
    tiempo?: number; // opcional: tiempo dedicado a ese ejercicio en segundos
  }
  