import React from 'react';
import { useCafe } from '../context/CafeContext';

export const ArticleModal: React.FC = () => {
  const { isArticleOpen, setIsArticleOpen, isPlayingAudio, toggleAudio, showToast } = useCafe();

  if (!isArticleOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-[#e5e2dd] p-6 sm:p-8 space-y-6">
        <button
          onClick={() => setIsArticleOpen(false)}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#f6f3ee] flex items-center justify-center text-[#140804] hover:bg-[#ebe8e3] transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        <div className="space-y-2 pb-4 border-b border-[#f0ede9]">
          <div className="flex items-center gap-2 text-xs font-bold text-[#97472e] uppercase tracking-wider">
            <span className="material-symbols-outlined text-[16px]">menu_book</span>
            <span>Sensory Lab Notes • Guji Series</span>
          </div>
          <h2 className="font-['Playfair_Display'] text-2xl sm:text-3xl font-bold text-[#140804] leading-tight">
            The Geopolitics of Heirloom Varieties in the Guji Highlands
          </h2>
          <p className="text-xs text-[#817470]">
            By Matteo Rossi (Head Roaster) &amp; Dr. Selam Tesfaye • 25-Min Deep Focus Read
          </p>
        </div>

        <div className="prose text-xs sm:text-sm text-[#4f4541] leading-relaxed space-y-4">
          <p>
            Nestled between the volcanic plateaus of Oromia and the lush cloud forests bordering the Sidama zone, the Guji highlands represent one of the planet’s most biologically diverse coffee ecosystems. Unlike commercial monoculture plantations found across Central America, Ethiopian heirloom plants thrive in wild agroforestry systems where wild canopy shade moderates diurnal temperature shifts to within 4°C.
          </p>
          <p>
            This unique thermal stability forces the coffee cherry to ripen over a protracted seven-month maturation curve. As sucrose and organic malic acids concentrate inside the dense embryo, the bean accumulates the delicate aromatic precursor molecules responsible for the characteristic floral bergamot, apricot blossom, and candied citrus profiles that define Hambela and Uraga lots.
          </p>
          <blockquote className="p-4 rounded-xl bg-[#f6f3ee] border-l-4 border-[#97472e] text-[#140804] font-['Playfair_Display'] italic text-sm my-4">
            "When we pull a shot of natural Guji at 92.8°C with a gentle 9.0 bar pre-infusion, we aren’t just brewing espresso—we are translating three centuries of indigenous Oromo seed conservation onto the patron's palate."
          </blockquote>
          <p>
            During wet fermentation, the native mucilage is systematically degraded by indigenous ambient yeast strains rather than commercial additives, leaving delicate natural sugars intact that harmonize flawlessly with the lipids in cold-textured oat emulsion.
          </p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-[#f0ede9] flex-wrap gap-3">
          <button
            onClick={toggleAudio}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#f6f3ee] hover:bg-[#ebe8e3] text-xs font-bold text-[#140804] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px] text-[#97472e]">
              {isPlayingAudio ? 'pause' : 'headphones'}
            </span>
            <span>{isPlayingAudio ? 'Pause Ambient Sound' : 'Listen with Lo-Fi Stem'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                showToast('Article saved to your offline reading library', 'info');
              }}
              className="px-4 py-2 rounded-full bg-[#f6f3ee] text-[#140804] text-xs font-bold hover:bg-[#ebe8e3] transition-colors cursor-pointer"
            >
              Bookmark
            </button>
            <button
              onClick={() => setIsArticleOpen(false)}
              className="px-5 py-2 rounded-full bg-[#2d1e18] text-white text-xs font-bold hover:bg-[#140804] transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
