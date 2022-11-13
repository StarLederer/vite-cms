import { resolve } from 'path';

import { defineConfig } from 'vite';
import viteFs from 'vite-plugin-fs';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import webwriter from '@vite-cms/editor-svelte';
import compiler, { recursiveDirToBooks } from '@vite-cms/content';

export default defineConfig({
  plugins: [
    svelte(),
    viteFs({
      rootDir: 'src/content',
    }),
    compiler({
      outDir: 'content',
      bookConfigs: await recursiveDirToBooks(resolve('./src/content')),
    }),
    webwriter({
      devModule: {
        type: 'path',
        path: resolve('webwriter.config.dev.js'),
      },
      prodModule: {
        type: 'path',
        path: resolve('webwriter.config.prod.js'),
      },
    })],
});
