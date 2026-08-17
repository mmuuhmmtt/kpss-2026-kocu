import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ChevronRight, ChevronDown, Check, FileText, BookOpen, Sparkles, Layers, GraduationCap, ArrowLeft } from 'lucide-react';
import NoteModal from './NoteModal';

// ─── Subtopic Checkbox Component ───────────────────────────────────────────────
function SubtopicChecklist({ subjectId, topicId, topicTitle, subtopics, topicWeight }) {
  const { state, completeSubtopic, uncompleteSubtopic, unlockBadge } = useApp();
  const [activeNoteSubtopic, setActiveNoteSubtopic] = useState(null);

  const weightPerSubtopic = subtopics.length > 0 ? Math.round((topicWeight / subtopics.length) * 10) / 10 : 0;

  const handleToggle = (sub) => {
    const isDone = !!state.completed[sub.id];
    if (isDone) {
      uncompleteSubtopic(sub.id);
    } else {
      completeSubtopic(subjectId, topicId, sub.id, sub.title, topicTitle, weightPerSubtopic);

      // Check for first_subtopic badge
      if (Object.keys(state.completed).length === 0) {
        unlockBadge('first_subtopic');
      }
    }
  };

  return (
    <div className="space-y-2.5 pt-2 pb-1 px-1">
      {subtopics.map(sub => {
        const isDone = !!state.completed[sub.id];
        const hasNote = !!state.notes[sub.id];

        return (
          <div
            key={sub.id}
            className={`p-3.5 rounded-2xl flex items-center justify-between gap-3 border transition-all ${
              isDone
                ? 'bg-[#1D1D22] border-emerald-500/30 text-white'
                : 'bg-[#18181C] border-white/5 text-slate-300 hover:border-white/15'
            }`}
          >
            {/* Custom Checkbox Pill */}
            <button
              type="button"
              onClick={() => handleToggle(sub)}
              className="flex items-center gap-3 text-left flex-1 cursor-pointer select-none group min-h-[36px]"
            >
              <div
                className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all flex-shrink-0 ${
                  isDone
                    ? 'bg-emerald-500 text-slate-950 font-black shadow-md'
                    : 'border border-white/20 bg-white/5 group-hover:border-white/40'
                }`}
              >
                {isDone && <Check size={14} className="stroke-[3]" />}
              </div>
              <span className={`text-xs sm:text-sm font-semibold transition-colors ${isDone ? 'line-through text-slate-400 font-medium' : 'text-slate-200 group-hover:text-white'}`}>
                {sub.title}
              </span>
            </button>

            {/* Note Action Button */}
            <button
              type="button"
              onClick={() => setActiveNoteSubtopic(sub)}
              className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                hasNote
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
              }`}
              title={hasNote ? 'Notu Görüntüle / Düzenle' : 'Not Ekle'}
            >
              <FileText size={14} />
              {hasNote && <span className="text-[10px] font-bold">Not var</span>}
            </button>
          </div>
        );
      })}

      {activeNoteSubtopic && (
        <NoteModal
          subtopic={activeNoteSubtopic}
          onClose={() => setActiveNoteSubtopic(null)}
        />
      )}
    </div>
  );
}

