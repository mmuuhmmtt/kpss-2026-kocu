import React from 'react';
import { useApp } from '../../context/AppContext';
import { Target, ChevronRight } from 'lucide-react';

export default function DailyTargetWidget() {
  const { getDailyTargets, setView } = useApp();
  const targets = getDailyTargets();

  if (targets.length === 0) {
    return (
      <div className="glass-card p-6 text-center border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-emerald-950/30">
        <div className="text-4xl mb-2">🎉</div>
        <div className="text-emerald-300 font-bold text-base">Tüm Konuları Başarıyla Tamamladın!</div>
        <div className="text-emerald-400/80 text-xs mt-1">Düzenli olarak aralıklı tekrarları yapmayı unutma.</div>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 md:p-8 border border-slate-800/80">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Target size={20} className="text-purple-400" />
          <h3 className="font-extrabold text-white text-base">Bugünün Öncelikli Konuları</h3>
        </div>
        <span className="text-xs text-purple-300 font-bold bg-purple-950/60 px-3 py-1 rounded-full border border-purple-500/30">
          Farklı Derslerden Karma Hedef
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {targets.map((t, i) => (
          <button
            key={t.subtopicId}
            onClick={() => setView('curriculum')}
            className="text-left flex items-start gap-3.5 p-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-purple-500/40 transition-all group cursor-pointer"
          >
            {/* Subject icon / color tag */}
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5 shadow-sm"
              style={{ background: `${t.accentColor}22`, color: t.accentColor, border: `1px solid ${t.accentColor}44` }}
            >
              #{i + 1}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800" style={{ color: t.accentColor }}>
                  {t.subjectName}
                </span>
                <span className="text-[11px] text-slate-400 font-mono font-semibold">~{t.weight.toFixed(1)} Soru</span>
              </div>
              <div className="text-sm font-bold text-slate-100 truncate group-hover:text-purple-300 transition-colors">
                {t.subtopicTitle}
              </div>
              <div className="text-xs text-slate-400 truncate mt-0.5">
                {t.topicTitle}
              </div>
            </div>

            <ChevronRight size={18} className="text-slate-500 group-hover:text-purple-400 transition-colors flex-shrink-0 self-center" />
          </button>
        ))}
      </div>

      <p className="mt-4 text-xs text-slate-400 font-medium flex items-center gap-1.5">
        <span>💡</span> Sistem her dersin sıradaki ilk bitmemiş konusunu müfredat akış sırasıyla önerir.
      </p>
    </div>
  );
}
