import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'
import react from '@vitejs/plugin-react'

function companiesPlugin() {
  return {
    name: 'companies-scanner',
    configureServer(server) {
      server.middlewares.use('/api/companies', (_, res) => {
        const dir = path.resolve('src/data/jobs');
        const companies = fs
          .readdirSync(dir)
          .filter(f => f.endsWith('.json'))
          .map(f => path.basename(f, '.json'));
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(companies));
      });

      server.middlewares.use('/data/jobs', (req, res, next) => {
        if (req.url && req.url.endsWith('.json')) {
          const filePath = path.resolve('src/data/jobs', req.url);
          if (fs.existsSync(filePath)) {
            res.setHeader('Content-Type', 'application/json');
            res.end(fs.readFileSync(filePath, 'utf8'));
          } else {
            next();
          }
        } else {
          next();
        }
      });
    },
  };
}

export default defineConfig({
  root: 'src',
  server: {
    open: true,
    port: 3000,
  },
  plugins: [react(), tailwindcss(), companiesPlugin()],
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
});