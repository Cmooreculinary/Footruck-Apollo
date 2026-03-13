/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./public/index.html"
    ],
    theme: {
        extend: {
            colors: {
                "primary": "#ec7f13",
                "primary-dark": "#cb4f10",
                "primary-hover": "#a63f0c",
                "background-light": "#f8f7f6",
                "background-dark": "#181411",
                "surface": "#1e1a16",
                "surface-dark": "#271f1c",
                "surface-lighter": "#322925",
                "border-col": "#2e2820",
                "border-dark": "#392e28",
                "steel": "#3d3632",
                "industrial": "#2d2621",
                "industrial-gray": "#393428",
                "copper": "#b87333",
                "text-muted": "#b9a69d",
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))"
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))"
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))"
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))"
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))"
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))"
                }
            },
            fontFamily: {
                "display": ["Space Grotesk", "sans-serif"],
                "header": ["Oswald", "sans-serif"],
                "work": ["Work Sans", "sans-serif"],
                "lexend": ["Lexend", "sans-serif"],
                "body": ["Noto Sans", "sans-serif"]
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)"
            }
        }
    },
    plugins: [require("tailwindcss-animate")]
};
