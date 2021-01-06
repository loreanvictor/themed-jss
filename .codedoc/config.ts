
import { configuration } from '@codedoc/core';

import { theme } from './theme';


export const config = /*#__PURE__*/configuration({
  theme,
  dest: {
    namespace: '/themed-jss',
    html: 'dist',
    assets: process.env.GITHUB_BUILD === 'true' ? 'dist' : '.',
    bundle: process.env.GITHUB_BUILD === 'true' ? 'bundle' : 'dist/bundle',
    styles: process.env.GITHUB_BUILD === 'true' ? 'styles' : 'dist/styles',
  },
  page: {
    title: {
      extractor: (content) => {
        const base = 'Themed JSS';
        const header = content.querySelector('h1');

        return (header && header.textContent && !header.hasAttribute('skip-title'))
          ? `${base} | ${header.textContent}`
          : base;
      }
    },
    fonts: {
      text: {
        url: 'https://fonts.googleapis.com/css2?family=Zilla+Slab:wght@400;700&display=swap',
        name: 'Zilla Slab'
      }
    },
    // favicon: '/favicon.ico'
  },
  misc: {
    github: {
      user: 'loreanvictor',
      repo: 'themed-jss',
    }
  },
});
