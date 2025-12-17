import type { Pokemon } from './pokeapi';

export async function ensurePermission() {
  if (!('Notification' in window)) return false;
  if (Notification.permission === 'granted') return true;
  if (Notification.permission === 'denied') return false;
  const res = await Notification.requestPermission();
  return res === 'granted';
}

async function sendNotificationViaSW(title: string, options: NotificationOptions) {
  if ('serviceWorker' in navigator && 'Notification' in window) {
    const registration = await navigator.serviceWorker.ready;
    if (Notification.permission === 'granted') {
      try {
        await registration.showNotification(title, options);
        return;
      } catch (err) {
        console.warn('SW notification failed, falling back:', err);
      }
    }
  }
  
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, options);
  }
}

export async function notifyCatch(p: Pokemon) {
  await sendNotificationViaSW("It's a catch!", {
    body: `${capitalize(p.name)} rejoint votre équipe!`,
    icon: './icons/pokeball-192.png',
    badge: './icons/pokeball-192.png',
    tag: 'pokemon-catch',
    requireInteraction: false,
  });
}

export async function notifyShiny(p: Pokemon) {
  await sendNotificationViaSW('Shine bright like a diamond', {
    body: `Rencontre rare: Shiny ${capitalize(p.name)}!`,
    icon: p.image,
    badge: './icons/pokeball-192.png',
    tag: 'pokemon-shiny',
    requireInteraction: true,
  });
}

function capitalize(s: string){ return s.charAt(0).toUpperCase() + s.slice(1); }