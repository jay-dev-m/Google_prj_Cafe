import React, { useState } from 'react';
import { useCafe } from '../context/CafeContext';

export const SettingsModal: React.FC = () => {
  const {
    isSettingsOpen,
    setIsSettingsOpen,
    userProfile,
    updateUserProfile,
    presenceBroadcast,
    togglePresenceBroadcast,
    showToast,
  } = useCafe();

  const [selectedLocation, setSelectedLocation] = useState('Mission St. Roastery & Lab');
  const [milk, setMilk] = useState(userProfile.sensoryPreferences.defaultMilk);
  const [sweetness, setSweetness] = useState(userProfile.sensoryPreferences.defaultSweetness);
  const [curfew, setCurfew] = useState(userProfile.sensoryPreferences.caffeineCurfew);
  const [hapticFeedback, setHapticFeedback] = useState(true);

  if (!isSettingsOpen) return null;

  const handleSave = () => {
    updateUserProfile({
      sensoryPreferences: {
        ...userProfile.sensoryPreferences,
        defaultMilk: milk,
        defaultSweetness: sweetness,
        caffeineCurfew: curfew,
      },
    });
    showToast(`Settings saved for ${selectedLocation}`, 'success');
    setIsSettingsOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-[#e5e2dd] p-6 sm:p-8 space-y-6">
        <button
          onClick={() => setIsSettingsOpen(false)}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#f6f3ee] flex items-center justify-center text-[#140804] hover:bg-[#ebe8e3] transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        <div className="flex items-center gap-3 pb-4 border-b border-[#f0ede9]">
          <div className="w-10 h-10 rounded-full bg-[#ffdbd0] text-[#3a0a00] flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">tune</span>
          </div>
          <div>
            <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#140804]">
              Applet Settings &amp; Dial-In
            </h2>
            <p className="text-xs text-[#817470]">Configure roastery node, sensory preferences &amp; acoustics</p>
          </div>
        </div>

        {/* Roastery Node Selector */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-[#97472e] block">
            Active Roastery Location
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {[
              { id: 'Mission St. Roastery & Lab', city: 'San Francisco, CA', icon: 'local_cafe' },
              { id: 'Hayes Valley Pour Bar', city: 'San Francisco, CA', icon: 'coffee' },
              { id: 'Tokyo Roastery & Ginza Lab', city: 'Tokyo, Japan', icon: 'domain' },
            ].map((loc) => {
              const isSelected = selectedLocation === loc.id;
              return (
                <button
                  key={loc.id}
                  onClick={() => setSelectedLocation(loc.id)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#97472e] bg-[#ffdbd0]/30 text-[#140804]'
                      : 'border-[#e5e2dd] bg-[#f6f3ee] text-[#4f4541] hover:bg-[#ebe8e3]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px] text-[#97472e] block mb-1">
                    {loc.icon}
                  </span>
                  <span className="text-xs font-bold block leading-tight">{loc.id}</span>
                  <span className="text-[10px] text-[#817470] block mt-0.5">{loc.city}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sensory Defaults */}
        <div className="space-y-4 pt-2">
          <label className="text-xs font-bold uppercase tracking-wider text-[#97472e] block">
            Default Sensory Preset
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <span className="text-xs font-semibold text-[#140804]">Preferred Dairy Alternative</span>
              <select
                value={milk}
                onChange={(e) => setMilk(e.target.value as 'Oat' | 'Whole' | 'Almond')}
                className="w-full px-3 py-2 rounded-lg border border-[#e5e2dd] bg-[#f6f3ee] text-xs font-semibold text-[#140804] focus:outline-none"
              >
                <option value="Oat">Minor Figures Oat Milk</option>
                <option value="Whole">Straus Organic Whole Milk</option>
                <option value="Almond">House Almond Macadamia Milk</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-semibold text-[#140804]">Sweetness Calibration</span>
              <select
                value={sweetness}
                onChange={(e) => setSweetness(e.target.value as '0%' | '50%' | '100%')}
                className="w-full px-3 py-2 rounded-lg border border-[#e5e2dd] bg-[#f6f3ee] text-xs font-semibold text-[#140804] focus:outline-none"
              >
                <option value="0%">0% (Natural Terroir Only)</option>
                <option value="50%">50% (Subtle Honey/Date Reduction)</option>
                <option value="100%">100% (Standard Barista Recipe)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-semibold text-[#140804]">Evening Caffeine Curfew</span>
              <input
                type="text"
                value={curfew}
                onChange={(e) => setCurfew(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#e5e2dd] bg-[#f6f3ee] text-xs font-semibold text-[#140804] focus:outline-none"
                placeholder="4:30 PM"
              />
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-semibold text-[#140804]">Serving Temperature</span>
              <input
                type="text"
                readOnly
                value="142°F (Oat micro-foam peak)"
                className="w-full px-3 py-2 rounded-lg border border-[#e5e2dd] bg-[#ebe8e3] text-xs text-[#817470] cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* In-Café Privacy & Table Broadcasting */}
        <div className="space-y-3 pt-2">
          <label className="text-xs font-bold uppercase tracking-wider text-[#97472e] block">
            Table Presence &amp; Privacy
          </label>

          <div className="p-4 rounded-xl bg-[#f6f3ee] border border-[#e5e2dd]/60 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-[#140804]">Broadcast Presence on Arrival</p>
              <p className="text-[11px] text-[#817470]">
                Shows your avatar and reading interest on Common Ground
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={presenceBroadcast}
                onChange={togglePresenceBroadcast}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-[#ebe8e3] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-5 peer-checked:after:border-white peer-checked:bg-[#97472e] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all shadow-inner"></div>
            </label>
          </div>

          <div className="p-4 rounded-xl bg-[#f6f3ee] border border-[#e5e2dd]/60 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-[#140804]">Sensory Haptic Feedback</p>
              <p className="text-[11px] text-[#817470]">Vibrate device when espresso extraction reaches 28s</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={hapticFeedback}
                onChange={(e) => setHapticFeedback(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-[#ebe8e3] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-5 peer-checked:after:border-white peer-checked:bg-[#97472e] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all shadow-inner"></div>
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-[#f0ede9]">
          <button
            onClick={() => setIsSettingsOpen(false)}
            className="px-4 py-2 rounded-full bg-[#f6f3ee] text-[#140804] text-xs font-bold hover:bg-[#ebe8e3] transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-full bg-[#2d1e18] text-white text-xs font-bold hover:bg-[#140804] transition-colors cursor-pointer"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};
