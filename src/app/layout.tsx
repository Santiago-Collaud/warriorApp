import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Warrior App",
  description: "Warrior Gym app",
};
  

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        {/* En caso de que Next.js no inyecte las etiquetas a partir del metadata, 
            las incluimos explícitamente */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased max-w-screen overflow-x-hidden min-h-screen `}>
        
        <div className="w-full max-w-[420px] bg-gray-900"> 
          <header className="bg-slate-100 p-2 flex justify-center shadow-md rounded-md">
                      <Image 
                        src="/icons/warrior_Title-PNG.png" 
                        alt="logo warrior" 
                        width={300} 
                        height={300} 
                        className="rounded-t shadow-xl m-1 opacity-75"
                        priority 
                        />

                    </header>
          {children}
        </div>
      </body>
    </html>
  );
}

