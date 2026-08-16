import React from 'react';
import { useApp } from '../../context/AppContext';
import { TrendingUp } from 'lucide-react';

export default function OverallProgress() {
  const { getWeightedOverallProgress, state } = useApp();
  const { pct, completedWeight, totalWeight } = getWeightedOverallProgress();

  return (
    <div className="glass-card p-6 md:p-8 flex flex-col justify-between h-full border border-[#2D3F36] bg-[#1A2620]">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp size={20} className="text-[#1E8449]" />
            <h3 className="font-extrabold text-[#E8F0EC] text-base">Ağırlıklı Genel İlerleme</h3>
          </div>
          <span className="text-3xl font-black text-[#D4AF37]" style={{ fontFamily: "'Orbitron', monospace" }}>
            %{pct}
          </span>
        </div>

        {/* Futuristic glowing progress bar */}
        <div className="h-4 bg-[#0F1712] rounded-full overflow-hidden flex mb-3 progress-bar-animated border border-[#2D3F36] p-0.5 shadow-inner">
          <div
            className="h-full rounded-full futuristic-progress-fill transition-all duration-700 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>

        {/* Stats row */}
        <div className="flex items-center justify-between text-xs text-[#8FA398] font-medium mb-4">
          <span>{Math.round(completedWeight)} soru ağırlığı tamamlandı</span>
          <span>Toplam {Math.round(totalWeight)} soru ağırlığı</span>
        </div>
      </div>

      {/* Subject dots legend */}
      <div className="flex flex-wrap gap-2.5 pt-4 border-t border-[#2D3F36]">
        {state.curriculum.map(s => {
          const stats = { pct: 0, done: 0, total: 0 };
          for (const t of s.topics) {
            for (const sub of t.subtopics) {
              stats.total++;
              if (state.completed[sub.id]) stats.done++;
            }
          }
          stats.pct = stats.total > 0 ? Math.round((stats.done / stats.total) * 100) : 0;
          return (
            <div key={s.id} className="flex items-center gap-2 bg-[#0F1712] px-3 py-1.5 rounded-xl border border-[#2D3F36]">
              <div className="w-2.5 h-2.5 rounded-full shadow-xs bg-[#52C97F]" />
              <span className="text-xs font-semibold text-[#E8F0EC]">{s.name}</span>
              <span className="text-xs font-bold font-mono text-[#D4AF37]">%{stats.pct}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
