import React, { useState, useEffect } from 'react';
import { X, Download, FileText, ExternalLink, AlertCircle, Maximize2 } from 'lucide-react';
import { Course } from '../types';

interface PdfViewerModalProps {
  course: Course | null;
  pdfBlob: Blob | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PdfViewerModal: React.FC<PdfViewerModalProps> = ({
  course,
  pdfBlob,
  isOpen,
  onClose,
}) => {
  const [objectUrl, setObjectUrl] = useState<string | null>(null);

  useEffect(() => {
    if (pdfBlob && isOpen) {
      const url = URL.createObjectURL(pdfBlob);
      setObjectUrl(url);
      return () => {
        URL.revokeObjectURL(url);
        setObjectUrl(null);
      };
    } else {
      setObjectUrl(null);
    }
  }, [pdfBlob, isOpen]);

  if (!isOpen || !course) return null;

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '';
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} Ko`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
  };

  const handleOpenExternal = () => {
    if (objectUrl) {
      window.open(objectUrl, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-2 sm:p-4 overflow-hidden">
      <div className="w-full max-w-5xl h-[92vh] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-slate-200 bg-slate-50 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 truncate">
                {course.title}
              </h3>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="font-semibold text-emerald-700">{course.subject}</span>
                {course.pdfFileName && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="truncate max-w-[200px] text-slate-400 font-mono text-[11px]">
                      {course.pdfFileName}
                    </span>
                  </>
                )}
                {course.pdfFileSize && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums text-[11px]">
                      {formatFileSize(course.pdfFileSize)}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {objectUrl && (
              <>
                <a
                  href={objectUrl}
                  download={course.pdfFileName || `${course.title}.pdf`}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 transition-colors"
                  title="Télécharger une copie du PDF"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Télécharger</span>
                </a>

                <button
                  onClick={handleOpenExternal}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors"
                  title="Ouvrir en plein écran"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Plein écran</span>
                </button>
              </>
            )}

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
              aria-label="Fermer le lecteur PDF"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PDF Content Area */}
        <div className="flex-1 bg-slate-100 relative overflow-hidden flex flex-col">
          {pdfBlob && objectUrl ? (
            <div className="w-full h-full flex flex-col">
              {/* Mobile quick action bar */}
              <div className="sm:hidden bg-emerald-50/90 border-b border-emerald-100 px-4 py-2 flex items-center justify-between text-xs text-emerald-900">
                <span>Document enregistré hors-ligne</span>
                <button
                  onClick={handleOpenExternal}
                  className="font-bold underline flex items-center gap-1"
                >
                  <span>Agrandir</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>

              {/* Embedded frame */}
              <iframe
                src={`${objectUrl}#toolbar=1&navpanes=0`}
                title={course.title}
                className="w-full flex-1 border-0"
              />
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 rounded-3xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Fichier PDF en cours de chargement ou absent</h4>
              <p className="text-xs text-slate-500 max-w-sm mt-1">
                Le document associé à ce cours est en cours de lecture depuis le stockage local sécurisé IndexedDB.
              </p>
              <button
                onClick={onClose}
                className="mt-5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-slate-200"
              >
                Retourner aux cours
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
