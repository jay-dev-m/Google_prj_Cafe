import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#f6f3ee] text-[#4f4541] py-10 border-t border-[#e5e2dd]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-['Playfair_Display'] text-xl font-semibold text-[#140804]">
            The Café Companion
          </span>
          <span className="text-xs text-[#4f4541]">— Artisanal Sensory Intelligence</span>
        </div>
        <div className="flex items-center gap-6 text-xs text-[#4f4541] font-semibold">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px] text-[#97472e]">coffee</span>
            Single Origin AI Lab
          </span>
          <span>© 2024 The Café Companion. All sensory rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};
