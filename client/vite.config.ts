import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  define: { "process.env": {} },
  plugins: [react()],
  // TODO: Remove later
  base: "/project2",

  test: {
    testTimeout: 10000,
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/tests/setup.js",
    environmentMatchGlobs: [
      // all tests in tests/dom will run in jsdom
      ["tests/dom/**", "jsdom"],
      // all tests in tests/ with .edge.test.ts will run in edge-runtime
      ["**/*.edge.test.ts", "edge-runtime"],
      // ...
    ],
  },
});
