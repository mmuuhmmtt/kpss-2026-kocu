import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import ExamCountdown from './ExamCountdown';
import TargetNetWidget from './TargetNetWidget';
import DailyPracticeWidget from './DailyPracticeWidget';
import { RotateCcw, BookOpen, ArrowRight, Quote, RefreshCw } from 'lucide-react';

const GENERAL_MOTIVATION_NOTES = [
  "Zorluklar, başarının değerini artıran en güzel vesilelerdir. İnançla çalışmaya devam et!",
  "Bugün harcadığın her dakika ve döktüğün her alın teri, yarın yaşayacağın büyük başarının teminatıdır.",
  "Büyük zaferler, her gün aksatılmadan atılan küçük fakat kararlı adımlarla kazanılır.",
  "Disiplin; ne istediğin ile şu an neye meyilli olduğun arasındaki seçimdir. İradene güven!",
  "Başarı bir tesadüf değil; emek, kararlılık, öğrenme ve en önemlisi vazgeçmeme tercihidir.",
  "Hayallerinin büyüklüğü, karşılaştığın engellerin büyüklüğünden daima daha güçlü olsun!"
];

function MotivationBanner() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const randomIdx = Math.floor(Math.random() * GENERAL_MOTIVATION_NOTES.length);
    setIndex(randomIdx);
  }, []);

  const handleNextQuote = () => {
    setIndex((prev) => (prev + 1) % GENERAL_MOTIVATION_NOTES.length);
  };

  return (
    <div className="p-6 sm:p-8 bg-[#1A140E]/90 backdrop-blur-xl border border-amber-500/30 shadow-[0_20px_50px_-15px_rgba(245,158,11,0.2)] rounded-[28px] relative overflow-hidden group w-full text-center">
      
      {/* Warm Amber Radial Glow */}
      <div className="absolute top-0 right-0 left-0 bottom-0 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center justify-center space-y-4 text-center">
        
        {/* Quote Icon & Text Centered */}
        <div className="flex flex-col items-center justify-center space-y-3 max-w-2xl mx-auto">
          <Quote size={32} className="text-amber-400 opacity-90 mx-auto" />
          <p className="text-base sm:text-xl font-bold text-amber-100 italic leading-snug tracking-tight text-center">
            "{GENERAL_MOTIVATION_NOTES[index]}"
          </p>
        </div>

        {/* Change Quote Button Centered */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleNextQuote}
            className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-extrabold transition-colors cursor-pointer px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 shadow-sm"
            title="Başka Not Göster"
          >
            <RefreshCw size={13} className="group-hover:rotate-180 transition-transform duration-500" />
            <span>Yeni Motivasyon Notu</span>
          </button>
        </div>

      </div>
    </div>
  );
}

