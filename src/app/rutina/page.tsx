"use client";
import LabelRutina from "../components/labelRutinas/labelRutina";
import { useRouter } from 'next/navigation';

export default function HistorialRutinas() {
    const router = useRouter();

    
    const handleResumen = async () => {
        router.push("/resumenRutina");
    }

    return (
        <div className="text-white p-4 w-full bg-gray-950">
            <h2 className="text-2xl font-bold mb-4 text-center text-black rounded bg-sky-300">Historial de Rutinas</h2>
            <LabelRutina /> 
            <button
                onClick={handleResumen}>
                Resumen
            </button>
        </div>
    );
}