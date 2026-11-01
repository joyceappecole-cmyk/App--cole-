import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle2, Circle, Plus } from 'lucide-react';
import { ScheduleItem } from '../types';

interface ScheduleModalProps {
  items: ScheduleItem[];
  isOpen: boolean;
  onClose: () => void;
  onToggleComplete: (id: string) => void;
  onAddItem: (item: Omit<ScheduleItem, 'id' | 'completed'>) => void;
}

export const ScheduleModal: React.FC<ScheduleModalProps> = ({
  items,
  isOpen,
  onClose,
  onToggleComplete,
  onAddItem,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [title, setTitle] = useState('');
  const [courseTitle, setCourseTitle] = useState('');
  const [duration, setDuration] = useState(25);
  const [type, setType] = useState<ScheduleItem['type']>('flashcards');

  if (!isOpen) return null;

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !courseTitle.trim()) return;
    onAddItem({
      title: title.trim(),
      courseTitle: courseTitle.trim(),
      type,
      durationMinutes: duration,
      dateStr: 'Aujourd\'hui · Prochain créneau',
    });
    setTitle('');
    setCourseTitle('');
    setShowAddForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Mon programme de révision</h3>
              <p className="text-xs text-slate-500">Planifie et coche tes sessions d'étude</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          
          {/* Header notice */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Sessions programmées
            </span>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 py-1 px-2.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Ajouter une session</span>
            </button>
          </div>

          {/* Add Form */}
          {showAddForm && (
            <form onSubmit={handleAddSubmit} className="mb-5 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <h4 className="text-xs font-bold text-slate-800">Nouvelle session d'étude</h4>
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">Objectif de la session</label>
                <input
                  type="text"
                  placeholder="Ex: Révision du chapitre 2 et flashcards"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">Matière</label>
                  <input
                    type="text"
                    placeholder="Ex: Droit civil"
                    value={courseTitle}
                    onChange={(e) => setCourseTitle(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">Durée (minutes)</label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value={15}>15 minutes (Express)</option>
                    <option value={25}>25 minutes (Pomodoro)</option>
                    <option value={45}>45 minutes (Approfondi)</option>
                    <option value={60}>60 minutes (Examen blanc)</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-200"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          )}

          {/* List of items */}
          <div className="space-y-2.5">
            {items.map((item) => (
              <div
                key={item.id}
                onClick={() => onToggleComplete(item.id)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 min-h-[48px] ${
                  item.completed
                    ? 'bg-slate-50 border-slate-200/60 opacity-70'
                    : 'bg-white border-slate-200 hover:border-emerald-300 shadow-xs'
                }`}
              >
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    className="text-slate-400 hover:text-emerald-600 transition-colors shrink-0"
                  >
                    {item.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-300" />
                    )}
                  </button>
                  <div>
                    <h5 className={`text-sm font-semibold text-slate-900 ${item.completed ? 'line-through text-slate-400' : ''}`}>
                      {item.title}
                    </h5>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                      <span>{item.courseTitle}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1 font-mono tabular-nums">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {item.durationMinutes} min
                      </span>
                    </div>
                  </div>
                </div>

                <span className="text-[11px] font-medium text-slate-400 shrink-0">
                  {item.dateStr}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 text-xs text-emerald-900 flex items-start gap-3">
            <span className="text-lg">💡</span>
            <p className="leading-relaxed">
              <strong>Conseil de planification :</strong> Répartis tes révisions par blocs de 25 minutes (méthode Pomodoro). Accorde-toi 5 minutes de pause complète entre chaque session.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50/70 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100"
          >
            Fermer
          </button>
        </div>

      </div>
    </div>
  );
};
