/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'eco-light-bg': '#F3F9F4', // Lighter green/off-white for main background
        'eco-dark-bg': '#10251E', // Slightly adjusted dark green
        'eco-primary': '#2D6A4F', // Main green
        'eco-secondary': '#B7D8C3', // Lighter accent green
        'eco-text-dark': '#1F2937', // Dark text (light mode)
        'eco-text-light': '#E5E7EB', // Light text (dark mode)
        'eco-accent-light': '#A7F3D0', // Brighter accent for dark mode (e.g., buttons)
        'off-white': '#F9FAFB', // Card background in light mode (can use bg-gray-50 too)
      },
      fontFamily: {
        // Ensure these fonts are imported (e.g., in index.css or index.html)
        sans: ['Inter', 'Manrope', 'Nunito', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'card': '1rem', // Slightly larger radius for premium feel (16px)
        'xl': '1rem', // Ensure xl matches card if used elsewhere
      },
      boxShadow: {
        'card': '0 4px 12px rgba(45, 106, 79, 0.08)', // Subtle green-tinted shadow
        'card-hover': '0 8px 20px rgba(45, 106, 79, 0.12)', // More pronounced hover shadow
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', // Keep default lg
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', // Keep default md
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)', // Keep default sm
      },
      transitionDuration: {
        '250': '250ms',
        '300': '300ms', // Ensure 300ms is available if used
      },
      // Add ripple effect plugin if desired, or use CSS animations
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // Add forms plugin for better default styling
  ],
  darkMode: 'class',
}
