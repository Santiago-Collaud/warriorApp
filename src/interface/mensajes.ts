export interface Mensajes {
    id: string;
    created_at: Date;
    id_emisor: number;
    id_receptor: number;
    contenido: string;
    leido: boolean;
  }