import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
//import open, {apps} from 'open';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: true, //This listens on all addresses when true
    port: 5173,
    strictPort: true,
    open: true
  }
})
