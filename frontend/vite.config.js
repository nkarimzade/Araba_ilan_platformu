import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Admin build için base path /auth olacak
  const base = mode === 'admin' ? '/auth/' : '/';
  
  return {
    plugins: [react()],
    base: base,
    build: {
      outDir: mode === 'admin' ? 'dist-auth' : 'dist',
      emptyOutDir: true,
    }
  };
})
