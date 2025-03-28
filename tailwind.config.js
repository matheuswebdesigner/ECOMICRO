/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'eco-light-bg': '#E7F2EB', // Verde fosco / branco esverdeado
        'eco-dark-bg': '#142F26', // Verde escuro (dark mode)
        'eco-primary': '#2D6A4F', // Verde primário
        'eco-secondary': '#B7D8C3', // Secundário suave
        'eco-text-dark': '#1F2937', // Texto padrão modo claro
        'eco-text-light': '#F9FAFB', // Texto padrão modo escuro
        'eco-accent-light': '#D1FFD4', // Verde-limão (dark mode accent)
      },
      fontFamily: {
        sans: ['Inter', 'Manrope', 'Nunito', 'sans-serif'], // Prioritize Inter if available
      },
      borderRadius: {
        'card': '20px', // Custom border radius for cards
      },
      boxShadow: {
        'card': '0 4px 12px rgba(0, 0, 0, 0.08)', // Sombra suave para cards
        'card-hover': '0 6px 16px rgba(0, 0, 0, 0.12)', // Sombra ao passar o mouse
      },
      transitionDuration: {
        '250': '250ms',
      }
    },
  },
  plugins: [],
  darkMode: 'class', // Enable dark mode using class strategy
}