export default function Dashboard() {
  const { state, getTodayReviews, setView } = useApp();
  const reviews = getTodayReviews();

  return (
    <div className="w-full flex flex-col gap-6 md:gap-8 fade-slide-up pb-8">
      
      {/* 1. Sınav Kalan Süre Sayacı */}
      <div className="w-full">
        <ExamCountdown />
      </div>

      {/* 2. SAYAÇ ALTINDA GENEL GÜZEL MOTİVASYON NOTU (TAM ORTALI) */}
      <div className="w-full">
        <MotivationBanner />
      </div>

      {/* 3. Günlük Türkçe & Matematik Pratik Deneme Takibi */}
      <div className="w-full">
        <DailyPracticeWidget />
      </div>

      {/* 4. Hedef Net & Karşılaştırma Widget'ı */}
      <div className="w-full">
        <TargetNetWidget />
      </div>

      {/* 5. Spaced Repetition Alert (Eğer Tekrar Zamanı Geldiyse) */}
      {reviews.length > 0 && (
        <div className="w-full">
          <button
            type="button"
            onClick={() => setView('spaced')}
            className="w-full p-5 sm:p-6 bg-[#1C122C]/90 backdrop-blur-xl border border-purple-500/30 shadow-[0_20px_50px_-15px_rgba(168,85,247,0.2)] rounded-[28px] flex flex-col sm:flex-row items-center justify-between gap-4 group transition-all hover:border-purple-400/50 cursor-pointer text-center sm:text-left"
          >
            <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center justify-center font-black text-xl flex-shrink-0 shadow-inner">
                <RotateCcw size={22} className="text-purple-400" />
              </div>
              <div>
                <div className="font-extrabold text-white text-base flex items-center justify-center sm:justify-start gap-2">
                  <span>{reviews.length} Konunun Tekrar Zamanı Geldi!</span>
                  <span className="bg-purple-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full">YENİ</span>
                </div>
                <div className="text-xs text-purple-200/70 font-medium mt-0.5">Unutma eğrisini yenmek için hemen tekrarlarını tamamla (+15 XP)</div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-500 text-slate-950 font-black text-xs shadow-lg shadow-purple-500/25 group-hover:translate-x-1 transition-transform self-center sm:self-auto">
              <span>Tekrarları İncele</span>
              <ArrowRight size={16} />
            </div>
          </button>
        </div>
      )}

      {/* 6. DERS İLERLEMELERİ (Tarih vs Coğrafya - Tam Ortalı) */}
      <div className="p-6 md:p-8 bg-[#16171C]/90 backdrop-blur-xl border border-white/10 w-full rounded-[28px] shadow-2xl text-center">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-7 text-center sm:text-left">
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2 tracking-tight">
              <BookOpen size={20} className="text-[#FF6B00]" /> KPSS Ders İlerlemeleri
            </h3>
            <p className="text-xs text-slate-400 mt-0.5 font-medium">Sınav soru ağırlığına göre konu tamamlama durumunuz</p>
          </div>
          <button
            type="button"
            onClick={() => setView('curriculum')}
            className="text-xs text-[#FF6B00] hover:text-[#FF8533] font-extrabold flex items-center gap-1 transition-colors cursor-pointer min-h-[44px] px-3.5 py-1.5 rounded-xl bg-[#FF6B00]/10 border border-[#FF6B00]/20"
          >
            <span>Detaylı Liste</span>
            <ArrowRight size={15} />
          </button>
        </div>

        {/* Dynamic Distinct Color Subject Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
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

            const isTarih = subject.id === 'tarih';
            const cardBg = isTarih ? 'bg-[#221316]/90 border-rose-500/30' : 'bg-[#0B2019]/90 border-emerald-500/30';
            const badgeBg = isTarih ? 'bg-rose-500/15 text-rose-300 border-rose-500/30' : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
            const accentColor = isTarih ? '#F87171' : '#34D399';

            return (
              <button
                key={subject.id}
                type="button"
                onClick={() => setView('curriculum')}
                className={`p-6 text-center group flex flex-col sm:flex-row items-center justify-between cursor-pointer border rounded-3xl shadow-xl transition-all hover:scale-[1.01] ${cardBg}`}
              >
                <div className="flex items-center gap-4 mb-4 sm:mb-0">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-105 transition-transform shadow-inner border ${badgeBg}`}>
                    {subject.icon}
                  </div>
                  <div className="text-left">
                    <h4 className="font-extrabold text-white text-lg group-hover:opacity-90 transition-opacity">{subject.name}</h4>
                    <span className="text-xs font-bold block mt-0.5" style={{ color: accentColor }}>{subject.totalWeight} Soru Ağırlığı</span>
                    <p className="text-xs text-slate-400 mt-1 font-medium">{done} / {total} alt konu tamamlandı</p>
                  </div>
                </div>

                {/* Subject Circular Progress Ring */}
                <div className="relative w-20 h-20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 80 80">
                    <circle
                      cx="40"
                      cy="40"
                      r={radius}
                      className="text-white/5"
                      strokeWidth="5"
                      stroke="currentColor"
                      fill="transparent"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r={radius}
                      stroke={accentColor}
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
                      className="text-base font-black font-mono tracking-tight"
                      style={{ color: accentColor }}
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
