import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { keepNetlifyBadgeClearOfNav } from './utils/netlifyBadge';

// Manage Service Worker
if ('serviceWorker' in navigator) {
  if (import.meta.env.PROD) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => {
          console.log('[RéviGenius] Service Worker enregistré avec succès:', reg.scope);
        })
        .catch((err) => {
          console.warn('[RéviGenius] Échec enregistrement SW:', err);
        });
    });
  } else {
    // In development mode, aggressively unregister any service worker to prevent stale Vite module caching
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (const registration of registrations) {
        registration.unregister();
      }
    });
    if (typeof caches !== 'undefined') {
      caches.keys().then((keys) => {
        for (const key of keys) {
          caches.delete(key);
        }
      });
    }
  }
}

keepNetlifyBadgeClearOfNav();

createRoot(document.getElementById('root')!).render(<App />);
