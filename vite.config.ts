import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { join } from "path";
import process from "process";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/pokemon-wordle",
  plugins: [react()],
  server: {
    open: true,
  },
  resolve: {
    alias: {
      "@": join(process.cwd(), "src"),
    },
  },
});
