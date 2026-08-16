import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ChevronRight, ChevronDown, Check, FileText, BookOpen, Sparkles, Layers, GraduationCap } from 'lucide-react';
import NoteModal from './NoteModal';

// ... (SubtopicChecklist, TopicAccordion, SubjectDetail intact)

// ─── CurriculumView (Grid of Subjects) ─────────────────────────────────────────
export default function CurriculumView() {
  const { state, getSubjectStats } = useApp();
  const [selectedSubject, setSelectedSubject] = useState(null);

  const sortedSubjects = [...state.curriculum].sort((a, b) => b.totalWeight - a.totalWeight);

  if (selectedSubject) {
    const subject = state.curriculum.find(s => s.id === selectedSubject);
    return <SubjectDetail subject={subject} onBack={() => setSelectedSubject(null)} />;
  }

  return (
    <div className="w-full flex flex-col gap-8 md:gap-10 fade-slide-up pb-12">
      {/* Header Banner */}
      <div className="glass-card p-6 md:p-8 bg-[#26262A] border-0 shadow-xl rounded-[28px]">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#1A1A1D] text-[#F5F5F0] flex items-center justify-center flex-shrink-0 shadow-inner">
            <GraduationCap size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#F5F5F0]">2026 KPSS Lisans Ders & Konu Haritası</h2>
            <p className="text-xs md:text-sm text-[#9E9E9E] mt-1 leading-relaxed">
              ÖSYM sınav standartlarına uygun soru ağırlıkları ile 3 seviyeli (Ders → Ana Konu → Alt Konu) ilerleme takibi
            </p>
          </div>
        </div>
      </div>

      {/* Responsive Subject Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {sortedSubjects.map(subject => {
          const stats = getSubjectStats(subject);
          return (
            <button
              key={subject.id}
              onClick={() => setSelectedSubject(subject.id)}
              className="glass-card glass-card-hover bg-[#26262A] p-6 text-left group flex flex-col justify-between border-0 shadow-md rounded-[28px]"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#1A1A1D] flex items-center justify-center text-3xl group-hover:scale-105 transition-transform shadow-inner">
                    {subject.icon}
                  </div>
                  <div className="text-2xl font-black" style={{ color: subject.accentColor, fontFamily: "'Orbitron', monospace", filter: `drop-shadow(0 0 6px ${subject.accentColor}88)` }}>
                    %{stats.pct}
                  </div>
                </div>

                <h3 className="font-extrabold text-[#F5F5F0] text-lg group-hover:opacity-90 transition-opacity">{subject.name}</h3>
                <p className="text-xs text-[#9E9E9E] mt-1">Sınavda Ortalama {subject.totalWeight} Soru Çıkar</p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#1A1A1D]">
                <div className="h-2 bg-[#1A1A1D] rounded-full overflow-hidden mb-2 shadow-inner">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${stats.pct}%`,
                      background: subject.accentColor,
                      boxShadow: `0 0 8px ${subject.accentColor}88`
                    }}
                  />
                </div>
                <div className="flex justify-between items-center text-xs text-[#9E9E9E]">
                  <span>{stats.completedSubs} / {stats.totalSubs} alt konu bitti</span>
                  <span className="font-semibold group-hover:translate-x-1 transition-transform" style={{ color: subject.accentColor }}>Detay →</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
