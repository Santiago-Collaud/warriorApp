"use client";
import { useState } from "react";

export function useResetPassword() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const resetPassword = async (mail: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // 1) Verificar existencia
      const checkRes = await fetch(`/api/verificarMail?mail=${encodeURIComponent(mail)}`);
      const checkJson = await checkRes.json();

      if (!checkRes.ok || !checkJson.exists) {
        throw new Error("No encontramos un usuario con ese mail");
      }

      // 2) Resetear pass
      const resetRes = await fetch(`/api/resetPass`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mail }),
      });

      const resetJson = await resetRes.json();
      if (!resetRes.ok || !resetJson.success) {
        throw new Error("No pudimos restablecer la contraseña");
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Ocurrió un error");
    } finally {
      setLoading(false);
    }
  };

  return { resetPassword, loading, error, success };
}

