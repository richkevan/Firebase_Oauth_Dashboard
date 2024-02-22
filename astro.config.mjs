import { defineConfig } from 'astro/config';
import icon from "astro-icon";
import tailwind from "@astrojs/tailwind";
import node from "@astrojs/node";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [icon(), tailwind(), react()],
  output: "hybrid",
  adapter: node({
    mode: "middleware"
  })
});