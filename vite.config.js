import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/portfolio': {
        target: 'https://portfolio-vercel-deployment-nine.vercel.app',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api\/portfolio/, '/api/v1/portfolio'),
      },
    },
  },
});
