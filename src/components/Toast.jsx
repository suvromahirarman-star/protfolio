import React from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export function Toast({ message, type = 'success', onClose }) {
  if (!message) return null;

  const isSuccess = type === 'success';

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-brand-card/95 border border-brand-orange/30 shadow-2xl backdrop-blur-xl animate-fade-in text-white max-w-sm">
      {isSuccess ? (
        <CheckCircle2 className="w-5 h-5 text-brand-orange flex-shrink-0" />
      ) : (
        <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
      )}
      <p className="text-sm font-medium flex-grow leading-snug">{message}</p>
      <button
        type="button"
        onClick={onClose}
        className="p-1 rounded-lg text-brand-muted hover:text-white hover:bg-white/10 transition cursor-pointer"
        aria-label="Dismiss notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

export default Toast;
