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
    optimizeDeps: {
      exclude: ["@repo/api-client"],
    },
    resolve: {
      alias: {
        "@repo/api-client": path.resolve(__dirname, "../../packages/api-client/src"),
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
