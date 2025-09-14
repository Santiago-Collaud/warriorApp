"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useResetPassword } from "./hook/useCambiarPass"; 

export default function CambiarPass() {
  const [mail, setMail] = useState("");
  const { resetPassword, loading, error, success } = useResetPassword();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!mail.trim()) return alert("El mail es obligatorio");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(mail)) return alert("El mail no es válido");

    if (!confirm(`¿Estás seguro de enviar este mail?\n${mail}`)) return;

    await resetPassword(mail);
  };

  return (
    <div className="flex flex-col items-center p-6 gap-4">
      <Image src="/icons/Alert.png" alt="Alert" width={100} height={100} />
      <h1 className="text-xl font-semibold">Ingresa tu mail para confirmar que sos vos</h1>

      <input
        type="email"
        className="input border px-4 py-2 rounded"
        placeholder="Email"
        value={mail}
        onChange={(e) => setMail(e.target.value)}
        disabled={success || loading}
      />

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2 disabled:opacity-50"
        onClick={handleSubmit}
        disabled={success || loading}
      >
        {loading ? "Procesando..." : "Enviar"}
      </button>

      {error && <p className="text-red-600 mt-2">{error}</p>}
      {/*{success && <p className="text-green-600 mt-2">¡Te enviamos instrucciones a tu mail!</p>}*/}
      {success && (
        <div className="bg-gray-700 pl-2 pr-2 rounded mt-2">
          <p className="text-gray-100 font-bold mt-2">Ahora puedes ingresar con tu nombre de usuario</p>
          <p className="text-gray-100 mt-2">y la contraseña 1234</p>
          <p className="text-gray-100 mt-2">Escribe la contraseña que prefieras</p>
          <p className="text-gray-100 mt-2">y esta vez no la pierdas</p>
          <p className="text-gray-100 mt-2">Cierra esta ventana y vuelve a intentar </p>
        </div>
      )}
    </div>
  );
}
