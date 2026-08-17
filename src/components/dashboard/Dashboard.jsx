import React from 'react';
import { useApp } from '../../context/AppContext';
import ExamCountdown from './ExamCountdown';
import MascotXPWidget from './MascotXPWidget';
import TargetNetWidget from './TargetNetWidget';
import DailyPracticeWidget from './DailyPracticeWidget';
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

      {/* 2. Günlük Türkçe & Matematik Pratik Deneme Takibi */}
      <div className="w-full">
        <DailyPracticeWidget />
      </div>

      {/* 3. Hedef Net & Karşılaştırma Widget'ı */}
      <div className="w-full">
        <TargetNetWidget />
      </div>

      {/* 4. KPSS Koçu Maskotu & XP Widget */}
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
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
            const radius = 34;
            const circumference = 2 * Math.PI * radius;
            const strokeDashoffset = circumference - (spct / 100) * circumference;

            return (
              <button
                key={subject.id}
                onClick={() => setView('curriculum')}
                className="p-6 text-center group flex flex-col sm:flex-row items-center justify-between cursor-pointer border border-white/5 bg-[#18181B] hover:bg-[#202024] rounded-2xl shadow-lg transition-all"
              >
                <div className="flex items-center gap-4 mb-4 sm:mb-0">
                  <div className="w-14 h-14 rounded-2xl bg-[#111113] border border-white/10 flex items-center justify-center text-3xl group-hover:scale-105 transition-transform shadow-inner">
                    {subject.icon}
                  </div>
                  <div className="text-left">
                    <h4 className="font-extrabold text-white text-base group-hover:text-emerald-400 transition-colors">{subject.name}</h4>
                    <span className="text-xs font-semibold text-slate-400 block mt-0.5">{subject.totalWeight} Soru</span>
                    <p className="text-xs text-slate-500 mt-1 font-medium">{done}/{total} konu tamamlandı</p>
                  </div>
                </div>

                {/* Subject Circular Progress Ring */}
                <div className="relative w-20 h-20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 80 80">
                    <circle
                      cx="40"
                      cy="40"
                      r={radius}
                      className="text-[#111113]"
                      strokeWidth="5"
                      stroke="currentColor"
                      fill="transparent"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r={radius}
                      stroke={subject.accentColor || '#10B981'}
                      strokeWidth="5"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      fill="transparent"
                      className="transition-all duration-700 ease-out"
                    />
                  </svg>

                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span
                      className="text-base font-extrabold font-mono tracking-tight"
                      style={{ color: subject.accentColor || '#10B981' }}
                    >
                      %{spct}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

