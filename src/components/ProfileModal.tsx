import React, { useState } from 'react';
import { useCafe } from '../context/CafeContext';

export const ProfileModal: React.FC = () => {
  const {
    isProfileOpen,
    setIsProfileOpen,
    userProfile,
    updateUserProfile,
    showToast,
  } = useCafe();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(userProfile.name);
  const [statusMessage, setStatusMessage] = useState(userProfile.statusMessage);
  const [currentTable, setCurrentTable] = useState(userProfile.currentTable);

  if (!isProfileOpen) return null;

  const handleSave = () => {
    updateUserProfile({
      name,
      statusMessage,
      currentTable,
    });
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-[#e5e2dd] p-6 sm:p-8 space-y-6">
        {/* Close Button */}
        <button
          onClick={() => setIsProfileOpen(false)}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#f6f3ee] flex items-center justify-center text-[#140804] hover:bg-[#ebe8e3] transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-6 border-b border-[#f0ede9]">
          <div className="relative">
            <img
              alt={userProfile.name}
              className="w-20 h-20 rounded-full object-cover shadow-sm ring-4 ring-[#ffdbd0]"
              src={userProfile.avatar}
            />
            <span className="absolute bottom-0 right-0 w-4 h-4 bg-[#c6ebd9] border-2 border-white rounded-full"></span>
          </div>

          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="px-3 py-1.5 rounded-lg border border-[#e5e2dd] text-base font-bold text-[#140804] w-full"
                />
                <input
                  type="text"
                  value={statusMessage}
                  onChange={(e) => setStatusMessage(e.target.value)}
                  placeholder="Status (e.g. Available for Chat)"
                  className="px-3 py-1.5 rounded-lg border border-[#e5e2dd] text-xs text-[#4f4541] w-full"
                />
                <input
                  type="text"
                  value={currentTable}
                  onChange={(e) => setCurrentTable(e.target.value)}
                  placeholder="Table location"
                  className="px-3 py-1.5 rounded-lg border border-[#e5e2dd] text-xs text-[#4f4541] w-full"
                />
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#140804]">
                    {userProfile.name}
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#ffdbd0] text-[#3a0a00] text-[10px] font-bold">
                    Tier 3
                  </span>
                </div>
                <p className="text-xs text-[#817470] mt-0.5">{userProfile.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#f6f3ee] text-[#2d4d40] text-xs font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2d4d40]"></span>
                    {userProfile.statusMessage}
                  </span>
                  <span className="text-xs text-[#817470]">•</span>
                  <span className="text-xs text-[#97472e] font-semibold">{userProfile.currentTable}</span>
                </div>
              </div>
            )}
          </div>

          <div className="shrink-0">
            {isEditing ? (
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded-full bg-[#97472e] text-white text-xs font-bold hover:bg-[#772f18] transition-colors cursor-pointer"
              >
                Save Profile
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 rounded-full bg-[#f6f3ee] hover:bg-[#ebe8e3] text-[#140804] text-xs font-bold transition-colors cursor-pointer border border-[#e5e2dd]"
              >
                Edit Details
              </button>
            )}
          </div>
        </div>

        {/* Guild Rewards / Stamp Card */}
        <div className="p-4 rounded-xl bg-[#f6f3ee] border border-[#e5e2dd]/60 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-[#97472e]">local_activity</span>
              <span className="text-xs font-bold text-[#140804] uppercase tracking-wider">
                Artisanal Guild Stamp Card
              </span>
            </div>
            <span className="text-xs font-bold text-[#97472e]">
              {userProfile.stampsCount}/{userProfile.stampsTotal} Stamps
            </span>
          </div>

          <div className="grid grid-cols-10 gap-1.5">
            {Array.from({ length: userProfile.stampsTotal }).map((_, i) => (
              <div
                key={i}
                className={`h-7 rounded-md flex items-center justify-center text-xs font-bold ${
                  i < userProfile.stampsCount
                    ? 'bg-[#97472e] text-white shadow-2xs'
                    : 'bg-[#ebe8e3] text-[#817470]'
                }`}
              >
                {i < userProfile.stampsCount ? '☕' : i + 1}
              </div>
            ))}
          </div>

          <p className="text-[11px] text-[#4f4541]">
            1 stamp remaining until your complimentary Reserve Single-Origin Geisha cupping flight.
          </p>
        </div>

        {/* Sensory Calibration Summary */}
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#97472e] block">
            Saved Sensory Calibrations
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-lg bg-[#f6f3ee] border border-[#e5e2dd]/40">
              <span className="text-[10px] text-[#817470] block uppercase font-bold">Acidity Tolerance</span>
              <span className="text-sm font-bold text-[#140804]">Low (3/10)</span>
            </div>
            <div className="p-3 rounded-lg bg-[#f6f3ee] border border-[#e5e2dd]/40">
              <span className="text-[10px] text-[#817470] block uppercase font-bold">Default Milk</span>
              <span className="text-sm font-bold text-[#140804]">
                {userProfile.sensoryPreferences.defaultMilk} (Minor Figures)
              </span>
            </div>
            <div className="p-3 rounded-lg bg-[#f6f3ee] border border-[#e5e2dd]/40">
              <span className="text-[10px] text-[#817470] block uppercase font-bold">Sweetness Level</span>
              <span className="text-sm font-bold text-[#140804]">
                {userProfile.sensoryPreferences.defaultSweetness}
              </span>
            </div>
            <div className="p-3 rounded-lg bg-[#f6f3ee] border border-[#e5e2dd]/40">
              <span className="text-[10px] text-[#817470] block uppercase font-bold">Roast Depth</span>
              <span className="text-sm font-bold text-[#140804]">
                {userProfile.sensoryPreferences.roastDepth}
              </span>
            </div>
            <div className="p-3 rounded-lg bg-[#f6f3ee] border border-[#e5e2dd]/40">
              <span className="text-[10px] text-[#817470] block uppercase font-bold">Caffeine Curfew</span>
              <span className="text-sm font-bold text-[#140804]">
                {userProfile.sensoryPreferences.caffeineCurfew}
              </span>
            </div>
            <div className="p-3 rounded-lg bg-[#f6f3ee] border border-[#e5e2dd]/40">
              <span className="text-[10px] text-[#817470] block uppercase font-bold">Serving Temp</span>
              <span className="text-sm font-bold text-[#140804]">
                {userProfile.sensoryPreferences.temperature}
              </span>
            </div>
          </div>
        </div>

        {/* Sensory History Table */}
        <div className="space-y-3 pt-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#97472e] block">
            Recent Origin Flights &amp; Sensory Matches
          </span>

          <div className="divide-y divide-[#f0ede9] border border-[#e5e2dd] rounded-xl overflow-hidden bg-[#f6f3ee]/40">
            {userProfile.sensoryHistory.map((h, i) => (
              <div key={i} className="p-3.5 flex items-center justify-between gap-3 text-xs">
                <div>
                  <p className="font-bold text-[#140804]">{h.origin}</p>
                  <p className="text-[#817470] text-[11px] mt-0.5">
                    Notes: {h.flavorNotes.join(' • ')}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#c6ebd9] text-[#002116] text-[11px] font-bold">
                    {h.matchPercentage}% Match
                  </span>
                  <span className="block text-[10px] text-[#817470] mt-0.5">{h.roastDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-[#f0ede9]">
          <button
            onClick={() => {
              showToast('Sensory profile exported to digital passport format', 'info');
              setIsProfileOpen(false);
            }}
            className="px-5 py-2.5 rounded-full bg-[#2d1e18] text-white text-xs font-bold hover:bg-[#140804] transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
