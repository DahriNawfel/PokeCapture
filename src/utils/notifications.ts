import type { Pokemon } from './pokeapi';

export async function ensurePermission() {
  if (!('Notification' in window)) return false;
  if (Notification.permission === 'granted') return true;
  if (Notification.permission === 'denied') return false;
  const res = await Notification.requestPermission();
  return res === 'granted';
}

export function notifyCatch(p: Pokemon) {
  if (!('Notification' in window) || Notification.permission !== 'granted') return;
  new Notification("It's a catch!", {
    body: `${capitalize(p.name)} rejoint votre équipe!`,
    icon: './icons/pokeball-192.png'
  });
}

export function notifyShiny(p: Pokemon) {
  if (!('Notification' in window) || Notification.permission !== 'granted') return;
  new Notification('Shine bright like a diamond', {
    body: `Rencontre rare: Shiny ${capitalize(p.name)}!`,
    icon: p.image
  });
}

function capitalize(s: string){ return s.charAt(0).toUpperCase() + s.slice(1); }
