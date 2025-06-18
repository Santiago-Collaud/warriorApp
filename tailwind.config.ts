import type { Config } from "tailwindcss";

export default {
  darkMode: "class", // Habilita el modo oscuro con la clase "dark"
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      modal: {
        custom: {
          'background': 'rgba(0,0,0,0.8)',
        }
      },
      backgroundImage: {
        'gif-bg': "url('/warrior-hame-ha.gif')",
        'gif2-bg': "url('/warrior-skeleton-2.gif')",
      },
    },
  },
  plugins: [
    require('daisyui'), 
    require('autoprefixer'),
  ],
  
} satisfies Config;
