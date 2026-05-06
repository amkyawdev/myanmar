import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

// Production-safe plugins only
const plugins = [react(), tailwindcss()];

// Conditionally add optional plugins (dev-only, not required for production)
try {
  const { jsxLocPlugin } = await import("@builder.io/vite-plugin-jsx-loc");
  plugins.push(jsxLocPlugin());
} catch {
  // Optional: not available in all environments
}

try {
  const { vitePluginManusRuntime } = await import("vite-plugin-manus-runtime");
  plugins.push(vitePluginManusRuntime());
} catch {
  // Optional: Manus-specific plugin, not available on Vercel
}

export default defineConfig({
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    strictPort: false,
    host: true,
    allowedHosts: [
      ".manuspre.computer",
      ".manus.computer",
      ".manus-asia.computer",
      ".manuscomputer.ai",
      ".manusvm.computer",
      "localhost",
      "127.0.0.1",
    ],
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
