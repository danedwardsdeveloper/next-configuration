// import aspectRatio from '@tailwindcss/aspect-ratio'
import { type Config } from 'tailwindcss'

export default {
  plugins: [
    // aspectRatio
  ],
  content: ['./src/app/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
} satisfies Config
