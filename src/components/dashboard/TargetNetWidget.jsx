import React from 'react';
import { useApp } from '../../context/AppContext';
import { Target, TrendingUp, Award, ArrowUpRight } from 'lucide-react';

export default function TargetNetWidget() {
  const { state, setView } = useApp();
  const rawTarget = Number(state.userProfile?.targetNet) || 35;
  const targetNet = Math.min(45, Math.max(10, rawTarget > 45 ? 35 : rawTarget));

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
    <div className="p-4 sm:p-7 bg-[#18181C] border border-white/10 shadow-2xl rounded-3xl">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#111113] border border-white/10 text-emerald-400 flex items-center justify-center font-bold shadow-inner">
            <Target size={18} />
          </div>
          <div>
            <h3 className="font-extrabold text-white text-sm sm:text-base">KPSS Net Hedefi Takibi</h3>
            <p className="text-[11px] text-slate-400 font-medium">Deneme performansına göre hedefe yakınlığın</p>
          </div>
        </div>
        <button
          onClick={() => setView('exams')}
          className="text-xs text-[#FF6B00] hover:opacity-80 font-bold flex items-center gap-1 transition-opacity cursor-pointer min-h-[44px] px-2"
        >
          Denemeler <ArrowUpRight size={14} />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
        <div className="bg-[#111113] p-3 sm:p-4 rounded-2xl border border-white/5 shadow-inner">
          <span className="text-[9px] sm:text-[10px] font-extrabold text-[#FF6B00] uppercase block tracking-wider">Hedef Net</span>
          <span className="text-sm sm:text-lg font-extrabold text-[#FF6B00] font-mono">
            {targetNet} Net
          </span>
        </div>

        <div className="bg-[#111113] p-3 sm:p-4 rounded-2xl border border-white/5 shadow-inner">
          <span className="text-[9px] sm:text-[10px] font-extrabold text-[#FF6B00] uppercase block tracking-wider">Ortalama</span>
          <span className="text-sm sm:text-lg font-extrabold text-[#FF6B00] font-mono">
            {currentNet} Net
          </span>
        </div>

        <div className="bg-[#111113] p-3 sm:p-4 rounded-2xl border border-white/5 shadow-inner">
          <span className="text-[9px] sm:text-[10px] font-extrabold text-[#FF6B00] uppercase block tracking-wider">Kalan Net</span>
          <span className="text-xs sm:text-lg font-extrabold text-[#FF6B00] font-mono truncate block">
            {remainingNet > 0 ? `+${remainingNet}` : '🏆 Ulaşıldı!'}
          </span>
        </div>
      </div>
    </div>
  );
}
