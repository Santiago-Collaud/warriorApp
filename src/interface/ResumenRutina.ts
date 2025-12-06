export interface ResumenRutina {
    fecha: string;
    nombre?: string;
    ejercicios: {
      nombre: string;
      completado: boolean;
      observaciones?: string;
    }[];
    duracion: number; // segundos
  }