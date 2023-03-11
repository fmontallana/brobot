import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePluginFonts } from 'vite-plugin-fonts'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    // 'process.env.NODE_ENV': JSON.stringify('production')
  },
  plugins: [react(),
  VitePluginFonts({
    google: {
      families: ['Oxanium', "Orbitron"],
    },
  }),
  ],
})
