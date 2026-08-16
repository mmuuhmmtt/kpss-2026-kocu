import React from 'react';
import { useApp } from '../../context/AppContext';
import { Target, TrendingUp, Award, ArrowUpRight } from 'lucide-react';

export default function TargetNetWidget() {
  const { state, setView } = useApp();
  const targetNet = state.userProfile?.targetNet || 85;

  // Calculate current average mock exam net score
  const exams = state.exams || [];
  let currentNet = 0;
  if (exams.length > 0) {
    const totalNets = exams.reduce((sum, exam) => {
      let examNet = 0;
      if (exam.scores) {
        Object.values(exam.scores).forEach(s => {
          if (s) examNet += (Number(s.correct) || 0) - ((Number(s.wrong) || 0) * 0.25);
        });
      }
      return sum + examNet;
    }, 0);
    currentNet = Math.round(totalNets / exams.length);
  }

  const remainingNet = Math.max(0, targetNet - currentNet);
  const progressPct = Math.min(100, Math.round((currentNet / targetNet) * 100));

  return (
    <div className="glass-card p-5 md:p-7 border-0 bg-[#26262A] shadow-xl rounded-[28px]">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#1A1A1D] text-[#F5F5F0] flex items-center justify-center font-bold shadow-inner">
            <Target size={18} />
          </div>
          <div>
            <h3 className="font-extrabold text-[#F5F5F0] text-sm md:text-base">KPSS Net Hedefi Takibi</h3>
            <p className="text-[11px] text-[#9E9E9E]">Deneme performansına göre hedefe yakınlığın</p>
          </div>
        </div>
        <button
          onClick={() => setView('exams')}
          className="text-xs text-[#F5F5F0] hover:opacity-80 font-bold flex items-center gap-1 transition-opacity cursor-pointer min-h-[44px] px-2"
        >
          Denemeler <ArrowUpRight size={14} />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 md:gap-4 text-center">
        <div className="bg-[#1A1A1D] p-4 rounded-[22px] shadow-inner">
          <span className="text-[10px] font-extrabold text-[#FF6B00] uppercase block">Hedef Net</span>
          <span className="text-base md:text-xl font-black text-[#FF6B00]" style={{ fontFamily: "'Orbitron', monospace", filter: 'drop-shadow(0 0 6px rgba(255, 107, 0, 0.45))' }}>
            {targetNet} Net
          </span>
        </div>

        <div className="bg-[#1A1A1D] p-4 rounded-[22px] shadow-inner">
          <span className="text-[10px] font-extrabold text-[#FF6B00] uppercase block">Şu Anki Ortalama</span>
          <span className="text-base md:text-xl font-black text-[#FF6B00]" style={{ fontFamily: "'Orbitron', monospace", filter: 'drop-shadow(0 0 6px rgba(255, 107, 0, 0.45))' }}>
            {currentNet} Net
          </span>
        </div>

        <div className="bg-[#1A1A1D] p-4 rounded-[22px] shadow-inner">
          <span className="text-[10px] font-extrabold text-[#FF6B00] uppercase block">Kalan Net</span>
          <span className="text-base md:text-xl font-black text-[#FF6B00]" style={{ fontFamily: "'Orbitron', monospace", filter: 'drop-shadow(0 0 6px rgba(255, 107, 0, 0.45))' }}>
            {remainingNet > 0 ? `+${remainingNet}` : 'Hedef Ulaşıldı! 🏆'}
          </span>
        </div>
      </div>
    </div>
  );
}
