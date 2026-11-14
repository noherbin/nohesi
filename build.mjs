// Bundles src/ into a single classic script (game.js) so index.html runs straight from disk (file://).
import { build } from 'esbuild';

const minify = process.argv.includes('--minify');
await build({
  entryPoints: ['src/main.js'],
  bundle: true,
  format: 'iife',
  target: ['es2020'],
  outfile: 'dist/game.js',
  minify,
  sourcemap: false,
  legalComments: 'none',
  logLevel: 'info',
});
