import { useEffect, useState } from "react";
import { Usuario } from "@/interface/usuario";

export const useUsuario = () => {
const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClientes = async () => {
    const id_usuario = localStorage.getItem("id_usuario") || "";
    
    //console.log("id_usuario front", id_usuario);
    try {
      const response = await fetch(`/api/usuario/getDatosusuario?id_usuario=${id_usuario}`);
      const result = await response.json();
      if (response.ok) {
        //console.log("result", result);
        setUsuarios(result.clientes);
      } else {
        setError(result.error || "Error al obtener la cantidad de clientes");
      }
    } catch (err) {
      console.error("Error al cargar clientes", err);
      setError("Error al cargar los clientes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  return { usuarios, loading, error };
};