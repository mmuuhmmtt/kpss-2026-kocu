import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, CheckCircle2, Circle, RotateCcw, Calendar, BookOpen, ArrowRight } from 'lucide-react';

export default function SmartStudyPlanWidget() {
  const { getSmartDailyPlan, completeSubtopic, markReviewDone, setView } = useApp();
  const plan = getSmartDailyPlan();

  return (
    <div className="glass-card p-5 md:p-6 border border-[#2D3F36] bg-[#1A2620] shadow-xl rounded-[24px]">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#1E8449]/20 text-[#1E8449] border border-[#1E8449]/40 flex items-center justify-center font-bold">
            <Sparkles size={18} />
          </div>
          <div>
            <h3 className="font-black text-[#E8F0EC] text-base md:text-lg">Bugün Ne Yapmalısın?</h3>
            <p className="text-xs text-[#8FA398]">Hedef net ve soru ağırlığına göre otomatik günlük çalışma planın</p>
          </div>
        </div>

        {plan.isWeeklyReviewDay && (
          <span className="px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
            <Calendar size={13} /> Genel Tekrar Günü
          </span>
        )}
      </div>

      <div className="space-y-3">
        {/* 1. Spaced Repetition Due Reviews (If any) */}
        {plan.dueReviews.length > 0 && (
          <div className="p-3.5 rounded-2xl bg-[#0F1712] border border-[#B5533C]/40 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-[#B5533C]">
              <span className="flex items-center gap-1.5">
                <RotateCcw size={14} /> Tekrar Zamanı Gelmiş Konular ({plan.dueReviews.length})
              </span>
              <button
                onClick={() => setView('spaced')}
                className="text-[11px] underline hover:text-[#E8F0EC] cursor-pointer min-h-[44px] px-1 flex items-center"
              >
                Tümünü Gör →
              </button>
            </div>
            {plan.dueReviews.slice(0, 2).map(review => (
              <div
                key={review.id}
                className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-[#1A2620] border border-[#2D3F36]"
              >
                <div className="min-w-0">
                  <div className="text-xs font-extrabold text-[#E8F0EC] truncate">{review.title}</div>
                  <div className="text-[10px] text-[#8FA398]">{review.topicTitle} • Tekrar Adımı #{review.intervalIndex + 1}</div>
                </div>
                <button
                  onClick={() => markReviewDone(review.id)}
                  className="min-h-[44px] min-w-[44px] px-3 py-1.5 rounded-xl bg-[#1E8449] hover:bg-[#52C97F] text-[#E8F0EC] text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1 cursor-pointer flex-shrink-0"
                >
                  <CheckCircle2 size={15} /> Tamamla (+15 XP)
                </button>
              </div>
            ))}
          </div>
        )}

        {/* 2. Today's 3 Balanced Subjects Topic Tasks */}
        {plan.dailyTopics.length > 0 ? (
          <div className="space-y-2.5">
            <span className="text-xs font-extrabold text-[#D4AF37] uppercase tracking-wider block pt-1">
              📚 Bugünkü 3 Farklı Ders Konu Görevin:
            </span>
            {plan.dailyTopics.map(item => (
              <div
                key={item.subtopicId}
                className="flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#0F1712] border border-[#2D3F36] hover:border-[#1E8449]/50 transition-all group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-[#1E8449]/20 text-[#1E8449] border border-[#1E8449]/40 flex items-center justify-center font-bold text-xs flex-shrink-0">
                    <BookOpen size={15} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-extrabold text-[#E8F0EC] truncate">{item.subtopicTitle}</div>
                    <div className="text-[11px] text-[#8FA398] truncate">
                      <span className="text-[#D4AF37] font-semibold">{item.subjectName}</span> • {item.topicTitle} (~{item.weight} Soru)
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => completeSubtopic(item.subjectId, item.topicId, item.subtopicId, item.subtopicTitle, item.topicTitle, item.weight)}
                  className="min-h-[44px] px-4 py-2 rounded-xl bg-[#1E8449] hover:bg-[#52C97F] text-[#E8F0EC] text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer flex-shrink-0"
                >
                  <CheckCircle2 size={16} /> Bitir (+25 XP)
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-6 rounded-2xl bg-[#0F1712] border border-[#2D3F36]">
            <CheckCircle2 size={32} className="text-[#52C97F] mx-auto mb-2" />
            <h4 className="font-bold text-[#E8F0EC] text-sm">Harika İş! Bugünkü Tüm Konular Tamamlandı</h4>
            <p className="text-xs text-[#8FA398] mt-1">Deneme çözebilir veya tekrar modülünden eksiklerini kapatabilirsin.</p>
          </div>
        )}
      </div>

    </div>
  );
}
