/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // 👈 aquí va

  content: [
    "./src/**/*.{astro,html,js,jsx,ts,tsx}"
  ],

  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },

    },
  },
  plugins: [],
}