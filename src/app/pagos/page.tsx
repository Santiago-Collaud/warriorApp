"use client";
import { usePago } from "./hook/usePagos";

const LabelDatosUsuario = () => {
 
  const { loading, error, pagos} = usePago(); // Desestructuramos el hook

  return (
    <div className="text-white px-2 sm:px-4 py-4 max-w-full">
      <h1 className="text-xl font-bold mb-4">Pagos del Usuario</h1>

      {loading && <p>Cargando...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && pagos.length > 0 && (
        <div className="overflow-x-auto w-full">
          <table className="min-w-full w-full bg-white text-black rounded shadow text-sm">
            <thead className="bg-gray-200 text-left">
              <tr>
                <th className="px-4 py-2 whitespace-nowrap">Mes</th>
                <th className="px-4 py-2 whitespace-nowrap">Año</th>
                <th className="px-4 py-2 whitespace-nowrap">Monto</th>
                <th className="px-4 py-2 whitespace-nowrap">Fecha de pago</th>
              </tr>
            </thead>
            <tbody>
              {pagos.map((pago, index) => (
                <tr key={index} className="border-t border-gray-300">
                  <td className="px-4 py-2 whitespace-nowrap">{pago.id_mes}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{pago.year}</td>
                  <td className="px-4 py-2 whitespace-nowrap">${pago.monto.toFixed(2)}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{new Date(pago.created_at).toLocaleDateString()}</td>
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
