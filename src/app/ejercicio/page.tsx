//este label muestra la rutina en progreso con la funcionalidad de tiempo y lista de ejercicios
"use client";
import { useEjercicio } from "../ejercicio/hook/useEjerccios"; // Importamos el hook

export default function EjercicioPage() {
  
  const { ejercicios,
          tiempo,
          activo,
          nombreAbs,
          abCompletado,
          formatTiempo,
          toggleCompletado,
          toggleAbCompletado,
          actualizarObservacion,
          finalizarRutina,
          setActivo,
          setTiempo,
          } = useEjercicio(); // Desestructuramos el hook
  
    return (
    <div className="p-4 text-white">
      <h1 className="text-2xl font-bold mb-4">Rutina en progreso</h1>

      <div className="mb-6 text-center">
        <h2 className="text-xl font-semibold">Tiempo transcurrido</h2>
        <p className="text-3xl mt-2">{formatTiempo(tiempo)}</p>
        <div className="flex justify-center gap-4 mt-2">
          <button className="btn btn-success" onClick={() => setActivo(true)} disabled={activo}>
            Iniciar
          </button>
          <button className="btn btn-warning" onClick={() => setActivo(false)} disabled={!activo}>
            Pausar
          </button>
          <button
            className="btn btn-outline"
            onClick={() => {
              setTiempo(0);
              setActivo(false);
            }}
          >
            Reiniciar
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full max-w-[420px] mx-auto p-4 text-sm">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th>✔</th>
              <th>Ejercicio</th>
              <th>Series</th>
              <th>Reps</th>
              <th>Observaciones</th>
            </tr>
          </thead>
          <tbody>
            {ejercicios.map((ej, i) => (
              <tr key={i} className="border-t border-gray-600">
                <td>
                  <input
                    type="checkbox"
                    checked={ej.completado}
                    onChange={() => toggleCompletado(i)}
                    className="checkbox"
                  />
                </td>
                <td>{ej.nombre}</td>
                <td>
                  {ej.series}
                  {(() => {
                    const match = ej.series?.match(/\d+/g); // busca el primer número
                    const cantidad = match ? Math.max(...match.map(Number)) : 0;

                   

                    if (cantidad > 0) {
                      return (
                        <div className="flex gap-1">
                          {Array.from({ length: cantidad }).map((_, idx) => (
                            <input
                              key={idx}
                              type="checkbox"
                              className="checkbox checkbox-xs"
                              onChange={() => {}}
                            />
                          ))}
                        </div>
                      );
                    }

                    return (
                      <input
                        type="checkbox"
                        className="checkbox"
                        onChange={() => {}}
                      />
                    );
                  })()}
                </td>

                <td>{ej.repeticiones || "-"}</td>
                
                <td>
                  <input
                    type="text"
                    value={ej.observaciones}
                    onChange={(e) => actualizarObservacion(i, e.target.value)}
                    placeholder="Notas..."
                    className="input input-bordered w-full"
                  />
                </td>
              </tr>
            ))}
            {/* 🧠 Sección de abdominales */}
          </tbody>
        </table>
      </div>
        {/* 🧘‍♂️ Checkbox general de abdominales */}
        {nombreAbs && (
          <div className="mt-6 flex flex-col items-center gap-2">
            <h3 className="text-lg font-semibold">{nombreAbs}</h3>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={abCompletado}
                onChange={toggleAbCompletado}
                className="checkbox checkbox-primary"
              />
              <span>{abCompletado ? "Completado ✅" : "Pendiente ❌"}</span>
            </label>
          </div>
        )}
      <div className="mt-6 flex justify-center">
        <button onClick={finalizarRutina} className="btn btn-primary">
          Finalizar rutina
        </button>
      </div>
      
    </div>
  );
}
