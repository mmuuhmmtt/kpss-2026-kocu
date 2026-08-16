import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Award, Lock, ArrowRight } from 'lucide-react';
import BadgesModal from './BadgesModal';

export default function BadgesRibbon() {
  const { state, BADGE_DEFINITIONS } = useApp();
  const [showModal, setShowModal] = useState(false);

  const unlockedCount = state.badges.length;
  const totalCount = BADGE_DEFINITIONS.length;
  const pct = Math.round((unlockedCount / totalCount) * 100);

  return (
    <>
      <div className="glass-card p-5 md:p-6 border border-amber-500/20 bg-gradient-to-r from-slate-900/90 via-slate-900/80 to-amber-950/20 shadow-xl relative overflow-hidden">
        {/* Subtle ribbon accent glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Ribbon Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-slate-950 shadow-md shadow-amber-500/20">
              <Award size={20} className="stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-white text-base">Rozet & Başarım Şeridi</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  {unlockedCount}/{totalCount} Açıldı (%{pct})
                </span>
              </div>
              <p className="text-xs text-slate-400">Tamamladığın KPSS hedefleriyle rozetlerini aç</p>
            </div>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 bg-amber-500/10 hover:bg-amber-500/20 px-3 py-1.5 rounded-xl border border-amber-500/30 transition-all cursor-pointer"
          >
            <span>Tümünü Gör</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Ribbon Horizontal Scroll Track */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-1 scrollbar-thin scrollbar-thumb-amber-500/20 scrollbar-track-transparent">
          {BADGE_DEFINITIONS.map(badge => {
            const isUnlocked = state.badges.includes(badge.id);

            return (
              <div
                key={badge.id}
                onClick={() => setShowModal(true)}
                title={`${badge.title}: ${badge.desc}`}
                className={`flex-shrink-0 flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl border transition-all cursor-pointer select-none group ${
                  isUnlocked
                    ? 'bg-slate-900/90 border-amber-500/40 hover:border-amber-400 shadow-[0_4px_15px_rgba(245,158,11,0.15)] hover:scale-105'
                    : 'bg-slate-950/60 border-slate-800/80 opacity-60 hover:opacity-80'
                }`}
              >
                {/* Badge Icon with animation / lock */}
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center text-xl flex-shrink-0 transition-transform group-hover:scale-110 ${
                    isUnlocked
                      ? 'bg-amber-500/10 border border-amber-500/30 shadow-inner'
                      : 'bg-slate-900 border border-slate-800'
                  }`}
                >
                  {isUnlocked ? badge.icon : <Lock size={15} className="text-slate-500" />}
                </div>

                {/* Badge Titles */}
                <div className="min-w-0 pr-1">
                  <div
                    className={`text-xs font-bold truncate max-w-[110px] ${
                      isUnlocked ? 'text-slate-100 group-hover:text-amber-300' : 'text-slate-400'
                    }`}
                  >
                    {badge.title}
                  </div>
                  <div className="text-[10px] text-slate-500 truncate max-w-[110px]">
                    {isUnlocked ? 'Kazanıldı' : badge.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Badges Detail Modal */}
      {showModal && <BadgesModal onClose={() => setShowModal(false)} />}
    </>
  );
}
