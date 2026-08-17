import React from 'react';
import { useApp } from '../../context/AppContext';
import { Target, ArrowUpRight, Award } from 'lucide-react';

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

  return (
    <div className="p-5 sm:p-7 bg-[#062016]/90 backdrop-blur-xl border border-emerald-500/30 shadow-[0_20px_50px_-15px_rgba(16,185,129,0.15)] rounded-[28px] relative overflow-hidden">
      
      {/* Emerald Ambient Radial Mesh Glow */}
      <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-5 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold shadow-inner">
            <Target size={20} className="text-emerald-400" />
          </div>
          <div>
            <h3 className="font-black text-white text-base sm:text-lg tracking-tight">KPSS Net Hedefi Takibi</h3>
            <p className="text-xs text-emerald-200/60 font-medium">Deneme performansına göre hedefe yakınlığın</p>
          </div>
        </div>

        <button
          onClick={() => setView('exams')}
          className="text-xs text-emerald-400 hover:text-emerald-300 font-extrabold flex items-center gap-1 transition-colors cursor-pointer min-h-[44px] px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20"
        >
          <span>Denemeler</span>
          <ArrowUpRight size={15} />
        </button>
      </div>

      {/* 3 Metric Glass Cards */}
      <div className="grid grid-cols-3 gap-2.5 sm:gap-4 text-center relative z-10">
        
        {/* Hedef Net */}
        <div className="bg-[#03140E] p-3.5 sm:p-4 rounded-2xl border border-emerald-500/20 shadow-inner">
          <span className="text-[9px] sm:text-[10px] font-black text-emerald-400/80 uppercase block tracking-wider mb-0.5">
            Hedef Net
          </span>
          <span className="text-sm sm:text-xl font-black text-emerald-400 font-mono">
            {targetNet} Net
          </span>
        </div>

        {/* Ortalama */}
        <div className="bg-[#03140E] p-3.5 sm:p-4 rounded-2xl border border-emerald-500/20 shadow-inner">
          <span className="text-[9px] sm:text-[10px] font-black text-emerald-400/80 uppercase block tracking-wider mb-0.5">
            Ortalama
          </span>
          <span className="text-sm sm:text-xl font-black text-emerald-300 font-mono">
            {currentNet} Net
          </span>
        </div>

        {/* Kalan Net */}
        <div className="bg-[#03140E] p-3.5 sm:p-4 rounded-2xl border border-emerald-500/20 shadow-inner">
          <span className="text-[9px] sm:text-[10px] font-black text-emerald-400/80 uppercase block tracking-wider mb-0.5">
            Kalan Net
          </span>
          <span className="text-xs sm:text-xl font-black text-emerald-400 font-mono truncate block">
            {remainingNet > 0 ? `+${remainingNet}` : '🏆 Ulaşıldı!'}
          </span>
        </div>

      </div>
    </div>
  );
}
