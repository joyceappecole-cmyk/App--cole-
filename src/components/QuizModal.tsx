import React, { useState } from 'react';
import { X, CheckCircle2, AlertCircle, HelpCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { QuizQuestion } from '../types';

interface QuizModalProps {
  questions: QuizQuestion[];
  isOpen: boolean;
  onClose: () => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({ questions, isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  if (!isOpen) return null;

  const currentQ = questions[currentIndex];

  const handleSelect = (idx: number) => {
    if (hasSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    setHasSubmitted(true);
    if (selectedOption === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setHasSubmitted(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setHasSubmitted(false);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/50">
              Auto-test interactif
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-1">
              {isFinished ? 'Résultats du Quiz' : (currentQ?.subject || currentQ?.courseTitle || 'Quiz')}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isFinished ? (
            <div className="text-center py-6">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold text-slate-900">Session d'auto-évaluation terminée !</h4>
              <p className="text-sm text-slate-600 mt-2">
                Ton score : <strong className="text-emerald-700 text-lg font-mono tabular-nums">{score} / {questions.length}</strong>
              </p>
              <p className="text-xs text-slate-500 mt-3 max-w-sm mx-auto">
                L'effet de test renforce durablement tes connexions synaptiques bien plus efficacement qu'une simple relecture passive.
              </p>
              <div className="mt-6 flex justify-center gap-3">
                <button
                  onClick={handleRestart}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Recommencer</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors"
                >
                  Terminer
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* Question progress */}
              <div className="flex items-center justify-between text-xs text-slate-500 mb-3 font-medium">
                <span>Question {currentIndex + 1} sur {questions.length}</span>
                <span className="font-mono tabular-nums">Score actuel: {score}</span>
              </div>

              {/* Question text */}
              <p className="text-base font-semibold text-slate-900 leading-snug mb-5">
                {currentQ?.statement || currentQ?.question}
              </p>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  let btnStyle = 'border-slate-200 bg-white hover:border-slate-300 text-slate-800';

                  if (hasSubmitted) {
                    if (idx === currentQ.correctIndex) {
                      btnStyle = 'border-emerald-500 bg-emerald-50/80 text-emerald-900 font-medium';
                    } else if (isSelected) {
                      btnStyle = 'border-rose-400 bg-rose-50/80 text-rose-900';
                    } else {
                      btnStyle = 'border-slate-100 bg-slate-50/50 text-slate-400 opacity-60';
                    }
                  } else if (isSelected) {
                    btnStyle = 'border-emerald-600 bg-emerald-50 text-emerald-950 font-medium ring-1 ring-emerald-600';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelect(idx)}
                      disabled={hasSubmitted}
                      className={`w-full text-left p-3.5 rounded-xl border text-sm transition-all flex items-start gap-3 min-h-[44px] ${btnStyle}`}
                    >
                      <span className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                        hasSubmitted && idx === currentQ.correctIndex
                          ? 'bg-emerald-600 text-white'
                          : isSelected
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="leading-snug">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation box after submission */}
              {hasSubmitted && (
                <div className="mt-4 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed flex items-start gap-2.5">
                  <HelpCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block mb-0.5">Explication pédagogique :</span>
                    {currentQ.explanation}
                  </div>
                </div>
              )}

              {/* Bottom controls */}
              <div className="mt-6 flex justify-end gap-3 pt-3 border-t border-slate-100">
                {!hasSubmitted ? (
                  <button
                    onClick={handleSubmit}
                    disabled={selectedOption === null}
                    className="min-h-[44px] px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    Valider la réponse
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="min-h-[44px] px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-all flex items-center gap-2"
                  >
                    <span>{currentIndex < questions.length - 1 ? 'Question suivante' : 'Voir le bilan'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
