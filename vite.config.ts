import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

export default defineConfig({
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        safezone: path.resolve(__dirname, 'index.html'),
        battle: path.resolve(__dirname, 'battleDisplay.html'),
        test: path.resolve(__dirname, 'test.html'),
      },
    },
  },
})
