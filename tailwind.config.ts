import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  important: true,
  corePlugins: {preflight: false},
  theme: {
    screens: {
      "2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }

      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "767px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }

      xs: { max: "350px" },
      // => @media (max-width: 639px) { ... }
    },
    extend: {
      keyframes:{
        text: {
          '0%': {
            'background-size': '200% 200%',
            'background-position': '0 -200%',
          },
          '100%': {
            'background-size': '200% 200%',
            'background-position': '200% 0',
          },

        
        }},
      animation: {
        text: 'text 4s linear infinite',
      },
      colors:{
        purple:'#7359E3',
        orange:'#FB825C'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily:{
        inter: ["var(--font-inter)"],
      }
    },
  },
  plugins:[
  ]
}
export default config
