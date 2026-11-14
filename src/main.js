// Entry point.
import { Game } from './game.js';

function showError(err) {
  const el = document.getElementById('load-text');
  if (el) el.textContent = `Something went wrong while starting: ${err && err.message ? err.message : err}`;
  console.error(err);
}

window.addEventListener('error', (e) => {
  if (!window.NOHESI) showError(e.error || e.message);
});

const game = new Game();
game.init().catch(showError);
