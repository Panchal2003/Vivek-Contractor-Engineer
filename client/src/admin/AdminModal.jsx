import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function AdminModal({ title, subtitle, onClose, children }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 250);
  };

  return (
    <div className={`fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={handleClose}
      />
      <div className={`relative w-full max-w-lg sm:max-w-2xl max-h-[85vh] sm:max-h-[90vh] flex flex-col rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden transform transition-all duration-300 ${isVisible ? 'translate-y-0 scale-100' : 'translate-y-8 scale-95'}`}>
        <header className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-3 sm:px-5 sm:py-4 bg-white shrink-0">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-800">{title}</h3>
            {subtitle && <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5">{subtitle}</p>}
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg p-1.5 sm:p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            aria-label="Close modal"
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </header>
        <div className="flex-1 overflow-y-auto p-4 sm:p-5">{children}</div>
      </div>
    </div>
  );
}
