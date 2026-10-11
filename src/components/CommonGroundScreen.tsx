import React, { useState } from 'react';
import { useCafe } from '../context/CafeContext';

export const CommonGroundScreen: React.FC = () => {
  const {
    presenceBroadcast,
    togglePresenceBroadcast,
    nextSpark,
    currentSpark,
    happenings,
    toggleHappeningRsvp,
    roomTopics,
    addRoomTopic,
    toggleResonateTopic,
    patrons,
    setIsWaveOpen,
    setWaveTarget,
    showToast,
  } = useCafe();

  const [vibeFilter, setVibeFilter] = useState<'all' | 'focus' | 'open'>('all');
  const [topicInput, setTopicInput] = useState('');
  const [isBroadcasting, setIsBroadcasting] = useState(false);

  const filteredPatrons = patrons.filter((p) => {
    if (vibeFilter === 'all') return true;
    if (vibeFilter === 'focus') return p.vibe === 'focus';
    if (vibeFilter === 'open') return p.vibe === 'open' || p.vibe === 'break';
    return true;
  });

  const handlePostSpark = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topicInput.trim()) return;
    setIsBroadcasting(true);
    setTimeout(() => {
      addRoomTopic(topicInput);
      setTopicInput('');
      setIsBroadcasting(false);
    }, 700);
  };

  const handleConnectWithPatron = (patronName: string, actionType: string) => {
    if (actionType === 'Challenge') {
      showToast(`Challenge dispatched to ${patronName}: Blitz Chess 5m clock queued`, 'info');
    } else if (actionType === 'Say Hello') {
      setWaveTarget(patronName);
      setIsWaveOpen(true);
    } else {
      showToast(`Low-key wave sent to ${patronName} at table`, 'gemini');
    }
  };

  return (
    <div className="w-full pb-24">
      {/* Top Presence Header Banner */}
      <section className="relative w-full overflow-hidden bg-[#f6f3ee] px-4 sm:px-6 lg:px-12 py-10 lg:py-14 border-b border-[#e5e2dd]">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#ffdbd0]/30 blur-3xl"></div>
        <div className="pointer-events-none absolute left-1/3 bottom-0 h-64 w-64 rounded-full bg-[#c6ebd9]/25 blur-2xl"></div>

        <div className="relative mx-auto max-w-7xl flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#ebe8e3] px-3.5 py-1 text-[#4f4541]">
              <span className="inline-block h-2 w-2 rounded-full bg-[#2d4d40] animate-pulse"></span>
              <span className="text-[11px] uppercase tracking-wider text-[#97472e] font-bold">
                Communal Presence • 14 Guests Live
              </span>
            </div>
            <h1 className="font-['Playfair_Display'] text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#140804] tracking-tight">
              The Common Ground: Connect, Co-work &amp; Unwind
            </h1>
            <p className="text-sm sm:text-base text-[#4f4541] max-w-2xl leading-relaxed">
              Serendipitous cafe rituals made intentional. Share your focus, discover nearby creative kindreds, or spark quiet spontaneous exchanges over single-origin pours.
            </p>
          </div>

          <div className="w-full lg:w-auto shrink-0">
            <div className="relative rounded-2xl bg-white p-5 shadow-[0_12px_32px_-4px_rgba(45,30,24,0.08)] border border-[#e5e2dd] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#ffdbd0] text-[#97472e]">
                  <span className="material-symbols-outlined text-[24px]">sensors</span>
                </div>
                <div>
                  <div className="text-sm font-bold text-[#140804]">Broadcast Table Presence</div>
                  <p className="text-xs text-[#817470]">Visible to Table 4 &amp; Communal Timber Bar</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={presenceBroadcast}
                  onChange={togglePresenceBroadcast}
                  className="sr-only peer"
                />
                <div className="w-14 h-8 bg-[#ebe8e3] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white peer-checked:bg-[#97472e] after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all shadow-inner"></div>
              </label>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-12 py-8 space-y-10">
        {/* Gemini Sensory Co-Pilot • Live Serendipity Spark Banner */}
        <section>
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#2d1e18] via-[#2d1e18] to-[#97472e] p-6 md:p-8 text-white shadow-xl">
            <div className="absolute -right-8 -bottom-8 opacity-15 text-white pointer-events-none">
              <span className="material-symbols-outlined text-[180px]">auto_awesome</span>
            </div>
            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffdbd0]/20 backdrop-blur text-[#f8ddd3] text-xs font-bold">
                  <span className="material-symbols-outlined text-[16px] text-[#ffdbd0]">spark</span>
                  Gemini Sensory Co-Pilot • Live Serendipity
                </div>
                <h2 className="font-['Playfair_Display'] text-xl sm:text-2xl font-bold text-white">
                  {currentSpark.title}
                </h2>
                <p className="text-sm text-[#ffdbd0]/90 leading-relaxed">{currentSpark.desc}</p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <button
                  onClick={nextSpark}
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 px-4 py-2.5 text-xs font-semibold text-white transition-all backdrop-blur cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">refresh</span>
                  Another Spark
                </button>
                <button
                  onClick={() => {
                    setWaveTarget('Elena & Marcus');
                    setIsWaveOpen(true);
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-[#ffdbd0] px-5 py-2.5 text-xs font-bold text-[#3a0a00] shadow hover:bg-[#ffb59f] transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">waving_hand</span>
                  Send Low-Key Wave
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Present Patrons Grid */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#97472e] block">
                Present Patrons
              </span>
              <h2 className="font-['Playfair_Display'] text-2xl font-semibold text-[#140804]">
                Active In-Café Community
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#817470]">Filter by vibe:</span>
              <div className="inline-flex rounded-full bg-[#f6f3ee] p-1 gap-1 border border-[#e5e2dd]">
                <button
                  onClick={() => setVibeFilter('all')}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    vibeFilter === 'all'
                      ? 'bg-white text-[#140804] shadow-sm'
                      : 'text-[#4f4541] hover:text-[#140804]'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setVibeFilter('focus')}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    vibeFilter === 'focus'
                      ? 'bg-white text-[#140804] shadow-sm'
                      : 'text-[#4f4541] hover:text-[#140804]'
                  }`}
                >
                  Deep Focus
                </button>
                <button
                  onClick={() => setVibeFilter('open')}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    vibeFilter === 'open'
                      ? 'bg-white text-[#140804] shadow-sm'
                      : 'text-[#4f4541] hover:text-[#140804]'
                  }`}
                >
                  Open to Chat
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPatrons.map((patron) => (
              <article
                key={patron.id}
                className="flex flex-col justify-between rounded-2xl bg-white p-6 shadow-sm border border-[#e5e2dd]/60 transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        className="h-12 w-12 rounded-full object-cover border border-[#e5e2dd]"
                        alt={patron.avatarAlt}
                        src={patron.avatar}
                      />
                      <div>
                        <h3 className="text-base font-bold text-[#140804]">{patron.name}</h3>
                        <div className="flex items-center gap-1.5 text-xs text-[#97472e]">
                          <span className="material-symbols-outlined text-[14px]">table_restaurant</span>
                          <span>{patron.location}</span>
                        </div>
                      </div>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                        patron.vibe === 'open'
                          ? 'bg-[#c6ebd9] text-[#002116]'
                          : 'bg-[#ffdbd0] text-[#3a0a00]'
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          patron.vibe === 'open' ? 'bg-[#002116]' : 'bg-[#97472e]'
                        }`}
                      ></span>
                      {patron.vibeLabel}
                    </span>
                  </div>

                  <div className="space-y-1.5 rounded-xl bg-[#f6f3ee] p-3.5 border border-[#e5e2dd]/40">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#817470] uppercase">
                      <span className="material-symbols-outlined text-[16px]">{patron.focusIcon}</span>
                      <span>{patron.currentFocusTitle}</span>
                    </div>
                    <p className="text-xs font-semibold text-[#1c1c19] leading-snug">
                      {patron.currentFocusDesc}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="text-[10px] font-bold text-[#817470] uppercase tracking-wider">
                      {patron.tags.length > 0 && patron.id === 'patron-marcus' ? 'Looking For' : 'Open to Chat About'}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {patron.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-[#f6f3ee] px-3 py-1 text-[11px] font-semibold text-[#4f4541] border border-[#e5e2dd]/40"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 flex items-center justify-between border-t border-[#f0ede9]">
                  <span className="text-xs text-[#817470] truncate max-w-[140px]">
                    Order: {patron.currentOrder}
                  </span>
                  <button
                    onClick={() => handleConnectWithPatron(patron.name, patron.actionLabel)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#2d1e18] px-4 py-1.5 text-xs font-bold text-white hover:bg-[#140804] transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">{patron.actionIcon}</span>
                    <span>{patron.actionLabel}</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Split Section: Community Board & In-Room Dialogue */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (7 cols): Live Café Happenings */}
          <section className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#97472e] block">
                  Community Board
                </span>
                <h2 className="font-['Playfair_Display'] text-2xl font-semibold text-[#140804]">
                  Live Café Happenings
                </h2>
              </div>
              <span className="text-xs text-[#817470]">Today &amp; Tomorrow</span>
            </div>

            <div className="space-y-4">
              {happenings.map((event) => (
                <div
                  key={event.id}
                  className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-[#e5e2dd]/60 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex flex-col items-center justify-center rounded-xl p-3 w-16 text-center ${
                          event.badgeType === 'secondary'
                            ? 'bg-[#ffdbd0] text-[#97472e]'
                            : 'bg-[#f6f3ee] text-[#4f4541]'
                        }`}
                      >
                        <span className="text-[10px] uppercase font-bold tracking-wider">{event.day}</span>
                        <span className="text-lg font-bold leading-tight tabular-nums">{event.time}</span>
                        <span className="text-[10px] font-bold">{event.period}</span>
                      </div>

                      <div className="space-y-1">
                        <div
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                            event.badgeType === 'secondary'
                              ? 'bg-[#ffdbd0]/60 text-[#97472e]'
                              : 'bg-[#c6ebd9] text-[#002116]'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[14px]">
                            {event.badgeIcon}
                          </span>
                          <span>{event.badge}</span>
                        </div>
                        <h3 className="text-sm font-bold text-[#140804]">{event.title}</h3>
                        <p className="text-xs text-[#4f4541] leading-relaxed">{event.description}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleHappeningRsvp(event.id)}
                      className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                        event.rsvpd
                          ? 'bg-[#c6ebd9] text-[#002116]'
                          : event.badgeType === 'secondary'
                          ? 'bg-[#97472e] text-white hover:bg-[#772f18]'
                          : 'bg-[#ebe8e3] text-[#140804] hover:bg-[#dcdad5]'
                      }`}
                    >
                      {event.actionLabel}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Right Column (5 cols): In-Room Dialogue */}
          <section className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#97472e] block">
                In-Room Dialogue
              </span>
              <h2 className="font-['Playfair_Display'] text-2xl font-semibold text-[#140804]">
                Spark a Topic
              </h2>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm border border-[#e5e2dd]/60 space-y-5">
              <form onSubmit={handlePostSpark} className="space-y-3">
                <div>
                  <label htmlFor="topic-input" className="block text-sm font-bold text-[#140804]">
                    Ask the room a light curiosity
                  </label>
                  <p className="text-xs text-[#817470] mt-0.5">
                    Appears on the communal iPad display beside the pastry case and patrons’ companion feeds.
                  </p>
                </div>

                <div className="relative">
                  <textarea
                    id="topic-input"
                    value={topicInput}
                    onChange={(e) => setTopicInput(e.target.value)}
                    className="w-full rounded-xl bg-[#f6f3ee] p-4 text-sm text-[#140804] placeholder:text-[#817470] focus:outline-none focus:ring-2 focus:ring-[#97472e]/30 border border-[#e5e2dd]/40 resize-none"
                    placeholder="e.g. What is the one productivity app you actually keep opened all morning?"
                    rows={3}
                  ></textarea>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-[#817470]">
                    <span className="material-symbols-outlined text-[16px]">visibility</span>
                    <span>Communal &amp; Table 4</span>
                  </div>
                  <button
                    type="submit"
                    disabled={isBroadcasting || !topicInput.trim()}
                    className="inline-flex items-center gap-2 rounded-full bg-[#2d1e18] hover:bg-[#140804] px-5 py-2 text-xs font-bold text-white transition-all shadow cursor-pointer disabled:opacity-40"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {isBroadcasting ? 'progress_activity' : 'send'}
                    </span>
                    <span>{isBroadcasting ? 'Broadcasting...' : 'Post Spark'}</span>
                  </button>
                </div>
              </form>

              {/* Active Room Questions List */}
              <div className="space-y-3 pt-3 border-t border-[#f0ede9]">
                <div className="text-[11px] font-bold text-[#817470] uppercase tracking-wider">
                  Active Room Questions
                </div>
                {roomTopics.map((topic) => (
                  <div
                    key={topic.id}
                    className="rounded-xl bg-[#f6f3ee] p-4 space-y-3 border border-[#e5e2dd]/40"
                  >
                    <div className="flex items-center justify-between text-xs text-[#817470]">
                      <span className="flex items-center gap-1.5 font-semibold text-[#140804]">
                        <span className="material-symbols-outlined text-[15px] text-[#97472e]">forum</span>
                        <span>
                          Posted by {topic.author} ({topic.location})
                        </span>
                      </span>
                      <span>{topic.timeAgo}</span>
                    </div>

                    <p className="text-xs font-semibold text-[#140804] leading-relaxed">
                      "{topic.question}"
                    </p>

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => toggleResonateTopic(topic.id)}
                        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold transition-colors cursor-pointer ${
                          topic.userResonated
                            ? 'bg-[#ffdbd0] text-[#97472e]'
                            : 'bg-white text-[#1c1c19] hover:bg-[#ebe8e3]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[14px]">favorite</span>
                        <span>{topic.resonantCount} resonant</span>
                      </button>

                      <button
                        onClick={() => showToast('Response thread opened on communal feed', 'info')}
                        className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#1c1c19] hover:bg-[#ebe8e3] transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[14px]">reply</span>
                        <span>{topic.answerCount} answers</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ambient Café Decibel Guard */}
            <div className="rounded-2xl bg-[#04271c] p-6 text-white flex items-center gap-4 shadow-sm">
              <div className="h-12 w-12 rounded-full bg-[#c6ebd9]/20 flex items-center justify-center shrink-0 text-[#c6ebd9]">
                <span className="material-symbols-outlined text-[26px]">hearing</span>
              </div>
              <div className="space-y-0.5">
                <div className="text-sm font-bold text-white">Ambient Café Decibel Guard</div>
                <p className="text-xs text-[#abcebe] leading-relaxed">
                  Current noise index is optimal for focus (48 dB). The room encourages hushed conversations.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
