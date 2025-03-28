import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  root: ".", 
  build: {
    outDir: "dist", // Se asegura de que los archivos vayan a "dist/"
    emptyOutDir: true, // Limpia la carpeta "dist" antes de cada build
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        profile: path.resolve(__dirname, "profile.html"),
      }
    }
  },
  server: {
    port: 5174 // Puerto para desarrollo local
  }
});
