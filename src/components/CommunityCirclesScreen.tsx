import React, { useState } from 'react';
import { useCafe } from '../context/CafeContext';
import { CommunityCircle } from '../types';

export const CommunityCirclesScreen: React.FC = () => {
  const {
    communityCircles,
    interestTags,
    isQrModalOpen,
    setIsQrModalOpen,
    activeQrCircle,
    openCircleQrModal,
    ephemeralHandle,
    regenerateEphemeralHandle,
    joinCircle,
    proposeAdHocCircle,
    showToast,
  } = useCafe();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isAdHocOpen, setIsAdHocOpen] = useState(false);
  const [adHocTopic, setAdHocTopic] = useState('');
  const [adHocLocation, setAdHocLocation] = useState('My Location: Front Bar Stools');

  const filteredCircles = communityCircles.filter((circle) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'ai') return circle.category === 'ai';
    if (activeCategory === 'books') return circle.category === 'books';
    if (activeCategory === 'startups') return circle.category === 'startups';
    if (activeCategory === 'film') return circle.category === 'film';
    if (activeCategory === 'games') return circle.category === 'games';
    return true;
  });

  const handleCreateAdHoc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adHocTopic.trim()) return;
    proposeAdHocCircle(adHocTopic, adHocLocation);
    setAdHocTopic('');
    setIsAdHocOpen(false);
  };

  const handleInterestClick = (tag: string) => {
    showToast(`Filtering in-room patrons interested in "${tag}"`, 'info');
  };

  return (
    <div className="w-full pb-24">
      {/* Top Banner / Editorial Hero (Privacy & Ambient Connection) */}
      <section className="relative px-4 sm:px-6 lg:px-12 py-12 bg-gradient-to-b from-[#f6f3ee] to-[#fcf9f4] overflow-hidden border-b border-[#e5e2dd]">
        {/* Atmospheric Ambient Glow Blobs */}
        <div className="absolute -top-24 right-10 w-96 h-96 bg-[#ffdbd0]/30 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 -left-20 w-80 h-80 bg-[#c6ebd9]/40 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ebe8e3] text-[#97472e] mb-4 shadow-sm text-xs font-bold">
                <span className="material-symbols-outlined text-[16px]">shield_person</span>
                <span className="uppercase tracking-wider">Zero-Knowledge In-Café Social Layer</span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#97472e]"></span>
                <span className="text-[#4f4541]">BLE &amp; Local Mesh Active</span>
              </div>
              <h1 className="font-['Playfair_Display'] text-4xl sm:text-5xl lg:text-6xl font-bold text-[#140804] tracking-tight leading-none mb-3">
                Turn Coffee Into Connection.
              </h1>
              <p className="font-['Playfair_Display'] text-xl sm:text-2xl text-[#97472e] font-normal italic mb-3">
                Zero contact shared, 100% opt-in.
              </p>
              <p className="text-sm sm:text-base text-[#4f4541] max-w-2xl leading-relaxed">
                Join spontaneous craft workshops, deep reading circles, and peer sprint tables entirely on your own terms. Your real identity stays locked—check in with zero-knowledge, 4-hour cryptographic pseudonym tokens.
              </p>
            </div>

            {/* Mini Room Status Capsule */}
            <div className="shrink-0 flex items-center gap-4 p-4 rounded-2xl bg-white shadow-md border border-[#e5e2dd]">
              <div className="w-12 h-12 rounded-full bg-[#04271c] flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-[24px]">groups</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-[#140804]">29 Patrons</span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#c6ebd9] text-[#002116] text-[10px] font-bold">
                    In Room Now
                  </span>
                </div>
                <p className="text-xs text-[#4f4541]">4 Active Table Circles • 0 Data Retained</p>
              </div>
            </div>
          </div>

          {/* Quick Category Filter Cluster */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {[
              { id: 'all', label: `All Circles (${communityCircles.length})` },
              { id: 'ai', label: 'AI & Machine Learning' },
              { id: 'books', label: 'Books & Deep Reading' },
              { id: 'startups', label: 'Startups & Venture' },
              { id: 'film', label: 'Film & Analog 35mm' },
              { id: 'games', label: 'Analog & Board Games' },
            ].map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#2d1e18] text-white shadow-sm'
                      : 'bg-[#ebe8e3] text-[#4f4541] hover:text-[#140804] hover:bg-[#e5e2dd]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content Layout (8 + 4 Desktop Split) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Featured Circles & Match Radar (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col gap-10">
            {/* Live & Upcoming Gatherings Header */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#97472e] block">
                  Physical Gathering Matrix
                </span>
                <h2 className="font-['Playfair_Display'] text-2xl sm:text-3xl font-semibold text-[#140804] tracking-tight">
                  Today’s In-House Circles
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#97472e] animate-ping"></span>
                <span className="text-xs text-[#817470]">Table Beacons Synced</span>
              </div>
            </div>

            {/* Gatherings Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCircles.map((circle) => (
                <article
                  key={circle.id}
                  className="relative flex flex-col justify-between p-6 rounded-2xl bg-white shadow-sm border border-[#e5e2dd]/60 hover:shadow-md transition-all duration-300 group"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#ffdbd0]/20 rounded-bl-full pointer-events-none"></div>

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffdbd0] text-[#3a0a00] text-xs font-bold">
                        <span className="material-symbols-outlined text-[14px]">{circle.timeIcon}</span>
                        {circle.timeLabel}
                      </span>
                      <span
                        className="text-xs font-bold"
                        style={{ color: circle.spotsColor || '#97472e' }}
                      >
                        {circle.spotsLabel}
                      </span>
                    </div>

                    <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#140804] mb-2 group-hover:text-[#97472e] transition-colors">
                      {circle.title}
                    </h3>

                    <div className="flex items-center gap-2 text-xs text-[#4f4541] mb-4 flex-wrap">
                      <span className="material-symbols-outlined text-[16px] text-[#97472e]">
                        {circle.locationIcon}
                      </span>
                      <span>{circle.location}</span>
                      <span className="inline-block w-1 h-1 rounded-full bg-[#817470]"></span>
                      <span>Host: {circle.host}</span>
                    </div>

                    {circle.featuredText && (
                      <div className="p-3 rounded-lg bg-[#f6f3ee] mb-4 flex items-center gap-3 border border-[#e5e2dd]/40">
                        <span className="material-symbols-outlined text-[#97472e] text-[22px]">
                          auto_stories
                        </span>
                        <div>
                          <span className="text-[10px] uppercase text-[#97472e] font-bold block">
                            Featured Text
                          </span>
                          <span className="text-xs font-bold text-[#140804] italic">
                            {circle.featuredText}
                          </span>
                        </div>
                      </div>
                    )}

                    <p className="text-xs text-[#4f4541] mb-5 leading-relaxed line-clamp-3">
                      {circle.description}
                    </p>

                    {/* Progress visualization if sprint */}
                    {circle.isSprint && (
                      <div className="bg-[#f6f3ee] p-3 rounded-xl mb-4 border border-[#e5e2dd]/40">
                        <div className="flex justify-between items-center mb-1.5 text-xs">
                          <span className="text-[#4f4541]">Current Block #3</span>
                          <span className="text-[#97472e] font-bold">{circle.sprintRemaining}</span>
                        </div>
                        <div className="w-full bg-[#ebe8e3] h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-[#97472e] h-full rounded-full transition-all duration-500"
                            style={{ width: `${circle.sprintPercent || 56}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {/* Tag Cluster */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {circle.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-md bg-[#f6f3ee] text-[#4f4541] text-[11px] font-semibold border border-[#e5e2dd]/40"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom Bar */}
                  {circle.id === 'circle-1' ? (
                    <div className="pt-3 bg-[#f6f3ee] rounded-xl p-3 flex items-center justify-between border border-[#e5e2dd]/40">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#97472e] text-[20px]">
                          qr_code_2
                        </span>
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-[#140804] leading-tight">
                            Ephemeral Tap-In
                          </span>
                          <span className="text-[11px] text-[#817470]">
                            Pass: {circle.ephemeralPass || ephemeralHandle}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => openCircleQrModal(circle)}
                        className="px-4 py-2 rounded-full bg-[#2d1e18] text-white text-xs font-bold hover:bg-[#140804] transition-all flex items-center gap-1 shadow-sm cursor-pointer"
                      >
                        <span>View RSVP QR</span>
                        <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                      </button>
                    </div>
                  ) : circle.isSprint ? (
                    <div className="pt-2 flex items-center justify-between border-t border-[#f0ede9]">
                      <span className="text-xs text-[#97472e] font-semibold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">headphones</span>
                        Silent Channel Synced
                      </span>
                      <button
                        onClick={() => {
                          showToast('Pomodoro 50/10 focus timer synced with table audio', 'gemini');
                        }}
                        className="px-4 py-2 rounded-full bg-[#2d1e18] text-white text-xs font-bold hover:bg-[#140804] transition-all cursor-pointer"
                      >
                        Sync My Timer
                      </button>
                    </div>
                  ) : (
                    <div className="pt-2 flex items-center justify-between border-t border-[#f0ede9]">
                      <span className="text-xs text-[#817470]">Low-audible zone (42dB)</span>
                      <button
                        onClick={() => joinCircle(circle.id)}
                        className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1 shadow-sm cursor-pointer ${
                          circle.joined
                            ? 'bg-[#c6ebd9] text-[#002116]'
                            : 'bg-[#97472e] text-white hover:bg-[#772f18]'
                        }`}
                      >
                        <span>{circle.joined ? 'Joined ✓' : 'Join Anonymously'}</span>
                        <span className="material-symbols-outlined text-[14px]">
                          {circle.joined ? 'check' : 'lock_open'}
                        </span>
                      </button>
                    </div>
                  )}
                </article>
              ))}
            </div>

            {/* In-Café Kindred Spirits & Match Matrix */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#f6f3ee] shadow-sm border border-[#e5e2dd]/60 flex flex-col gap-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#97472e] block">
                    In-House Interest Radar
                  </span>
                  <h3 className="font-['Playfair_Display'] text-2xl font-semibold text-[#140804]">
                    Discover In-House Kindred Spirits
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4f4541] mt-1">
                    Anonymized tags shared by currently seated patrons via low-energy proximity beacons.
                  </p>
                </div>
                <button
                  onClick={() => setIsAdHocOpen(!isAdHocOpen)}
                  className="shrink-0 px-5 py-2.5 rounded-full bg-[#97472e] text-white hover:bg-[#772f18] text-xs font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">cell_tower</span>
                  <span>Spark an Ad-Hoc Table Circle</span>
                </button>
              </div>

              {/* Interest Cloud Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {interestTags.map((tag) => (
                  <div
                    key={tag.id}
                    onClick={() => handleInterestClick(tag.label)}
                    className="p-4 rounded-xl bg-white shadow-sm border border-[#e5e2dd]/40 flex flex-col justify-between hover:bg-[#ffdbd0]/20 transition-colors cursor-pointer group"
                  >
                    <span className="text-sm font-bold text-[#140804] group-hover:text-[#97472e] transition-colors">
                      {tag.label}
                    </span>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-[#97472e] font-bold">{tag.count} in room</span>
                      <span className="material-symbols-outlined text-[#97472e] text-[16px]">
                        touch_app
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Expandable Propose Ad-Hoc Panel */}
              {isAdHocOpen && (
                <form
                  onSubmit={handleCreateAdHoc}
                  className="p-6 rounded-xl bg-white shadow-md border border-[#e5e2dd] transition-all space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#97472e]">wifi_tethering</span>
                      <h4 className="text-base font-bold text-[#140804]">
                        Propose an Instant 30-Min Coffee Chat
                      </h4>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsAdHocOpen(false)}
                      className="text-[#817470] hover:text-[#140804] cursor-pointer"
                    >
                      <span className="material-symbols-outlined">close</span>
                    </button>
                  </div>
                  <p className="text-xs text-[#4f4541]">
                    Broadcasts a gentle beacon to other patrons opt-in screens. Automatically dissolves after 30 minutes.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <input
                      type="text"
                      value={adHocTopic}
                      onChange={(e) => setAdHocTopic(e.target.value)}
                      className="px-4 py-2.5 rounded-lg bg-[#f6f3ee] text-[#140804] text-xs placeholder:text-[#817470] outline-none focus:bg-white focus:ring-1 focus:ring-[#97472e]"
                      placeholder="Topic (e.g. Sourdough Microbiology)"
                    />
                    <select
                      value={adHocLocation}
                      onChange={(e) => setAdHocLocation(e.target.value)}
                      className="px-4 py-2.5 rounded-lg bg-[#f6f3ee] text-[#140804] text-xs outline-none"
                    >
                      <option>My Location: Front Bar Stools</option>
                      <option>My Location: Communal High Table 1</option>
                      <option>My Location: Sunlit Window Counter</option>
                      <option>My Location: Outdoor Courtyard</option>
                    </select>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-lg bg-[#2d1e18] text-white text-xs font-bold hover:bg-[#140804] transition-all cursor-pointer"
                    >
                      Emit Local Beacon
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Cryptographic Privacy Badge Spotlight (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Physical Ephemeral Digital Pass Card */}
            <div className="p-6 rounded-2xl bg-white shadow-lg border border-[#e5e2dd]/60 relative overflow-hidden flex flex-col">
              <div className="absolute -right-8 -top-8 w-40 h-40 bg-[#ffdbd0]/25 rounded-full blur-2xl pointer-events-none"></div>

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#97472e] text-[22px]">fingerprint</span>
                  <span className="text-[11px] uppercase tracking-wider text-[#97472e] font-bold">
                    Privacy-Preserving Pass
                  </span>
                </div>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#c6ebd9] text-[#002116] text-[10px] font-bold">
                  Active
                </span>
              </div>

              {/* Graphic Pass Preview Container */}
              <div className="p-5 rounded-xl bg-gradient-to-br from-[#f6f3ee] to-[#f0ede9] border border-[#e5e2dd]/60 mb-6 relative">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-xs text-[#817470] block">Your Ephemeral Handle</span>
                    <span className="font-['Playfair_Display'] text-xl font-bold text-[#140804]">
                      {ephemeralHandle}
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-[#817470] text-[28px]">token</span>
                </div>

                {/* Stylized Micro QR Visual in Brand Primary */}
                <div className="flex items-center justify-center py-4 bg-white rounded-lg shadow-xs mb-4 border border-[#e5e2dd]/40">
                  <svg className="w-36 h-36" fill="currentColor" viewBox="0 0 120 120">
                    <rect fill="#140804" height="30" rx="4" width="30" x="10" y="10"></rect>
                    <rect fill="#ffffff" height="18" rx="2" width="18" x="16" y="16"></rect>
                    <rect fill="#140804" height="10" width="10" x="20" y="20"></rect>
                    <rect fill="#140804" height="30" rx="4" width="30" x="80" y="10"></rect>
                    <rect fill="#ffffff" height="18" rx="2" width="18" x="86" y="16"></rect>
                    <rect fill="#140804" height="10" width="10" x="90" y="20"></rect>
                    <rect fill="#140804" height="30" rx="4" width="30" x="10" y="80"></rect>
                    <rect fill="#ffffff" height="18" rx="2" width="18" x="16" y="86"></rect>
                    <rect fill="#140804" height="10" width="10" x="20" y="90"></rect>
                    {/* Data noise dots */}
                    <rect fill="#97472e" height="8" rx="1" width="8" x="50" y="12"></rect>
                    <rect fill="#140804" height="6" width="6" x="64" y="22"></rect>
                    <rect fill="#140804" height="6" width="12" x="48" y="32"></rect>
                    <rect fill="#140804" height="8" width="14" x="12" y="52"></rect>
                    <rect fill="#97472e" height="8" width="8" x="34" y="50"></rect>
                    <rect fill="#140804" height="20" rx="3" width="20" x="50" y="50"></rect>
                    <rect fill="#140804" height="8" width="10" x="80" y="52"></rect>
                    <rect fill="#97472e" height="12" width="14" x="96" y="50"></rect>
                    <rect fill="#140804" height="14" width="8" x="52" y="78"></rect>
                    <rect fill="#140804" height="6" width="18" x="70" y="82"></rect>
                    <rect fill="#97472e" height="14" width="10" x="68" y="96"></rect>
                    <rect fill="#140804" height="16" width="24" x="86" y="94"></rect>
                  </svg>
                </div>

                {/* Token Expiry Bar */}
                <div className="flex items-center justify-between text-xs text-[#817470]">
                  <span>Session Validity</span>
                  <span className="text-[#97472e] font-bold">03h 42m Remaining</span>
                </div>
                <div className="w-full bg-[#ebe8e3] h-1 rounded-full mt-1.5 overflow-hidden">
                  <div className="bg-[#97472e] h-full rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>

              {/* Explanation Copy */}
              <div className="space-y-2.5 mb-6 text-xs text-[#4f4541] leading-relaxed">
                <h4 className="font-bold text-[#140804] text-sm">How Zero-Contact Join Works</h4>
                <p>No phone numbers, email addresses, or social media handles are recorded or stored.</p>
                <p>
                  Tap this ephemeral QR code at any table tablet or show it to a circle host to confirm your seat. When you leave the café’s Wi-Fi / Bluetooth radius, all connection tokens quietly self-destruct.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={regenerateEphemeralHandle}
                  className="w-full py-2.5 rounded-full bg-[#2d1e18] text-white text-xs font-bold hover:bg-[#140804] transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">cached</span>
                  <span>Regenerate Anon Pass</span>
                </button>
                <button
                  onClick={() => {
                    showToast('Pass added to Google Wallet securely', 'gemini');
                  }}
                  className="w-full py-2.5 rounded-full bg-[#ebe8e3] text-[#140804] hover:bg-[#e5e2dd] text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">wallet</span>
                  <span>Add Pass to Google Wallet</span>
                </button>
              </div>
            </div>

            {/* Café Table Etiquette Card */}
            <div className="p-6 rounded-2xl bg-[#f6f3ee] border border-[#e5e2dd]/60 space-y-3">
              <div className="flex items-center gap-2 text-[#97472e]">
                <span className="material-symbols-outlined text-[20px]">coffee</span>
                <span className="text-[11px] uppercase font-bold tracking-wider">The Companion Ethos</span>
              </div>
              <h4 className="text-sm font-bold text-[#140804]">Artisanal Etiquette</h4>
              <ul className="space-y-2 text-xs text-[#4f4541] leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[#97472e] text-[16px] shrink-0 mt-0.5">
                    check_circle
                  </span>
                  <span>Always respect focused silent-sprint tables marked with the amber glow lamp.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[#97472e] text-[16px] shrink-0 mt-0.5">
                    check_circle
                  </span>
                  <span>Feel empowered to drop into open circles for 5 minutes or stay for the entire brew flight.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[#97472e] text-[16px] shrink-0 mt-0.5">
                    check_circle
                  </span>
                  <span>Coffee chats require zero personal contacts. Anonymity is celebrated here.</span>
                </li>
              </ul>
            </div>

            {/* Live Atmosphere Photo Card */}
            <div className="relative rounded-2xl overflow-hidden shadow-md group border border-[#e5e2dd]">
              <div
                className="w-full h-48 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDJ6yGHRcuBFpZzJmkt8LnVv82Sx4Hshn8cPudt-paHSZ8Rh1ggTyaD7PPu5qXam0eA0wEuXOxdJ6fUK7tBwLLX6RomOK36Y9iZaW0dbbhAP8cmMHRPB5lKhlT6S4BuHMdZhhkDBfKizC_f0g29whPFLAbZuFH8-kOA6hTMJM6k3MjwmDAQGtEajCNg_6kn-mdktFUW8DEKT51t_3aEzheu8PU5SlNyR4IJSXNMx5VbFzRKR_V8uYwYyA')`,
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#140804]/80 via-[#140804]/30 to-transparent flex flex-col justify-end p-5">
                <span className="text-[10px] text-[#c6ebd9] font-bold uppercase tracking-wider">
                  Current Atmosphere
                </span>
                <h4 className="font-['Playfair_Display'] text-lg font-bold text-white">
                  Roastery Main Floor
                </h4>
                <p className="text-xs text-[#e5e2dd] mt-0.5">Pouring: Geisha Natural, Finca Deborah</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ephemeral RSVP QR Modal Overlay */}
      {isQrModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#140804]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-2xl p-6 shadow-2xl relative border border-[#e5e2dd]">
            <button
              onClick={() => setIsQrModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#f6f3ee] flex items-center justify-center text-[#4f4541] hover:text-[#140804] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-[#97472e] text-[20px]">verified_user</span>
              <span className="text-[11px] uppercase tracking-wider text-[#97472e] font-bold">
                Zero-Knowledge RSVP
              </span>
            </div>
            <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#140804] mb-1">
              {activeQrCircle?.title || 'Autonomous Agents & LLM Builders'}
            </h3>
            <p className="text-xs text-[#4f4541] mb-6">
              {activeQrCircle?.location || 'Communal High Table 2'} • Today at 4:30 PM
            </p>

            {/* Verification QR SVG */}
            <div className="p-6 bg-[#f6f3ee] rounded-xl flex flex-col items-center justify-center mb-6 border border-[#e5e2dd]/40">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <svg className="w-48 h-48" fill="currentColor" viewBox="0 0 100 100">
                  <path d="M5,5 h26 v26 h-26 z M9,9 v18 h18 v-18 z M13,13 h10 v10 h-10 z" fill="#140804"></path>
                  <path d="M69,5 h26 v26 h-26 z M73,9 v18 h18 v-18 z M77,13 h10 v10 h-10 z" fill="#140804"></path>
                  <path d="M5,69 h26 v26 h-26 z M9,73 v18 h18 v-18 z M13,77 h10 v10 h-10 z" fill="#140804"></path>
                  <rect fill="#97472e" height="6" width="6" x="36" y="8"></rect>
                  <rect fill="#140804" height="12" width="6" x="48" y="8"></rect>
                  <rect fill="#140804" height="6" width="6" x="58" y="14"></rect>
                  <rect fill="#140804" height="6" width="18" x="36" y="24"></rect>
                  <rect fill="#97472e" height="12" width="6" x="42" y="34"></rect>
                  <rect fill="#140804" height="6" width="12" x="54" y="34"></rect>
                  <rect fill="#140804" height="18" width="6" x="70" y="34"></rect>
                  <rect fill="#97472e" height="6" width="12" x="82" y="40"></rect>
                  <rect fill="#140804" height="18" width="6" x="8" y="36"></rect>
                  <rect fill="#140804" height="6" width="12" x="20" y="42"></rect>
                  <rect fill="#97472e" height="6" width="6" x="14" y="54"></rect>
                  <rect fill="#140804" height="6" width="14" x="36" y="52"></rect>
                  <rect fill="#97472e" height="14" width="8" x="44" y="62"></rect>
                  <rect fill="#140804" height="6" width="18" x="56" y="58"></rect>
                  <rect fill="#140804" height="12" width="6" x="36" y="82"></rect>
                  <rect fill="#97472e" height="6" width="14" x="48" y="82"></rect>
                  <rect fill="#140804" height="16" width="8" x="66" y="78"></rect>
                  <rect fill="#140804" height="6" width="14" x="80" y="74"></rect>
                  <rect fill="#97472e" height="8" width="10" x="84" y="86"></rect>
                </svg>
              </div>
              <div className="mt-4 flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffdbd0] text-[#3a0a00] text-xs font-semibold">
                <span className="material-symbols-outlined text-[14px]">vpn_key</span>
                <span>Zero Personal Info Shared — Pseudonym Pass: Patron #42</span>
              </div>
            </div>

            <p className="text-xs text-[#4f4541] text-center mb-6 leading-relaxed">
              Flash this screen to Table Tablet #2 when you sit down. The host tablet will confirm your seat without storing any personal identifier.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  showToast('Seat verified and checked in at Table #2', 'success');
                  setIsQrModalOpen(false);
                }}
                className="w-full py-2.5 rounded-full bg-[#2d1e18] text-white text-xs font-bold hover:bg-[#140804] transition-all cursor-pointer"
              >
                Done &amp; Check In
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
