import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Lock } from 'lucide-react';

export default function BadgesModal({ onClose }) {
  const { state, BADGE_DEFINITIONS } = useApp();

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="glass-card w-full max-w-md p-7 relative fade-slide-up border-0 bg-[#26262A] shadow-2xl rounded-[28px]" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-5 right-5 text-[#9E9E9E] hover:text-[#F5F5F0] transition-colors cursor-pointer">
          <X size={20} />
        </button>

        <h3 className="font-black text-[#F5F5F0] text-xl mb-1 flex items-center gap-2.5">
          <span className="text-[#FBBF24]">🏆</span> KPSS Başarımları
        </h3>
        <p className="text-xs text-[#9E9E9E] mb-5 font-medium">{state.badges.length}/{BADGE_DEFINITIONS.length} rozet kazanıldı</p>

        <div className="grid grid-cols-3 gap-3.5 max-h-[60vh] overflow-y-auto pr-1">
          {BADGE_DEFINITIONS.map(badge => {
            const unlocked = state.badges.includes(badge.id);
            return (
              <div
                key={badge.id}
                className={`flex flex-col items-center gap-2 p-3.5 rounded-2xl border-0 transition-all text-center ${
                  unlocked
                    ? 'bg-[#1A1A1D] shadow-md'
                    : 'bg-[#1A1A1D]/40 opacity-40'
                }`}
              >
                <span className={`text-3xl ${!unlocked ? 'grayscale opacity-60' : 'filter drop-shadow-md'}`}>
                  {unlocked ? badge.icon : <Lock size={20} className="text-[#9E9E9E]" />}
                </span>
                <div>
                  <div className="text-xs font-black" style={{ color: unlocked ? (badge.color || '#FBBF24') : '#9E9E9E' }}>
                    {badge.title}
                  </div>
                  <div className="text-[10px] text-[#9E9E9E] mt-1 leading-tight font-medium">{badge.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
