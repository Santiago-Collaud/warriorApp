"use client";

import { useRutina } from "./hook/useRutina";
import { Rutina, DiaRutina, Ejercicio } from "@/interface/rutina";

export default function LabelRutina() {
  const { rutina, loading, error } = useRutina();

  return (
    <div className="text-white p-4">
      <h1 className="text-2xl font-bold mb-4">Rutinas de usuario</h1>

      {loading && <p>Cargando...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {!loading && !error && rutina.length === 0 && (
        <p>No hay rutinas disponibles.</p>
      )}

      {!loading &&
        !error &&
        rutina.map((rutinaItem: Rutina, index: number) => (
          <div key={index} className="mb-6 p-4 border border-gray-700 rounded">
            <h2 className="text-xl font-semibold mb-2">
              {rutinaItem.titulo}
            </h2>

            {rutinaItem.dias.map(
              (dia: DiaRutina, diaIndex: number) => (
                <div key={diaIndex} className="mb-4">
                  <h3 className="text-lg font-medium mb-1">
                    {dia.dia}
                  </h3>
                  <ul className="list-disc list-inside ml-4">
                    {dia.ejercicios.map(
                      (ej: Ejercicio, ejIndex: number) => (
                        <li key={ejIndex}>
                          <span className="font-medium">
                            {ej.nombre}
                          </span>
                          {ej.series && (
                            <span> ({ej.series})</span>
                          )}
                          {ej.observaciones && (
                            <span className="ml-2 italic text-sm text-gray-400">
                              - {ej.observaciones}
                            </span>
                          )}
                        </li>
                      )
                    )}
                  </ul>
                  {dia.abdominales && (
                    <p className="mt-2 italic text-sm text-gray-300">
                      Abdominales: {dia.abdominales}
                    </p>
                  )}
                </div>
              )
            )}
          </div>
        ))}
    </div>
  );
}
