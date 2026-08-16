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
    <div className="glass-card p-5 md:p-7 relative overflow-hidden border-0 bg-[#26262A] shadow-xl rounded-[28px] w-full group">
      
      <div className="relative z-10 w-full flex flex-col items-center justify-center space-y-4">
        
        {/* Top Minimalist Pill Badge Header */}
        <div className="flex items-center gap-2">
          <div className="px-4 py-1.5 rounded-full bg-[#1A1A1D] text-[#F5F5F0] text-[11px] font-black uppercase tracking-wider flex items-center gap-2 shadow-inner">
            <Clock size={12} className="text-[#F5F5F0]" />
            <span>KPSS 2026 LİSANS SINAV SAYAÇ</span>
            <Sparkles size={11} className="text-[#F5F5F0]" />
          </div>
        </div>

        {/* 3 Gamified Digit Cards Display (All Uniform Vibrant Claude Neon Orange #FF6B00) */}
        <div className="grid grid-cols-3 gap-3 md:gap-5 w-full text-center">
          <div className="bg-[#1A1A1D] p-3.5 md:p-5 rounded-[22px] flex flex-col items-center justify-center shadow-inner transition-transform duration-200 hover:scale-[1.02]">
            <span
              className="text-3xl md:text-4xl font-black text-[#FF6B00] tracking-tight"
              style={{ fontFamily: "'Orbitron', monospace", filter: 'drop-shadow(0 0 8px rgba(255, 107, 0, 0.45))' }}
            >
              {pad(time.days)}
            </span>
            <span className="text-[9px] md:text-[10px] font-black text-[#FF6B00] uppercase tracking-widest mt-1">
              GÜN
            </span>
          </div>

          <div className="bg-[#1A1A1D] p-3.5 md:p-5 rounded-[22px] flex flex-col items-center justify-center shadow-inner transition-transform duration-200 hover:scale-[1.02]">
            <span
              className="text-3xl md:text-4xl font-black text-[#FF6B00] tracking-tight"
              style={{ fontFamily: "'Orbitron', monospace", filter: 'drop-shadow(0 0 8px rgba(255, 107, 0, 0.45))' }}
            >
              {pad(time.hours)}
            </span>
            <span className="text-[9px] md:text-[10px] font-black text-[#FF6B00] uppercase tracking-widest mt-1">
              SAAT
            </span>
          </div>

          <div className="bg-[#1A1A1D] p-3.5 md:p-5 rounded-[22px] flex flex-col items-center justify-center shadow-inner transition-transform duration-200 hover:scale-[1.02]">
            <span
              className="text-3xl md:text-4xl font-black text-[#FF6B00] tracking-tight"
              style={{ fontFamily: "'Orbitron', monospace", filter: 'drop-shadow(0 0 8px rgba(255, 107, 0, 0.45))' }}
            >
              {pad(time.minutes)}
            </span>
            <span className="text-[9px] md:text-[10px] font-black text-[#FF6B00] uppercase tracking-widest mt-1">
              DAKİKA
            </span>
          </div>
        </div>

        {/* Exam Target Date Badge with Spacious Gap */}
        <div className="pt-4 mt-2">
          <div className="px-6 py-2.5 rounded-2xl bg-[#1A1A1D] text-xs font-extrabold text-[#F5F5F0] flex items-center gap-2 shadow-inner">
            <Calendar size={15} className="text-[#FF6B00]" />
            <span>Hedef Sınav Tarihi:</span>
            <span className="text-[#FF6B00] font-black">{examDateStr} (Pazar)</span>
          </div>
        </div>

      </div>
    </div>
  );
}
