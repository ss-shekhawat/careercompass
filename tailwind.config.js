/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // ===============================================
      // Typography
      // ===============================================
      fontFamily: {
        sans: ["Inter", "Calibri", "sans-serif"],
        display: ["Inter", "Montserrat", "sans-serif"],
      },

      // ===============================================
      // CareerCompass color system
      // - Old `primary` and `secondary` keys preserved
      //   so existing class names (`bg-primary`, `text-secondary`)
      //   keep working. Values are simply updated.
      // - New keys added for full color flexibility.
      // ===============================================
      colors: {
        // Backward-compatible (your existing classes still work)
        primary: {
          DEFAULT: "#2563EB",
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8",
          800: "#1E40AF",
          900: "#1E3A8A",
          light: "#3B82F6",
          dark: "#1D4ED8",
        },
        secondary: {
          DEFAULT: "#FF6B6B",
          50: "#FFF1F1",
          100: "#FFE0E0",
          200: "#FFC2C2",
          300: "#FF9999",
          400: "#FF7F7F",
          500: "#FF6B6B",
          600: "#E55555",
          700: "#C84444",
          light: "#FF8787",
          dark: "#E55555",
        },

        // New tokens
        accent: {
          DEFAULT: "#FF6B6B",
          light: "#FF8787",
          dark: "#E55555",
        },
        highlight: {
          DEFAULT: "#FBBF24",
          50: "#FFFBEB",
          100: "#FEF3C7",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
          light: "#FCD34D",
          dark: "#F59E0B",
        },

        ink: {
          DEFAULT: "#0F172A",
          muted: "#475569",
          subtle: "#94A3B8",
        },

        surface: {
          DEFAULT: "#FFFFFF",
          alt: "#F8FAFC",
          muted: "#F1F5F9",
        },

        // Semantic status (used across dashboards/reports)
        success: "#10B981",
        warning: "#FBBF24",
        error: "#EF4444",
        info: "#2563EB",
      },

      // ===============================================
      // Animations (preserved)
      // ===============================================
      animation: {
        "fade-in": "fadeIn 1s ease-in-out forwards",
        "scale-in": "scaleIn .2s ease-in-out forwards",
        "slide-up": "slideUp .4s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        scaleIn: {
          "0%": { opacity: 0, transform: "scale(0.9)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
        slideUp: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },

      // ===============================================
      // Box shadows for cards / elevated UI
      // ===============================================
      boxShadow: {
        card: "0 1px 3px rgba(15, 23, 42, 0.06), 0 1px 2px rgba(15, 23, 42, 0.04)",
        "card-hover":
          "0 4px 12px rgba(15, 23, 42, 0.08), 0 2px 4px rgba(15, 23, 42, 0.04)",
        "primary-glow": "0 4px 14px rgba(37, 99, 235, 0.25)",
        "accent-glow": "0 4px 14px rgba(255, 107, 107, 0.25)",
      },
    },
  },
  plugins: [],
};