// ─── Topic Accordion Item Component ───────────────────────────────────────────
function TopicAccordion({ subjectId, topic, defaultOpen }) {
  const { getTopicStats } = useApp();
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const stats = getTopicStats(topic);

  return (
    <div className="bg-[#18181C] border border-white/10 rounded-2xl overflow-hidden shadow-lg transition-all">
      {/* Accordion Header */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left hover:bg-white/5 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-3.5 flex-1 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-[#111113] border border-white/10 text-emerald-400 font-bold flex items-center justify-center text-xs flex-shrink-0 font-mono shadow-inner">
            {stats.pct}%
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="font-extrabold text-white text-sm sm:text-base truncate">{topic.title}</h4>
            <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5 font-medium">
              <span>{topic.weight} Soru Ağırlığı</span>
              <span>•</span>
              <span>{stats.done} / {stats.total} Alt Konu</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Linear Mini Progress Bar */}
          <div className="w-16 sm:w-24 h-2 bg-[#111113] rounded-full overflow-hidden border border-white/5 hidden sm:block">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all duration-500"
              style={{ width: `${stats.pct}%` }}
            />
          </div>

          <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-slate-400">
            {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </div>
        </div>
      </button>

      {/* Accordion Content Body */}
      {isOpen && (
        <div className="p-4 sm:p-5 pt-0 border-t border-white/5 bg-[#121316]/50">
          <SubtopicChecklist
            subjectId={subjectId}
            topicId={topic.id}
            topicTitle={topic.title}
            subtopics={topic.subtopics}
            topicWeight={topic.weight}
          />
        </div>
      )}
    </div>
  );
}

// ─── Subject Detail View Component ───────────────────────────────────────────
function SubjectDetail({ subject, onBack }) {
  const { getSubjectStats } = useApp();

  if (!subject) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-400 text-sm">Ders bulunamadı.</p>
        <button onClick={onBack} className="mt-4 text-emerald-400 font-bold hover:underline">
          Geri Dön
        </button>
      </div>
    );
  }

  const stats = getSubjectStats(subject);

  return (
    <div className="w-full flex flex-col gap-6 fade-slide-up pb-12">
      {/* Top Back Navigation Bar */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-slate-400 hover:text-white font-bold text-xs bg-[#18181C] px-4 py-2.5 rounded-xl border border-white/10 w-fit transition-all cursor-pointer"
      >
        <ArrowLeft size={16} />
        <span>Ders Listesine Dön</span>
      </button>

      {/* Subject Header Banner */}
      <div className="p-6 sm:p-8 bg-[#18181C] border border-white/10 shadow-2xl rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-[#111113] border border-white/10 flex items-center justify-center text-4xl shadow-inner">
            {subject.icon}
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold uppercase tracking-wider mb-1">
              <span>{subject.totalWeight} Soru</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">{subject.name}</h2>
            <p className="text-xs text-slate-400 mt-1 font-medium">
              {stats.completedSubs} / {stats.totalSubs} alt konu tamamlandı
            </p>
          </div>
        </div>

        {/* Overall Percentage Ring Card */}
        <div className="bg-[#111113] p-4 rounded-2xl border border-white/5 flex items-center gap-4 self-stretch sm:self-auto justify-between sm:justify-start shadow-inner">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Ders Başarımı</span>
            <span className="text-xl font-extrabold text-emerald-400 font-mono">%{stats.pct}</span>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-emerald-500/20 border-t-emerald-400 flex items-center justify-center text-xs font-extrabold text-white font-mono">
            %{stats.pct}
          </div>
        </div>
      </div>

      {/* Topics Accordion List */}
      <div className="space-y-4">
        <h3 className="text-sm font-extrabold text-slate-300 uppercase tracking-wider px-1">
          Ana Konular ve Alt Başlıklar ({subject.topics.length} Konu)
        </h3>

        {subject.topics.map((topic, idx) => (
          <TopicAccordion
            key={topic.id}
            subjectId={subject.id}
            topic={topic}
            defaultOpen={idx === 0}
          />
        ))}
      </div>
    </div>
  );
}

// ─── CurriculumView Main Screen ───────────────────────────────────────────────
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
      <div className="p-6 md:p-8 bg-[#18181C] border border-white/10 shadow-2xl rounded-3xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#111113] border border-white/10 text-emerald-400 flex items-center justify-center flex-shrink-0 shadow-inner">
            <GraduationCap size={24} />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white">KPSS Tarih & Coğrafya Ders Haritası</h2>
            <p className="text-xs md:text-sm text-slate-400 mt-1 leading-relaxed font-medium">
              Tarih (27 Soru) ve Coğrafya (18 Soru) konuları için detaylı 3 seviyeli (Ders → Ana Konu → Alt Konu) ilerleme takibi
            </p>
          </div>
        </div>
      </div>

      {/* Responsive Subject Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {sortedSubjects.map(subject => {
          const stats = getSubjectStats(subject);
          return (
            <button
              key={subject.id}
              onClick={() => setSelectedSubject(subject.id)}
              className="p-6 text-left group flex flex-col justify-between border border-white/10 bg-[#18181C] hover:bg-[#202024] rounded-3xl shadow-xl transition-all cursor-pointer"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#111113] border border-white/10 flex items-center justify-center text-3xl group-hover:scale-105 transition-transform shadow-inner">
                    {subject.icon}
                  </div>
                  <div className="text-2xl font-extrabold font-mono text-emerald-400">
                    %{stats.pct}
                  </div>
                </div>

                <h3 className="font-extrabold text-white text-lg group-hover:text-emerald-400 transition-colors">{subject.name}</h3>
                <p className="text-xs text-slate-400 mt-1 font-medium">Sınavda Ortalama {subject.totalWeight} Soru Çıkar</p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5">
                <div className="h-2 bg-[#111113] rounded-full overflow-hidden mb-2 shadow-inner border border-white/5">
                  <div
                    className="h-full rounded-full bg-emerald-500 transition-all duration-700"
                    style={{ width: `${stats.pct}%` }}
                  />
                </div>
                <div className="flex justify-between items-center text-xs text-slate-400 font-medium">
                  <span>{stats.completedSubs} / {stats.totalSubs} alt konu bitti</span>
                  <span className="font-bold text-emerald-400 group-hover:translate-x-1 transition-transform">Detay →</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
