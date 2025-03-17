import React from "react";
import Calculadora from "../../components/calculadora/calculadora";

export default function HomePage() {
  return (
    <main>
     <div className="bg-white border-2 border-gray-300 p-6 rounded-md shadow-lg text-black">
        <h1>Calcula-nada</h1>
     </div>
     <div>
      <img src="/icons/emogi_calculadora.png" alt="emoji" />
     </div>
     <Calculadora />
    </main>
  );
}
