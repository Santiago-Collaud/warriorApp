import React from "react";
import Calculadora from "../../components/calculadora/calculadora";
import InstallButton from "../../components/installButton/InstallButton";

export default function HomePage() {
  return (
    <main>
     <div className="bg-white border-2 border-gray-300 p-6 rounded-md shadow-lg text-black">
        <h1>Calcula-nada</h1>
     </div>
     <div className="bg-grey-200 border-2 border-blue-300 p-6 rounded-md shadow-lg text-black">
      <InstallButton />
     </div>
     <div>
      <img src="/icons/emogi_calculadora.png" alt="emoji" />
     </div>
     <Calculadora />
    </main>
  );
}
