import { defineConfig } from "vitest/config";
import { loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const rootDir = path.resolve(__dirname, "../../");

export default defineConfig(({ mode }) => {
  const env = { ...loadEnv(mode, rootDir, ""), ...loadEnv(mode, __dirname, "") };

  return {
    plugins: [react()],
    envDir: __dirname,
    define: {
      // Absoluta só quando API e docs ficam em domínios diferentes (ex.: prod com subdomínios).
      // Vazia (padrão) mantém o comportamento relativo atual via proxy do Vite / mesma origem.
      "import.meta.env.API_BASE_URL": JSON.stringify(env.DOCS_API_BASE_URL ?? ""),
    },
    server: {
      port: Number(env.DOCS_PORT) || 5542,
      open: true,
      proxy: {
        "/api": {
          target: env.DOCS_API_URL || "https://localhost:8000",
          changeOrigin: true,
          secure: false,
        },
      },
    },
    resolve: {
      alias: {
        "@app": path.resolve(__dirname, "./src/app"),
        "@assets": path.resolve(__dirname, "./src/assets"),
        "@shared": path.resolve(__dirname, "./src/shared"),
        "@pages": path.resolve(__dirname, "./src/pages"),
      },
    },
    test: {
      environment: "jsdom",
      globals: true,
      setupFiles: "./tests/setupTests.ts",
      css: true,
      coverage: {
        provider: "v8",
        reporter: ["text", "html"],
        include: ["src/**/*.{ts,tsx}"],
        exclude: ["src/test/**", "**/*.d.ts"],
      },
    },
  };
});
