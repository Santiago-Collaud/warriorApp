export interface GrupoSanguineo {
    id_grupo: number;
    grupo: string;
  }
  
  export interface FactorSanguineo {
    id_factor: number;
    factor: string;
  }
  
  export interface Cliente {
    id_cliente: number;
    nombre: string;
    apellido: string;
    mail: string;
    celular: string;
    fecha_nacimiento: string;
    grupo_sanguineo?: GrupoSanguineo;
    factor_sanguineo?: FactorSanguineo;
    obs_salud?: string;
    activo: boolean;
    plan: number;
  }
  
  export interface Usuario {
    id: number;
    created_at: string;
    username: string;
    pass: string;
    id_cliente: number;
    clientes?: Cliente;
  }
  