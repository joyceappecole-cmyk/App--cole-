import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  X, 
  CheckCheck, 
  Trash2, 
  Sparkles, 
  Calendar, 
  Brain, 
  BookOpen, 
  Info, 
  Check, 
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  Send
} from 'lucide-react';
import { AppNotification } from '../types';
import { notificationService } from '../services/notificationService';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab?: (tab: string) => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  onNavigateTab,
}) => {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [permissionStatus, setPermissionStatus] = useState<NotificationPermission>('default');
  const [isEnabling, setIsEnabling] = useState(false);
  const [testSent, setTestSent] = useState(false);

  const loadNotifications = () => {
    setNotifications(notificationService.getAllNotifications());
    setPermissionStatus(notificationService.getPermissionStatus());
  };

  useEffect(() => {
    if (isOpen) {
      loadNotifications();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleUpdate = () => loadNotifications();
    window.addEventListener('revigenius:notifications_updated', handleUpdate);
    window.addEventListener('revigenius:new_notification', handleUpdate);
    return () => {
      window.removeEventListener('revigenius:notifications_updated', handleUpdate);
      window.removeEventListener('revigenius:new_notification', handleUpdate);
    };
  }, []);

  if (!isOpen) return null;

  const handleRequestPermission = async () => {
    setIsEnabling(true);
    await notificationService.requestPermission();
    setIsEnabling(false);
    loadNotifications();
  };

  const handleMarkAllRead = () => {
    notificationService.markAllAsRead();
  };

  const handleClearAll = () => {
    notificationService.clearAll();
  };

  const handleClickItem = (notif: AppNotification) => {
    if (!notif.read) {
      notificationService.markAsRead(notif.id);
    }
    if (notif.linkTab && onNavigateTab) {
      onNavigateTab(notif.linkTab);
      onClose();
    }
  };

  const handleSendTestNotification = () => {
    notificationService.sendNotification({
      title: 'Rappel de Révision RéviGenius 🎯',
      message: 'C\'est l\'heure de réviser tes chapitres du jour pour garder une longueur d\'avance sur tes examens !',
      type: 'reminder',
      linkTab: 'revisions',
    });
    setTestSent(true);
    setTimeout(() => setTestSent(false), 2500);
  };

  const getNotifIcon = (type: AppNotification['type']) => {
    switch (type) {
      case 'exam':
        return <Calendar className="w-4 h-4 text-purple-600 dark:text-purple-400" />;
      case 'reminder':
        return <Brain className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
      case 'biblical':
      case 'wisdom':
        return <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />;
      case 'system':
      default:
        return <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
    }
  };

  const formatTimeAgo = (timestamp: number) => {
    const diffMs = Date.now() - timestamp;
    const mins = Math.floor(diffMs / 60000);
    if (mins < 1) return 'À l\'instant';
    if (mins < 60) return `Il y a ${mins} min`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `Il y a ${hours} h`;
    const days = Math.floor(hours / 24);
    return `Il y a ${days} j`;
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/80 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-notif-title"
      >
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 bg-slate-50/70 dark:bg-slate-800/40">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center relative">
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-extrabold flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </div>
            <div>
              <h2 id="modal-notif-title" className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                Notifications & Rappels
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {unreadCount > 0 ? `${unreadCount} non lue(s)` : 'Toutes tes alertes d\'étude'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {notifications.length > 0 && (
              <button
                onClick={handleMarkAllRead}
                title="Tout marquer comme lu"
                className="p-2 rounded-xl text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <CheckCheck className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* System Permission Banner if not granted */}
        {permissionStatus !== 'granted' && (
          <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border-b border-emerald-100 dark:border-emerald-900/60 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Active les rappels directs sur ton téléphone ou ordinateur.</span>
            </div>
            <button
              onClick={handleRequestPermission}
              disabled={isEnabling}
              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shrink-0 shadow-xs cursor-pointer active:scale-95 transition-all"
            >
              {isEnabling ? 'Activation...' : 'Autoriser'}
            </button>
          </div>
        )}

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5 divide-y divide-slate-100 dark:divide-slate-800/60">
          {notifications.length === 0 ? (
            <div className="py-12 text-center text-slate-400 dark:text-slate-500 space-y-2">
              <Bell className="w-10 h-10 mx-auto opacity-30" />
              <p className="text-sm font-medium">Aucune notification pour le moment.</p>
              <p className="text-xs">Tes rappels d'examens et de flashcards apparaîtront ici.</p>
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => handleClickItem(notif)}
                className={`pt-2.5 first:pt-0 flex items-start gap-3 p-3 rounded-2xl cursor-pointer transition-colors ${
                  notif.read
                    ? 'hover:bg-slate-50 dark:hover:bg-slate-800/40 opacity-80'
                    : 'bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100/60 dark:border-emerald-900/40'
                }`}
              >
                <div className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 shrink-0 shadow-2xs mt-0.5">
                  {getNotifIcon(notif.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className={`text-xs sm:text-sm truncate ${notif.read ? 'font-semibold text-slate-800 dark:text-slate-200' : 'font-bold text-slate-900 dark:text-white'}`}>
                      {notif.title}
                    </h3>
                    <span className="text-[10px] text-slate-400 whitespace-nowrap shrink-0">
                      {formatTimeAgo(notif.timestamp)}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                    {notif.message}
                  </p>

                  {notif.linkTab && (
                    <div className="mt-2 flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                      <span>Ouvrir l'onglet</span>
                      <ExternalLink className="w-3 h-3" />
                    </div>
                  )}
                </div>

                {!notif.read && (
                  <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400 shrink-0 mt-2" />
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer actions */}
        <div className="p-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 flex items-center justify-between gap-2 text-xs">
          <button
            onClick={handleSendTestNotification}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shadow-2xs"
          >
            {testSent ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Send className="w-3.5 h-3.5 text-emerald-600" />}
            <span>{testSent ? 'Rappel envoyé !' : 'Tester un rappel'}</span>
          </button>

          {notifications.length > 0 && (
            <button
              onClick={handleClearAll}
              className="text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 text-xs font-medium flex items-center gap-1 py-1 px-2 rounded-lg"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Effacer tout</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
