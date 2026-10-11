import React from 'react';
import { useCafe } from '../context/CafeContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useCafe();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-2xl shadow-xl border text-xs font-semibold transition-all animate-bounce-in ${
            toast.type === 'gemini'
              ? 'bg-[#2d1e18] text-white border-[#97472e]'
              : toast.type === 'success'
              ? 'bg-[#c6ebd9] text-[#002116] border-[#abcebe]'
              : 'bg-white text-[#140804] border-[#e5e2dd]'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px]">
              {toast.type === 'gemini' ? 'auto_awesome' : toast.type === 'success' ? 'check_circle' : 'info'}
            </span>
            <span>{toast.text}</span>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-inherit opacity-60 hover:opacity-100 cursor-pointer p-0.5"
          >
            <span className="material-symbols-outlined text-[14px]">close</span>
          </button>
        </div>
      ))}
    </div>
  );
};
