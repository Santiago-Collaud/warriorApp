"use client";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { useRutina } from "./hook/useRutina";
import { Rutina, Ejercicio } from "@/interface/rutina";
import { EjercicioSeleccionado } from "@/interface/ejercicioSeleccionado";

export default function LabelRutina() {
  const { rutina, loading, error } = useRutina();
  const [diaSeleccionado, setDiaSeleccionado] = useState<number>(0);

  const [, setEjerciciosSeleccionados] = useState<EjercicioSeleccionado[]>([]);
  const router = useRouter();
  
  const handleComenzar = (rutinaItem: Rutina) => {
    const ejerciciosDia = rutinaItem.dias[diaSeleccionado].ejercicios;
    const convertidos: EjercicioSeleccionado[] = ejerciciosDia.map((ej) => ({
      nombre: ej.nombre,
      series: ej.series,
      repeticiones: ej.repeticiones,
      completado: false,
      observaciones: "",
      tiempo: 0,
    }));

    setEjerciciosSeleccionados(convertidos);
    // Guardar en localStorage
    localStorage.setItem("rutinaDelDia", JSON.stringify(convertidos));

    // Esto lo vas a cambiar después por router.push y guardar en localStorage
    //console.log("Ejercicios seleccionados:", convertidos);
    
    // Redirigir a la página de ejercicio
    router.push("/ejercicio");
  };
  const handleResumen = () => {
    router.push("/resumenRutina");
  }

  return (
    <div className="text-white p-4">
      {/*<h1 className="text-2xl font-bold mb-4">Rutinas de usuario</h1>*/}

      {loading && <p>Cargando...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading && !error && rutina.length === 0 && <p>No hay rutinas disponibles.</p>}

      {!loading &&
        !error &&
        rutina.map((rutinaItem: Rutina, index: number) => {
          const dia_rutina = rutinaItem.dias.length;

          return (
            <div key={index} className="mb-6 p-4 border border-gray-700 rounded bg-gray-950">
              <h2 className="text-xl font-semibold mb-4">{rutinaItem.titulo}</h2>

              {/* Select para elegir el día */}
              <div className="mb-4">
                <label htmlFor={`select-dia-${index}`} className="block mb-2 font-medium">
                  Seleccionar día:
                </label>
                <select
                  id={`select-dia-${index}`}
                  value={diaSeleccionado}
                  onChange={(e) => setDiaSeleccionado(Number(e.target.value))}
                  className="bg-gray-800 text-white p-2 rounded"
                >
                  {Array.from({ length: dia_rutina }).map((_, i) => (
                    <option key={i} value={i}>
                      {rutinaItem.dias[i].dia}
                    </option>
                  ))}
                </select>
              </div>

              {/* Mostrar el día seleccionado */}
              <div className="mb-6">
                
                <div className="overflow-x-auto">
                  <table className="table w-full text-sm text-white">
                    <thead>
                      <tr className="bg-gray-800 text-left">
                        <th className="p-2">Ejercicio</th>
                        <th className="p-2">Serie</th>
                        <th className="p-2">Repetición</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rutinaItem.dias[diaSeleccionado].ejercicios.map((ej: Ejercicio, ejIndex: number) => (
                        <tr key={ejIndex} className="border-t border-gray-600">
                          <td className="p-2 font-medium">{ej.nombre}</td>
                          <td className="p-2">{ej.series || "-"}</td>
                          <td className="p-2">{ej.repeticiones || "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {rutinaItem.dias[diaSeleccionado].abdominales && (
                  <p className="mt-4 italic text-sm text-gray-300">
                    Abdominales: {rutinaItem.dias[diaSeleccionado].abdominales}
                  </p>
                )}
              </div>
              <div className="flex grid grid-cols-2 gap-4">
                  <div className="flex jusify-end mb-4">
                  <button
                    className="btn btn-soft btn-secondary"
                    onClick={() => {
                      handleComenzar(rutinaItem);
                    }}
                  >
                    Comenzar
                  </button>
                </div>
                <div className="flex jusify-end mb-4">
                  <button
                    className="btn btn-soft btn-secondary"
                    onClick={
                      handleResumen
                    }
                  >
                    Resumen
                  </button>
                </div>
              </div>
              
            </div>
          );
        })}
        
    </div>
  );
}
