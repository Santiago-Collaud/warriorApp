"use client";
import { useState } from "react";
import { useResumenRutina } from "./hook/useResumenRutina";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // ¡Importante!
import "../../../src/styles/react-calendar.css"; // Estilos personalizados para el calendario

type TileClassNameParams = {
  date: Date;
  view: "month" | "year" | "decade" | "century";
};

export default function HistorialRutinas() {
  const { historial } = useResumenRutina();
  const [fechaSeleccionada, setFechaSeleccionada] = useState<Date | null>(null);

  // 🔍 Buscar la rutina que corresponde a la fecha seleccionada
  const buscarRutinaPorFecha = (fecha: Date) => {
    const fechaISO = fecha.toISOString().split("T")[0];
    return historial.find((r) => r.fecha === fechaISO);
  };

  // 🎨 Marcar los días que tienen rutina cargada
  const tileClassName = ({ date, view }: TileClassNameParams) => { 
    if (view === "month") {
      const fechaISO = date.toISOString().split("T")[0];
      if (historial.some((r) => r.fecha === fechaISO)) {
        return "highlight"; 
      }
    }
    return null;
  };

  const rutinaDelDia = fechaSeleccionada ? buscarRutinaPorFecha(fechaSeleccionada) : null;

  return (
    <div className="text-white p-4 w-full bg-gray-950">
      <h2 className="text-2xl font-bold mb-4 text-center text-black rounded bg-sky-300">Historial de Rutinas</h2>

      {historial.length === 0 ? (
        <p className="text-center">No hay rutinas registradas aún.</p>
      ) : (
        <div className="flex flex-col items-center space-y-6">
          {/* 📅 Calendario */}
          <Calendar
            onChange={(value) => setFechaSeleccionada(value as Date)}
            tileClassName={tileClassName}
            locale="es-ES"
            
          />

          {/* 📄 Mostrar rutina del día */}
          {fechaSeleccionada && rutinaDelDia ? (
            <div className="w-full max-w-md p-4 bg-gray-800 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">Rutina del {rutinaDelDia.fecha}</h3>
              <ul className="text-sm space-y-1">
                {rutinaDelDia.ejercicios.map((ej, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span>{ej.completado ? "✅" : "❌"}</span>
                    <span className="font-semibold">{ej.nombre}</span>
                    {ej.observaciones && (
                      <span className="italic text-gray-400">({ej.observaciones})</span>
                    )}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-gray-400 mt-2">
                Tiempo total: {Math.floor(rutinaDelDia.duracion / 60)} minutos
              </p>
            </div>
          ) : fechaSeleccionada && !rutinaDelDia ? (
            <div className="text-center text-sm mt-4">
              No hay rutina registrada para esta fecha.
            </div>
          ) : (
            <div className="text-center text-sm mt-4">
              Selecciona un día para ver la rutina.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
