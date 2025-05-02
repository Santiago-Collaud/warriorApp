"use client";
import { useState } from "react";
import { Cliente, Usuario } from "@/interface/usuario";
import { validateClienteData } from "@/validaciones/validarCliente";

export const useEditDatosUsuario = (
  usuario: Usuario,
  onSave: (clienteActualizado: Cliente) => void,
  onClose: () => void
) => {
  const [clienteEditado, setClienteEditado] = useState<Cliente>({
    ...usuario.clientes!,
  });

  const [idGrupoSangre, setIdGrupoSangre] = useState(clienteEditado.grupo_sanguineo?.id_grupo || "");
  const [idFactorSanguineo, setIdFactorSanguineo] = useState(clienteEditado.factor_sanguineo?.id_factor || "");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setClienteEditado((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGuardar = async () => {
    const validationError = validateClienteData(clienteEditado);
    if (validationError.length > 0) {
      setError(validationError.join(", "));
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/usuario/updateDatosUsuario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...clienteEditado,
          id_grupo_sangre: idGrupoSangre,
          id_factor_sanguineo: idFactorSanguineo,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Error desconocido");
      }

      const json = (await res.json()) as { cliente: Cliente[] | null };

      if (!json.cliente || json.cliente.length === 0) {
        setError("No se pudo obtener el cliente actualizado.");
        setLoading(false);
        return;
      }

      onSave(json.cliente[0]);
      onClose();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Error al actualizar");
    } finally {
      setLoading(false);
    }
  };

  return {
    clienteEditado,
    handleChange,
    handleGuardar,
    error,
    loading,
    idGrupoSangre,
    idFactorSanguineo,
    setIdGrupoSangre,
    setIdFactorSanguineo,
  };
};
