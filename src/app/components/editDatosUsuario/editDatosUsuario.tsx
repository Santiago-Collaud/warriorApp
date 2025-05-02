"use client";
import { Usuario, Cliente } from "@/interface/usuario";
import { useEditDatosUsuario } from "../editDatosUsuario/hook/useEditDatosusuario";

interface ModalEditarUsuarioProps {
  usuario: Usuario;
  onSave: (clienteActualizado: Cliente) => void;
  onClose: () => void;
}

export default function ModalEditarUsuario({ usuario, onSave, onClose }: ModalEditarUsuarioProps) {
  const {
    clienteEditado,
    handleChange,
    handleGuardar,
    error,
    loading,
    idGrupoSangre,
    idFactorSanguineo,
    setIdGrupoSangre,
    setIdFactorSanguineo,
  } = useEditDatosUsuario(usuario, onSave, onClose);

  return (
    <div className="modal modal-open">
      <div className="modal-box bg-gray-900 text-white">
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="btn btn-sm btn-circle btn-ghost text-white"
          >
            X
          </button>
        </div>

        <h2 className="text-xl font-bold mb-4 text-center">Editar datos personales</h2>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            name="nombre"
            value={clienteEditado.nombre}
            onChange={handleChange}
            placeholder="Nombre"
            className="input input-bordered w-full"
          />
          <input
            type="text"
            name="apellido"
            value={clienteEditado.apellido}
            onChange={handleChange}
            placeholder="Apellido"
            className="input input-bordered w-full"
          />
          <input
            type="email"
            name="mail"
            value={clienteEditado.mail || ""}
            onChange={handleChange}
            placeholder="Correo electrónico"
            className="input input-bordered w-full"
          />
          <input
            type="tel"
            name="celular"
            value={clienteEditado.celular || ""}
            onChange={handleChange}
            placeholder="Celular"
            className="input input-bordered w-full"
          />
          <input
            type="date"
            name="fecha_nacimiento"
            value={clienteEditado.fecha_nacimiento || ""}
            onChange={handleChange}
            className="input input-bordered w-full"
          />

          {/* Grupo sanguíneo */}
          <select
            name="id_grupo_sangre"
            value={idGrupoSangre}
            onChange={(e) => setIdGrupoSangre(Number(e.target.value))}
            className="select select-bordered w-full"
          >
            <option value="">Grupo sanguíneo</option>
            <option value="1">A</option>
            <option value="2">B</option>
            <option value="3">AB</option>
            <option value="4">0</option>
          </select>

          {/* Factor sanguíneo */}
          <select
            name="id_factor_sanguineo"
            value={idFactorSanguineo}
            onChange={(e) => setIdFactorSanguineo(Number(e.target.value))}
            className="select select-bordered w-full"
          >
            <option value="">Factor RH</option>
            <option value="1">+</option>
            <option value="2">-</option>
          </select>

          {/* Observaciones */}
          <textarea
            name="obs_salud"
            value={clienteEditado.obs_salud || ""}
            onChange={handleChange}
            placeholder="Observaciones sobre la salud"
            className="textarea textarea-bordered w-full"
          />

          {error && <div className="text-red-500 text-center">{error}</div>}

          <div className="flex justify-between mt-4">
            <button onClick={onClose} className="btn btn-outline">
              Cancelar
            </button>
            <button
              onClick={handleGuardar}
              className={`btn btn-primary ${loading ? "loading" : ""}`}
              disabled={loading}
            >
              {loading ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

