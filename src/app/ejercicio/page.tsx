"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { EjercicioSeleccionado } from "@/interface/ejercicioSeleccionado";

export default function EjercicioPage() {
  const router = useRouter();
  const [ejercicios, setEjercicios] = useState<EjercicioSeleccionado[]>([]);
  const [tiempo, setTiempo] = useState<number>(0);
  const [activo, setActivo] = useState<boolean>(false);

  // ⏱️ Iniciar cronómetro
  useEffect(() => {
    let intervalo: NodeJS.Timeout;

    if (activo) {
      intervalo = setInterval(() => {
        setTiempo((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(intervalo);
  }, [activo]);

  // ⏮️ Cargar rutina desde localStorage
  useEffect(() => {
    const rutinaGuardada = localStorage.getItem("rutinaDelDia");
    if (rutinaGuardada) {
      setEjercicios(JSON.parse(rutinaGuardada));
    } else {
      alert("No hay rutina cargada");
      router.push("/usuario");
    }
  }, [router]);

  // 🧠 Formato de tiempo tipo 00:03:21
  const formatTiempo = (segundos: number) => {
    const hrs = Math.floor(segundos / 3600);
    const mins = Math.floor((segundos % 3600) / 60);
    const secs = segundos % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // ✅ Cambiar estado de completado
  const toggleCompletado = (index: number) => {
    const actualizados = [...ejercicios];
    actualizados[index].completado = !actualizados[index].completado;
    setEjercicios(actualizados);
  };

  // 📝 Editar observación
  const actualizarObservacion = (index: number, texto: string) => {
    const actualizados = [...ejercicios];
    actualizados[index].observaciones = texto;
    setEjercicios(actualizados);
  };

  // 🔚 Finalizar rutina
  const finalizarRutina = () => {
    localStorage.removeItem("rutinaDelDia");
    router.push("/usuario");
  };

  return (
    <div className="p-4 text-white">
      <h1 className="text-2xl font-bold mb-4">Rutina en progreso</h1>

      <div className="mb-6 text-center">
        <h2 className="text-xl font-semibold">Tiempo transcurrido</h2>
        <p className="text-3xl mt-2">{formatTiempo(tiempo)}</p>
        <div className="flex justify-center gap-4 mt-2">
          <button
            className="btn btn-success"
            onClick={() => setActivo(true)}
            disabled={activo}
          >
            Iniciar
          </button>
          <button
            className="btn btn-warning"
            onClick={() => setActivo(false)}
            disabled={!activo}
          >
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
        <table className="table w-full text-sm">
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
                <td>{ej.series || "-"}</td>
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
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-center">
        <button onClick={finalizarRutina} className="btn btn-primary">
          Finalizar rutina
        </button>
      </div>
    </div>
  );
}
