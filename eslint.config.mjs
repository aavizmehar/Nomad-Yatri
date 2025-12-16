import { defineConfig } from "eslint/config";
import nextConfig from "eslint-config-next";

export default defineConfig([
  {
    ...nextConfig,
    rules: {
      "@typescript-eslint/no-var-requires": "off", // ✅ allow require()
      "no-unused-vars": "warn",
    },
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
]);
