import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [react(), tailwind()],
  site: 'https://jxlee007.github.io/SPY',
  // Serve static assets from src/public so references like /main.js and /images/* work
  base: '/SPY/',
});
