"use client";
import { useState, useEffect } from "react";

interface Pago {
  id_mes: number;
  created_at: string;
  year: number;
  monto: number;
}

const LabelDatosUsuario = () => {
  const [pagos, setPagos] = useState<Pago[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPagos = async () => {
    //const id_usuario = localStorage.getItem("id_usuario") || ""; // Asumiendo que `id_usuario` es el mismo que `id_cliente`
    const id_cliente = localStorage.getItem("id_cliente") || ""; // Asumiendo que `id_cliente` es el mismo que `id_usuario`
    //const id_cliente = 1 ////TENES EL PROBLEMA EN EL ID_CLIENTE DESDE EL LOCAL
    //console.log("id_cliente front", id_cliente);

    try {
      const response = await fetch(`/api/pagos/getPagosById?id_cliente=${id_cliente}`);
      const result = await response.json();

      if (response.ok && !result.sinPagos) {
        setPagos(result.pagos);
      } else if (result.sinPagos) {
        setPagos([]);
        setError(result.mensaje);
      } else {
        setError(result.error || "Error al obtener los pagos.");
      }
    } catch (err) {
      console.error("Error al cargar pagos", err);
      setError("Error al cargar los pagos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPagos();
  }, []);

  return (
    <div className="text-white p-4">
      <h1 className="text-xl font-bold mb-4">Pagos del Usuario</h1>

      {loading && <p>Cargando...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && pagos.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white text-black rounded shadow">
            <thead className="bg-gray-200 text-left">
              <tr>
                <th className="px-4 py-2">Mes</th>
                <th className="px-4 py-2">Año</th>
                <th className="px-4 py-2">Monto</th>
                <th className="px-4 py-2">Fecha de Registro</th>
              </tr>
            </thead>
            <tbody>
              {pagos.map((pago, index) => (
                <tr key={index} className="border-t border-gray-300">
                  <td className="px-4 py-2">{pago.id_mes}</td>
                  <td className="px-4 py-2">{pago.year}</td>
                  <td className="px-4 py-2">${pago.monto.toFixed(2)}</td>
                  <td className="px-4 py-2">{new Date(pago.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && pagos.length === 0 && !error && (
        <p>No hay pagos registrados.</p>
      )}
    </div>
  );
};

export default LabelDatosUsuario;
