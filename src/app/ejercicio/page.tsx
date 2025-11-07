//este label muestra la rutina en progreso con la funcionalidad de tiempo y lista de ejercicios
"use client";
import { useEffect } from "react";
import Image from "next/image";
import { useEjercicio } from "../ejercicio/hook/useEjerccios";
import { useGuardarProgreso } from "../ejercicio/hook/useGuardarProgreso";

export default function EjercicioPage() {
  const {
    ejercicios,
    setEjercicios,
    tiempo,
    setTiempo,
    activo,
    setActivo,
    nombreAbs,
    abCompletado,
    formatTiempo,
    toggleCompletado,
    toggleAbCompletado,
    actualizarObservacion,
    finalizarRutina,
  } = useEjercicio();

  const { guardarProgreso, cargarProgreso, limpiarProgreso } = useGuardarProgreso();

  // 🔁 Cargar progreso si existe al montar
  
  useEffect(() => {
    const previo = cargarProgreso();
    if (previo) {
      setEjercicios(previo.ejercicios || []);
      setTiempo(previo.tiempo || 0);
      if (previo.abCompletado !== undefined) {
        toggleAbCompletado(); // solo si querés restaurar el estado
      }
    }
  }, [cargarProgreso, setEjercicios, setTiempo, toggleAbCompletado]);

  const handleGuardar = () => {
    guardarProgreso({ ejercicios, tiempo, abCompletado });
    alert("💾 Progreso guardado correctamente");
  };

  const handleFinalizar = () => {
    finalizarRutina();
    limpiarProgreso();
  };

  return (
    <div className="p-4 text-white ">
      <h1 className="text-2xl font-bold mb-4">Rutina en progreso</h1>

      {/* ⏱️ Cronómetro */}
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

      {/* 🏋️ Ejercicios */}
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
              <tr key={i} className="border-t border-gray-600 bg-gray-800">
                <td>
                  <input
                    type="checkbox"
                    checked={ej.completado}
                    onChange={() => toggleCompletado(i)}
                    className="checkbox"
                  />
                </td>
                <td>{ej.nombre}</td>
                <td>{ej.series}</td>
                <td>{ej.repeticiones || "-"}</td>
                <td>
                  <input
                    type="text"
                    value={ej.observaciones}
                    onChange={(e) => actualizarObservacion(i, e.target.value)}
                    placeholder="Notas..."
                    className="input input-bordered w-full bg-black text-cyan-50"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🧘‍♂️ Abdominales */}
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

      {/* 🎛️ Botones finales */}
      <div className="mt-6 flex justify-center gap-4">
        <button onClick={handleFinalizar} className="btn btn-primary">
          Finalizar rutina
        </button>
        <button onClick={handleGuardar} className="btn btn-primary btn-accent">
          <Image
            src="/icons/saveAs.png"
            alt="saveAs"
            width={28}
            height={28}
            priority
          />
        </button>
      </div>
    </div>
  );
}

