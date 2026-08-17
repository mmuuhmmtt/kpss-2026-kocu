import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Zap, Sparkles, MessageSquare, Trophy, Compass, Landmark } from 'lucide-react';

const MASCOT_QUOTES = [
  "Tarih ve Coğrafya netlerin, KPSS başarının en güçlü temelini oluşturur! 🏛️🌍",
  "Tarihte sebep-sonuç ilişkilerini kurmak, ezberi kalıcı bilgiye dönüştürür. 🧠",
  "Harita bilgisi Coğrafya'da 5 net demektir; harita üzerindeki detayları ihmal etme! 🗺️",
  "Unutma eğrisini yenmek senin elinde! Tekrar modülünü düzenli kontrol et. ⏳",
  "Tarih kilit tarihlerden ziyade dönüm noktalarıyla öğrenilir. Harika ilerliyorsun! 🏆",
  "Düzenli çalışma disiplini zekayı yener. Seri hedefini koru! 🔥",
  "Coğrafya'da iklim ve yeryüzü şekilleri bağlantısını kurduğunda sorular çok kolaylaşır. 💡",
  "KPSS Lisans derecen için her gün attığın küçük adımlar büyük fark yaratacak! 🚀",
  "Zorlandığın konular, sınav günü en emin olduğun sorular haline gelecek! 🎯",
  "Disiplin, gelecekteki başarın için bugünkü odaklanmandır. 🛡️",
];

export default function MascotXPWidget() {
  const { state, getLevelInfo, removeXpPopup } = useApp();
  const levelInfo = getLevelInfo();

  const xpInLevel = levelInfo.next ? state.xp - levelInfo.xp : 0;
  const xpNeeded = levelInfo.next ? levelInfo.next.xp - levelInfo.xp : 1;
  const pct = levelInfo.next ? Math.min(100, Math.round((xpInLevel / xpNeeded) * 100)) : 100;

  const [quoteIndex, setQuoteIndex] = useState(() => Math.floor(Date.now() / 60000) % MASCOT_QUOTES.length);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex(prev => (prev + 1) % MASCOT_QUOTES.length);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    state.xpPopups.forEach(popup => {
      const timer = setTimeout(() => removeXpPopup(popup.id), 1900);
      return () => clearTimeout(timer);
    });
  }, [state.xpPopups, removeXpPopup]);

  const handleMascotClick = () => {
    setQuoteIndex((prev) => (prev + 1) % MASCOT_QUOTES.length);
  };

  let mascotEmoji = '🏛️';
  let mascotTitle = 'Tarih & Coğrafya Koçu';
  if (levelInfo.level >= 8) {
    mascotEmoji = '👑';
    mascotTitle = 'Uzman KPSS Stratejisti';
  } else if (levelInfo.level >= 5) {
    mascotEmoji = '⚡';
    mascotTitle = 'Kıdemli Araştırmacı';
  } else if (levelInfo.level >= 3) {
    mascotEmoji = '🎯';
    mascotTitle = 'Kararlı Öğrenci';
  }

  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (pct / 100) * circumference;

  return (
    <div className="p-6 md:p-8 relative overflow-hidden bg-[#18181B] border border-white/10 shadow-2xl rounded-3xl">
      
      {/* XP Popups Floating */}
      {state.xpPopups.map(popup => (
        <div key={popup.id} className="xp-popup" style={{ top: '15px', right: '30px' }}>
          {popup.amount}
        </div>
      ))}

      <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
        
        {/* Circular Progress Ring */}
        <div className="flex flex-col items-center flex-shrink-0 relative group cursor-pointer" onClick={handleMascotClick}>
          <div className="relative w-28 h-28 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 96 96">
              <circle
                cx="48"
                cy="48"
                r={radius}
                className="text-[#26262A]"
                strokeWidth="6"
                stroke="currentColor"
                fill="transparent"
              />
              <circle
                cx="48"
                cy="48"
                r={radius}
                stroke="#FF6B00"
                strokeWidth="6"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-700 ease-out"
              />
            </svg>

            <div className="absolute inset-3 rounded-full bg-[#111113] border border-white/10 flex flex-col items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
              <span className="text-3xl select-none">{mascotEmoji}</span>
              <span className="text-[10px] font-extrabold text-[#FF6B00] font-mono mt-0.5">
                %{pct}
              </span>
            </div>

            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#FF6B00] text-[#1A1A1D] font-extrabold text-[11px] shadow-md flex items-center gap-1">
              <Zap size={11} className="fill-[#1A1A1D] text-[#1A1A1D]" />
              <span>Lvl {levelInfo.level}</span>
            </div>
          </div>

          <div className="text-[11px] text-[#FF6B00] font-bold mt-2 flex items-center gap-1 hover:opacity-80">
            <MessageSquare size={12} />
            <span>{mascotTitle}</span>
          </div>
        </div>

        {/* Level Details & Speech Box */}
        <div className="flex-1 w-full space-y-4">
          
          <div className="relative bg-[#111113] p-5 rounded-2xl border border-white/5 shadow-inner flex items-center justify-center text-center">
            <p className="text-sm md:text-base font-medium text-slate-200 leading-relaxed italic text-center px-2">
              "{MASCOT_QUOTES[quoteIndex]}"
            </p>
          </div>

          <div className="flex items-center justify-between gap-2 pt-1">
            <div className="flex items-center gap-2">
              <Compass size={18} className="text-[#FF6B00]" />
              <h3 className="font-extrabold text-white text-sm sm:text-base tracking-tight">
                KPSS Tarih & Coğrafya Strateji Asistanı
              </h3>
            </div>

            <div className="bg-[#111113] px-3.5 py-1.5 rounded-xl border border-white/5 flex items-center gap-2 shadow-inner">
              <span className="text-xs text-slate-400 font-medium">Toplam XP:</span>
              <span className="text-xs sm:text-sm font-extrabold text-[#FF6B00] font-mono tracking-wide">
                {state.xp.toLocaleString('tr-TR')} XP
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
