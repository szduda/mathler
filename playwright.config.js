import { defineConfig } from "@playwright/test";

export default defineConfig({
  use: {
    launchOptions: {
      slowmo: 2000,
    },
  },
});
