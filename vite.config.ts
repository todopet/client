// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";
import { visualizer } from "rollup-plugin-visualizer";
import viteCompression from "vite-plugin-compression";
import path from "path";

export default defineConfig(({ mode }) => {
  const isProduction = mode === "production";

  return {
    plugins: [
      react(),
      tsconfigPaths(),
      svgr({ include: "**/*.svg?react" }), // "?react"로 import한 SVG만 React 컴포넌트로 변환하고, 나머지는 <img src>용 파일 URL로 유지
      ...(isProduction
        ? [
            viteCompression({ algorithm: "gzip", ext: ".gz" }),
            viteCompression({ algorithm: "brotliCompress", ext: ".br" }),
          ]
        : []),
      ...(process.env.ANALYZE === "true"
        ? [
            visualizer({
              filename: "build/stats.html",
              gzipSize: true,
              brotliSize: true,
              open: false,
            }),
          ]
        : []),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    define: {
      global: "globalThis",
      "process.env": {}, // 일부 라이브러리 대응
    },
    esbuild: isProduction
      ? {
          drop: ["console", "debugger"],
        }
      : undefined,
    optimizeDeps: {
      include: ["react", "react-dom", "react-router-dom", "axios", "zustand", "@tanstack/react-query"],
      esbuildOptions: {
        define: {
          global: "globalThis",
        },
      },
    },
    build: {
      outDir: "build",
      cssCodeSplit: true,
      sourcemap: isProduction ? "hidden" : true,
      minify: isProduction ? "esbuild" : false,
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          entryFileNames: "assets/[name]-[hash].js",
          chunkFileNames: "assets/[name]-[hash].js",
          assetFileNames: "assets/[name]-[hash][extname]",
          manualChunks(id) {
            if (!id.includes("node_modules")) {
              return;
            }

            if (id.includes("react") || id.includes("scheduler") || id.includes("react-router-dom")) {
              return "react-vendor";
            }

            if (id.includes("@tanstack/react-query") || id.includes("zustand")) {
              return "state-vendor";
            }

            if (id.includes("axios")) {
              return "http-vendor";
            }

            if (id.includes("zod") || id.includes("dayjs")) {
              return "utils-vendor";
            }
          },
        },
      },
    },
    server: {
      host: true,
      port: 3000,
    },
  };
});
