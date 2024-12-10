import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  optimizeDeps: {
    esbuildOptions: {
      target: "esnext",
    },
  },
  build: {
    target: "esnext",
  },
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      "@": "/src", // Maps "@" to the "src" directory
    },
  },
});
