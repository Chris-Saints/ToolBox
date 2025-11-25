import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist', // Pasta onde o código compilado será gerado
  },
  server: {
    open: true, // Abre automaticamente o navegador ao rodar o projeto
  },
});