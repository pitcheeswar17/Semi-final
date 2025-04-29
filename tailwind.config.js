/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        // Primary colors
        primary: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7ac8fc',
          400: '#36adf9',
          500: '#0c93ed',
          600: '#0074cc',
          700: '#0059a5',
          800: '#064b87',
          900: '#0a3f70',
          950: '#07294a',
        },
        // Category-specific colors
        tech: {
          50: '#eef9ff',
          100: '#dcf2ff',
          200: '#bae9ff',
          300: '#7adbff',
          400: '#38c7ff',
          500: '#06a8fa',
          600: '#0086d4',
          700: '#006bac',
          800: '#065a8d',
          900: '#0a4a75',
        },
        culture: {
          50: '#fbf1fe',
          100: '#f5e2fe',
          200: '#ecc6fc',
          300: '#de9af9',
          400: '#cf64f6',
          500: '#bd38ed',
          600: '#a51ccb',
          700: '#8917a6',
          800: '#711588',
          900: '#5f1571',
        },
        sports: {
          50: '#fef3f2',
          100: '#fee4e2',
          200: '#fecdca',
          300: '#fba8a1',
          400: '#f87a71',
          500: '#ef4b3f',
          600: '#dd3021',
          700: '#b91f16',
          800: '#991d16',
          900: '#7f1e18',
        },
        club: {
          50: '#f2fbf4',
          100: '#e0f7e6',
          200: '#c2eecd',
          300: '#92dfa7',
          400: '#59c678',
          500: '#30ad56',
          600: '#208b43',
          700: '#1c6f37',
          800: '#1a592f',
          900: '#174a29',
        },
        workshop: {
          50: '#fff8ed',
          100: '#fff0d3',
          200: '#ffdca6',
          300: '#ffc46d',
          400: '#ffa333',
          500: '#ff820a',
          600: '#fb6400',
          700: '#cc4602',
          800: '#a1360b',
          900: '#832d0c',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
};