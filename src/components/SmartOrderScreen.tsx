import React, { useState } from 'react';
import { useCafe } from '../context/CafeContext';
import { menuItems } from '../data/dummyData';

export const SmartOrderScreen: React.FC = () => {
  const {
    addToCart,
    cart,
    cartTotal,
    setIsCheckoutOpen,
    showToast,
  } = useCafe();

  // Gemini Barista state
  const [promptInput, setPromptInput] = useState('Looking for something crisp and floral over ice with no syrup');
  const [isTuning, setIsTuning] = useState(false);
  const [geminiResponse, setGeminiResponse] = useState<string>(
    'Balancing for sustained cognitive focus. I have tuned our natural-processed Ethiopian Guji Hambela to extract gently at 92.8°C, muting sharp citrus while magnifying velvety apricot and floral honeycomb notes alongside steamed micro-foamed Minor Figures oat milk.'
  );
  const [craftBtnText, setCraftBtnText] = useState('Craft My Cup');
  const [craftBtnDone, setCraftBtnDone] = useState(false);

  // Micro modifiers for Smoked Sea Salt Flat White
  const [selectedMilk, setSelectedMilk] = useState<'Oat' | 'Whole' | 'Almond'>('Oat');
  const [selectedSweetness, setSelectedSweetness] = useState<'0%' | '50%' | '100%'>('50%');

  // Carousel offset
  const [carouselIndex, setCarouselIndex] = useState(0);

  const bespokeCortado = menuItems[0];
  const pourovers = menuItems.filter((i) => i.category === 'pourover');
  const signatures = menuItems.filter((i) => i.id === 'smoked-sea-salt-flat-white');
  const bakery = menuItems.filter((i) => i.category === 'bakery');
  const discoveryItems = menuItems.filter((i) => i.category === 'discovery');

  const handleTunePrompt = (queryText?: string) => {
    const textToUse = queryText || promptInput;
    if (!textToUse.trim()) return;
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (textToUse.toLowerCase().includes('lavender')) {
        setGeminiResponse(
          'Tuned for dusk wind-down. Swiss-Water Decaf Colombian Huila infused with organic culinary lavender steam and warm oat foam. Zero jitter, maximum floral silkiness.'
        );
      } else if (textToUse.toLowerCase().includes('ice') || textToUse.toLowerCase().includes('crisp')) {
        setGeminiResponse(
          'Calibrating for refreshing clarity. Slow-dripped Ethiopian Yirgacheffe flash-chilled over crystal clear ice rock, showcasing crisp bergamot and jasmine without artificial sweeteners.'
        );
      } else {
        setGeminiResponse(
          `Bespoke dial-in generated for "${textToUse}". Adjusted roast profile extraction to highlight natural terroir sugars with silky velvety emulsion.`
        );
      }
      showToast('Gemini 1.5 Pro sensory profile recalibrated', 'gemini');
    }, 850);
  };

  const handleCraftCup = () => {
    setCraftBtnText('Sending to Bar...');
    setTimeout(() => {
      setCraftBtnText('Queued at Barista Bar');
      setCraftBtnDone(true);
      addToCart(bespokeCortado, 'Oat', '50%');
      showToast('Cardamom Honey Oat Cortado queued for extraction', 'success');
    }, 700);
  };

  const handleAddPairing = () => {
    if (bespokeCortado.pairing) {
      const pairItem = {
        id: 'pistachio-croissant',
        name: bespokeCortado.pairing.name,
        price: bespokeCortado.pairing.price,
        category: 'bakery' as const,
        description: bespokeCortado.pairing.note,
        image: bespokeCortado.pairing.image,
      };
      addToCart(pairItem, 'None', '0%');
    }
  };

  return (
    <div className="w-full pb-24">
      {/* Live Vibe Telemetry Banner */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-6 pb-4">
        <div className="relative overflow-hidden rounded-xl bg-[#f6f3ee] shadow-sm border border-[#e5e2dd]/60">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#ffdbd0]/25 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative p-6 lg:p-8 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6">
            <div className="flex flex-col gap-2 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-2.5 h-2.5 rounded-full bg-[#abcebe] animate-ping"></span>
                <span className="text-[11px] font-bold text-[#97472e] uppercase tracking-wider">
                  Mission St. Roastery • Live Sensory Feed
                </span>
              </div>
              <h2 className="font-['Playfair_Display'] text-2xl sm:text-3xl font-semibold text-[#140804] tracking-tight">
                Optimal Seating Window: Right Now
              </h2>
              <p className="text-sm text-[#4f4541] leading-relaxed">
                Current wait is 4 mins • 68% seating available • Acoustic tone is calibrated for deep focus and reading.
              </p>
            </div>

            {/* Telemetry Data Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full xl:w-auto">
              <div className="bg-white p-3.5 rounded-lg shadow-sm border border-[#e5e2dd]/40 flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-[#97472e]">
                  <span className="material-symbols-outlined text-[18px]">hourglass_bottom</span>
                  <span className="text-[11px] font-bold uppercase tracking-wider">Queue Time</span>
                </div>
                <span className="text-xl font-bold text-[#140804] tabular-nums">~4 mins</span>
                <span className="text-xs text-[#4f4541]">3 orders ahead</span>
              </div>

              <div className="bg-white p-3.5 rounded-lg shadow-sm border border-[#e5e2dd]/40 flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-[#97472e]">
                  <span className="material-symbols-outlined text-[18px]">chair</span>
                  <span className="text-[11px] font-bold uppercase tracking-wider">Occupancy</span>
                </div>
                <span className="text-xl font-bold text-[#140804] tabular-nums">32% Full</span>
                <span className="text-xs text-[#2d4d40] font-semibold">14 seats open</span>
              </div>

              <div className="bg-white p-3.5 rounded-lg shadow-sm border border-[#e5e2dd]/40 flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-[#97472e]">
                  <span className="material-symbols-outlined text-[18px]">graphic_eq</span>
                  <span className="text-[11px] font-bold uppercase tracking-wider">Atmosphere</span>
                </div>
                <span className="text-xl font-bold text-[#140804] tabular-nums">48 dB</span>
                <span className="text-xs text-[#4f4541]">Gentle murmur</span>
              </div>

              <div className="bg-white p-3.5 rounded-lg shadow-sm border border-[#e5e2dd]/40 flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-[#97472e]">
                  <span className="material-symbols-outlined text-[18px]">power</span>
                  <span className="text-[11px] font-bold uppercase tracking-wider">Workstation</span>
                </div>
                <span className="text-xl font-bold text-[#140804] tabular-nums">8 Plugs</span>
                <span className="text-xs text-[#4f4541]">Communal table</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Split Experience */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (60%): Gemini Conversational Barista */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="bg-white rounded-xl p-6 lg:p-8 shadow-sm border border-[#e5e2dd]/60 flex flex-col gap-6 relative">
              {/* Section Heading */}
              <div className="flex items-center justify-between pb-2 border-b border-[#f0ede9]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#ffdbd0] flex items-center justify-center text-[#3a0a00]">
                    <span className="material-symbols-outlined text-[22px]">psychology</span>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-[#97472e] uppercase tracking-widest block">
                      Adaptive Sensory Intelligence
                    </span>
                    <h3 className="font-['Playfair_Display'] text-2xl font-semibold text-[#140804]">
                      Gemini Sensory Barista
                    </h3>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f6f3ee] text-xs font-semibold text-[#4f4541]">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#97472e] animate-pulse"></span>
                  Live Dial-In Active
                </span>
              </div>

              {/* Dialog History */}
              <div className="flex flex-col gap-5 pt-1">
                {/* User Prompt Bubble */}
                <div className="flex items-start gap-3.5 justify-end">
                  <div className="bg-[#f6f3ee] text-[#140804] max-w-lg p-4 rounded-2xl rounded-tr-none shadow-sm flex flex-col gap-1 border border-[#e5e2dd]/40">
                    <span className="text-xs font-bold text-[#4f4541]">You</span>
                    <p className="text-sm leading-relaxed">
                      “I need something creamy with oat milk, lower perceived acidity, and notes of stone fruit to sustain a 2-hour study session with a delicate baked pairing.”
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#f8ddd3] flex items-center justify-center text-[#271812] shrink-0 font-bold text-xs">
                    <span className="material-symbols-outlined text-[16px]">person</span>
                  </div>
                </div>

                {/* Gemini Response Bubble & Custom Recommendation */}
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-[#97472e] flex items-center justify-center text-white shrink-0 shadow-sm">
                    <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                  </div>
                  <div className="flex flex-col gap-4 max-w-full flex-1">
                    <div className="bg-[#f6f3ee] p-4 rounded-2xl rounded-tl-none shadow-sm text-[#1c1c19] border border-[#e5e2dd]/40">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-[#97472e]">
                          Gemini 1.5 Pro Sensory Co-Pilot
                        </span>
                        <span className="text-xs text-[#817470]">• 2 sec ago</span>
                      </div>
                      <p className="text-sm leading-relaxed text-[#1c1c19]">
                        {geminiResponse}
                      </p>
                    </div>

                    {/* Recommended Custom Cup Presentation Card */}
                    <div className="relative overflow-hidden rounded-xl bg-white p-6 shadow-md border border-[#e5e2dd] flex flex-col gap-6">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#ffdbd0]/30 rounded-bl-full pointer-events-none"></div>
                      <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between">
                        <div className="flex gap-4 items-center">
                          <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 shadow-sm border border-[#e5e2dd]">
                            <img
                              className="w-full h-full object-cover"
                              alt={bespokeCortado.imageAlt || bespokeCortado.name}
                              src={bespokeCortado.image}
                            />
                          </div>
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 rounded-full bg-[#ffdbd0] text-[#3a0a00] text-[10px] font-bold uppercase tracking-wider">
                                Bespoke Cup
                              </span>
                              <span className="text-xs text-[#4f4541]">Single-Origin Guji</span>
                            </div>
                            <h4 className="font-['Playfair_Display'] text-xl font-semibold text-[#140804] mt-1">
                              {bespokeCortado.name}
                            </h4>
                            <span className="text-base font-bold text-[#97472e] mt-0.5">
                              ${bespokeCortado.price.toFixed(2)}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={handleCraftCup}
                          className={`w-full sm:w-auto px-6 py-3 rounded-full font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer ${
                            craftBtnDone
                              ? 'bg-[#97472e] text-white'
                              : 'bg-[#2d1e18] text-white hover:bg-[#140804]'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[18px] text-[#ffdbd0]">
                            local_cafe
                          </span>
                          <span>{craftBtnText}</span>
                        </button>
                      </div>

                      {/* Tasting Profile Metric Bars */}
                      <div className="bg-[#f6f3ee] p-4 rounded-xl flex flex-col gap-3">
                        <div className="flex items-center justify-between text-xs">
                          <span className="uppercase tracking-wider text-[#4f4541] font-bold">
                            Sensory Fingerprint Matrix
                          </span>
                          <span className="text-[#97472e] font-semibold">
                            Dialed: 1:2.2 Ratio @ 27s
                          </span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-1">
                          {/* Acidity */}
                          <div className="flex flex-col gap-1.5">
                            <div className="flex justify-between text-xs">
                              <span className="text-[#1c1c19]">Acidity</span>
                              <span className="text-[#97472e] font-bold">Low (3/10)</span>
                            </div>
                            <div className="w-full h-1.5 rounded-full bg-[#ebe8e3] overflow-hidden">
                              <div className="h-full bg-[#97472e] rounded-full" style={{ width: '30%' }}></div>
                            </div>
                          </div>
                          {/* Body */}
                          <div className="flex flex-col gap-1.5">
                            <div className="flex justify-between text-xs">
                              <span className="text-[#1c1c19]">Body</span>
                              <span className="text-[#97472e] font-bold">Silky (8/10)</span>
                            </div>
                            <div className="w-full h-1.5 rounded-full bg-[#ebe8e3] overflow-hidden">
                              <div className="h-full bg-[#97472e] rounded-full" style={{ width: '80%' }}></div>
                            </div>
                          </div>
                          {/* Sweetness */}
                          <div className="flex flex-col gap-1.5">
                            <div className="flex justify-between text-xs">
                              <span className="text-[#1c1c19]">Sweetness</span>
                              <span className="text-[#97472e] font-bold">Honeyed (9/10)</span>
                            </div>
                            <div className="w-full h-1.5 rounded-full bg-[#ebe8e3] overflow-hidden">
                              <div className="h-full bg-[#97472e] rounded-full" style={{ width: '90%' }}></div>
                            </div>
                          </div>
                          {/* Roast */}
                          <div className="flex flex-col gap-1.5">
                            <div className="flex justify-between text-xs">
                              <span className="text-[#1c1c19]">Roast</span>
                              <span className="text-[#97472e] font-bold">Medium-Light</span>
                            </div>
                            <div className="w-full h-1.5 rounded-full bg-[#ebe8e3] overflow-hidden">
                              <div className="h-full bg-[#97472e] rounded-full" style={{ width: '45%' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Pastry Pairing Suggestion */}
                      {bespokeCortado.pairing && (
                        <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#f6f3ee] border border-[#e5e2dd]/40">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 shadow-sm border border-[#e5e2dd]">
                              <img
                                className="w-full h-full object-cover"
                                alt={bespokeCortado.pairing.name}
                                src={bespokeCortado.pairing.image}
                              />
                            </div>
                            <div className="flex flex-col">
                              <div className="flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-[16px] text-[#97472e]">
                                  restaurant
                                </span>
                                <span className="text-[11px] text-[#97472e] uppercase font-bold tracking-wider">
                                  Ideal Harmonizer
                                </span>
                              </div>
                              <span className="text-sm font-bold text-[#140804]">
                                {bespokeCortado.pairing.name}
                              </span>
                              <span className="text-xs text-[#4f4541]">
                                {bespokeCortado.pairing.note}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={handleAddPairing}
                            className="px-3.5 py-1.5 rounded-full bg-[#e5e2dd] text-[#140804] text-xs font-bold hover:bg-[#ffdbd0] hover:text-[#3a0a00] transition-colors cursor-pointer shrink-0"
                          >
                            + Add Pair
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Conversational Prompt Bar */}
              <div className="pt-2 border-t border-[#f0ede9]">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleTunePrompt();
                  }}
                  className="relative flex items-center"
                >
                  <input
                    value={promptInput}
                    onChange={(e) => setPromptInput(e.target.value)}
                    className="w-full py-4 pl-5 pr-28 rounded-full bg-[#f6f3ee] text-[#140804] text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#97472e]/30 shadow-inner transition-all placeholder:text-[#817470]"
                    placeholder="Describe your mood, taste profile, or pairing cravings..."
                    type="text"
                  />
                  <button
                    type="submit"
                    disabled={isTuning}
                    className="absolute right-2 px-5 py-2.5 rounded-full bg-[#97472e] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm hover:opacity-95 transition-opacity cursor-pointer disabled:opacity-50"
                  >
                    <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
                    <span>{isTuning ? 'Tuning...' : 'Tune'}</span>
                  </button>
                </form>

                <div className="flex flex-wrap gap-2 mt-3 items-center">
                  <span className="text-xs text-[#817470]">Tasting shortcuts:</span>
                  {['Decaf Lavender Cloud', 'Anaerobic Gesha Pourover', 'Non-Dairy Cocoa Warmth'].map(
                    (shortcut) => (
                      <button
                        key={shortcut}
                        onClick={() => {
                          setPromptInput(shortcut);
                          handleTunePrompt(shortcut);
                        }}
                        className="px-3 py-1 rounded-full bg-[#f6f3ee] text-xs font-semibold text-[#1c1c19] hover:bg-[#ebe8e3] transition-colors cursor-pointer"
                      >
                        {shortcut}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (40%): Artisanal Curated Menu */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-white rounded-xl p-6 lg:p-7 shadow-sm border border-[#e5e2dd]/60 flex flex-col gap-6">
              <div className="flex items-center justify-between pb-2 border-b border-[#f0ede9]">
                <div>
                  <span className="text-[11px] font-bold text-[#97472e] uppercase tracking-widest block">
                    Handcrafted Offerings
                  </span>
                  <h3 className="font-['Playfair_Display'] text-2xl font-semibold text-[#140804]">
                    Curated Bar Menu
                  </h3>
                </div>
                <div className="flex items-center gap-1 text-[#4f4541] text-xs font-semibold">
                  <span className="material-symbols-outlined text-[16px] text-[#2d4d40]">check_circle</span>
                  <span>Barista Ready</span>
                </div>
              </div>

              {/* Category 1: Specialty Pourovers */}
              <div className="flex flex-col gap-3">
                <span className="text-[11px] font-bold uppercase text-[#97472e] tracking-wider">
                  01 // Specialty Pourovers
                </span>

                {pourovers.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl bg-[#f6f3ee] flex flex-col gap-3 transition-transform hover:-translate-y-0.5 shadow-sm border border-[#e5e2dd]/40"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-full bg-[#f0ede9] text-[#4f4541] text-[10px] font-semibold">
                            {item.origin}
                          </span>
                          <span className="text-xs text-[#817470]">{item.subtitle}</span>
                        </div>
                        <h4 className="text-base font-bold text-[#140804] mt-1">{item.name}</h4>
                        <p className="text-xs text-[#4f4541] mt-0.5">{item.description}</p>
                      </div>
                      <span className="text-sm font-bold text-[#140804]">${item.price.toFixed(2)}</span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-full bg-[#e5e2dd] text-[11px] font-semibold text-[#1c1c19]">
                          {item.brewMethod}
                        </span>
                      </div>
                      <button
                        onClick={() => addToCart(item, 'None', '0%')}
                        className="px-4 py-1.5 rounded-full bg-[#2d1e18] text-white text-xs font-bold hover:bg-[#140804] transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <span>Add</span>
                        <span className="material-symbols-outlined text-[16px]">add</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Category 2: Signatures with Gemini Recipe */}
              <div className="flex flex-col gap-3 pt-2">
                <span className="text-[11px] font-bold uppercase text-[#97472e] tracking-wider">
                  02 // Signatures &amp; AI Collaborations
                </span>

                {signatures.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl bg-[#f6f3ee] flex flex-col gap-3 transition-transform hover:-translate-y-0.5 shadow-sm border border-[#e5e2dd]/40"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded-full bg-[#ffdbd0] text-[#3a0a00] text-[10px] font-bold">
                            House Signature
                          </span>
                          <span className="text-xs text-[#97472e] font-semibold">Gemini Recipe</span>
                        </div>
                        <h4 className="text-base font-bold text-[#140804] mt-1">{item.name}</h4>
                        <p className="text-xs text-[#4f4541] mt-0.5">{item.description}</p>
                      </div>
                      <span className="text-sm font-bold text-[#140804]">${item.price.toFixed(2)}</span>
                    </div>

                    {/* Interactive Milk and Sweetness controls */}
                    <div className="flex flex-col gap-2 pt-1">
                      <div className="flex items-center justify-between text-xs text-[#4f4541]">
                        <span>Milk Selection:</span>
                        <div className="flex gap-1.5">
                          {(['Oat', 'Whole', 'Almond'] as const).map((milk) => (
                            <button
                              key={milk}
                              onClick={() => setSelectedMilk(milk)}
                              className={`px-2 py-0.5 rounded-md text-[11px] font-semibold cursor-pointer transition-colors ${
                                selectedMilk === milk
                                  ? 'bg-[#97472e] text-white'
                                  : 'bg-[#e5e2dd] text-[#1c1c19] hover:bg-[#dcdad5]'
                              }`}
                            >
                              {milk}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-[#4f4541]">
                        <span>Sweetness Level:</span>
                        <div className="flex gap-1.5">
                          {(['0%', '50%', '100%'] as const).map((sweet) => (
                            <button
                              key={sweet}
                              onClick={() => setSelectedSweetness(sweet)}
                              className={`px-2 py-0.5 rounded-md text-[11px] font-semibold cursor-pointer transition-colors ${
                                selectedSweetness === sweet
                                  ? 'bg-[#97472e] text-white'
                                  : 'bg-[#e5e2dd] text-[#1c1c19] hover:bg-[#dcdad5]'
                              }`}
                            >
                              {sweet}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end pt-1">
                      <button
                        onClick={() => addToCart(item, selectedMilk, selectedSweetness)}
                        className="px-4 py-1.5 rounded-full bg-[#2d1e18] text-white text-xs font-bold hover:bg-[#140804] transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <span>Add to Order</span>
                        <span className="material-symbols-outlined text-[16px]">add</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Category 3: Artisanal Bites */}
              <div className="flex flex-col gap-3 pt-2">
                <span className="text-[11px] font-bold uppercase text-[#97472e] tracking-wider">
                  03 // Artisanal Bites &amp; Bakery
                </span>

                {bakery.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-[#f6f3ee] shadow-sm border border-[#e5e2dd]/40"
                  >
                    <div className="flex flex-col">
                      <h4 className="text-sm font-bold text-[#140804]">{item.name}</h4>
                      <span className="text-xs text-[#817470]">{item.subtitle}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-[#140804]">${item.price.toFixed(2)}</span>
                      <button
                        onClick={() => addToCart(item, 'None', '0%')}
                        className="w-8 h-8 rounded-full bg-[#e5e2dd] flex items-center justify-center text-[#140804] hover:bg-[#ffdbd0] hover:text-[#3a0a00] transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[18px]">add</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Shelf: Personalized Discovery Carousel */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-4 pb-12">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-[#97472e]">
                  cloudy_snowing
                </span>
                <span className="text-[11px] font-bold text-[#97472e] uppercase tracking-widest">
                  Gemini Contextual Forecast
                </span>
              </div>
              <h3 className="font-['Playfair_Display'] text-2xl font-semibold text-[#140804] mt-1">
                Based on Rainy Afternoon &amp; Your Sensory History
              </h3>
              <p className="text-sm text-[#4f4541]">
                Tuned for ambient temperature of 14°C and your preference for low-bitterness roast profiles.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCarouselIndex((prev) => (prev > 0 ? prev - 1 : 0))}
                className="w-10 h-10 rounded-full bg-[#f6f3ee] flex items-center justify-center text-[#140804] hover:bg-[#ebe8e3] transition-colors shadow-sm cursor-pointer"
                title="Previous Recommendations"
              >
                <span className="material-symbols-outlined text-[20px]">arrow_back</span>
              </button>
              <button
                onClick={() => setCarouselIndex((prev) => (prev < discoveryItems.length - 1 ? prev + 1 : prev))}
                className="w-10 h-10 rounded-full bg-[#f6f3ee] flex items-center justify-center text-[#140804] hover:bg-[#ebe8e3] transition-colors shadow-sm cursor-pointer"
                title="Next Recommendations"
              >
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Carousel Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {discoveryItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-[#e5e2dd]/60 flex flex-col group transition-all hover:shadow-md"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt={item.imageAlt || item.name}
                    src={item.image}
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur text-[#140804] text-xs font-bold shadow-sm flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px] text-[#97472e]">
                        spark
                      </span>
                      {item.matchScore}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#2d1e18] text-white text-xs font-bold">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-bold text-[#97472e]">{item.subtitle}</span>
                    <h4 className="text-lg font-bold text-[#140804]">{item.name}</h4>
                    <p className="text-sm text-[#4f4541] leading-relaxed">{item.description}</p>
                  </div>
                  <button
                    onClick={() => addToCart(item)}
                    className="w-full py-2.5 rounded-full bg-[#f6f3ee] hover:bg-[#ffdbd0] hover:text-[#3a0a00] text-[#140804] text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
                    <span>Express Order</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Floating Cart Dock */}
      {cart.length > 0 && (
        <div className="fixed bottom-6 right-6 z-40">
          <div className="bg-[#2d1e18] text-white px-5 py-3.5 rounded-full shadow-2xl flex items-center gap-4 transition-transform hover:scale-105 border border-[#817470]/30">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffdbd0] animate-pulse"></span>
              <span className="text-xs font-semibold">
                Current Selection: {cart.reduce((a, b) => a + b.quantity, 0)} {cart.length === 1 ? 'item' : 'items'}
              </span>
            </div>
            <span className="text-xs text-[#9b847b]">•</span>
            <span className="text-base font-bold text-[#ffdbd0]">${cartTotal.toFixed(2)}</span>
            <button
              onClick={() => setIsCheckoutOpen(true)}
              className="ml-2 px-4 py-1.5 rounded-full bg-[#97472e] text-white text-xs font-bold shadow-sm hover:opacity-90 transition-opacity cursor-pointer"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
