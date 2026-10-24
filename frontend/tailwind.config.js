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
                // Fire Orange. Readable text on it is Obsidian (#0D0D0D), not white.
                "primary": "#EC5B13",
                // Muted text greys lifted so small copy meets WCAG AA (4.5:1) on Obsidian.
                zinc: { 500: "#8f8f99" },
                slate: { 500: "#8b98ac" },
                orange: { 500: "#EC5B13", 600: "#F2742F" },
                "primary-dark": "#cb4f10",
                "primary-hover": "#a63f0c",
                "background-light": "#f8f7f6",
                "background-dark": "#0D0D0D",
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
                // Trench Design: Bebas Neue headings, DM Sans body, IBM Plex Mono data.
                "sans": ["DM Sans", "system-ui", "sans-serif"],
                "heading": ["Bebas Neue", "Impact", "sans-serif"],
                "body": ["DM Sans", "system-ui", "sans-serif"],
                "mono": ["IBM Plex Mono", "ui-monospace", "Menlo", "monospace"],
                // Legacy aliases kept so existing class names resolve to the brand fonts.
                "display": ["DM Sans", "system-ui", "sans-serif"],
                "header": ["Bebas Neue", "Impact", "sans-serif"],
                "work": ["DM Sans", "system-ui", "sans-serif"],
                "lexend": ["DM Sans", "system-ui", "sans-serif"]
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
