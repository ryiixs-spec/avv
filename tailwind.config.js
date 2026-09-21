/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sky: {
          light: '#BDEBFF',
          DEFAULT: '#87CEEB',
          soft: '#DDF5FF',
          deep: '#75C8F5',
        },
        mountain: {
          far: '#9FC3CE',
          mid: '#6F9FA8',
          blue: '#477D91',
          front: '#4E7C69',
          green: '#547B68',
        },
        sunset: {
          orange: '#F6B48F',
          pink: '#E8A6A6',
          warm: '#F4C3A2',
          dusk: '#7886A8',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'serif'],
        handwriting: ['var(--font-caveat)', 'cursive'],
        sans: ['var(--font-nunito)', 'sans-serif'],
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'float-medium': 'float 5s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'drift-1': 'cloudDrift 35s linear infinite',
        'drift-2': 'cloudDrift 45s linear infinite',
        'drift-3': 'cloudDrift 55s linear infinite',
        'drift-4': 'cloudDrift 65s linear infinite',
        'fly-across': 'flyAcross 28s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.05)' },
        },
        cloudDrift: {
          '0%': { transform: 'translateX(-120%)' },
          '100%': { transform: 'translateX(120vw)' },
        },
        flyAcross: {
          '0%': { transform: 'translateX(-150px) translateY(0px)' },
          '50%': { transform: 'translateX(50vw) translateY(-25px)' },
          '100%': { transform: 'translateX(110vw) translateY(10px)' },
        },
      },
    },
  },
  plugins: [],
};
