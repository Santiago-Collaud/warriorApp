"use client";
import { useState, useEffect } from "react";

interface NavigatorWithStandalone extends Navigator {
  standalone?: boolean;
}

type BeforeInstallPromptEvent = Event & {
  prompt: () => void;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const InstallButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showManual, setShowManual] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Detectar si está instalada
    const installed =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as NavigatorWithStandalone).standalone === true;
    setIsInstalled(installed);

    // Escuchar el evento beforeinstallprompt
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(() => {
        setDeferredPrompt(null);
      });
    } else {
      setShowManual(true);
    }
  };

  if (isInstalled) return null; // No mostrar si ya está instalada

  return (
    <>
      <button onClick={handleInstall} className="btn btn-ghost bg-red-500">
        Instalar App
      </button>

      {showManual && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="bg-white p-4 rounded shadow-lg max-w-xs">
            <h2 className="font-bold mb-2">Instalar manualmente</h2>
            <p className="text-sm">
              Abre el menú de tu navegador y selecciona{" "}
              <strong>Agregar a pantalla principal</strong>.
            </p>
            <button
              className="mt-3 bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => setShowManual(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default InstallButton;
