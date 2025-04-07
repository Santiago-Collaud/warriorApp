"use client";
import { useState, useEffect } from "react";

// Tipado para mayor seguridad
interface GrupoSanguineo {
  id_grupo: number;
  grupo: string;
}

interface FactorSanguineo {
  id_factor: number;
  factor: string;
}

interface Cliente {
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

interface Usuario {
  id: number;
  created_at: string;
  username: string;
  pass: string;
  id_cliente: number;
  clientes?: Cliente;
}

const LabelDatosUsuario = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClientes = async () => {
    try {
      const response = await fetch("/api/usuario/getDatosusuario");
      const result = await response.json();

      if (response.ok) {
        setUsuarios(result.clientes);
        console.log("result", result.clientes);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("Error al cargar los clientes");
      console.error("Error al cargar clientes", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  return (
    <div className="text-white">
      <h1>Datos de usuarios</h1>

      {loading && <p>Cargando...</p>}
      {error && <p>Error: {error}</p>}

      {usuarios.map((usuario) => (
        <div
          key={usuario.id}
          className="bg-gray-200 text-black p-4 mt-4 rounded shadow"
        >
          <h2>
            <strong>Usuario:</strong> {usuario.username}
          </h2>
          <h2>
            <strong>Nombre:</strong> {usuario.clientes?.nombre}
          </h2>
          <h2>
            <strong>Apellido:</strong> {usuario.clientes?.apellido}
          </h2>
          <h2>
            <strong>Email:</strong> {usuario.clientes?.mail}
          </h2>
          <h2>
            <strong>Teléfono:</strong> {usuario.clientes?.celular}
          </h2>
          <h2>
            <strong>Fecha de Nacimiento:</strong>{" "}
            {usuario.clientes?.fecha_nacimiento}
          </h2>
          <h2>
            <strong>Grupo sanguíneo:</strong>{" "}
            {usuario.clientes?.grupo_sanguineo?.grupo}
          </h2>
          <h2>
            <strong>Factor sanguíneo:</strong> RH{" "}
            {usuario.clientes?.factor_sanguineo?.factor}
          </h2>
          <h2>
            <strong>Observaciones de salud:</strong>{" "}
            {usuario.clientes?.obs_salud}
          </h2>
        </div>
      ))}
    </div>
  );
};

export default LabelDatosUsuario;

