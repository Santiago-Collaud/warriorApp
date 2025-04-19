export interface Rutina {
  titulo: string;
  dias: DiaRutina[];
}

export interface DiaRutina {
  dia: string;
  ejercicios: Ejercicio[];
  abdominales?: string;
}

export interface Ejercicio {
  nombre: string;
  series?: string;
  repeticiones?: string;
}
