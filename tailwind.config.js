/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        'playful': ['Comic Sans MS', 'Marker Felt', 'cursive'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
        'bounce-gentle': 'bounce-gentle 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-soft': {
          '0%, 100%': { 
            transform: 'scale(1)',
            opacity: 0.8,
          },
          '50%': { 
            transform: 'scale(1.1)',
            opacity: 1,
          },
        },
        'bounce-gentle': {
          '0%, 100%': { 
            transform: 'scale(1) translateY(0px)',
          },
          '50%': { 
            transform: 'scale(1.05) translateY(-10px)',
          },
        },
      },
    },
  },
  plugins: [],
}
