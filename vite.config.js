import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { cpSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const appPages = new Set([
  '/about.html', '/expertise.html', '/projects.html', '/portfolio.html',
  '/project-detail.html', '/photography.html', '/my-clicks.html',
  '/videos.html', '/blog.html', '/articles.html', '/article.html', '/tools.html',
  '/date-converter.html', '/contact.html'
]);

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'react-app-shell',
      transformIndexHtml: {
        order: 'pre',
        handler(html) {
          return html.replace(
            /<body(?:\s[^>]*)?>[\s\S]*?<\/body>/i,
            '<body><div id="root"></div><script type="module" src="/src/main.jsx"></script></body>'
          );
        }
      }
    },
    {
      name: 'copy-original-static-assets',
      closeBundle() {
        cpSync(resolve('assets'), resolve('dist/assets'), { recursive: true });
      }
    },
    {
      name: 'emit-legacy-html-pages',
      closeBundle() {
        const appShell = readFileSync(resolve('dist/index.html'));
        for (const page of appPages) {
          writeFileSync(resolve('dist', page.slice(1)), appShell);
        }
      }
    },
    {
      name: 'legacy-html-app-routes',
      configureServer(server) {
        server.middlewares.use((request, _response, next) => {
          const pathname = request.url?.split('?')[0];
          const matchingPage = pathname && [...appPages].find(page => pathname.endsWith(page));
          if (matchingPage) request.url = `/index.html${request.url.slice(pathname.length)}`;
          next();
        });
      }
    }
  ],
  base: './'
});
