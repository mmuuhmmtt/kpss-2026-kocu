import React from 'react';
import { useApp } from '../../context/AppContext';
import { RotateCcw, CheckCircle2, Clock, AlertTriangle, Brain, Sparkles } from 'lucide-react';

export default function SpacedRepetitionView() {
  const { state, markReviewDone, unlockBadge } = useApp();
  const today = new Date().toISOString().split('T')[0];

  const dueToday = state.spacedReps.filter(s => s.nextReview <= today && s.status !== 'mastered');
  const upcoming = state.spacedReps.filter(s => s.nextReview > today && s.status !== 'mastered').sort((a, b) => a.nextReview.localeCompare(b.nextReview));
  const mastered = state.spacedReps.filter(s => s.status === 'mastered');

  const overdue = dueToday.filter(s => s.nextReview < today);
  const dueExactly = dueToday.filter(s => s.nextReview === today);

  const handleReview = (srId) => {
    markReviewDone(srId);
    if (!state.badges.includes('review_done')) unlockBadge('review_done');
  };

  const getSubjectColor = (subjectId) => {
    const s = state.curriculum.find(c => c.id === subjectId);
    return s?.accentColor || '#64748b';
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' });
  };

  const diffDays = (dateStr) => {
    const d = new Date(dateStr + 'T00:00:00');
    const t = new Date(today + 'T00:00:00');
    return Math.round((d - t) / 86400000);
  };

  const SRCard = ({ sr, isOverdue }) => {
    const color = getSubjectColor(sr.subjectId);
    const overdueDays = Math.abs(diffDays(sr.nextReview));
    return (
      <div
        className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-white/10 rounded-3xl shadow-xl transition-all bg-[#111113]/90 hover:bg-[#16171C]"
      >
        <div className="flex items-center gap-3.5 min-w-0 w-full sm:w-auto">
          {/* Weight Badge */}
          <div
            className="w-11 h-11 rounded-2xl flex flex-col items-center justify-center font-bold flex-shrink-0 shadow-inner bg-[#16171C] border border-white/5"
            style={{ color: color }}
          >
            <span className="text-xs font-black font-mono">
              ~{sr.weight?.toFixed(1) || '?'}
            </span>
            <span className="text-[8px] uppercase tracking-tighter opacity-80">Soru</span>
          </div>

          <div className="min-w-0 flex-1">
            <div className="text-sm sm:text-base font-extrabold text-white truncate">{sr.title}</div>
            <div className="text-xs text-slate-400 mt-0.5 truncate flex items-center gap-2 font-medium">
              <span className="font-bold" style={{ color: color }}>{sr.topicTitle}</span>
              <span>•</span>
              <span>Aralık: {sr.intervalIndex + 1}. Adım</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto pt-2 sm:pt-0 border-t border-white/5 sm:border-0 flex-shrink-0">
          {isOverdue && (
            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[11px] font-bold">
              <AlertTriangle size={13} className="text-rose-400" />
              <span>{overdueDays}g gecikti</span>
            </div>
          )}

          <button
            onClick={() => handleReview(sr.id)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-black text-slate-950 bg-[#FF6B00] hover:bg-[#FF8533] transition-all shadow-lg shadow-[#FF6B00]/20 cursor-pointer ml-auto sm:ml-0"
          >
            <RotateCcw size={14} />
            <span>Tekrar Et (+15 XP)</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col gap-8 md:gap-10 fade-slide-up pb-12">
      {/* Top Banner Guide */}
      <div className="p-6 md:p-8 bg-[#16171C]/90 backdrop-blur-xl border border-white/10 shadow-2xl rounded-[28px] relative overflow-hidden flex flex-col items-center justify-center text-center">
        <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto space-y-3 relative z-10 w-full">
          <div className="flex justify-center w-full">
            <span className="px-4 py-1.5 rounded-full bg-[#111113] border border-[#FF6B00]/30 text-[#FF6B00] text-xs font-black uppercase tracking-wider shadow-inner inline-flex items-center justify-center gap-2">
              <Brain size={14} className="text-[#FF6B00]" /> AKILLI HAFIZA SİSTEMİ
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-white tracking-tight text-center w-full">
            Unutma Eğrisini Yen: Aralıklı Tekrar (Spaced Repetition)
          </h2>
          <p className="text-xs md:text-sm text-slate-400 leading-relaxed max-w-2xl mx-auto text-center w-full font-medium">
            Nörobilimsel <span className="text-[#FF6B00] font-black">Ebbinghaus Unutma Eğrisi</span>'ne dayalı bu sistem; öğrendiğin bilgileri kalıcı hafızaya aktarmak için tam unutma eşiğindeki <span className="text-amber-400 font-bold">2. gün, 5. gün, 10. gün ve 21. gün</span> periyotlarında sana otomatik tekrar yaptırır!
          </p>
        </div>
      </div>

      {/* 3 Large Hero Metric Cards with Distinct Glow Themes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-6 bg-[#221316]/90 backdrop-blur-xl border border-rose-500/30 shadow-2xl rounded-[24px]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-black uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
              <AlertTriangle size={15} /> GECİKMİŞ TEKRARLAR
            </span>
          </div>
          <div className="text-4xl font-black text-rose-400 mb-1 font-mono">
            {overdue.length}
          </div>
          <div className="text-xs text-slate-400 font-medium">Acil tekrar gerektiren konular</div>
        </div>

        <div className="p-6 bg-[#1A140E]/90 backdrop-blur-xl border border-amber-500/30 shadow-2xl rounded-[24px]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-black uppercase tracking-wider text-[#FF6B00] flex items-center gap-1.5">
              <Clock size={15} /> BUGÜN ZAMANI GELEN
            </span>
          </div>
          <div className="text-4xl font-black text-[#FF6B00] mb-1 font-mono">
            {dueExactly.length}
          </div>
          <div className="text-xs text-slate-400 font-medium">Bugün yapılması önerilenler</div>
        </div>

        <div className="p-6 bg-[#0B2019]/90 backdrop-blur-xl border border-emerald-500/30 shadow-2xl rounded-[24px]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 size={15} /> USTALIKLA ÖĞRENİLEN
            </span>
            <Sparkles size={16} className="text-emerald-400" />
          </div>
          <div className="text-4xl font-black text-emerald-400 mb-1 font-mono">
            {mastered.length}
          </div>
          <div className="text-xs text-slate-400 font-medium">4 tekrar döngüsünü tamamlayanlar</div>
        </div>
      </div>

      {/* Main 2-Column Responsive Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Overdue & Today's Reviews */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <RotateCcw size={18} className="text-[#FF6B00]" /> Bugünkü Tekrar Listesi ({dueToday.length})
            </h3>
          </div>

          {dueToday.length === 0 ? (
            <div className="p-8 bg-[#16171C]/90 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto text-xl font-extrabold">
                ✓
              </div>
              <h4 className="font-extrabold text-white text-base">Bugünkü Tüm Tekrarlar Tamam!</h4>
              <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed font-medium">
                Harika iş çıkardın! Hafızanı tazeledin. Yeni konular bitirdikçe otomatik tekrar takvimine eklenecektir.
              </p>
            </div>
          ) : (
            <div className="space-y-3.5">
              {dueToday.map(sr => (
                <SRCard key={sr.id} sr={sr} isOverdue={sr.nextReview < today} />
              ))}
            </div>
          )}

          {/* Upcoming Section */}
          {upcoming.length > 0 && (
            <div className="pt-6 space-y-4">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 px-1">
                Gelecek Tekrarlar ({upcoming.length})
              </h4>
              <div className="space-y-3">
                {upcoming.map(sr => {
                  const color = getSubjectColor(sr.subjectId);
                  const daysLeft = diffDays(sr.nextReview);
                  return (
                    <div key={sr.id} className="p-4 rounded-2xl bg-[#111113]/90 border border-white/5 flex items-center justify-between gap-3 text-xs font-semibold text-slate-300">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
                        <span className="truncate font-extrabold text-white">{sr.title}</span>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-slate-400 font-medium">{formatDate(sr.nextReview)}</span>
                        <span className="px-2.5 py-1 rounded-xl bg-white/5 text-amber-400 border border-amber-500/20 font-bold font-mono">
                          {daysLeft} gün kaldı
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Mastered System & Info */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 bg-[#16171C]/90 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl space-y-4">
            <h4 className="text-sm font-black text-white flex items-center gap-2">
              <Sparkles size={16} className="text-[#FF6B00]" /> Tekrar Sistemi Nasıl Çalışır?
            </h4>
            <div className="space-y-3 text-xs text-slate-300 leading-relaxed font-medium">
              <div className="p-3 rounded-2xl bg-[#111113] border border-white/5">
                <span className="font-bold text-amber-400 block mb-1">1. Adım (+2 Gün)</span>
                Konuyu ilk tamamladığında 2 gün sonrasına ilk tekrar kurulur.
              </div>
              <div className="p-3 rounded-2xl bg-[#111113] border border-white/5">
                <span className="font-bold text-cyan-400 block mb-1">2. Adım (+5 Gün)</span>
                İlk tekrar yapıldıktan 5 gün sonra 2. tekrar zamanı gelir.
              </div>
              <div className="p-3 rounded-2xl bg-[#111113] border border-white/5">
                <span className="font-bold text-emerald-400 block mb-1">3. Adım (+10 Gün)</span>
                Kalıcı belleğe geçiş periyodu.
              </div>
              <div className="p-3 rounded-2xl bg-[#111113] border border-white/5">
                <span className="font-bold text-rose-400 block mb-1">4. Adım (+21 Gün)</span>
                Son kontrol periyodu. Tamamlandığında konu "Ustalıkla Öğrenilenler"e aktarılır.
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
