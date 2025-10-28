import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  },
  esbuild: {
    target: 'esnext',
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ['react', 'react-dom', 'react-router-dom']
  },
  build: {
    target: 'es2020',
    minify: 'terser',
    cssCodeSplit: true,
    sourcemap: false,
    chunkSizeWarningLimit: 1500,
    terserOptions: {
      compress: {
        drop_console: false,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        passes: 2,
      },
      mangle: true,
      format: {
        comments: false,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunk for React ecosystem (core only)
          if (id.includes('node_modules')) {
            // React core - keep small
            if (id.includes('react/') || id.includes('react-dom/') || id.includes('scheduler')) {
              return 'react-vendor';
            }
            // React Router - separate chunk
            if (id.includes('react-router')) {
              return 'router';
            }
            // React Query - bundle with React
            if (id.includes('@tanstack/react-query')) {
              return 'react-vendor';
            }
            // Framer Motion separate chunk (only loaded when needed)
            if (id.includes('framer-motion')) {
              return 'framer-motion';
            }
            // Three.js and 3D libs (only for lazy-loaded pages)
            if (id.includes('three') || id.includes('@react-three')) {
              return 'three-vendor';
            }
            // UI components chunk (Radix UI)
            if (id.includes('@radix-ui')) {
              return 'ui-vendor';
            }
            // Lucide icons - separate chunk
            if (id.includes('lucide-react')) {
              return 'icons';
            }
            // Other vendors
            return 'vendor';
          }
        },
        // Optimize chunk loading
        experimentalMinChunkSize: 20000,
        // Add preload directives
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      }
    },
    // Enable module preload for better performance
    modulePreload: {
      polyfill: true,
    },
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@tanstack/react-query',
      '@radix-ui/react-tooltip',
      '@radix-ui/react-slot',
    ],
    exclude: [
      'framer-motion',
      'three',
      '@react-three/fiber',
      '@react-three/drei'
    ]
  }
}));
