import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "./",
  plugins: [react()],
  optimizeDeps: {
    entries: ["index.html"]
  },
  server: {
    port: 5000
  },
  build: {
    outDir: "dist"
  }
});
