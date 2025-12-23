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
        // Shadcn colors
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Custom colors from Lovable
        topbar: {
          bg: "hsl(var(--topbar-bg))",
          foreground: "hsl(var(--topbar-foreground))",
        },
        header: {
          bg: "hsl(var(--header-bg))",
        },
        nav: {
          bg: "hsl(var(--nav-bg))",
          foreground: "hsl(var(--nav-foreground))",
        },
        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))",
      },
      animation: {
        'logo-spin': 'logo-spin infinite 20s linear',
      },
      keyframes: {
        'logo-spin': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'opensans': ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}