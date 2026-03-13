/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF99C8',
          light: '#FCB1D1',
          dark: '#E94E89',
        },
        secondary: {
          DEFAULT: '#9ED2D6',
          light: '#C2E9FB',
        },
        accent: {
          DEFAULT: '#CFBAF0',
          light: '#F1C0E8',
        },
        cream: '#FFF9E1',
        soft: {
          DEFAULT: '#FAD2E1',
          light: '#FFF0F5',
        },
        neutral: {
          DEFAULT: '#3D3040',
          light: '#6B5B6E',
          soft: '#A899A9',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'soft-sm': '0.75rem',
        'soft-md': '1.25rem',
        'soft-lg': '1.75rem',
        'soft-xl': '2.5rem',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(255, 153, 200, 0.15)',
        'soft-md': '0 10px 30px -5px rgba(255, 153, 200, 0.2)',
        'soft-lg': '0 20px 50px -10px rgba(255, 153, 200, 0.25)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'float': 'float 5s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
