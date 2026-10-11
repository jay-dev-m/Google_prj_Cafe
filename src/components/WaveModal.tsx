import React, { useState } from 'react';
import { useCafe } from '../context/CafeContext';

export const WaveModal: React.FC = () => {
  const { isWaveOpen, setIsWaveOpen, waveTarget, showToast } = useCafe();
  const [message, setMessage] = useState('');

  if (!isWaveOpen) return null;

  const handleSendWave = (icebreaker?: string) => {
    const textToSend = icebreaker || message || 'Sent a polite low-key wave';
    showToast(`Wave dispatched to ${waveTarget}: "${textToSend}"`, 'gemini');
    setIsWaveOpen(false);
    setMessage('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-[#e5e2dd] p-6 space-y-5">
        <button
          onClick={() => setIsWaveOpen(false)}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#f6f3ee] flex items-center justify-center text-[#140804] hover:bg-[#ebe8e3] transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#ffdbd0] text-[#3a0a00] flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">waving_hand</span>
          </div>
          <div>
            <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#140804]">
              Send Low-Key Wave
            </h3>
            <p className="text-xs text-[#817470]">To {waveTarget}</p>
          </div>
        </div>

        <p className="text-xs text-[#4f4541] leading-relaxed">
          Signals a gentle, respectful interest in spontaneous dialogue without interrupting deep flow.
        </p>

        <div className="space-y-2">
          <span className="text-[11px] font-bold text-[#817470] uppercase tracking-wider block">
            Suggested Icebreakers
          </span>
          <div className="flex flex-col gap-1.5">
            {[
              "Curious about the book/monograph on your table!",
              "Are you working on architectural or design systems today?",
              "What roast are you sipping right now?",
            ].map((icebreaker) => (
              <button
                key={icebreaker}
                onClick={() => handleSendWave(icebreaker)}
                className="p-2.5 rounded-xl bg-[#f6f3ee] hover:bg-[#ebe8e3] text-left text-xs font-semibold text-[#140804] transition-colors cursor-pointer border border-[#e5e2dd]/40"
              >
                "{icebreaker}"
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#140804]">Custom Note (Optional)</label>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a quiet note..."
            className="w-full px-3.5 py-2 rounded-xl border border-[#e5e2dd] bg-[#f6f3ee] text-xs text-[#140804] focus:outline-none"
          />
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-[#f0ede9]">
          <button
            onClick={() => setIsWaveOpen(false)}
            className="px-4 py-2 rounded-full bg-[#f6f3ee] text-xs font-bold text-[#140804] hover:bg-[#ebe8e3] cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => handleSendWave()}
            className="px-5 py-2 rounded-full bg-[#97472e] text-white text-xs font-bold hover:bg-[#772f18] shadow-sm cursor-pointer"
          >
            Send Wave
          </button>
        </div>
      </div>
    </div>
  );
};
