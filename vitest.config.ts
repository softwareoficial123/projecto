import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: [
      "apps/*/src/**/*.{test,spec}.ts",
      "packages/*/src/**/*.{test,spec}.ts",
    ],
    exclude: ["**/tests/**", "**/e2e/**", "apps/web/e2e/**", "node_modules"],
    globals: true,
    environment: "node",
  },
});
