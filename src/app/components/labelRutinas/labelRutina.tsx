//este label muestra la rutina del usuario con opción de comenzar, continuar y ver resumen
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useRutina } from "./hook/useRutina";
import { Rutina, DiaRutina, Ejercicio } from "@/interface/rutina";
import { EjercicioSeleccionado } from "@/interface/ejercicioSeleccionado";
import { ResumenRutina } from "@/interface/ResumenRutina";

export default function LabelRutina() {
  const { rutina, loading, error, fetchRutina, setLoading } = useRutina();
  const [diaSeleccionado, setDiaSeleccionado] = useState<number>(0);
  const [hayProgreso, setHayProgreso] = useState<boolean>(false);
  const router = useRouter();

  // 🔁 Detectar si hay rutina en progreso
  useEffect(() => {
    const progreso = localStorage.getItem("progresoRutina");
    setHayProgreso(!!progreso);
  }, []);

  const handleComenzar = (rutinaItem: Rutina) => {
    const diaActual: DiaRutina = rutinaItem.dias[diaSeleccionado];
    const ejerciciosDia: Ejercicio[] = diaActual.ejercicios;

    const prevRutinaJson = localStorage.getItem("rutinaDelDia") || "[]";
    const prevRutina: EjercicioSeleccionado[] = JSON.parse(prevRutinaJson);

    const historialJson = localStorage.getItem("historialRutinas") || "[]";
    const historial: ResumenRutina[] = JSON.parse(historialJson);

    // Buscar en el historial la última rutina que contenga alguno de los ejercicios actuales
    const ultimaDelMismoDia = [...historial]
      .reverse()
      .find((r: ResumenRutina) =>
        r.ejercicios.some((ejRut: { nombre: string }) =>
          ejerciciosDia.some((d: Ejercicio) => d.nombre === ejRut.nombre)
        )
      );

    // Mapear ejercicios preservando observaciones anteriores o del historial
    const convertidos: EjercicioSeleccionado[] = ejerciciosDia.map(
      (ej: Ejercicio) => {
        const previo = ultimaDelMismoDia?.ejercicios.find(
          (p: { nombre: string; observaciones?: string }) =>
            p.nombre === ej.nombre
        );

        return {
          nombre: ej.nombre,
          series: ej.series,
          repeticiones: ej.repeticiones,
          completado: false,
          observaciones:
            previo?.observaciones ||
            prevRutina.find((p) => p.nombre === ej.nombre)?.observaciones ||
            ej.observaciones ||
            "",
        };
      }
    );

    localStorage.setItem("rutinaDelDia", JSON.stringify(convertidos));
    localStorage.setItem("diaRutinaActual", diaActual.dia);
    if (diaActual.abdominales) {
      localStorage.setItem("abdominalesDelDia", diaActual.abdominales);
    }

    localStorage.removeItem("progresoRutina"); // 👈 reinicia progreso anterior
    router.push("/ejercicio");
  };

  const handleContinuar = () => {
    router.push("/ejercicio");
  };

  const handleResumen = () => {
    router.push("/resumenRutina");
  };

  return (
    <div className="text-white p-4">
      {loading && (
        <Image
          src="/backGrounds/bg-usuarios-app.png"
          alt="logo warrior"
          width={1000}
          height={1000}
          className="rounded-t-lg shadow-xl m-0 p-0 filter brightness-50"
          priority
        />
      )}

      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading && !error && rutina.length === 0 && (
        <p>No hay rutinas disponibles.</p>
      )}

      {!loading &&
        !error &&
        rutina.map((rutinaItem: Rutina, index: number) => {
          const dia_rutina = rutinaItem.dias.length;

          return (
            <div
              key={index}
              className="mb-6 p-4 border border-gray-700 rounded bg-gray-950"
            >
              <h2 className="text-xl font-semibold mb-4">
                {rutinaItem.titulo}
              </h2>
              <div className="flex justify-end mb-4">
                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => {
                    setLoading(true);
                    fetchRutina(true);
                  }}
                >
                  🔄 Actualizar rutina
                </button>
              </div>

              {/* Selector de día */}
              <div className="mb-4">
                <label
                  htmlFor={`select-dia-${index}`}
                  className="block mb-2 font-medium"
                >
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

              {/* Tabla de ejercicios */}
              <div className="mb-6 overflow-x-auto">
                <table className="table w-full text-sm text-white">
                  <thead>
                    <tr className="bg-gray-800 text-left">
                      <th className="p-2">Ejercicio</th>
                      <th className="p-2">Serie</th>
                      <th className="p-2">Repetición</th>
                      <th className="p-2">Notas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rutinaItem.dias[diaSeleccionado].ejercicios.map(
                      (ej: Ejercicio, ejIndex: number) => (
                        <tr key={ejIndex} className="border-t border-gray-600">
                          <td className="p-2 font-medium">{ej.nombre}</td>
                          <td className="p-2">{ej.series || "-"}</td>
                          <td className="p-2">{ej.repeticiones || "-"}</td>
                          <td className="p-2">{ej.observaciones || "-"}</td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>

              {rutinaItem.dias[diaSeleccionado].abdominales && (
                <p className="mt-4 italic text-sm text-gray-300">
                  Abdominales:{" "}
                  {rutinaItem.dias[diaSeleccionado].abdominales}
                </p>
              )}

              {/* Botones finales */}
              <div className="flex justify-center mt-4">
                <div className="grid grid-cols-3 gap-4">
                  {hayProgreso && (
                    <button
                      className="btn btn-success"
                      onClick={handleContinuar}
                    >
                      Continuar rutina
                    </button>
                  )}

                  <button
                    className="btn btn-soft btn-secondary"
                    onClick={() => handleComenzar(rutinaItem)}
                  >
                    Comenzar
                  </button>

                  <button
                    className="btn btn-soft btn-secondary"
                    onClick={handleResumen}
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
