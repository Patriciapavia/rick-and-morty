import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/graphql': {
        target: 'https://rickandmortyapi.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/graphql/, '/graphql')
      }
    }
  },
})
