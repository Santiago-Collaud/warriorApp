export interface ResumenRutina {
    fecha: string;
    ejercicios: {
      nombre: string;
      completado: boolean;
      observaciones?: string;
    }[];
    duracion: number; // segundos
  }