import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import preact from "@astrojs/preact";
import vercel from "@astrojs/vercel/serverless";

export default defineConfig({
  integrations: [tailwind(), react()],
  output: "server",
  adapter: vercel({
    runtime: 'nodejs20.x'
  })
});