import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  // IMPORTANT for GitHub Pages: assets served from /<repo>/
  // Use empty string for localhost and proper subpath for production builds if needed.
  base: "/dawn-whisper-quest/",

  plugins: [
    react(), 
    mode === "development" && componentTagger()
  ].filter(Boolean),

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
    target: "esnext",
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
    rollupOptions: {
      output: {
        // Prevent React duplication by creating separate chunks
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            // React core - keep together to prevent duplication
            if (id.includes('react/') || id.includes('react-dom/') || id.includes('scheduler')) {
              return 'react-core';
            }
            // React Router - separate chunk
            if (id.includes('react-router')) {
              return 'router';
            }
            // Other vendors
            return 'vendor';
          }
        },
      },
    },
  },

  // Force React to be pre-bundled and prevent duplication
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@radix-ui/react-slot',
    ],
  },
}));
