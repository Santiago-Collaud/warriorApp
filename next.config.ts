/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",        // Directorio donde se generará el Service Worker
  disable: process.env.NODE_ENV === "development",
  register: true,        // Registro automático del Service Worker
  skipWaiting: true,     // Activa la nueva versión inmediatamente
});

module.exports = withPWA({
  reactStrictMode: true,
  experimental: {
    appDir: true,        // Habilita la carpeta "app"
  },
});
