import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Plus, Trash2, BarChart2, TrendingUp, X, Check, AlertCircle } from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

const SUBJECTS = [
  { id: 'turkce', label: 'Türkçe', max: 30, color: '#38BDF8' },
  { id: 'matematik', label: 'Matematik', max: 30, color: '#C084FC' },
];

function calcNet(correct, wrong) {
  return Math.round((correct - wrong / 4) * 100) / 100;
}

function AddExamModal({ onClose }) {
  const { saveExam, unlockBadge, state } = useApp();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [errorMsg, setErrorMsg] = useState('');
  const [scores, setScores] = useState(
    Object.fromEntries(SUBJECTS.map(s => [s.id, { correct: '', wrong: '' }]))
  );

  const updateScore = (subjectId, field, val) => {
    setErrorMsg('');
    const s = SUBJECTS.find(sub => sub.id === subjectId);
    let num = parseFloat(val);
    if (isNaN(num)) num = '';
    else if (num < 0) num = 0;

    const currentScore = scores[subjectId];
    const otherField = field === 'correct' ? 'wrong' : 'correct';
    const otherVal = parseFloat(currentScore[otherField]) || 0;

    if (typeof num === 'number' && num > s.max) {
      setErrorMsg(`⚠️ ${s.label} dersinde maksimum ${s.max} soru bulunmaktadır.`);
      num = s.max;
    } else if (typeof num === 'number' && num + otherVal > s.max) {
      setErrorMsg(`⚠️ ${s.label} dersinde Doğru + Yanlış toplamı ${s.max} soruyu geçemez.`);
    }

    setScores(prev => ({ ...prev, [subjectId]: { ...prev[subjectId], [field]: num } }));
  };

  const handleSave = () => {
    for (const s of SUBJECTS) {
      const c = parseFloat(scores[s.id].correct) || 0;
      const w = parseFloat(scores[s.id].wrong) || 0;
      if (c > s.max) {
        setErrorMsg(`⚠️ ${s.label} dersi için Doğru sayısı ${s.max}'den fazla olamaz!`);
        return;
      }
      if (c + w > s.max) {
        setErrorMsg(`⚠️ ${s.label} dersinde Doğru + Yanlış sayısı toplam ${s.max}'i geçemez!`);
        return;
      }
    }

    const parsedScores = {};
    for (const s of SUBJECTS) {
      const c = parseFloat(scores[s.id].correct) || 0;
      const w = parseFloat(scores[s.id].wrong) || 0;
      parsedScores[s.id] = { correct: c, wrong: w, net: calcNet(c, w) };
    }
    saveExam(title || `GY Denemesi ${state.exams.length + 1}`, date, parsedScores);
    if (state.exams.length === 0) unlockBadge('first_exam');
    const totalNet = Object.values(parsedScores).reduce((sum, s) => sum + s.net, 0);
    if (totalNet >= 45) unlockBadge('high_net');
    onClose();
  };

  const totalNet = useMemo(() => {
    return SUBJECTS.reduce((sum, s) => {
      const c = parseFloat(scores[s.id].correct) || 0;
      const w = parseFloat(scores[s.id].wrong) || 0;
      return sum + calcNet(c, w);
    }, 0);
  }, [scores]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="glass-card w-full max-w-xl p-8 relative fade-slide-up max-h-[90vh] overflow-y-auto border-0 bg-[#26262A] shadow-2xl rounded-[28px]" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-5 right-5 text-[#9E9E9E] hover:text-[#F5F5F0] transition-colors cursor-pointer">
          <X size={20} />
        </button>

        <h3 className="font-black text-[#F5F5F0] text-xl mb-1 flex items-center gap-2.5">
          <span className="text-[#38BDF8]">📝</span> Genel Yetenek Denemesi Kaydet
        </h3>
        <p className="text-xs text-[#9E9E9E] mb-5">
          Türkçe (30 Soru) ve Matematik (30 Soru) olmak üzere 60 Soru Genel Yetenek deneme sonucunuzu girin.
        </p>

        {errorMsg && (
          <div className="mb-4 p-3.5 rounded-2xl bg-[#1A1A1D] text-[#F87171] text-xs font-bold flex items-center gap-2 shadow-inner">
            <AlertCircle size={16} className="text-[#F87171] flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="text-xs font-bold text-[#F5F5F0] uppercase tracking-wider block mb-1.5">Deneme Adı / Yayın</label>
            <input
              className="w-full bg-[#1A1A1D] border-0 rounded-2xl px-4 py-3 text-sm text-[#F5F5F0] placeholder-[#9E9E9E] focus:outline-none shadow-inner"
              placeholder="Örn: Yediiklim Türkiye Geneli 1"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="text-xs font-bold text-[#F5F5F0] uppercase tracking-wider block mb-1.5">Tarih</label>
            <input
              type="date"
              className="w-full bg-[#1A1A1D] border-0 rounded-2xl px-4 py-3 text-sm text-[#F5F5F0] focus:outline-none shadow-inner"
              value={date}
              onChange={e => setDate(e.target.value)}
            />
          </div>
        </div>

        {/* Scores Table Inputs */}
        <div className="space-y-3 mb-6 bg-[#1A1A1D] p-4 rounded-[22px] shadow-inner">
          <div className="grid grid-cols-5 gap-3 text-xs font-bold text-[#9E9E9E] uppercase tracking-wider px-2 mb-1">
            <div className="col-span-2">Ders & Soru Sayısı</div>
            <div className="text-center text-[#34D399]">Doğru</div>
            <div className="text-center text-[#F87171]">Yanlış</div>
            <div className="text-right text-[#FF6B00]">Net</div>
          </div>

          {SUBJECTS.map(s => {
            const c = parseFloat(scores[s.id].correct) || 0;
            const w = parseFloat(scores[s.id].wrong) || 0;
            const net = calcNet(c, w);

            return (
              <div key={s.id} className="grid grid-cols-5 gap-3 items-center p-3 rounded-2xl bg-[#26262A] border-0 shadow-sm">
                <div className="col-span-2 flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: s.color }} />
                  <span className="text-sm font-extrabold text-[#F5F5F0]">{s.label}</span>
                </div>
                <input
                  type="number"
                  min="0"
                  max={s.max}
                  className="bg-[#1A1A1D] border-0 rounded-xl px-3 py-1.5 text-sm text-center font-bold text-[#34D399] focus:outline-none shadow-inner"
                  value={scores[s.id].correct}
                  onChange={e => updateScore(s.id, 'correct', e.target.value)}
                  placeholder="0"
                />
                <input
                  type="number"
                  min="0"
                  max={s.max}
                  className="bg-[#1A1A1D] border-0 rounded-xl px-3 py-1.5 text-sm text-center font-bold text-[#F87171] focus:outline-none shadow-inner"
                  value={scores[s.id].wrong}
                  onChange={e => updateScore(s.id, 'wrong', e.target.value)}
                  placeholder="0"
                />
                <div className="text-right font-black text-sm text-[#FF6B00] font-mono">
                  {net.toFixed(2)}
                </div>
              </div>
            );
          })}
        </div>

        {/* Total Summary Row */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-[#1A1A1D] shadow-inner mb-6">
          <span className="text-sm font-bold text-[#F5F5F0]">Hesaplanan Toplam Net</span>
          <span className="text-2xl font-black text-[#FF6B00]" style={{ fontFamily: "'Orbitron', monospace", filter: 'drop-shadow(0 0 8px rgba(255, 107, 0, 0.45))' }}>
            {totalNet.toFixed(2)} / 120
          </span>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button onClick={onClose} className="px-5 py-2.5 rounded-xl text-sm font-medium text-[#9E9E9E] hover:text-[#F5F5F0] transition-colors cursor-pointer">
            İptal
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-black text-[#1A1A1D] bg-[#FF6B00] hover:opacity-90 transition-all cursor-pointer shadow-xl"
            style={{ filter: 'drop-shadow(0 0 10px rgba(255, 107, 0, 0.45))' }}
          >
            <Check size={18} /> Denemeyi Kaydet
          </button>
        </div>
      </div>
    </div>
  );
}

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="glass-card p-4 text-xs space-y-2 border-0 bg-[#1A1A1D] shadow-xl text-[#F5F5F0] rounded-2xl">
        <div className="font-extrabold text-[#F5F5F0] border-b border-[#26262A] pb-1.5">{data.fullTitle || label} ({data.date})</div>
        <div className="flex justify-between gap-6 font-bold text-sm text-[#F5F5F0]">
          <span>Toplam Net:</span>
          <span className="font-mono font-black text-[#FF6B00]">{data.total?.toFixed(2)} / 120</span>
        </div>
        <div className="space-y-1.5 pt-1">
          {SUBJECTS.map(s => (
            <div key={s.id} className="flex justify-between gap-4">
              <span className="flex items-center gap-1.5 text-[#9E9E9E]">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: s.color }} />
                {s.label}:
              </span>
              <span className="font-bold font-mono text-xs" style={{ color: s.color }}>{data[s.id]?.toFixed(1)} Net</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
}

export default function MockExamTracker() {
  const { state, deleteExam } = useApp();
  const [showAdd, setShowAdd] = useState(false);
  const [activeFilter, setActiveFilter] = useState('total');

  const calcNetForExam = (exam) => {
    return Object.values(exam.scores).reduce((sum, item) => {
      const c = parseFloat(item.correct) || 0;
      const w = parseFloat(item.wrong) || 0;
      return sum + (c - w / 4);
    }, 0);
  };

  const sortedExams = useMemo(() => {
    return [...state.exams].sort((a, b) => (a.date || '').localeCompare(b.date || ''));
  }, [state.exams]);

  const totals = sortedExams.map(calcNetForExam);
  const bestTotal = totals.length > 0 ? Math.max(...totals) : 0;
  const avgTotal = totals.length > 0 ? totals.reduce((a, b) => a + b, 0) / totals.length : 0;

  const chartData = useMemo(() => {
    return sortedExams.map((exam, i) => {
      const total = calcNetForExam(exam);
      const obj = {
        name: exam.title ? (exam.title.length > 12 ? `${exam.title.slice(0, 12)}...` : exam.title) : `Deneme ${i + 1}`,
        fullTitle: exam.title || `Deneme ${i + 1}`,
        date: exam.date,
        total: Math.round(total * 100) / 100,
      };
      SUBJECTS.forEach(s => {
        const item = exam.scores[s.id] || {};
        const c = parseFloat(item.correct) || 0;
        const w = parseFloat(item.wrong) || 0;
        obj[s.id] = calcNet(c, w);
      });
      return obj;
    });
  }, [sortedExams]);

  const activeSubject = SUBJECTS.find(s => s.id === activeFilter);
  const activeColor = activeFilter === 'total' ? '#FF6B00' : (activeSubject?.color || '#FF6B00');
  const activeLabel = activeFilter === 'total' ? 'Toplam Net' : activeSubject?.label;
  const maxAxisDomain = activeFilter === 'total' ? 60 : (activeSubject?.max || 30);

  return (
    <div className="fade-slide-up flex flex-col gap-8 md:gap-10 pb-8">
      {/* Header Banner */}
      <div className="p-6 md:p-8 bg-[#16171C]/90 backdrop-blur-xl border border-white/10 text-center shadow-2xl rounded-[28px]">
        <h2 className="text-2xl font-black text-white flex items-center justify-center gap-2.5 tracking-tight">
          <BarChart2 size={26} className="text-[#FF6B00]" /> Genel Yetenek Deneme Analizi (Türkçe & Matematik)
        </h2>
        <p className="text-xs text-slate-400 mt-1 font-medium">60 Soru Genel Yetenek (Türkçe: 30 Soru, Matematik: 30 Soru) performans takibi</p>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-6 bg-[#1F170C]/90 backdrop-blur-xl border border-amber-500/30 shadow-2xl rounded-[24px]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-black uppercase tracking-wider text-amber-400">ÇÖZÜLEN DENEME</span>
          </div>
          <div className="text-4xl font-black text-amber-400 mb-1 font-mono">
            {state.exams.length}
          </div>
          <div className="text-xs text-slate-400 font-medium">Kaydedilen toplam deneme</div>
        </div>

        <div className="p-6 bg-[#0B2019]/90 backdrop-blur-xl border border-emerald-500/30 shadow-2xl rounded-[24px]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-400">EN YÜKSEK NET</span>
          </div>
          <div className="text-4xl font-black text-emerald-400 mb-1 font-mono">
            {bestTotal.toFixed(1)}
          </div>
          <div className="text-xs text-slate-400 font-medium">Rekor net puanın</div>
        </div>

        <div className="p-6 bg-[#1A122C]/90 backdrop-blur-xl border border-purple-500/30 shadow-2xl rounded-[24px]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-black uppercase tracking-wider text-purple-400">ORTALAMA NET</span>
          </div>
          <div className="text-4xl font-black text-purple-400 mb-1 font-mono">
            {avgTotal.toFixed(1)}
          </div>
          <div className="text-xs text-slate-400 font-medium">Tüm denemelerin ortalaması</div>
        </div>
      </div>

      {/* Clean Sparkline Chart */}
      {chartData.length >= 1 ? (
        <div className="glass-card p-6 md:p-8 border-0 bg-[#26262A] shadow-xl rounded-[28px]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-base font-extrabold text-[#F5F5F0] flex items-center gap-2">
                <TrendingUp size={18} style={{ color: activeColor }} /> Net Gelişim Grafiği
              </h3>
            </div>

            {/* Filter Tabs for Subject Visuals */}
            <div className="flex items-center gap-1.5 flex-wrap bg-[#1A1A1D] p-2 rounded-full shadow-inner">
              <button
                onClick={() => setActiveFilter('total')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black transition-all cursor-pointer ${
                  activeFilter === 'total'
                    ? 'bg-[#FF6B00] text-[#1A1A1D] shadow-md scale-[1.02]'
                    : 'text-[#9E9E9E] hover:text-[#F5F5F0] hover:bg-[#26262A]'
                }`}
                style={activeFilter === 'total' ? { filter: 'drop-shadow(0 0 8px rgba(255, 107, 0, 0.45))' } : {}}
              >
                <span>Toplam Net</span>
              </button>

              {SUBJECTS.map((s) => {
                const isActive = activeFilter === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => setActiveFilter(s.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black transition-all cursor-pointer ${
                      isActive
                        ? 'text-[#1A1A1D] shadow-md scale-[1.02]'
                        : 'text-[#9E9E9E] hover:text-[#F5F5F0] hover:bg-[#26262A]'
                    }`}
                    style={isActive ? { background: s.color, filter: `drop-shadow(0 0 8px ${s.color}66)` } : {}}
                  >
                    <span>{s.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 20, left: -10, bottom: 10 }}>
                <defs>
                  <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={activeColor} stopOpacity={0.35} />
                    <stop offset="95%" stopColor={activeColor} stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1A1A1D" />
                <XAxis dataKey="name" tick={{ fill: '#9E9E9E', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, maxAxisDomain]} tick={{ fill: '#9E9E9E', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                {/* Glowing Subject-Specific Sparkline Line */}
                <Area
                  type="monotone"
                  dataKey={activeFilter}
                  name={activeLabel}
                  stroke={activeColor}
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorNet)"
                  dot={{ fill: activeColor, r: 4, strokeWidth: 2, stroke: '#1A1A1D' }}
                  activeDot={{ r: 6, stroke: activeColor, strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : null}

      {/* Standalone Glass Card Banner for 'Yeni Deneme Ekle' Button */}
      <div className="glass-card p-6 md:p-8 border-0 bg-[#26262A] shadow-xl rounded-[28px] flex justify-center items-center my-2">
        <button
          onClick={() => setShowAdd(true)}
          className="w-full sm:w-auto flex items-center justify-center gap-3 px-12 py-4.5 rounded-full text-base font-black text-[#1A1A1D] bg-[#FF6B00] hover:scale-[1.03] active:scale-95 transition-all shadow-2xl cursor-pointer"
          style={{ filter: 'drop-shadow(0 0 14px rgba(255, 107, 0, 0.5))' }}
        >
          <Plus size={22} className="stroke-[3]" /> Yeni Deneme Ekle
        </button>
      </div>

      {/* Exam List Grid */}
      <div className="space-y-4">
        <h3 className="text-base font-extrabold text-[#F5F5F0] flex items-center gap-2">
          <span>📋</span> Kaydedilen Deneme Geçmişi
        </h3>

        {[...state.exams].reverse().map(exam => {
          const total = Object.values(exam.scores).reduce((s, v) => s + (v.net || 0), 0);
          return (
            <div key={exam.id} className="glass-card p-6 border-0 bg-[#26262A] shadow-md rounded-[24px] hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-[#1A1A1D]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#1A1A1D] text-[#FF6B00] flex items-center justify-center font-bold shadow-inner text-lg">
                    📝
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#F5F5F0] text-base">{exam.title}</h4>
                    <span className="text-xs text-[#9E9E9E]">{new Date(exam.date + 'T00:00:00').toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-[11px] uppercase tracking-wider text-[#FF6B00] font-bold block">Toplam Net</span>
                    <span className="text-2xl font-black text-[#FF6B00]" style={{ fontFamily: "'Orbitron', monospace", filter: 'drop-shadow(0 0 6px rgba(255, 107, 0, 0.45))' }}>
                      {total.toFixed(2)}
                    </span>
                  </div>
                  <button
                    onClick={() => deleteExam(exam.id)}
                    className="p-2 rounded-xl text-[#9E9E9E] hover:text-[#F87171] transition-colors cursor-pointer"
                    title="Sil"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Per-subject Score Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {SUBJECTS.map(s => {
                  const score = exam.scores[s.id] || { correct: 0, wrong: 0, net: 0 };
                  return (
                    <div key={s.id} className="p-3.5 rounded-2xl bg-[#1A1A1D] shadow-inner text-center">
                      <div className="text-xs font-bold text-[#9E9E9E] mb-1">{s.label}</div>
                      <div className="text-base font-black text-[#38BDF8] font-mono">
                        {(score.net || 0).toFixed(1)}
                      </div>
                      <div className="text-[11px] text-[#9E9E9E] mt-0.5">
                        <span className="text-[#34D399] font-semibold">{score.correct}D</span> / <span className="text-[#F87171] font-semibold">{score.wrong}Y</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {showAdd && <AddExamModal onClose={() => setShowAdd(false)} />}
    </div>
  );
}
