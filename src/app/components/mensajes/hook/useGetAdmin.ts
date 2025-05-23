import { useState, useEffect } from "react";
import {Admisnistrador} from "@/interface/administradores";

export const useGetAdmins = () => {
  const [admins, setAdmins] = useState<Admisnistrador[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const res = await fetch("/api/mensajes/getAdmin");
        const result = await res.json();

        if (!res.ok) throw new Error(result.error || "Error al obtener admins");

        console.log("Administradores obtenidos:", result.admins);

        setAdmins(result.admins);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

   

    fetchAdmins();
  }, []);

  return { admins, loading, error };
};
