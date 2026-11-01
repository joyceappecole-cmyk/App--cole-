import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { keepNetlifyBadgeClearOfNav } from './utils/netlifyBadge';

// Register Service Worker for PWA & offline support
if ('serviceWorker' in navigator) {
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
}

keepNetlifyBadgeClearOfNav();

createRoot(document.getElementById('root')!).render(<App />);
