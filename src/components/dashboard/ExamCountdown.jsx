import React, { useState, useEffect } from 'react';
import { EXAM_DATE } from '../../data/curriculum';
import { Calendar, Clock, Sparkles } from 'lucide-react';

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

  return (
    <div className="p-6 sm:p-9 md:p-10 relative overflow-hidden bg-[#16171C]/90 backdrop-blur-xl border border-[#FF6B00]/30 shadow-[0_25px_60px_-15px_rgba(255,107,0,0.2)] rounded-[32px] w-full group border-t border-t-white/10">
      
      {/* Background Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-[#FF6B00]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full flex flex-col items-center justify-center space-y-6">
        
        {/* Top Minimalist Pill Badge Header */}
        <div className="flex items-center gap-2">
          <div className="px-4 py-2 rounded-full bg-[#FF6B00]/10 border border-[#FF6B00]/25 text-[#FF6B00] text-xs sm:text-sm font-black uppercase tracking-wider flex items-center gap-2 shadow-sm">
            <Clock size={15} className="text-[#FF6B00]" />
            <span>KPSS 2026 LİSANS SINAV SAYAÇ</span>
            <Sparkles size={14} className="text-[#FF6B00]" />
          </div>
        </div>

        {/* 3 Gamified ENLARGED Digit Cards Display */}
        <div className="grid grid-cols-3 gap-3 sm:gap-6 md:gap-8 w-full text-center">
          
          {/* GÜN */}
          <div className="bg-[#111113]/90 p-4 sm:p-7 md:p-8 rounded-3xl border border-white/10 flex flex-col items-center justify-center shadow-2xl transition-transform duration-200 hover:scale-[1.03]">
            <span
              className="text-3xl sm:text-5xl md:text-6xl font-black text-[#FF6B00] tracking-tight font-mono"
              style={{ filter: 'drop-shadow(0 0 14px rgba(255, 107, 0, 0.45))' }}
            >
              {pad(time.days)}
            </span>
            <span className="text-[10px] sm:text-xs font-black text-[#FF6B00] uppercase tracking-widest mt-2">
              GÜN
            </span>
          </div>

          {/* SAAT */}
          <div className="bg-[#111113]/90 p-4 sm:p-7 md:p-8 rounded-3xl border border-white/10 flex flex-col items-center justify-center shadow-2xl transition-transform duration-200 hover:scale-[1.03]">
            <span
              className="text-3xl sm:text-5xl md:text-6xl font-black text-[#FF6B00] tracking-tight font-mono"
              style={{ filter: 'drop-shadow(0 0 14px rgba(255, 107, 0, 0.45))' }}
            >
              {pad(time.hours)}
            </span>
            <span className="text-[10px] sm:text-xs font-black text-[#FF6B00] uppercase tracking-widest mt-2">
              SAAT
            </span>
          </div>

          {/* DAKİKA */}
          <div className="bg-[#111113]/90 p-4 sm:p-7 md:p-8 rounded-3xl border border-white/10 flex flex-col items-center justify-center shadow-2xl transition-transform duration-200 hover:scale-[1.03]">
            <span
              className="text-3xl sm:text-5xl md:text-6xl font-black text-[#FF6B00] tracking-tight font-mono"
              style={{ filter: 'drop-shadow(0 0 14px rgba(255, 107, 0, 0.45))' }}
            >
              {pad(time.minutes)}
            </span>
            <span className="text-[10px] sm:text-xs font-black text-[#FF6B00] uppercase tracking-widest mt-2">
              DAKİKA
            </span>
          </div>

        </div>

        {/* Exam Target Date Badge */}
        <div className="pt-2">
          <div className="px-5 sm:px-7 py-2.5 rounded-2xl bg-[#111113] border border-white/10 text-xs sm:text-sm font-extrabold text-slate-200 flex items-center gap-2 shadow-inner">
            <Calendar size={16} className="text-[#FF6B00]" />
            <span>Hedef Sınav Tarihi:</span>
            <span className="text-[#FF6B00] font-black">{examDateStr} (Pazar)</span>
          </div>
        </div>

      </div>
    </div>
  );
}
