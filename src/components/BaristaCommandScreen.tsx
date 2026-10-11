import React, { useState } from 'react';
import { useCafe } from '../context/CafeContext';

export const BaristaCommandScreen: React.FC = () => {
  const {
    baristaQueue,
    completeBaristaOrder,
    holdBaristaOrder,
    isRushMode,
    toggleRushMode,
    pulseList,
    handlePulseAction,
    shiftMentorAcknowledged,
    acknowledgeShiftMentor,
    showToast,
  } = useCafe();

  const [channelFilter, setChannelFilter] = useState<'all' | 'pourover' | 'espresso' | 'bakery'>('all');
  const [backflushCount, setBackflushCount] = useState(42);

  const filteredOrders = baristaQueue.filter((order) => {
    if (channelFilter === 'all') return true;
    if (channelFilter === 'pourover') return order.channel === 'pourover';
    if (channelFilter === 'espresso') return order.channel === 'espresso' || order.channel === 'curbside';
    if (channelFilter === 'bakery') return order.channel === 'bakery';
    return true;
  });

  const handleBroadcastNote = () => {
    const note = prompt('Broadcast Barista Sensory Note to All In-House Tablets:', 'Fresh batch of Ethiopian Guji Gesha freshly pulled on Bar 01.');
    if (note) {
      showToast(`Sensory broadcast sent: "${note}"`, 'gemini');
    }
  };

  const handleLogRinse = () => {
    setBackflushCount(50);
    showToast('Grouphead backflush cycle completed and reset to 50 drinks', 'success');
  };

  return (
    <div className="w-full pb-24">
      <div className="max-w-[1440px] w-full mx-auto px-4 md:px-8 lg:px-12 py-8 space-y-8">
        {/* Header Console Bar */}
        <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-2">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffdbd0] text-[#3a0a00] text-[11px] font-bold shadow-sm">
                <span className="inline-block w-2 h-2 rounded-full bg-[#97472e] animate-ping"></span>
                LIVE BAR STATION 01
              </span>
              <span className="text-[11px] font-bold text-[#817470] uppercase tracking-wider">
                Mission St. Roastery &amp; Lab
              </span>
            </div>
            <h1 className="font-['Playfair_Display'] text-3xl sm:text-4xl font-semibold text-[#140804] tracking-tight">
              Barista Command &amp; Room Pulse
            </h1>
            <p className="text-sm text-[#4f4541] max-w-2xl leading-relaxed">
              Real-time acoustic comfort, predictive extraction balancing, and ambient sensor telemetry tuned by Gemini 1.5.
            </p>
          </div>

          <div className="flex items-center flex-wrap gap-3">
            <div className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-[#f6f3ee] shadow-sm border border-[#e5e2dd]">
              <span className="material-symbols-outlined text-[20px] text-[#97472e]">wifi_tethering</span>
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-[#817470] leading-none uppercase font-bold">
                  Sensor Sync
                </span>
                <span className="text-xs text-[#140804] leading-tight font-bold">12 Nodes Online</span>
              </div>
            </div>

            <button
              onClick={toggleRushMode}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all shadow-md group cursor-pointer ${
                isRushMode ? 'bg-[#97472e] text-white' : 'bg-[#2d1e18] text-white hover:bg-[#140804]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px] text-[#fe997a] group-hover:rotate-45 transition-transform">
                bolt
              </span>
              <span className="text-xs font-bold tracking-wide">
                Queue Rush Mode: {isRushMode ? 'ACTIVE' : 'Normal'}
              </span>
            </button>

            <button
              onClick={handleBroadcastNote}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#97472e] text-white hover:opacity-95 shadow-md text-xs font-bold cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">broadcast_on_home</span>
              <span>Broadcast Note</span>
            </button>
          </div>
        </section>

        {/* Main 2-Column Split */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column (8 cols): Atmosphere & Queue */}
          <div className="lg:col-span-8 space-y-6">
            {/* Acoustic & Biometric Atmosphere */}
            <div className="p-6 md:p-8 rounded-xl bg-white shadow-sm border border-[#e5e2dd]/60 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#f6f3ee] flex items-center justify-center text-[#97472e]">
                    <span className="material-symbols-outlined text-[22px]">graphic_eq</span>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-[#97472e] uppercase tracking-wider">
                      Acoustic &amp; Biometric Atmosphere
                    </span>
                    <h2 className="font-['Playfair_Display'] text-2xl font-semibold text-[#140804] tracking-tight">
                      Understand the Room
                    </h2>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#c6ebd9] text-[#002116] text-xs font-bold self-start sm:self-auto">
                  <span className="material-symbols-outlined text-[16px] text-[#04271c]">auto_awesome</span>
                  <span>Gemini Room Sentiment 94% Cozy</span>
                </div>
              </div>

              {/* 3 Atmosphere Gauges */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-[#f6f3ee] space-y-3 border border-[#e5e2dd]/40">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#4f4541]">Decibel Monitor</span>
                    <span className="material-symbols-outlined text-[18px] text-[#97472e]">volume_down</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-['Playfair_Display'] text-4xl font-bold text-[#140804] tabular-nums">
                      49
                    </span>
                    <span className="text-sm font-bold text-[#817470]">dB</span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="w-full bg-[#ebe8e3] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#97472e] h-full rounded-full" style={{ width: '48%' }}></div>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[#97472e] font-bold">Cozy Murmur</span>
                      <span className="text-[#817470]">Ideal for Focus</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#f6f3ee] space-y-3 border border-[#e5e2dd]/40">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#4f4541]">Thermal Comfort</span>
                    <span className="material-symbols-outlined text-[18px] text-[#97472e]">thermostat</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-['Playfair_Display'] text-4xl font-bold text-[#140804] tabular-nums">
                      70°
                    </span>
                    <span className="text-sm font-bold text-[#817470]">F / 21°C</span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="w-full bg-[#ebe8e3] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#6e9081] h-full rounded-full" style={{ width: '65%' }}></div>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[#2d4d40] font-bold">Balanced Airflow</span>
                      <span className="text-[#817470]">46% Humidity</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#f6f3ee] space-y-3 border border-[#e5e2dd]/40">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#4f4541]">Lighting Temp</span>
                    <span className="material-symbols-outlined text-[18px] text-[#97472e]">wb_sunny</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-['Playfair_Display'] text-4xl font-bold text-[#140804] tabular-nums">
                      2700
                    </span>
                    <span className="text-sm font-bold text-[#817470]">Kelvin</span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="w-full bg-[#ebe8e3] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#fe997a] h-full rounded-full" style={{ width: '82%' }}></div>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[#97472e] font-bold">Warm Sunset Glow</span>
                      <span className="text-[#817470]">Natural daylight blend</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Zone Seating Saturation */}
              <div className="p-5 rounded-xl bg-[#f6f3ee] space-y-3 border border-[#e5e2dd]/50">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#140804] uppercase tracking-wide">
                    Zone Seating Saturation
                  </span>
                  <span className="text-xs text-[#817470]">Capacity: 41 / 55 Patrons</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-lg bg-white shadow-sm border border-[#e5e2dd]/40 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-[#140804]">High-Tops</p>
                      <p className="text-xs font-bold text-[#97472e]">85% Full (17/20)</p>
                    </div>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#ffdbd0] text-[#3a0a00]">
                      <span className="material-symbols-outlined text-[20px]">laptop_mac</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-lg bg-white shadow-sm border border-[#e5e2dd]/40 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-[#140804]">Communal Bar</p>
                      <p className="text-xs font-bold text-[#2d4d40]">40% Full (10/25)</p>
                    </div>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#c6ebd9] text-[#002116]">
                      <span className="material-symbols-outlined text-[20px]">groups</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-lg bg-white shadow-sm border border-[#e5e2dd]/40 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-[#140804]">Patio Courtyard</p>
                      <p className="text-xs font-semibold text-[#817470]">20% Full (2/10)</p>
                    </div>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#ebe8e3] text-[#4f4541]">
                      <span className="material-symbols-outlined text-[20px]">deck</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dynamic Smart Queue & Order Stream */}
            <div className="p-6 md:p-8 rounded-xl bg-white shadow-sm border border-[#e5e2dd]/60 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-[#97472e] uppercase tracking-wider">
                      Dynamic Smart Queue
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#ffdbd0] text-[#3a0a00] text-[10px] font-bold">
                      {baristaQueue.length} Orders Active
                    </span>
                  </div>
                  <h2 className="font-['Playfair_Display'] text-2xl font-semibold text-[#140804] tracking-tight">
                    Extraction Balancing &amp; Order Stream
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#817470]">Target Wait:</span>
                  <span className="px-3 py-1 rounded-full bg-[#ebe8e3] text-[#140804] text-xs font-bold">
                    3.8 min max
                  </span>
                </div>
              </div>

              {/* Filter Channels */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {[
                  { key: 'all' as const, label: `All Channels (${baristaQueue.length})` },
                  { key: 'pourover' as const, label: 'Pourover Slow Bar' },
                  { key: 'espresso' as const, label: 'Espresso Lab' },
                  { key: 'bakery' as const, label: 'Artisan Bakery' },
                ].map((channel) => (
                  <button
                    key={channel.key}
                    onClick={() => setChannelFilter(channel.key)}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                      channelFilter === channel.key
                        ? 'bg-[#2d1e18] text-white shadow-sm'
                        : 'bg-[#f6f3ee] text-[#4f4541] hover:text-[#140804]'
                    }`}
                  >
                    {channel.label}
                  </button>
                ))}
              </div>

              {/* Orders List */}
              <div className="space-y-4">
                {filteredOrders.length === 0 ? (
                  <div className="p-8 text-center text-xs text-[#817470] bg-[#f6f3ee] rounded-xl">
                    No active orders in this channel filter.
                  </div>
                ) : (
                  filteredOrders.map((order) => (
                    <div
                      key={order.id}
                      className="p-5 rounded-xl bg-[#f6f3ee] hover:bg-[#f0ede9] transition-colors shadow-sm border border-[#e5e2dd]/40 space-y-4"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="px-2.5 py-1 rounded-full bg-[#140804] text-white text-xs font-bold">
                            {order.orderNumber}
                          </span>
                          <div>
                            <span className="text-base font-bold text-[#140804]">{order.patronName}</span>
                            <span className="ml-2 text-xs text-[#817470]">{order.location}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="px-3 py-1 rounded-full bg-[#ffdbd0] text-[#3a0a00] text-xs font-bold flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">timer</span>
                            {order.eta}
                          </span>
                          <span className="px-3 py-1 rounded-full bg-[#ebe8e3] text-[#140804] text-xs font-semibold capitalize">
                            {order.channel} Bar
                          </span>
                        </div>
                      </div>

                      {order.guestDelightProfile && (
                        <div className="p-3 rounded-lg bg-[#ffdbd0]/50 flex items-start gap-2.5 text-[#3a0a00] border border-[#97472e]/20">
                          <span className="material-symbols-outlined text-[18px] text-[#97472e] shrink-0 mt-0.5">
                            favorite
                          </span>
                          <p className="text-xs leading-relaxed">
                            <strong className="font-bold text-[#97472e]">Guest Delight Profile:</strong>{' '}
                            {order.guestDelightProfile}
                          </p>
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
                        <div className="space-y-0.5">
                          <p className="text-sm font-bold text-[#140804]">{order.itemsSummary}</p>
                          <p className="text-xs text-[#817470]">{order.details}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => holdBaristaOrder(order.id)}
                            className="px-4 py-2 rounded-full bg-[#ebe8e3] text-[#140804] text-xs font-bold hover:bg-[#dcdad5] transition-colors cursor-pointer"
                          >
                            Hold 1m
                          </button>
                          <button
                            onClick={() => completeBaristaOrder(order.id)}
                            className="px-4 py-2 rounded-full bg-[#97472e] text-white text-xs font-bold hover:opacity-95 transition-opacity shadow-sm cursor-pointer"
                          >
                            Complete &amp; Serve
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right Column (4 cols): Gemini Pulse Stream & Freshness */}
          <div className="lg:col-span-4 space-y-6">
            {/* Gemini Pulse Stream */}
            <div className="p-6 rounded-xl bg-white shadow-sm border border-[#e5e2dd]/60 space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px] text-[#97472e]">
                    sentiment_satisfied
                  </span>
                  <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#140804]">
                    Gemini Pulse Stream
                  </h3>
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#c6ebd9] text-[#002116] text-[10px] font-bold">
                  Live Feed
                </span>
              </div>

              <div className="space-y-3">
                {pulseList.map((item) => (
                  <div
                    key={item.id}
                    className={`p-4 rounded-xl space-y-2 border ${
                      item.type === 'micro-feedback'
                        ? 'bg-[#ffdbd0]/30 border-[#ffdbd0]'
                        : 'bg-[#f6f3ee] border-[#e5e2dd]/40'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#97472e]">{item.source}</span>
                      <span className="text-[#817470]">{item.timeAgo}</span>
                    </div>
                    <p className="text-xs text-[#1c1c19] leading-relaxed italic">{item.content}</p>

                    {item.sentimentBadge && (
                      <div className="pt-1">
                        <span className="px-2 py-0.5 rounded-full bg-white text-[#4f4541] text-[10px] font-semibold border border-[#e5e2dd]/50">
                          {item.sentimentBadge}
                        </span>
                      </div>
                    )}

                    {item.actionRequired && !item.applied && (
                      <button
                        onClick={() => handlePulseAction(item.id)}
                        className="w-full mt-2 flex items-center justify-center gap-1.5 py-2 rounded-full bg-[#97472e] text-white text-xs font-bold hover:opacity-95 transition-all shadow-sm cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">volume_down</span>
                        <span>{item.actionLabel}</span>
                      </button>
                    )}

                    {item.applied && (
                      <div className="pt-1 flex items-center gap-1 text-[#2d4d40] text-xs font-bold">
                        <span className="material-symbols-outlined text-[16px]">check_circle</span>
                        <span>Acoustic change calibrated (-3dB applied)</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Telemetry & Freshness */}
            <div className="p-6 rounded-xl bg-white shadow-sm border border-[#e5e2dd]/60 space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px] text-[#97472e]">tune</span>
                  <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#140804]">
                    Telemetry &amp; Freshness
                  </h3>
                </div>
                <span className="text-xs text-[#817470]">Calibrated 07:15 AM</span>
              </div>

              <div className="space-y-4">
                {/* Hopper 1 */}
                <div className="p-4 rounded-xl bg-[#f6f3ee] space-y-2 border border-[#e5e2dd]/40">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#140804]">Hopper 01 • House Blend</span>
                    <span className="text-xs text-[#97472e] font-bold">78% Full</span>
                  </div>
                  <div className="w-full bg-[#ebe8e3] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#97472e] h-full rounded-full" style={{ width: '78%' }}></div>
                  </div>
                  <div className="flex justify-between items-center text-[11px] text-[#817470]">
                    <span>Roast: 4 Days Off Roast</span>
                    <span className="text-[#2d4d40] font-bold">Peak Degassing</span>
                  </div>
                </div>

                {/* Hopper 2 */}
                <div className="p-4 rounded-xl bg-[#f6f3ee] space-y-2 border border-[#e5e2dd]/40">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#140804]">Hopper 02 • Single Origin Gesha</span>
                    <span className="text-xs text-[#97472e] font-bold">34% Low</span>
                  </div>
                  <div className="w-full bg-[#ebe8e3] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#fe997a] h-full rounded-full" style={{ width: '34%' }}></div>
                  </div>
                  <div className="flex justify-between items-center text-[11px] text-[#817470]">
                    <span>Roast: 7 Days Off Roast</span>
                    <span className="text-[#97472e] font-bold">Refill in ~14 Shots</span>
                  </div>
                </div>

                {/* Chiller & Flow Rate */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="p-3 rounded-xl bg-[#f6f3ee] space-y-1 border border-[#e5e2dd]/40">
                    <div className="flex items-center gap-1.5 text-[#817470]">
                      <span className="material-symbols-outlined text-[16px]">kitchen</span>
                      <span className="text-[10px] font-bold uppercase">Milk Chiller</span>
                    </div>
                    <p className="text-lg font-bold text-[#140804] tabular-nums">37.2°F</p>
                    <p className="text-[10px] text-[#2d4d40] font-semibold">Safe Zone (34-40°F)</p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#f6f3ee] space-y-1 border border-[#e5e2dd]/40">
                    <div className="flex items-center gap-1.5 text-[#817470]">
                      <span className="material-symbols-outlined text-[16px]">speed</span>
                      <span className="text-[10px] font-bold uppercase">Flow Rate</span>
                    </div>
                    <p className="text-lg font-bold text-[#140804] tabular-nums">2.1 ml/s</p>
                    <p className="text-[10px] text-[#2d4d40] font-semibold">Dialed at 9.0 Bar</p>
                  </div>
                </div>

                {/* Grouphead Backflush */}
                <div className="p-3.5 rounded-xl bg-[#f6f3ee] flex items-center justify-between border border-[#e5e2dd]/40">
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[20px] text-[#97472e]">sanitizer</span>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[#140804]">Grouphead Backflush</span>
                      <span className="text-[11px] text-[#817470]">Scheduled in {backflushCount} drinks</span>
                    </div>
                  </div>
                  <button
                    onClick={handleLogRinse}
                    className="px-3 py-1.5 rounded-full bg-white text-[#140804] text-xs font-bold hover:bg-[#ebe8e3] transition-colors shadow-sm cursor-pointer border border-[#e5e2dd]"
                  >
                    Log Rinse
                  </button>
                </div>
              </div>
            </div>

            {/* Barista Shift Mentor */}
            <div className="relative overflow-hidden rounded-xl bg-white shadow-sm border border-[#e5e2dd]/60 p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#f6f3ee] flex items-center justify-center text-[#97472e]">
                  <span className="material-symbols-outlined text-[20px]">psychology</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#140804]">Barista Shift Mentor</h4>
                  <p className="text-xs text-[#817470]">Gemini Contextual AI Note</p>
                </div>
              </div>
              <p className="text-xs text-[#4f4541] leading-relaxed">
                “Morning rush tapering off slightly. Afternoon remote-worker influx arriving in ~25 mins. Recommend prepping 4L fresh oat milk batch &amp; checking water filtration cartridge TDS.”
              </p>
              <div className="pt-2">
                <button
                  onClick={acknowledgeShiftMentor}
                  disabled={shiftMentorAcknowledged}
                  className={`w-full py-2.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                    shiftMentorAcknowledged
                      ? 'bg-[#c6ebd9] text-[#002116]'
                      : 'bg-[#2d1e18] text-white hover:bg-[#140804]'
                  }`}
                >
                  {shiftMentorAcknowledged ? '✓ Bar Station Acknowledged' : 'Acknowledge & Ready Bar'}
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
