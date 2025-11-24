// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";
import { visualizer } from "rollup-plugin-visualizer";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import path from "path";

export default defineConfig({
    plugins: [
        react(),
        tsconfigPaths(),
        svgr({ include: "**/*.svg" }),
        nodePolyfills({
            protocolImports: true // 브라우저용 stream, buffer 등 자동 대응
        })
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src")
        }
    },
    define: {
        global: "globalThis",
        "process.env": {} // 일부 라이브러리 대응
    },
    optimizeDeps: {
        esbuildOptions: {
            define: {
                global: "globalThis"
            }
        }
    },
    build: {
        outDir: "build",
        rollupOptions: {
            plugins: [
                visualizer({
                    filename: "build/stats.html", // ✅ 여기에 생성됨
                    open: true, // ✅ 자동 열기 (선택)
                    gzipSize: true,
                    brotliSize: true
                })
            ]
        }
    },
    server: {
        host: true,
        port: 3000
    }
});
