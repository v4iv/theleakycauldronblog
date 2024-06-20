import type {Config} from 'tailwindcss'
import {fontFamily} from 'tailwindcss/defaultTheme'

const config = {
  darkMode: ['class'],
  content: [
    './src/cms/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/hooks/**/*.{js,jsx,ts,tsx}',
    './src/pages/**/*.{js,jsx,ts,tsx}',
    './src/templates/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['Avenir', 'Helvetica', ...fontFamily.sans],
        serif: ['Athelas', 'Baskerville', ...fontFamily.serif],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        aquamarine: {
          DEFAULT: 'hsl(var(--aquamarine))',
          50: 'hsl(161, 100%, 96%)',
          100: 'hsl(160, 100%, 89%)',
          200: 'hsl(163, 100%, 80%)',
          300: 'hsl(166, 100%, 62%)',
          400: 'hsl(168, 90%, 52%)',
          500: 'hsl(168, 100%, 43%)',
          600: 'hsl(168, 100%, 35%)',
          700: 'hsl(170, 100%, 28%)',
          800: 'hsl(171, 100%, 22%)',
          900: 'hsl(172, 100%, 18%)',
          950: 'hsl(173, 100%, 10%)',
        },
        aquablue: {
          DEFAULT: 'hsl(var(--aquablue))',
          50: 'hsl(248, 100%, 97%)',
          100: 'hsl(249, 100%, 95%)',
          200: 'hsl(248, 100%, 90%)',
          300: 'hsl(250, 100%, 83%)',
          400: 'hsl(253, 100%, 73%)',
          500: 'hsl(257, 100%, 62%)',
          600: 'hsl(260, 100%, 54%)',
          700: 'hsl(259, 100%, 50%)',
          800: 'hsl(259, 99%, 42%)',
          900: 'hsl(259, 97%, 35%)',
          950: 'hsl(257, 100%, 23%)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {height: '0'},
          to: {height: 'var(--radix-accordion-content-height)'},
        },
        'accordion-up': {
          from: {height: 'var(--radix-accordion-content-height)'},
          to: {height: '0'},
        },
        reveal: {
          from: {
            clipPath: 'inset(0 0 0 100%)',
          },
          to: {
            clipPath: 'inset(0 0 0 0%)',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'reveal-reverse': 'reveal 0.3s ease-in',
      },
      dropShadow: {
        aquamarine: '0 1px 2px hsl(168, 100%, 43%)',
        aquablue: '0 1px 2px hsl(259, 100%, 50%)',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
} satisfies Config

export default config
