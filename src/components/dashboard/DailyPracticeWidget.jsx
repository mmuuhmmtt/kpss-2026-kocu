import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, Circle, BookOpen, Calculator, Sparkles, Award } from 'lucide-react';

export default function DailyPracticeWidget() {
  const { state, toggleDailyPractice } = useApp();
  const today = new Date().toISOString().split('T')[0];

  const todayPractice = state.dailyPractices?.[today] || { turkce: false, matematik: false };
  
  const turkceDone = !!todayPractice.turkce;
  const matDone = !!todayPractice.matematik;

  const completedCount = (turkceDone ? 1 : 0) + (matDone ? 1 : 0);
  const pct = Math.round((completedCount / 2) * 100);

  return (
    <div className="p-5 sm:p-7 bg-[#0F172A]/90 backdrop-blur-xl border border-cyan-500/30 shadow-[0_20px_50px_-15px_rgba(6,182,212,0.15)] rounded-[28px] relative overflow-hidden">
      
      {/* Cyan Radial Mesh Ambient Glow */}
      <div className="absolute -top-12 -right-12 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 relative z-10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 text-[11px] font-bold uppercase tracking-wider mb-2 shadow-sm">
            <Sparkles size={13} className="text-cyan-400" />
            <span>Günlük Rutin Takibi</span>
          </div>
          <h3 className="text-base sm:text-lg font-black text-white tracking-tight">
            Türkçe & Matematik Pratik Denemesi
          </h3>
          <p className="text-xs text-cyan-200/60 mt-0.5 font-medium">
            Sınava kadar her gün çözdüğünüz Türkçe ve Matematik denemelerini işaretleyin
          </p>
        </div>

        {/* Dynamic Daily Progress Tag */}
        <div className="flex items-center gap-3.5 self-start sm:self-auto bg-[#0B0F19] px-4 py-2.5 rounded-2xl border border-cyan-500/20 shadow-inner">
          <div className="text-right">
            <span className="text-[10px] text-cyan-300/70 font-bold block uppercase tracking-wider">Günlük Hedef</span>
            <span className="text-xs font-black text-white font-mono">{completedCount} / 2 Tamamlandı</span>
          </div>
          <div className={`px-3 py-1 rounded-xl text-xs font-black font-mono shadow-sm ${
            pct === 100
              ? 'bg-emerald-500 text-slate-950 shadow-emerald-500/30'
              : 'bg-cyan-500 text-slate-950 shadow-cyan-500/30'
          }`}>
            %{pct}
          </div>
        </div>
      </div>

      {/* Overall Progress Bar */}
      <div className="mb-5 relative z-10">
        <div className="h-2 bg-[#0B0F19] rounded-full overflow-hidden p-0.5 border border-white/10 shadow-inner">
          <div
            className={`h-full rounded-full transition-all duration-500 ease-out ${
              pct === 100 ? 'bg-gradient-to-r from-emerald-400 to-teal-300' : 'bg-gradient-to-r from-cyan-400 to-blue-500'
            }`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Practice Checkboxes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 relative z-10">
        
        {/* Türkçe Denemesi Item */}
        <button
          type="button"
          onClick={() => toggleDailyPractice('turkce')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between text-left group ${
            turkceDone
              ? 'bg-cyan-950/40 border-cyan-400/50 shadow-lg shadow-cyan-500/10'
              : 'bg-[#0B0F19]/90 border-white/10 hover:border-cyan-400/40 hover:bg-[#121A2D]'
          }`}
        >
          <div className="flex items-center gap-3.5">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl shadow-inner transition-transform group-hover:scale-105 ${
              turkceDone ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30' : 'bg-white/5 text-slate-400'
            }`}>
              <BookOpen size={20} className={turkceDone ? 'text-cyan-400' : 'text-slate-400'} />
            </div>
            <div>
              <h4 className={`text-sm font-extrabold transition-colors ${turkceDone ? 'text-cyan-300' : 'text-slate-200 group-hover:text-white'}`}>
                Türkçe Denemesi
              </h4>
              <p className="text-xs text-slate-400 font-medium mt-0.5">30 Soru / Pratik Test</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {turkceDone ? (
              <span className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-cyan-400 text-slate-950 font-black text-xs shadow-md">
                <CheckCircle2 size={15} /> Tamamlandı
              </span>
            ) : (
              <span className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/5 text-slate-400 font-bold text-xs border border-white/10 group-hover:text-white group-hover:border-cyan-400/30">
                <Circle size={15} /> Tamamla (+30 XP)
              </span>
            )}
          </div>
        </button>

        {/* Matematik Denemesi Item */}
        <button
          type="button"
          onClick={() => toggleDailyPractice('matematik')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between text-left group ${
            matDone
              ? 'bg-indigo-950/40 border-indigo-400/50 shadow-lg shadow-indigo-500/10'
              : 'bg-[#0B0F19]/90 border-white/10 hover:border-indigo-400/40 hover:bg-[#121A2D]'
          }`}
        >
          <div className="flex items-center gap-3.5">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl shadow-inner transition-transform group-hover:scale-105 ${
              matDone ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-400/30' : 'bg-white/5 text-slate-400'
            }`}>
              <Calculator size={20} className={matDone ? 'text-indigo-400' : 'text-slate-400'} />
            </div>
            <div>
              <h4 className={`text-sm font-extrabold transition-colors ${matDone ? 'text-indigo-300' : 'text-slate-200 group-hover:text-white'}`}>
                Matematik Denemesi
              </h4>
              <p className="text-xs text-slate-400 font-medium mt-0.5">30 Soru / Pratik Test</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {matDone ? (
              <span className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-indigo-400 text-slate-950 font-black text-xs shadow-md">
                <CheckCircle2 size={15} /> Tamamlandı
              </span>
            ) : (
              <span className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/5 text-slate-400 font-bold text-xs border border-white/10 group-hover:text-white group-hover:border-indigo-400/30">
                <Circle size={15} /> Tamamla (+30 XP)
              </span>
            )}
          </div>
        </button>

      </div>

      {pct === 100 && (
        <div className="mt-4 p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center gap-2 text-emerald-300 text-xs font-black relative z-10 shadow-lg shadow-emerald-500/10">
          <Award size={18} className="text-emerald-400" />
          <span>Tebrikler! Bugünkü Türkçe & Matematik deneme pratik hedefini tamamladın! 🎉</span>
        </div>
      )}
    </div>
  );
}
