import { X } from "lucide-react";

export default function AdminModal({ title, subtitle, onClose, children }) {
  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center bg-slate-950/75 p-3 backdrop-blur-sm sm:items-center sm:p-5">
      <div className="w-full max-w-3xl rounded-2xl border border-white/10 bg-slate-900 shadow-2xl">
        <header className="flex items-start justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-5">
          <div>
            <h3 className="text-lg font-bold text-white">{title}</h3>
            {subtitle ? <p className="text-xs text-slate-400">{subtitle}</p> : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-600 p-1.5 text-slate-300 transition hover:bg-white/5"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </button>
        </header>
        <div className="max-h-[80vh] overflow-y-auto p-4 sm:p-5">{children}</div>
      </div>
    </div>
  );
}
