const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#10B981',
          start: '#10B981',
          end: '#14B8A6',
        },
        secondary: '#3B82F6',
        accent: '#22D3EE',
        destructive: '#EF4444',
        background: {
          light: '#F6F7F8',
          dark: '#0F172A',
        },
        card: '#FFFFFF',
        'card-foreground': '#0B1624',
        text: {
          headings: '#1E293B',
          body: '#475569',
        },
        border: {
          light: '#CBD5F5',
        },
      },
      fontFamily: {
        sans: ['AR One Sans', 'Inter', 'sans-serif'],
        display: ['Work Sans', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
      },
      boxShadow: {
        '04': '0px 4px 6px -1px rgba(15, 23, 42, 0.1), 0px 2px 4px -2px rgba(15, 23, 42, 0.08)',
      },
    },
  },
  plugins: [],
};
