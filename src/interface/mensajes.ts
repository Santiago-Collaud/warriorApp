export interface Mensajes {
  id: string;
  created_at: Date;
  contenido: string;
  leido: boolean;

  // IDs posibles de emisor y receptor
  id_emisor_cliente: number | null;
  id_receptor_cliente: number | null;
  id_emisor_admin: number | null;
  id_receptor_admin: number | null;

  // Relaciones anidadas
  emisor_cliente?: {
    nombre: string;
  };
  receptor_cliente?: {
    nombre: string;
  };
  emisor_admin?: {
    nombre: string;
  };
  receptor_admin?: {
    nombre: string;
  };
}
