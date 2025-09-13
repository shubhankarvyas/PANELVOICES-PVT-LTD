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
        'elevenlabs-purple': '#6366f1',
        'elevenlabs-dark': '#0f0f23',
        'elevenlabs-gray': '#1a1a2e',
      },
    },
  },
  plugins: [],
}