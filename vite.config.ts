import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import preprocess from 'svelte-preprocess';

export default defineConfig({
  plugins: [
    svelte({
      // Enable run-time checks when not in production
      compilerOptions: {
        dev: !process.env.production,
      },
      // Enable preprocessing for Svelte files
      preprocess: preprocess(),
    }),
  ],
});
