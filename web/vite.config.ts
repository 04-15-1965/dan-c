import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),

      // Runtime source (no build required)
      '@runtime': path.resolve(__dirname, '../runtime/src'),
      '@mythic-os/runtime': path.resolve(__dirname, '../runtime/src'),

      // Realms root
      '@realms': path.resolve(__dirname, '../realms'),

      // Shared utilities (if present)
      '@shared': path.resolve(__dirname, '../shared/src'),
    },
  },

  server: {
    port: 5173,
    strictPort: true,
  },

  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
});
