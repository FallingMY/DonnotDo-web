/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0D0D0D',
        surface: '#1A1A1A',
        border: '#333333',
        'text-primary': '#FFFFFF',
        'text-secondary': '#A0A0A0',
        accent: '#F5D300',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'IBM Plex Mono', 'monospace'],
        sans: ['Inter', 'PingFang SC', 'sans-serif'],
      },
    },
    borderRadius: {
      'none': '0',
      DEFAULT: '0',
    },
  },
  plugins: [],
};
