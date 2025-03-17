"use client"
import { useState, useEffect } from "react";

const InstallButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === "accepted") {
        console.log("El usuario aceptó la instalación");
      }
      setDeferredPrompt(null);
    });
  };

  return (
    deferredPrompt && (
      <button onClick={handleInstall} className="p-2 bg-blue-500 text-white rounded">
        Instalar App
      </button>
    )
  );
};

export default InstallButton;