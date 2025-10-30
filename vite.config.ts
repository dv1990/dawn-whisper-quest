import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => ({
  // IMPORTANT for GitHub Pages: assets served from /<repo>/
  // Use empty string for localhost and proper subpath for production builds if needed.
  base: "/dawn-whisper-quest/",

  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    // Prevent duplicate React instances in node_modules
    dedupe: ["react", "react-dom", "react-router-dom"],
  },

  server: {
    host: "::",   // allow LAN/IPv6 access
    port: 8080,
  },

  build: {
    target: "es2020",
    minify: "terser",
    cssCodeSplit: true,
    sourcemap: false,
    chunkSizeWarningLimit: 1500,
    terserOptions: {
      compress: {
        drop_console: false,
        drop_debugger: true,
        pure_funcs: ["console.log", "console.info", "console.debug"],
        passes: 2,
      },
    },
  },
}));
