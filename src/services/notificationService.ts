/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AppNotification } from '../types';

const STORAGE_KEYS = {
  NOTIFICATIONS: 'revigenius_in_app_notifications_v1',
  PERMISSION_STATE: 'revigenius_notifications_enabled_v1',
  LAST_REMINDER_DATE: 'revigenius_last_reminder_date_v1',
};

const DEFAULT_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif_welcome',
    title: 'Bienvenue sur RéviGenius ! 🎓',
    message: 'Organise tes horaires, révise avec les flashcards et consulte tes fiches de révision en toute tranquillité.',
    timestamp: Date.now() - 3600000 * 2,
    read: false,
    type: 'system',
    linkTab: 'accueil',
  },
  {
    id: 'notif_srs_reminder',
    title: 'Rappel de révision active (SRS)',
    message: 'La répétition espacée est prête : 3 cartes mémoires sont programmées pour aujourd\'hui afin de consolider ta mémoire.',
    timestamp: Date.now() - 3600000 * 1,
    read: false,
    type: 'reminder',
    linkTab: 'revisions',
  },
  {
    id: 'notif_wisdom',
    title: 'Pensée & Sagesse d\'étude 💡',
    message: '« La crainte de l\'Éternel est le commencement de la science. » — Proverbes 1:7. Bonne séance d\'apprentissage aujourd\'hui !',
    timestamp: Date.now() - 1800000,
    read: false,
    type: 'wisdom',
    linkTab: 'espace-biblique',
  },
];

class NotificationService {
  /**
   * Vérifie si les notifications du navigateur sont supportées
   */
  public isSupported(): boolean {
    return typeof window !== 'undefined' && 'Notification' in window;
  }

  /**
   * Récupère le statut actuel de permission ('granted', 'denied', 'default')
   */
  public getPermissionStatus(): NotificationPermission {
    if (!this.isSupported()) return 'denied';
    return Notification.permission;
  }

  /**
   * Vérifie si l'utilisateur a activé les notifications (dans les réglages de l'app)
   */
  public isEnabledInApp(): boolean {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PERMISSION_STATE);
      if (saved !== null) return saved === 'true';
      return this.getPermissionStatus() === 'granted';
    } catch {
      return false;
    }
  }

  /**
   * Enregistre l'activation / désactivation dans l'application
   */
  public setEnabledInApp(enabled: boolean): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PERMISSION_STATE, enabled ? 'true' : 'false');
    } catch (e) {
      console.warn('Erreur stockage notification:', e);
    }
  }

  /**
   * Demande formellement l'autorisation à l'utilisateur via l'API Web Notification
   */
  public async requestPermission(): Promise<boolean> {
    if (!this.isSupported()) {
      this.setEnabledInApp(true);
      return false;
    }

    try {
      const permission = await Notification.requestPermission();
      const granted = permission === 'granted';
      this.setEnabledInApp(granted);

      if (granted) {
        // Envoie une notification de confirmation immédiate
        this.sendNotification({
          title: 'Notifications activées sur RéviGenius ! 🔔',
          message: 'Tu recevras des rappels pour tes cours, tes révisions et tes objectifs d\'examen.',
          type: 'system',
          linkTab: 'accueil',
        });
      }

      return granted;
    } catch (e) {
      console.warn('Erreur demande permission notification:', e);
      return false;
    }
  }

  /**
   * Émet une notification (système si autorisé + stockée dans l'application)
   */
  public sendNotification(payload: {
    title: string;
    message: string;
    type?: AppNotification['type'];
    linkTab?: string;
  }): AppNotification {
    const newNotif: AppNotification = {
      id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      title: payload.title,
      message: payload.message,
      timestamp: Date.now(),
      read: false,
      type: payload.type || 'reminder',
      linkTab: payload.linkTab,
    };

    // 1. Sauvegarde dans l'historique in-app
    const currentList = this.getAllNotifications();
    const updatedList = [newNotif, ...currentList].slice(0, 50); // Garde les 50 dernières
    this.saveNotifications(updatedList);

    // 2. Notification système (Web Notification) si autorisée
    if (this.isSupported() && Notification.permission === 'granted' && this.isEnabledInApp()) {
      try {
        if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
          navigator.serviceWorker.ready.then((reg) => {
            reg.showNotification(payload.title, {
              body: payload.message,
              icon: '/pwa-192x192.png',
              badge: '/pwa-192x192.png',
              tag: newNotif.id,
            });
          }).catch(() => {
            new Notification(payload.title, {
              body: payload.message,
              icon: '/pwa-192x192.png',
            });
          });
        } else {
          new Notification(payload.title, {
            body: payload.message,
            icon: '/pwa-192x192.png',
          });
        }
      } catch (err) {
        console.warn('Notification native non envoyée:', err);
      }
    }

    // 3. Dispatch d'événement personnalisé pour mise à jour immédiate de l'interface
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('revigenius:new_notification', { detail: newNotif }));
    }

    return newNotif;
  }

  /**
   * Récupère toutes les notifications in-app
   */
  public getAllNotifications(): AppNotification[] {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
      if (saved) {
        return JSON.parse(saved);
      }
      // Initialise avec des rappels par défaut
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(DEFAULT_NOTIFICATIONS));
      return DEFAULT_NOTIFICATIONS;
    } catch {
      return DEFAULT_NOTIFICATIONS;
    }
  }

  /**
   * Nombre de notifications non lues
   */
  public getUnreadCount(): number {
    return this.getAllNotifications().filter((n) => !n.read).length;
  }

  /**
   * Marquer une notification comme lue
   */
  public markAsRead(id: string): void {
    const list = this.getAllNotifications().map((n) => (n.id === id ? { ...n, read: true } : n));
    this.saveNotifications(list);
    window.dispatchEvent(new CustomEvent('revigenius:notifications_updated'));
  }

  /**
   * Marquer toutes les notifications comme lues
   */
  public markAllAsRead(): void {
    const list = this.getAllNotifications().map((n) => ({ ...n, read: true }));
    this.saveNotifications(list);
    window.dispatchEvent(new CustomEvent('revigenius:notifications_updated'));
  }

  /**
   * Supprimer une notification
   */
  public deleteNotification(id: string): void {
    const list = this.getAllNotifications().filter((n) => n.id !== id);
    this.saveNotifications(list);
    window.dispatchEvent(new CustomEvent('revigenius:notifications_updated'));
  }

  /**
   * Effacer tout l'historique
   */
  public clearAll(): void {
    this.saveNotifications([]);
    window.dispatchEvent(new CustomEvent('revigenius:notifications_updated'));
  }

  /**
   * Réinitialise les notifications à leur état initial par défaut
   */
  public resetToDefaults(): void {
    this.saveNotifications(DEFAULT_NOTIFICATIONS);
    try {
      localStorage.removeItem(STORAGE_KEYS.PERMISSION_STATE);
      localStorage.removeItem(STORAGE_KEYS.LAST_REMINDER_DATE);
    } catch {}
    window.dispatchEvent(new CustomEvent('revigenius:notifications_updated'));
  }

  private saveNotifications(list: AppNotification[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(list));
    } catch (e) {
      console.warn('Erreur sauvegarde notifications:', e);
    }
  }
}

export const notificationService = new NotificationService();
