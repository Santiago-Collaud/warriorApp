// src/hooks/useNovedades.ts
import { useEffect, useState } from 'react';
import { Novedades } from '../../../interface/novedades'; // Asegúrate de que la ruta sea correcta


export function useNovedades() {
  const [novedades, setNovedades] = useState<Novedades[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNovedades = async () => {
      try {
        const res = await fetch('/api/getNovedades'); // Asegúrate de que esta ruta sea correcta
        const json = await res.json();
        setNovedades(json.novedades); 
      } catch (error) {
        console.error('Error al obtener novedades:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNovedades();
  }, []);

  return { novedades, loading };
}