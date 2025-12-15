import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './ui/App';
import './styles/global.css';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(console.error);
  });
}

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
