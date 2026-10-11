import React, { useState, useEffect } from 'react';
import { useCafe } from '../context/CafeContext';

export const LiveVisitScreen: React.FC = () => {
  const {
    activeOrder,
    flavorFeedback,
    flavorFeedbackMessage,
    submitFlavorFeedback,
    dismissFlavorFeedback,
    tableServiceMessage,
    sendTableServiceRequest,
    isPlayingAudio,
    toggleAudio,
    setIsArticleOpen,
    showToast,
  } = useCafe();

  // Dynamic countdown timer
  const [countdownSeconds, setCountdownSeconds] = useState(160);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdownSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (totalSecs: number) => {
    if (totalSecs <= 0) return 'Ready at Pick-up Counter!';
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `Estimated ready in ${mins} min ${secs < 10 ? '0' : ''}${secs} sec`;
  };

  const [copiedWifi, setCopiedWifi] = useState(false);
  const handleCopyWifi = () => {
    navigator.clipboard.writeText('artisan-pour-98').then(() => {
      setCopiedWifi(true);
      showToast('Wi-Fi password "artisan-pour-98" copied to clipboard', 'success');
      setTimeout(() => setCopiedWifi(false), 2500);
    }).catch(() => {
      setCopiedWifi(true);
      setTimeout(() => setCopiedWifi(false), 2500);
    });
  };

  return (
    <div className="w-full pb-20">
      {/* Top Sensory Atmosphere Bar */}
      <div className="relative w-full bg-[#f6f3ee] px-4 sm:px-6 lg:px-12 py-6 overflow-hidden border-b border-[#e5e2dd]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#ffdbd0] flex items-center justify-center text-[#3a0a00] shadow-sm shrink-0">
              <span className="material-symbols-outlined text-[24px]">coffee_maker</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-[#97472e] uppercase tracking-widest">
                  Order Telemetry • Mission St. Roastery
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#c6ebd9] text-[#002116] text-[11px] font-bold animate-pulse">
                  Live Extraction
                </span>
              </div>
              <h1 className="font-['Playfair_Display'] text-2xl font-semibold text-[#140804]">
                Table 14 • Ambient Companion
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex flex-col items-start md:items-end">
              <span className="text-xs text-[#817470]">Live Atmosphere</span>
              <span className="text-sm font-bold text-[#140804] flex items-center gap-1.5">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#abcebe]"></span>
                Warm Lofi &amp; Gentle Steam • 71°F
              </span>
            </div>
            <button
              onClick={toggleAudio}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold shadow-sm transition-all cursor-pointer ${
                isPlayingAudio
                  ? 'bg-[#97472e] text-white'
                  : 'bg-white text-[#1c1c19] hover:bg-[#ebe8e3]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isPlayingAudio ? 'equalizer' : 'nest_audio'}
              </span>
              <span>Playing: "Sunlit Guji Morning" (Binaural 60Hz)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Primary Bento Workspace */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Real-Time Extraction Tracker & Sensory State (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Active Brew Telemetry Main Card */}
            <div className="relative rounded-xl bg-white p-6 sm:p-8 shadow-sm border border-[#e5e2dd]/60 overflow-hidden">
              <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#ffdbd0]/30 blur-3xl pointer-events-none"></div>

              {/* Card Header & Badge */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#f0ede9]">
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#97472e]">
                    Active Batch
                  </span>
                  <span className="text-2xl font-bold text-[#140804] tracking-tight">
                    Order {activeOrder.orderNumber}
                  </span>
                </div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2d1e18] text-white text-xs font-bold shadow-sm">
                  <span className="material-symbols-outlined text-[16px] text-[#ffdbd0]">timer</span>
                  <span className="tracking-wide">{formatCountdown(countdownSeconds)}</span>
                </div>
              </div>

              {/* Order Summary Pill Item */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-[#f6f3ee] my-6 border border-[#e5e2dd]/40">
                <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 shadow-sm border border-[#e5e2dd]">
                  <img
                    className="w-full h-full object-cover"
                    alt="Cardamom Honey Oat Cortado"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDfw7zmNVhjbDvmJEfp0mCIwLCet0GkxLk5wpvSyf6P2CTLoej7JIaC3jOauMfcGHMNH0rECZRqGE4l9ZFseO5F24CcA8zTS7DhMCPGwMQ0Ug_NRqfiOOqir84Yx0r8zlcXcudg063F4DWTOcZgWLcezwiO-pN14KWXIZ_je7nHC0GL-P5wjHfpSUWwPvQxYqUwxcmpc5hXehwtrDgHhRUrAeeQZ0ul0LdiUx-Ujj3Dli9uvRBaO_aoQ"
                  />
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-base font-bold text-[#140804] truncate">
                    {activeOrder.itemsSummary.split('+')[0] || 'Cardamom Honey Oat Cortado'}
                  </span>
                  <span className="text-xs text-[#4f4541] truncate">
                    {activeOrder.itemsSummary.includes('+')
                      ? `+ ${activeOrder.itemsSummary.split('+')[1]}`
                      : '+ Fresh Pistachio Rolled Croissant (Warmed)'}
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-bold text-[#97472e] bg-white px-2 py-0.5 rounded shadow-2xs">
                      Ethiopia Guji Uraga
                    </span>
                    <span className="text-[11px] text-[#817470]">Double Ristretto</span>
                  </div>
                </div>
              </div>

              {/* Milestone Brewing Stepper */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-['Playfair_Display'] text-xl font-semibold text-[#140804]">
                    Brew Progression
                  </h2>
                  <span className="text-xs text-[#97472e] font-semibold">Milestone 3 of 4</span>
                </div>

                <div className="relative flex flex-col gap-6 pl-3">
                  {/* Connecting Line */}
                  <div className="absolute left-[23px] top-4 bottom-4 w-0.5 bg-[#ebe8e3] -z-0"></div>

                  {/* Step 1: Beans Ground */}
                  <div className="relative flex items-start gap-4">
                    <div className="w-7 h-7 rounded-full bg-[#2d1e18] text-white flex items-center justify-center shrink-0 z-10 shadow-sm ring-4 ring-white">
                      <span className="material-symbols-outlined text-[16px] text-[#ffdbd0]">check</span>
                    </div>
                    <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-1">
                      <div>
                        <h3 className="text-sm font-bold text-[#140804]">1. Beans Ground</h3>
                        <p className="text-xs text-[#4f4541]">
                          Single-Origin Guji Uraga • 18.5g dose, Mahlkönig EK43 @ 2.4 setting
                        </p>
                      </div>
                      <span className="text-[11px] text-[#817470]">Completed 11:04 AM</span>
                    </div>
                  </div>

                  {/* Step 2: Espresso Pulled */}
                  <div className="relative flex items-start gap-4">
                    <div className="w-7 h-7 rounded-full bg-[#2d1e18] text-white flex items-center justify-center shrink-0 z-10 shadow-sm ring-4 ring-white">
                      <span className="material-symbols-outlined text-[16px] text-[#ffdbd0]">check</span>
                    </div>
                    <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-1">
                      <div>
                        <h3 className="text-sm font-bold text-[#140804]">2. Espresso Pulled</h3>
                        <p className="text-xs text-[#4f4541]">
                          28s extraction • 9.0 bar pre-infusion • 38g yield • 21.4% TDS
                        </p>
                      </div>
                      <span className="text-[11px] text-[#817470]">Completed 11:05 AM</span>
                    </div>
                  </div>

                  {/* Step 3: ACTIVE - Steaming Oat Milk & Spicing */}
                  <div className="relative flex items-start gap-4">
                    <div className="w-7 h-7 rounded-full bg-[#97472e] text-white flex items-center justify-center shrink-0 z-10 shadow-md ring-4 ring-[#ffdbd0]/60 animate-bounce">
                      <span className="material-symbols-outlined text-[16px]">waves</span>
                    </div>
                    <div className="flex-1 p-4 rounded-xl bg-[#f6f3ee] shadow-sm border border-[#e5e2dd]/40">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-[#140804]">
                            3. Steaming Oat Milk &amp; Infusing Spice
                          </h3>
                          <span className="px-2 py-0.5 rounded-full bg-[#ffdbd0] text-[#3a0a00] text-[10px] font-bold uppercase">
                            Active Now
                          </span>
                        </div>
                        <span className="text-xs text-[#97472e] font-semibold">In progress (~60s)</span>
                      </div>
                      <p className="text-xs text-[#4f4541] mt-1.5 leading-relaxed">
                        Micro-foaming Minor Figures oat milk to silky 62°C; hand-whipping wild orange blossom honey and fresh cracked green cardamom seeds into the crema.
                      </p>
                      <div className="mt-4 pt-2 flex items-center gap-4">
                        <div className="flex-1 bg-[#e5e2dd] rounded-full h-2 overflow-hidden">
                          <div className="bg-gradient-to-r from-[#97472e] to-[#fe997a] h-full rounded-full w-3/4 transition-all duration-500"></div>
                        </div>
                        <span className="text-xs text-[#97472e] font-bold">75%</span>
                      </div>
                    </div>
                  </div>

                  {/* Step 4: Ready at Pick-up Counter */}
                  <div className="relative flex items-start gap-4 opacity-60">
                    <div className="w-7 h-7 rounded-full bg-[#ebe8e3] text-[#817470] flex items-center justify-center shrink-0 z-10 ring-4 ring-white">
                      <span className="material-symbols-outlined text-[16px]">local_cafe</span>
                    </div>
                    <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-1 pt-0.5">
                      <div>
                        <h3 className="text-sm font-bold text-[#140804]">4. Ready at Pick-up Counter</h3>
                        <p className="text-xs text-[#4f4541]">Alexander will call order {activeOrder.orderNumber} or dispatch to Table 14</p>
                      </div>
                      <span className="text-[11px] text-[#817470]">Pending</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Barista Personal Touch Note */}
              <div className="mt-8 pt-6 border-t border-[#f0ede9] flex items-start gap-4 bg-[#f6f3ee]/70 p-4 rounded-xl">
                <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 shadow-sm border border-[#e5e2dd]">
                  <img
                    className="w-full h-full object-cover"
                    alt="Barista Alex S."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7krPS9ukLzxsgHN_zrMgY1OivtfbAUOSoOjn4x8Z7xumd0eBUARLaIwl8Oivt3J2LH3O0ekVusCdk5bKlJM5GLMn4n-cJnUQsuaH-KRU4CxvUM5mqHV26Z9q_ipS1-81kAthgrD-4A6LJZBLdnni1pCfPdD3QsPAii3eF8QUPFfHqIkdoTV1tY_9D4cL2vu_LNEoo6dDhgZyJ7EQfHZZol59m074XiHkNSYpR9Eqx4jPQNYFPjEN04Q"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#140804]">Alex S.</span>
                    <span className="text-xs text-[#817470]">• Lead Barista</span>
                  </div>
                  <p className="text-xs text-[#4f4541] italic mt-0.5 leading-relaxed">
                    "Handcrafting your cortado with a slightly ristretto pull to highlight the candied peach notes against the warm cardamom spice. Croissant is getting a quick warm in the deck oven now!"
                  </p>
                </div>
              </div>
            </div>

            {/* Micro-Sentiment & Flavor Tuner */}
            <div className="rounded-xl bg-white p-6 sm:p-8 shadow-sm border border-[#e5e2dd]/60">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#97472e] text-[20px]">tune</span>
                    <h2 className="font-['Playfair_Display'] text-xl font-semibold text-[#140804]">
                      Micro-Sentiment &amp; Flavor Tuner
                    </h2>
                  </div>
                  <p className="text-xs text-[#4f4541] mt-0.5">
                    Live extraction calibration • Real-time cup adjustments routed to Alex
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#ffdbd0] text-[#3a0a00] text-xs font-bold self-start sm:self-auto">
                  Cloud Sentiment Engine
                </span>
              </div>

              <p className="text-sm font-bold text-[#140804] mb-3">How is your cup hitting right now?</p>

              {/* Interactive Feedback Quick Chips */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
                {[
                  { key: 'perfect' as const, emoji: '⭐', label: 'Just Right', sub: 'Flawless balance' },
                  { key: 'sweet' as const, emoji: '🍯', label: 'A Bit Too Sweet', sub: 'Dial down honey' },
                  { key: 'temp' as const, emoji: '🔥', label: 'Could Be Hotter', sub: 'Steam +5°C' },
                  { key: 'punch' as const, emoji: '⚡', label: 'Need More Punch', sub: 'Extra espresso kick' },
                ].map((chip) => {
                  const isSelected = flavorFeedback === chip.key;
                  return (
                    <button
                      key={chip.key}
                      onClick={() => submitFlavorFeedback(chip.key)}
                      className={`flex flex-col items-center justify-center p-3.5 rounded-xl transition-all text-center cursor-pointer border ${
                        isSelected
                          ? 'bg-[#ffdbd0] border-[#97472e] text-[#3a0a00]'
                          : 'bg-[#f6f3ee] border-transparent hover:bg-[#ffdbd0]/40 text-[#140804]'
                      }`}
                    >
                      <span className="text-xl mb-1">{chip.emoji}</span>
                      <span className="text-xs font-bold leading-tight">{chip.label}</span>
                      <span className="text-[11px] text-[#817470] mt-0.5">{chip.sub}</span>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Barista Remediation Banner */}
              {flavorFeedbackMessage && (
                <div className="p-4 rounded-xl bg-[#ffdbd0] text-[#3a0a00] transition-all mb-6 flex items-center gap-3 border border-[#97472e]/20">
                  <span className="material-symbols-outlined text-[20px] text-[#97472e]">smart_toy</span>
                  <div className="flex-1">
                    <span className="text-xs font-bold block">{flavorFeedbackMessage.title}</span>
                    <span className="text-xs leading-relaxed">{flavorFeedbackMessage.desc}</span>
                  </div>
                  <button
                    onClick={dismissFlavorFeedback}
                    className="px-3 py-1 rounded-full bg-white text-[#140804] text-xs font-bold shadow-2xs hover:bg-[#f6f3ee] cursor-pointer"
                  >
                    Got it
                  </button>
                </div>
              )}

              {/* Sensor Metrics Visualization */}
              <div className="pt-4 border-t border-[#f0ede9] grid grid-cols-3 gap-4 text-center">
                <div className="p-3 rounded-lg bg-[#f6f3ee]">
                  <span className="text-[10px] font-bold text-[#817470] block uppercase tracking-wider">
                    Extraction Purity
                  </span>
                  <span className="text-lg font-bold text-[#140804] tabular-nums">98.4%</span>
                  <span className="text-[11px] text-[#97472e] block font-semibold">Optimal yield</span>
                </div>
                <div className="p-3 rounded-lg bg-[#f6f3ee]">
                  <span className="text-[10px] font-bold text-[#817470] block uppercase tracking-wider">
                    Cup Temperature
                  </span>
                  <span className="text-lg font-bold text-[#140804] tabular-nums">142°F</span>
                  <span className="text-[11px] text-[#4f4541] block">Oat milk peak</span>
                </div>
                <div className="p-3 rounded-lg bg-[#f6f3ee]">
                  <span className="text-[10px] font-bold text-[#817470] block uppercase tracking-wider">
                    Patron Memory
                  </span>
                  <span className="text-lg font-bold text-[#140804]">Synced</span>
                  <span className="text-[11px] text-[#97472e] block font-semibold">Auto-remember</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Table Comfort & Table Companion + Gemini Pairing (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Table Comfort & Quick Help Card */}
            <div className="rounded-xl bg-white p-6 sm:p-8 shadow-sm border border-[#e5e2dd]/60">
              <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#f0ede9]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#ffdbd0] text-[#3a0a00] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">room_service</span>
                  </div>
                  <div>
                    <h2 className="font-['Playfair_Display'] text-xl font-semibold text-[#140804]">
                      Table 14 Services
                    </h2>
                    <span className="text-xs text-[#817470]">Mission St. High Bar • Garden Corner</span>
                  </div>
                </div>
                <span className="w-3 h-3 rounded-full bg-[#c6ebd9] animate-pulse" title="Connected"></span>
              </div>

              {/* Wi-Fi Details Card with 1-Click Copy */}
              <div className="p-4 rounded-xl bg-[#f6f3ee] flex items-center justify-between gap-4 mb-6 border border-[#e5e2dd]/40">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="material-symbols-outlined text-[#97472e] text-[24px]">wifi</span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[#140804] truncate">CaféCompanion_5G</span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#c6ebd9] text-[#002116]">
                        220 Mbps
                      </span>
                    </div>
                    <span className="text-xs text-[#4f4541]">
                      Key: <code className="font-mono text-[#140804] font-bold">artisan-pour-98</code>
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleCopyWifi}
                  className="shrink-0 px-3.5 py-1.5 rounded-full bg-[#2d1e18] text-white hover:bg-[#140804] text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {copiedWifi ? 'check' : 'content_copy'}
                  </span>
                  <span>{copiedWifi ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>

              {/* Quick Table Service Action Dispatches */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#97472e] block mb-3">
                  Instant Table Requests
                </span>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { label: 'Water Carafe', icon: 'water_bottle', req: 'Fresh Water Carafe' },
                    { label: 'Extra Napkins', icon: 'dry_cleaning', req: 'Linen Napkins' },
                    { label: 'Hot Water', icon: 'local_drink', req: 'Extra Hot Water' },
                    { label: 'Ask Barista', icon: 'chat_bubble', req: 'Barista Consultation' },
                  ].map((service) => (
                    <button
                      key={service.label}
                      onClick={() => sendTableServiceRequest(service.req)}
                      className="flex items-center gap-2 p-3 rounded-lg bg-[#f6f3ee] hover:bg-[#ebe8e3] transition-all text-left cursor-pointer border border-[#e5e2dd]/30"
                    >
                      <span className="material-symbols-outlined text-[20px] text-[#97472e]">
                        {service.icon}
                      </span>
                      <span className="text-xs font-bold text-[#140804]">{service.label}</span>
                    </button>
                  ))}
                </div>

                {tableServiceMessage && (
                  <div className="mt-3 p-2.5 rounded-lg bg-[#c6ebd9] text-center text-xs font-bold text-[#002116] animate-fade-in">
                    {tableServiceMessage}
                  </div>
                )}
              </div>
            </div>

            {/* Gemini Ambient Reading & Listening Pairing Card */}
            <div className="relative rounded-xl bg-white p-6 sm:p-8 shadow-sm border border-[#e5e2dd]/60 overflow-hidden">
              <div className="absolute -bottom-16 -left-16 w-60 h-60 rounded-full bg-[#ffdbd0]/30 blur-2xl pointer-events-none"></div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#97472e] text-[22px]">auto_awesome</span>
                  <span className="font-['Playfair_Display'] text-xl font-semibold text-[#140804]">
                    Gemini Sensory Pairing
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#ffdbd0] text-[#3a0a00] text-[10px] font-bold">
                  Tuned to Guji Cortado
                </span>
              </div>

              <p className="text-xs text-[#4f4541] mb-6 leading-relaxed">
                Curated while you wait: hand-selected cultural deep dive and ambient soundscapes harmonized with the floral stone-fruit sweetness of your cup.
              </p>

              {/* Reading Recommendation Item */}
              <div className="p-4 rounded-xl bg-[#f6f3ee] mb-4 flex flex-col gap-3 border border-[#e5e2dd]/40">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-[#97472e] font-bold uppercase tracking-wider">
                    <span className="material-symbols-outlined text-[16px]">menu_book</span>
                    <span>25-Min Focus Read</span>
                  </div>
                  <span className="text-[#817470]">Archived in Lab Notes</span>
                </div>
                <h3 className="font-['Playfair_Display'] text-base font-bold text-[#140804]">
                  "The Geopolitics of Heirloom Varieties in the Guji Highlands"
                </h3>
                <p className="text-xs text-[#4f4541] line-clamp-2 leading-relaxed">
                  Explore how volcanic loam, multi-generational seed saving, and high-altitude micro-climates shaped modern Ethiopian specialty coffee culture over two centuries.
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-[#e5e2dd]/50">
                  <span className="text-[11px] text-[#817470] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-[#97472e]">bookmark</span>
                    Saved to Patron Tablet
                  </span>
                  <button
                    onClick={() => setIsArticleOpen(true)}
                    className="px-4 py-1.5 rounded-full bg-[#140804] text-white text-xs font-bold hover:bg-[#2d1e18] transition-all cursor-pointer"
                  >
                    Read Abstract
                  </button>
                </div>
              </div>

              {/* Lo-Fi Soundscape Item */}
              <div className="p-4 rounded-xl bg-[#f6f3ee] flex flex-col gap-3 border border-[#e5e2dd]/40">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-[#97472e] font-bold uppercase tracking-wider">
                    <span className="material-symbols-outlined text-[16px]">graphic_eq</span>
                    <span>Sonic Match: 68 BPM Acoustic Lo-Fi</span>
                  </div>
                  <span className="text-[#2d4d40] font-bold">Binaural Stem</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#2d1e18] text-white flex items-center justify-center shrink-0 shadow-sm">
                      <span className="material-symbols-outlined text-[24px] text-[#ffdbd0]">headphones</span>
                    </div>
                    <div>
                      <span className="text-sm font-bold text-[#140804] block">
                        Guji Rain &amp; Brass Strings
                      </span>
                      <span className="text-xs text-[#817470]">Curation by Café Companion Music Lab</span>
                    </div>
                  </div>
                  <button
                    onClick={toggleAudio}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-sm shrink-0 cursor-pointer ${
                      isPlayingAudio
                        ? 'bg-[#97472e] text-white'
                        : 'bg-[#ffdbd0] text-[#3a0a00] hover:bg-[#ffb59f]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {isPlayingAudio ? 'pause' : 'play_arrow'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Editorial In-Café Gallery Strip */}
        <div className="mt-12 pt-8 border-t border-[#e5e2dd]">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#97472e] block">
                The Roastery Floor
              </span>
              <h2 className="font-['Playfair_Display'] text-2xl font-semibold text-[#140804]">
                Live Moments at Mission St. Lab
              </h2>
            </div>
            <span className="text-xs text-[#817470] hidden sm:inline">Updated every 15 mins</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative h-64 rounded-xl overflow-hidden group shadow-sm border border-[#e5e2dd]">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                alt="Slow Pour Counter"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCw6GK7RZ3HvOSu49KuhAGi4xa5ZsXUYx3MpCai9IoyhQgfukeq7nWwJru2AVSi50fFIYLLgl46aFSX9jzUXR882qPhNrZYyMSFk05EE4NBRKHhkogdVtj0JrmJ9tGItccz_g_mBUqmin73muQX8EGTxzDsmzllsZdTsaB0F7KCp-zrSgf2u43NUh4mB5dOanmK7NelWJS4ZhnVpH5iho-jozJHfzNzs00B_ivtiHTw0zmGkPaC3K45sQ"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#140804]/80 via-transparent to-transparent flex items-end p-5">
                <span className="text-xs font-semibold text-white">
                  Bar 01 • Slow Pour Counter &amp; Single Geisha Bar
                </span>
              </div>
            </div>

            <div className="relative h-64 rounded-xl overflow-hidden group shadow-sm border border-[#e5e2dd]">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                alt="Roasting Room"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCi6wA3vfY8S-EWCCf5o49PZnfwIjdCu_YGxnqSq6o7mv0fFyv09qyUvW1kIiGLXx1qPWJ3VtDPqo_NeSl_oKfWZwgfKf39TqGiHoEAGX15f-WzHWSUfrOVXq9pMMMJcp-Rjdpz6wTYHDXhTWwb8q8DEZl3d3-_aMTRS6SvEY98fWh7Iy9U_fysJMGYGqJ1DHuePwf_uOWMH-zf_1ZEeVINoJ7oLarJzHWErxCeXrWh-RGfJwb2EwUOMQ"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#140804]/80 via-transparent to-transparent flex items-end p-5">
                <span className="text-xs font-semibold text-white">
                  Roastery • Small Batch Drum Roasting (Guji Lot 12)
                </span>
              </div>
            </div>

            <div className="relative h-64 rounded-xl overflow-hidden group shadow-sm border border-[#e5e2dd]">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                alt="Milk station"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNOOCSUGeVqbxbwveoDEmtrF0R0TlU1bUvEVvZLJ8d3h0ap-IPiTHBlrobNrlr0sQZdhYhGZHr3AYxg2oHPGdfD-Ugb8BXyIAGA94bghxdKkO4dn2OM8PVBM8N3COPYO5t2GuVXW3OX6mmb3Kg91FRQIxVXKBGdasjR68bwzynEjIwZpH33DXgnzNsrg9TUA6nb7XPU_xe6XCTzr-2nbpI4Vo8K8bluCfHbM-k5dPMio_IziZoUxMtQQ"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#140804]/80 via-transparent to-transparent flex items-end p-5">
                <span className="text-xs font-semibold text-white">
                  Milk Station • Oat &amp; Heritage Dairy Texturing
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
