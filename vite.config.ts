import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@redux": path.resolve(__dirname, "./src/redux"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@enums": path.resolve(__dirname, "./src/enums.ts"),
      "@helpers": path.resolve(__dirname, "./src/helpers.ts"),
    },
  },
  plugins: [VitePWA(), react(), eslint()],
});
