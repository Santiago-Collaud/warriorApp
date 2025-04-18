"use client";
import { usePago } from "./hooks/usePagos";

const LabelDatosUsuario = () => {
 
  const { loading, error, pagos} = usePago(); // Desestructuramos el hook

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
