import React, { useState, useRef, useEffect } from 'react';
import { useCafe, TabKey } from '../context/CafeContext';

export const Header: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    userProfile,
    setIsProfileOpen,
    setIsSettingsOpen,
    cart,
    setIsCheckoutOpen,
    presenceBroadcast,
  } = useCafe();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems: { key: TabKey; label: string }[] = [
    { key: 'smart-order', label: 'Smart Order & Vibe' },
    { key: 'common-ground', label: 'Common Ground' },
    { key: 'community-circles', label: 'Community Circles' },
    { key: 'live-visit', label: 'Live Visit & Brew' },
    { key: 'barista-command', label: 'Barista Command' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-[#fcf9f4]/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(45,30,24,0.05)] border-b border-[#e5e2dd]/60">
      <div className="h-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between gap-4">
        {/* Brand & Logo */}
        <div className="flex items-center gap-6 shrink-0">
          <button
            onClick={() => setActiveTab('smart-order')}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <img
              alt="The Café Companion Logo"
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLGzqClMnAdPtV0G3dLlW4AALkmZDDAv1D_qxmBXgWebP2OAW72zRflveSgbyn8BRbMWZheSS8Eh5KVt_TQ9vorFQWhYa0GT3O74Ugp-zyBAp8az73Z3V0sNV_sN8biaxMJ4cRoAA-d8zuO6a-8Qx1FDiGVxgYK50rg6Q2bwCmuESYPPwMgbCMJppgygTSjGAPOLCW8cpWId-IScqBwOA_0J4_sFER6e8e0tjG3oaYGJHUkMhQpcAFwQ"
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-['Playfair_Display'] text-[21px] font-semibold text-[#140804] tracking-tight">
                  The Café Companion
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ffdbd0] text-[#3a0a00] text-[11px] font-bold shadow-[0_0_0_1px_rgba(200,109,81,0.2)]">
                  <span className="material-symbols-outlined text-[12px] leading-none text-[#97472e]">
                    auto_awesome
                  </span>
                  Gemini 1.5 Pro
                </span>
              </div>
            </div>
          </button>

          {/* Navigation Pill Strip */}
          <nav className="hidden xl:flex items-center gap-1 p-1 rounded-full bg-[#f6f3ee]">
            {navItems.map((item) => {
              const isActive = activeTab === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => setActiveTab(item.key)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#2d1e18] text-white shadow-[0_2px_8px_-2px_rgba(45,30,24,0.12)]'
                      : 'text-[#4f4541] hover:text-[#1c1c19] hover:bg-[#ebe8e3]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Info Badges & User Profile Menu */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* Roastery Location */}
          <button
            onClick={() => setIsSettingsOpen(true)}
            title="Configure Roastery Lab & Preferences"
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f6f3ee] text-[#4f4541] hover:text-[#1c1c19] hover:bg-[#ebe8e3] text-xs font-semibold transition-colors"
          >
            <span className="material-symbols-outlined text-[16px] text-[#97472e]">storefront</span>
            <span>Roastery &amp; Lab • Mission St.</span>
          </button>

          {/* Room Vibe */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f6f3ee] text-[#4f4541] text-xs font-semibold">
            <span className="inline-block w-2 h-2 rounded-full bg-[#abcebe] animate-pulse"></span>
            <span>Room Vibe: Calm &amp; Focused • 48dB</span>
          </div>

          {/* Cart Icon trigger if items exist */}
          {cart.length > 0 && (
            <button
              onClick={() => setIsCheckoutOpen(true)}
              className="relative p-2 rounded-full bg-[#ffdbd0] text-[#3a0a00] hover:bg-[#ffb59f] transition-colors"
              title="View Current Order Cart"
            >
              <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#97472e] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {cart.reduce((a, b) => a + b.quantity, 0)}
              </span>
            </button>
          )}

          {/* Patron Avatar Dropdown */}
          <div className="relative pl-1" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2.5 p-1 rounded-full hover:bg-[#f6f3ee] transition-all cursor-pointer focus:outline-none"
            >
              <div className="relative flex items-center justify-center">
                <img
                  alt="Patron Profile"
                  className="w-9 h-9 rounded-full object-cover shadow-[0_0_0_2px_rgba(200,109,81,0.3)]"
                  src={userProfile.avatar}
                />
                <span
                  className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full shadow-[0_0_0_1.5px_#fcf9f4] ${
                    presenceBroadcast ? 'bg-[#c6ebd9]' : 'bg-[#dcdad5]'
                  }`}
                ></span>
              </div>
              <div className="hidden 2xl:flex flex-col text-left">
                <span className="text-xs font-bold text-[#1c1c19] leading-tight">
                  {userProfile.name.split(' ')[0]} (Patron)
                </span>
                <span className="text-[10px] text-[#2d4d40] font-semibold leading-none">
                  {presenceBroadcast ? userProfile.statusMessage : 'Incognito Mode'}
                </span>
              </div>
              <span className="material-symbols-outlined text-[16px] text-[#817470]">
                {menuOpen ? 'expand_less' : 'expand_more'}
              </span>
            </button>

            {/* Dropdown Menu */}
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-xl bg-white shadow-xl border border-[#e5e2dd] py-2 z-50 divide-y divide-[#f0ede9]">
                <div className="px-4 py-3">
                  <p className="text-xs font-semibold text-[#817470]">Signed in as</p>
                  <p className="text-sm font-bold text-[#140804] truncate">{userProfile.name}</p>
                  <p className="text-[11px] text-[#97472e] font-semibold mt-0.5">{userProfile.tier}</p>
                  <div className="mt-2 text-[11px] text-[#4f4541] flex items-center gap-1.5 bg-[#f6f3ee] px-2.5 py-1 rounded-md">
                    <span className="material-symbols-outlined text-[14px] text-[#97472e]">table_restaurant</span>
                    <span>{userProfile.currentTable}</span>
                  </div>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      setIsProfileOpen(true);
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-semibold text-[#1c1c19] hover:bg-[#f6f3ee] flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px] text-[#97472e]">person</span>
                    <span>Patron Sensory Profile</span>
                  </button>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      setIsSettingsOpen(true);
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-semibold text-[#1c1c19] hover:bg-[#f6f3ee] flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px] text-[#97472e]">tune</span>
                    <span>Applet Settings &amp; Dial-In</span>
                  </button>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      setActiveTab('live-visit');
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-semibold text-[#1c1c19] hover:bg-[#f6f3ee] flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px] text-[#97472e]">coffee_maker</span>
                    <span>Track Active Order (#42)</span>
                  </button>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      setActiveTab('barista-command');
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-semibold text-[#1c1c19] hover:bg-[#f6f3ee] flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px] text-[#97472e]">terminal</span>
                    <span>Barista Command Console</span>
                  </button>
                </div>

                <div className="px-4 py-2 text-[11px] text-[#817470]">
                  <span>Single Origin AI Lab • Mission St.</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="xl:hidden flex items-center justify-around px-4 py-2 bg-[#f6f3ee] border-t border-[#e5e2dd] overflow-x-auto">
        {navItems.map((item) => {
          const isActive = activeTab === item.key;
          return (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                isActive ? 'bg-[#2d1e18] text-white shadow-sm' : 'text-[#4f4541] hover:text-[#1c1c19]'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
