import React, { useState, useEffect } from 'react';
import { EXAM_DATE } from '../../data/curriculum';
import { Calendar, Clock, Zap, Target, Sparkles } from 'lucide-react';

function getTimeLeft() {
  const now = new Date();
  const diff = EXAM_DATE - now;
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0 };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return { days, hours, minutes };
}

const pad = (n) => String(n).padStart(2, '0');

export default function ExamCountdown() {
  const [time, setTime] = useState(getTimeLeft());

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 30000);
    return () => clearInterval(id);
  }, []);

  const examDateStr = EXAM_DATE.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });

  // Calculate approximate percentage of preparation period (e.g. 365 days window)
  const totalWindowDays = 365;
  const daysPassed = Math.max(0, totalWindowDays - time.days);
  const prepProgressPct = Math.min(100, Math.max(5, Math.round((daysPassed / totalWindowDays) * 100)));

  return (
    <div className="p-4 sm:p-7 relative overflow-hidden bg-[#18181C] border border-white/10 shadow-2xl rounded-3xl w-full group">
      
      <div className="relative z-10 w-full flex flex-col items-center justify-center space-y-4">
        
        {/* Top Minimalist Pill Badge Header */}
        <div className="flex items-center gap-2">
          <div className="px-3 sm:px-4 py-1.5 rounded-full bg-[#111113] border border-white/5 text-slate-300 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-2 shadow-inner">
            <Clock size={12} className="text-[#FF6B00]" />
            <span>KPSS 2026 LİSANS SINAV SAYAÇ</span>
            <Sparkles size={11} className="text-[#FF6B00]" />
          </div>
        </div>

        {/* 3 Gamified Digit Cards Display */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-5 w-full text-center">
          <div className="bg-[#111113] p-3 sm:p-5 rounded-2xl sm:rounded-[22px] border border-white/5 flex flex-col items-center justify-center shadow-inner transition-transform duration-200 hover:scale-[1.02]">
            <span
              className="text-2xl sm:text-4xl font-extrabold text-[#FF6B00] tracking-tight font-mono"
            >
              {pad(time.days)}
            </span>
            <span className="text-[9px] sm:text-[10px] font-bold text-[#FF6B00] uppercase tracking-widest mt-1">
              GÜN
            </span>
          </div>

          <div className="bg-[#111113] p-3 sm:p-5 rounded-2xl sm:rounded-[22px] border border-white/5 flex flex-col items-center justify-center shadow-inner transition-transform duration-200 hover:scale-[1.02]">
            <span
              className="text-2xl sm:text-4xl font-extrabold text-[#FF6B00] tracking-tight font-mono"
            >
              {pad(time.hours)}
            </span>
            <span className="text-[9px] sm:text-[10px] font-bold text-[#FF6B00] uppercase tracking-widest mt-1">
              SAAT
            </span>
          </div>

          <div className="bg-[#111113] p-3 sm:p-5 rounded-2xl sm:rounded-[22px] border border-white/5 flex flex-col items-center justify-center shadow-inner transition-transform duration-200 hover:scale-[1.02]">
            <span
              className="text-2xl sm:text-4xl font-extrabold text-[#FF6B00] tracking-tight font-mono"
            >
              {pad(time.minutes)}
            </span>
            <span className="text-[9px] sm:text-[10px] font-bold text-[#FF6B00] uppercase tracking-widest mt-1">
              DAKİKA
            </span>
          </div>
        </div>

        {/* Exam Target Date Badge */}
        <div className="pt-2 sm:pt-4">
          <div className="px-4 sm:px-6 py-2 rounded-2xl bg-[#111113] border border-white/5 text-[11px] sm:text-xs font-bold text-slate-300 flex items-center gap-2 shadow-inner">
            <Calendar size={14} className="text-[#FF6B00]" />
            <span>Hedef Sınav Tarihi:</span>
            <span className="text-[#FF6B00] font-extrabold">{examDateStr}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
