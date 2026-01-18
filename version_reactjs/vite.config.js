import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['95b2-202-93-153-254.ngrok-free.app'], // Change 3000 to your desired port
  },
})
