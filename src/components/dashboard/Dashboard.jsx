import React from 'react';
import { useApp } from '../../context/AppContext';
import ExamCountdown from './ExamCountdown';
import MascotXPWidget from './MascotXPWidget';
import TargetNetWidget from './TargetNetWidget';
import { RotateCcw, BookOpen, ArrowRight } from 'lucide-react';

export default function Dashboard() {
  const { state, getTodayReviews, setView } = useApp();
  const reviews = getTodayReviews();

  return (
    <div className="w-full flex flex-col gap-6 md:gap-8 fade-slide-up pb-8">
      {/* 1. Sınav Kalan Süre Sayacı */}
      <div className="w-full">
        <ExamCountdown />
      </div>

      {/* 2. Hedef Net & Karşılaştırma Widget'ı */}
      <div className="w-full">
        <TargetNetWidget />
      </div>

      {/* 3. KPSS Koçu Maskotu & XP Widget */}
      <div className="w-full">
        <MascotXPWidget />
      </div>

      {/* 4. Spaced Repetition Alert (Eğer Tekrar Zamanı Geldiyse) */}
      {reviews.length > 0 && (
        <div className="w-full">
          <button
            onClick={() => setView('spaced')}
            className="w-full glass-card p-5 flex items-center justify-between gap-4 border-0 bg-[#26262A] shadow-lg group rounded-[24px]"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#1A1A1D] text-[#D09B82] flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-inner">
                <RotateCcw size={20} />
              </div>
              <div className="text-left">
                <div className="font-bold text-[#F5F5F0] text-sm">{reviews.length} Konunun Tekrar Zamanı Geldi!</div>
                <div className="text-xs text-[#D09B82]">Unutma eğrisini yenmek için hemen başla</div>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-[#D09B82] group-hover:translate-x-1 transition-transform">
              <span>Tekrarları İncele</span>
              <ArrowRight size={16} />
            </div>
          </button>
        </div>
      )}

      {/* 5. DERS MODÜLLERİ (6 KPSS DERSİ) - Wellness Circular Progress Rings Grid */}
      <div className="glass-card p-6 md:p-8 border-0 bg-[#26262A] w-full rounded-[28px] shadow-xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-base md:text-lg font-extrabold text-[#F5F5F0] flex items-center gap-2">
              <BookOpen size={20} className="text-[#F5F5F0]" /> Ders İlerlemeleri
            </h3>
            <p className="text-xs text-[#9E9E9E] mt-0.5 font-medium">KPSS Soru dağılımına göre konu tamamlama oranların</p>
          </div>
          <button
            onClick={() => setView('curriculum')}
            className="text-xs text-[#F5F5F0] hover:opacity-80 font-bold flex items-center gap-1 transition-opacity cursor-pointer min-h-[44px] px-2"
          >
            Detaylı Liste <ArrowRight size={14} />
          </button>
        </div>

        {/* Wellness Circular Progress Rings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 md:gap-8 w-full">
          {[...state.curriculum].sort((a, b) => b.totalWeight - a.totalWeight).map(subject => {
            let total = 0, done = 0;
            for (const t of subject.topics) {
              for (const s of t.subtopics) {
                total++;
                if (state.completed[s.id]) done++;
              }
            }
            const spct = total > 0 ? Math.round((done / total) * 100) : 0;
            
            // SVG Circle Math
            const radius = 32;
            const circumference = 2 * Math.PI * radius;
            const strokeDashoffset = circumference - (spct / 100) * circumference;

            return (
              <button
                key={subject.id}
                onClick={() => setView('curriculum')}
                className="glass-card glass-card-hover p-6 text-center group flex flex-col items-center justify-between cursor-pointer border-0 bg-[#26262A] rounded-[24px] shadow-md"
              >
                <div className="w-full flex items-center justify-between mb-2">
                  <span className="text-2xl group-hover:scale-105 transition-transform">{subject.icon}</span>
                  <span className="text-[11px] font-bold text-[#9E9E9E]">{subject.totalWeight} Soru</span>
                </div>

                {/* Subject Circular Progress Ring with Claude Neon Orange Accent Color */}
                <div className="relative w-24 h-24 my-2 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 80 80">
                    <circle
                      cx="40"
                      cy="40"
                      r={radius}
                      className="text-[#1A1A1D]"
                      strokeWidth="6"
                      stroke="currentColor"
                      fill="transparent"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r={radius}
                      stroke="#FF6B00"
                      strokeWidth="6"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      fill="transparent"
                      className="transition-all duration-700 ease-out"
                      style={{
                        filter: 'drop-shadow(0 0 6px rgba(255, 107, 0, 0.45))'
                      }}
                    />
                  </svg>

                  {/* Centered Large Percentage Value with Claude Neon Orange */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span
                      className="text-xl font-black tracking-tight text-[#FF6B00]"
                      style={{ fontFamily: "'Orbitron', monospace", filter: 'drop-shadow(0 0 6px rgba(255, 107, 0, 0.45))' }}
                    >
                      %{spct}
                    </span>
                  </div>
                </div>

                <div className="w-full mt-2 pt-2 border-t border-[#1A1A1D]/60 text-center">
                  <h4 className="font-bold text-[#F5F5F0] text-sm group-hover:text-white transition-colors">{subject.name}</h4>
                  <p className="text-[11px] text-[#9E9E9E] mt-0.5 font-medium">{done}/{total} konu tamamlandı</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

