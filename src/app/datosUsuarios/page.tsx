"use client";
import { useUsuario } from "../datosUsuarios/hook/useUsuario"; // Importamos el hook


export default function HistorialRutinas() {
  const { loading, error, usuarios } = useUsuario();

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
}

