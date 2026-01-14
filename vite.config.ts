import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": "/src",
      "@/components/admin-ui": "/src/components/admin-ui",
      "@/components/frontend-ui": "/src/components/frontend-ui",
    },
  },
  build: {
    minify: true,
    sourcemap: false,
    target: "es2015",
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          router: ["react-router", "react-router-dom"],
        },
      },
    },
  },
  server: {
    host: true,
    allowedHosts: ["revo.codiantdev.com"],
    open: true,
  },
  css: {
    devSourcemap: true,
  },
});
