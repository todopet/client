// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    svgr({ include: "**/*.svg?react" }), // "?react"로 import한 SVG만 React 컴포넌트로 변환하고, 나머지는 <img src>용 파일 URL로 유지
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
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
    },
  },
  build: {
    outDir: "build",
  },
  server: {
    host: true,
    port: 3000,
  },
});
