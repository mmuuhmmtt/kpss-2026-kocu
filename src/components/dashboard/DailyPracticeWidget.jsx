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
    <div className="p-6 md:p-7 bg-[#18181B] border border-white/10 shadow-2xl rounded-3xl relative overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles size={13} />
            <span>Günlük Rutin Takibi</span>
          </div>
          <h3 className="text-base md:text-lg font-extrabold text-white tracking-tight">
            Türkçe & Matematik Pratik Denemesi
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Sınava kadar her gün çözdüğünüz Türkçe ve Matematik denemelerini işaretleyin
          </p>
        </div>

        {/* Dynamic Daily Progress Tag */}
        <div className="flex items-center gap-2 self-start sm:self-auto bg-[#111113] px-4 py-2 rounded-2xl border border-white/5 shadow-inner">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 font-semibold block uppercase">Günlük Hedef</span>
            <span className="text-xs font-extrabold text-white font-mono">{completedCount} / 2 Tamamlandı</span>
          </div>
          <div className={`px-2.5 py-1 rounded-xl text-xs font-extrabold font-mono ${pct === 100 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'}`}>
            %{pct}
          </div>
        </div>
      </div>

      {/* Overall Progress Bar */}
      <div className="mb-6">
        <div className="h-2 bg-[#111113] rounded-full overflow-hidden p-0.5 border border-white/5">
          <div
            className={`h-full rounded-full transition-all duration-500 ease-out ${pct === 100 ? 'bg-gradient-to-r from-emerald-500 to-teal-400' : 'bg-gradient-to-r from-cyan-500 to-blue-500'}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Practice Checkboxes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Türkçe Denemesi Item */}
        <button
          onClick={() => toggleDailyPractice('turkce')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between text-left group ${
            turkceDone
              ? 'bg-cyan-950/30 border-cyan-500/40 shadow-lg shadow-cyan-500/5'
              : 'bg-[#111113] border-white/5 hover:border-white/20 hover:bg-[#151518]'
          }`}
        >
          <div className="flex items-center gap-3.5">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl shadow-inner transition-transform group-hover:scale-105 ${turkceDone ? 'bg-cyan-500/20 text-cyan-300' : 'bg-[#1D1D22] text-slate-400'}`}>
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
              <span className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-cyan-500 text-slate-950 font-extrabold text-xs shadow-md">
                <CheckCircle2 size={15} /> Tamamlandı
              </span>
            ) : (
              <span className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#1D1D22] text-slate-400 font-semibold text-xs border border-white/5 group-hover:text-white group-hover:border-white/10">
                <Circle size={15} /> Tamamla (+30 XP)
              </span>
            )}
          </div>
        </button>

        {/* Matematik Denemesi Item */}
        <button
          onClick={() => toggleDailyPractice('matematik')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between text-left group ${
            matDone
              ? 'bg-purple-950/30 border-purple-500/40 shadow-lg shadow-purple-500/5'
              : 'bg-[#111113] border-white/5 hover:border-white/20 hover:bg-[#151518]'
          }`}
        >
          <div className="flex items-center gap-3.5">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl shadow-inner transition-transform group-hover:scale-105 ${matDone ? 'bg-purple-500/20 text-purple-300' : 'bg-[#1D1D22] text-slate-400'}`}>
              <Calculator size={20} className={matDone ? 'text-purple-400' : 'text-slate-400'} />
            </div>
            <div>
              <h4 className={`text-sm font-extrabold transition-colors ${matDone ? 'text-purple-300' : 'text-slate-200 group-hover:text-white'}`}>
                Matematik Denemesi
              </h4>
              <p className="text-xs text-slate-400 font-medium mt-0.5">30 Soru / Pratik Test</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {matDone ? (
              <span className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-purple-500 text-slate-950 font-extrabold text-xs shadow-md">
                <CheckCircle2 size={15} /> Tamamlandı
              </span>
            ) : (
              <span className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#1D1D22] text-slate-400 font-semibold text-xs border border-white/5 group-hover:text-white group-hover:border-white/10">
                <Circle size={15} /> Tamamla (+30 XP)
              </span>
            )}
          </div>
        </button>

      </div>

      {pct === 100 && (
        <div className="mt-4 p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center gap-2 text-emerald-400 text-xs font-extrabold">
          <Award size={16} />
          <span>Tebrikler! Bugünkü Türkçe & Matematik deneme pratik hedefini tamamladın! 🎉</span>
        </div>
      )}
    </div>
  );
}
