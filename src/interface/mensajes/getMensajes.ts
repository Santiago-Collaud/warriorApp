export interface getMensajes {
  id: string;
  created_at: Date;
  contenido: string;
  respuesta: string;
  respuesta_created_at: Date | null;
  leido: boolean;
  hilo_id: string;

  // IDs posibles de emisor y receptor
  id_emisor_cliente: number | null;
  id_receptor_admin: {
    nombre: string;
  } | null;

  // Relaciones anidadas
  emisor_cliente?: {
    nombre: string;
  };
}
