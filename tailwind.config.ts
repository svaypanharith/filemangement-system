import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.module.css",
  ],
  theme: {
    extend: {
      colors: {
        label: "#383838",
        background: "#FFFFFF",
        foreground: "#000000",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "#090441",
          foreground: "#FFFFFF",
          background: "#F2F2F4",
        },
        secondary: {
          DEFAULT: "#FA4F4F",
          foreground: "#F2F2F4",
        },

        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        opacity: { "70": "0.7" },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        "2xl": "40px",
        "3xl": "48px",

        base: "1rem",
        half: "0.5rem",
        quarter: "0.25rem",
        double: "2rem",
      },
      fontSize: {
        // key: [fontSize, lineHeight]
        xs: ["0.75rem", "1rem"], // 12px, 16px
        sm: ["0.875rem", "1.25rem"], // 14px, 20px
        base: ["1rem", "1.5rem"], // 16px, 24px
        lg: ["1.125rem", "1.75rem"], // 18px, 28px
        xl: ["1.25rem", "1.75rem"], // 20px, 28px
        "2xl": ["1.5rem", "2rem"], // 24px, 32px // title
        "3xl": ["1.875rem", "2.25rem"], // 30px, 36px
        "4xl": ["2.25rem", "2.5rem"], // 36px, 40px
        // Custom sizes
        title: ["1.875rem", { lineHeight: "2.25rem", fontWeight: "700" }], // 32px, 40px
        heading: ["1.5rem", { lineHeight: "2.25rem", fontWeight: "700" }], // 28px, 36px
        button: [
          "1.125rem",
          {
            lineHeight: "1.175rem",
            fontWeight: "600",
            letterSpacing: "0.02em",
          },
        ],
      },
      fontWeight: {
        thin: "100",
        extralight: "200",
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
        black: "900",
      },
      lineHeight: {
        none: "1",
        tight: "1.25",
        snug: "1.375",
        normal: "1.5",
        relaxed: "1.625",
        loose: "2",
        // Custom values
        "3": ".75rem",
        "4": "1rem",
        "5": "1.25rem",
        "6": "1.5rem",
        "7": "1.75rem",
        "8": "2rem",
        "9": "2.25rem",
        "10": "2.5rem",
      },
      width: {},
      height: {
        "m-button": "45px",
      },
    },
  },
  plugins: [],
};

export default config;
