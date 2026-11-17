import react from "@vitejs/plugin-react"
import { defineConfig } from "vitest/config"

export default defineConfig({
  // Relative, so the built page finds its files at any address: the Pages
  // project path today, a custom domain later.
  base: "./",
  plugins: [react()],
  test: {
    environment: "jsdom",
    include: [
      "app/**/*.test.tsx",
      "components/**/*.test.tsx",
      "test-utils/**/*.test.ts",
    ],
    setupFiles: ["./vitest.setup.ts"],
    css: { modules: { classNameStrategy: "non-scoped" } },
  },
})
