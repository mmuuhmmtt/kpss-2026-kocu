import React from 'react';
import { useApp } from '../../context/AppContext';
import { RotateCcw, CheckCircle2, Clock, AlertTriangle, Brain, Sparkles, ArrowRight } from 'lucide-react';

export default function SpacedRepetitionView() {
  const { state, markReviewDone, unlockBadge, setView } = useApp();
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
        className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-white/10 rounded-3xl shadow-xl transition-all bg-[#18181C]"
      >
        <div className="flex items-center gap-3.5 min-w-0 w-full sm:w-auto">
          {/* Weight Badge */}
          <div
            className="w-11 h-11 rounded-2xl flex flex-col items-center justify-center font-bold flex-shrink-0 shadow-inner bg-[#111113] border border-white/5"
            style={{ color: color }}
          >
            <span className="text-xs font-extrabold font-mono">
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
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-extrabold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-all shadow-lg shadow-cyan-400/20 cursor-pointer ml-auto sm:ml-0"
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
      <div className="glass-card p-6 md:p-8 bg-[#26262A] border-0 shadow-xl rounded-[28px] relative overflow-hidden flex flex-col items-center justify-center text-center">
        <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto space-y-3 relative z-10 w-full">
          <div className="flex justify-center w-full">
            <span className="px-4 py-1.5 rounded-full bg-[#1A1A1D] text-[#FF6B00] text-xs font-black uppercase tracking-wider shadow-inner inline-flex items-center justify-center gap-2">
              <Brain size={14} className="text-[#FF6B00]" /> AKILLI HAFIZA SİSTEMİ
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-[#F5F5F0] tracking-tight text-center w-full">
            Unutma Eğrisini Yen: Aralıklı Tekrar (Spaced Repetition)
          </h2>
          <p className="text-xs md:text-sm text-[#9E9E9E] leading-relaxed max-w-2xl mx-auto text-center w-full">
            Nörobilimsel <span className="text-[#FF6B00] font-extrabold">Ebbinghaus Unutma Eğrisi</span>'ne dayalı bu sistem; öğrendiğin bilgileri kalıcı hafızaya aktarmak için tam unutma eşiğindeki <span className="text-[#FBBF24] font-bold">2. gün, 5. gün, 10. gün ve 21. gün</span> periyotlarında sana otomatik tekrar yaptırır!
          </p>
        </div>
      </div>

      {/* 3 Large Hero Metric Cards with Vibrant Distinct Colors */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="glass-card p-6 border-0 bg-[#26262A] shadow-md rounded-[24px]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#F87171] flex items-center gap-1.5">
              <AlertTriangle size={15} /> GECİKMİŞ TEKRARLAR
            </span>
          </div>
          <div className="text-4xl font-black text-[#F87171] mb-1" style={{ fontFamily: "'Orbitron', monospace", filter: 'drop-shadow(0 0 8px rgba(248, 113, 113, 0.4))' }}>
            {overdue.length}
          </div>
          <div className="text-xs text-[#9E9E9E]">Acil tekrar gerektiren konular</div>
        </div>

        <div className="glass-card p-6 border-0 bg-[#26262A] shadow-md rounded-[24px]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#FF6B00] flex items-center gap-1.5">
              <Clock size={15} /> BUGÜN ZAMANI GELEN
            </span>
          </div>
          <div className="text-4xl font-black text-[#FF6B00] mb-1" style={{ fontFamily: "'Orbitron', monospace", filter: 'drop-shadow(0 0 8px rgba(255, 107, 0, 0.45))' }}>
            {dueExactly.length}
          </div>
          <div className="text-xs text-[#9E9E9E]">Bugün yapılması önerilenler</div>
        </div>

        <div className="glass-card p-6 border-0 bg-[#26262A] shadow-md rounded-[24px]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#34D399] flex items-center gap-1.5">
              <CheckCircle2 size={15} /> USTALIKLA ÖĞRENİLEN
            </span>
            <Sparkles size={16} className="text-[#34D399]" />
          </div>
          <div className="text-4xl font-black text-[#34D399] mb-1" style={{ fontFamily: "'Orbitron', monospace", filter: 'drop-shadow(0 0 8px rgba(52, 211, 153, 0.4))' }}>
            {mastered.length}
          </div>
          <div className="text-xs text-[#9E9E9E]">4 tekrar döngüsünü tamamlayanlar</div>
        </div>
      </div>

      {/* Main 2-Column Responsive Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Overdue & Today's Reviews (8 columns on lg) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Overdue Section */}
          {overdue.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-base font-bold text-[#F87171] flex items-center gap-2">
                <AlertTriangle size={18} /> Gecikmiş Konular ({overdue.length})
              </h3>
              <div className="space-y-3">
                {overdue.sort((a, b) => b.weight - a.weight).map(sr => (
                  <SRCard key={sr.id} sr={sr} isOverdue={true} />
                ))}
              </div>
            </div>
          )}

          {/* Due Today Section */}
          {dueExactly.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-base font-bold text-[#FF6B00] flex items-center gap-2">
                <Clock size={18} /> Bugün Tekrar Edilecekler ({dueExactly.length})
              </h3>
              <div className="space-y-3">
                {dueExactly.sort((a, b) => b.weight - a.weight).map(sr => (
                  <SRCard key={sr.id} sr={sr} isOverdue={false} />
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {dueToday.length === 0 && (
            <div className="glass-card p-8 md:p-10 text-center flex flex-col items-center justify-center border-0 bg-[#26262A] shadow-xl rounded-[28px] space-y-3">
              <div className="w-16 h-16 rounded-3xl bg-[#1A1A1D] text-[#34D399] flex items-center justify-center mx-auto text-3xl font-black shadow-inner">
                ✓
              </div>
              <h3 className="text-lg font-black text-[#F5F5F0] text-center">Harika! Bugün Tekrar Edilecek Konu Yok</h3>
              <p className="text-xs md:text-sm text-[#9E9E9E] max-w-md text-center mx-auto leading-relaxed">
                Yeni bir alt konu tamamladığında aralıklı tekrar sistemi otomatik çalışacak ve zamana göre listeni hazırlayacaktır.
              </p>
              <div className="pt-3">
                <button
                  onClick={() => setView('curriculum')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-black text-[#1A1A1D] bg-[#FF6B00] hover:opacity-90 transition-all shadow-md cursor-pointer"
                  style={{ filter: 'drop-shadow(0 0 8px rgba(255, 107, 0, 0.45))' }}
                >
                  <span>Ders Konularına Git</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Upcoming Reviews & Algorithm Info (4 columns on lg) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Upcoming Reviews */}
          <div className="glass-card p-6 border-0 bg-[#26262A] shadow-md rounded-[24px]">
            <h3 className="text-sm font-bold text-[#F5F5F0] mb-4 flex items-center gap-2">
              <Clock size={16} className="text-[#FF6B00]" /> Yaklaşan Tekrarlar ({upcoming.length})
            </h3>

            {upcoming.length > 0 ? (
              <div className="space-y-3">
                {upcoming.slice(0, 8).map(sr => {
                  const color = getSubjectColor(sr.subjectId);
                  const days = diffDays(sr.nextReview);
                  return (
                    <div key={sr.id} className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#1A1A1D] shadow-inner">
                      <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: color }} />
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-semibold text-[#F5F5F0] truncate">{sr.title}</div>
                        <div className="text-[11px] font-medium truncate" style={{ color: color }}>{sr.topicTitle}</div>
                      </div>
                      <div className="text-[11px] font-bold text-[#FF6B00] flex-shrink-0">
                        {days} gün sonra ({formatDate(sr.nextReview)})
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-xs text-[#9E9E9E] text-center py-6">Henüz sıraya giren gelecek tekrar bulunmuyor.</div>
            )}
          </div>

          {/* Algorithm Info Card */}
          <div className="glass-card p-6 border-0 bg-[#26262A] shadow-md rounded-[24px]">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FBBF24] mb-3 flex items-center gap-1.5">
              <Sparkles size={14} className="text-[#FBBF24]" /> Tekrar Aralıkları
            </h4>
            <div className="space-y-2.5 text-xs text-[#9E9E9E]">
              <div className="flex justify-between items-center p-3 rounded-2xl bg-[#1A1A1D] shadow-inner">
                <span className="font-semibold text-[#F5F5F0]">1. Tekrar</span>
                <span className="text-[#FF6B00] font-mono font-black">2 gün sonra</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-2xl bg-[#1A1A1D] shadow-inner">
                <span className="font-semibold text-[#F5F5F0]">2. Tekrar</span>
                <span className="text-[#C084FC] font-mono font-black">5 gün sonra</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-2xl bg-[#1A1A1D] shadow-inner">
                <span className="font-semibold text-[#F5F5F0]">3. Tekrar</span>
                <span className="text-[#FBBF24] font-mono font-black">10 gün sonra</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-2xl bg-[#1A1A1D] shadow-inner">
                <span className="font-semibold text-[#F5F5F0]">4. Tekrar (Ustalık)</span>
                <span className="text-[#34D399] font-mono font-black">21 gün sonra</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
