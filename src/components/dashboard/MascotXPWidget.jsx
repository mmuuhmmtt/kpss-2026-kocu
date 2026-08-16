import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Zap, Sparkles, MessageCircle, Trophy } from 'lucide-react';

const MASCOT_QUOTES = [
  "Bugün çözdüğün her soru, seni hayalindeki atamaya bir adım daha yaklaştırıyor! 🎯",
  "Unutma eğrisini yenmek senin elinde! Tekrar modülünü kontrol etmeyi unutma 🧠",
  "Düzenli çalışmak zekayı yener. Harika bir seri yakaladın! 🔥",
  "KPSS Lisans kadrosu seni bekliyor. Pes etmek yok, devam! 🚀",
  "Türkçe ve Matematik netlerini yüksek tutmak seni öne geçirecektir ✨",
  "Biraz dinlenip tekrar odaklan! Zihnin en güçlü silahın 💡",
  "Zorluklar, başarının değerini artıran süslerdir. İnancını koru! 🌟",
  "Atama gününde hissedeceğin o büyük gururu hatırla ve devam et! 🏆",
  "Disiplin, ne istediğin ile şu an ne istediğin arasındaki seçimdir. ⏳",
  "Günde 1 derece bile yön değiştirsen, yıl sonunda bambaşka bir yerdesin! 📈",
  "Her gün çözülen 50 soru, yılda 18.000 soru eder. Damlaya damlaya göl olur! 💧",
  "Sınav salonundan çıktığında 'Elimden gelenin en iyisini yaptım' diyeceksin! 💯",
  "KPSS bir marathon koşusudur; hızlanan değil, durmayan kazanır! 🏃‍♂️",
  "Gelecekteki memuriyet hayatın bugünkü 1 saatlik odaklanmana bağlı! 🎓",
  "Yapamadığın her soru, sınav öncesi fark edilmiş büyük bir fırsattır! 🔎",
  "Yorgunluğun geçecek ama kazandığın unvan ömür boyu seninle kalacak! 🎖️",
  "Kendine inan; başaranların senden tek farkı vazgeçmemiş olmalarıdır! ✨",
  "Sorularla boğuşurken değil, vazgeçtiğinde kaybedersin. İlerle! ⚔️",
  "Her doğru cevap, atama puanına eklenen altın bir halkadır. 🥇",
  "Sessizce çalış, başarın gürültü çıkarsın! 🤫🚀",
  "Uykudan feragat ettiğin geceler, geleceğine yazdığın mektuplardır. 📖",
  "Hayallerine giden yol zorlu olabilir ama manzarası muazzam olacak! 🏔️",
  "Bugünkü emeğin, yarınki bağımsızlığın ve huzurundur! 🌱",
  "İstikrar, başarının gizli anahtarıdır. Bugün de başardın! 🔑",
  "KPSS şampiyonları pes etmeyenlerden çıkar. Sen de onlardan birisin! 🥇",
];

export default function MascotXPWidget() {
  const { state, getLevelInfo, removeXpPopup } = useApp();
  const levelInfo = getLevelInfo();

  const xpInLevel = levelInfo.next ? state.xp - levelInfo.xp : 0;
  const xpNeeded = levelInfo.next ? levelInfo.next.xp - levelInfo.xp : 1;
  const pct = levelInfo.next ? Math.min(100, Math.round((xpInLevel / xpNeeded) * 100)) : 100;

  // Quote rotation state (rotates every 1 minute)
  const [quoteIndex, setQuoteIndex] = useState(() => Math.floor(Date.now() / 60000) % MASCOT_QUOTES.length);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex(prev => (prev + 1) % MASCOT_QUOTES.length);
    }, 60000); // 1 minute (60,000 ms)
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
    setShowQuoteBubble(true);
  };

  // Determine Mascot Icon & Mood based on level
  let mascotEmoji = '🎓';
  let mascotTitle = 'Bilge Baykuş';
  if (levelInfo.level >= 8) {
    mascotEmoji = '👑';
    mascotTitle = 'Efsane KPSS Koçu';
  } else if (levelInfo.level >= 5) {
    mascotEmoji = '⚡';
    mascotTitle = 'Master KPSS Avcısı';
  } else if (levelInfo.level >= 3) {
    mascotEmoji = '🎯';
    mascotTitle = 'Kararlı Öğrenci';
  }

  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (pct / 100) * circumference;

  return (
    <div className="glass-card p-5 md:p-7 relative overflow-hidden border-0 bg-[#26262A] shadow-xl rounded-[28px]">
      
      {/* XP Popups Floating */}
      {state.xpPopups.map(popup => (
        <div key={popup.id} className="xp-popup" style={{ top: '15px', right: '30px' }}>
          {popup.amount}
        </div>
      ))}

      <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
        
        {/* Left Visual: Mascot Avatar embedded inside SVG Circular Progress Ring */}
        <div className="flex flex-col items-center flex-shrink-0 relative group cursor-pointer">
          <div className="relative w-28 h-28 flex items-center justify-center">
            {/* SVG Circular Progress Ring */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 96 96">
              {/* Background Track */}
              <circle
                cx="48"
                cy="48"
                r={radius}
                className="text-[#1A1A1D]"
                strokeWidth="7"
                stroke="currentColor"
                fill="transparent"
              />
              {/* Off-White & Gold Progress Ring */}
              <circle
                cx="48"
                cy="48"
                r={radius}
                stroke="#FBBF24"
                strokeWidth="7"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-700 ease-out"
                style={{ filter: 'drop-shadow(0 0 6px rgba(251, 191, 36, 0.4))' }}
              />
            </svg>

            {/* Inner Mascot Avatar Center */}
            <div className="absolute inset-3 rounded-full bg-[#1A1A1D] flex flex-col items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
              <span className="text-3xl mascot-animate select-none">{mascotEmoji}</span>
              <span className="text-[10px] font-black text-[#FBBF24] uppercase tracking-tighter mt-0.5" style={{ fontFamily: "'Orbitron', monospace" }}>
                %{pct}
              </span>
            </div>

            {/* Level Badge Overlay at bottom */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#FBBF24] text-[#1A1A1D] font-black text-[11px] shadow-md flex items-center gap-1">
              <Zap size={11} className="fill-[#1A1A1D] text-[#1A1A1D]" />
              <span>Lvl {levelInfo.level}</span>
            </div>
          </div>

          <div className="text-[11px] text-[#FBBF24] font-extrabold mt-2 flex items-center gap-1 hover:opacity-80">
            <MessageCircle size={12} />
            <span>{mascotTitle}</span>
          </div>
        </div>

        {/* Right Info: Level Progress Details & Prominent Mascot Speech Card */}
        <div className="flex-1 w-full space-y-4">
          
          {/* Mascot Motivational Quote Card */}
          <div className="relative bg-[#1A1A1D] p-5 rounded-[22px] shadow-inner flex items-center justify-center text-center">
            <p className="text-base md:text-lg font-semibold text-[#F5F5F0] italic leading-relaxed text-center px-2">
              "{MASCOT_QUOTES[quoteIndex]}"
            </p>
          </div>

          {/* Level Title and Total XP */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-0.5">
            <div>
              <div className="flex items-center gap-2">
                <Trophy size={20} className="text-[#FBBF24]" />
                <h3 className="font-black text-[#FBBF24] text-lg md:text-xl tracking-tight" style={{ filter: 'drop-shadow(0 0 6px rgba(251, 191, 36, 0.35))' }}>
                  {levelInfo.title}
                </h3>
              </div>
              <p className="text-xs text-[#9E9E9E] mt-0.5 font-medium">
                {levelInfo.next ? `Sonraki Hedef: Unvan - ${levelInfo.next.title}` : '🏆 En Yüksek Seviyedesin!'}
              </p>
            </div>

            <div className="bg-[#1A1A1D] px-4 py-2 rounded-2xl flex items-center justify-between sm:justify-start gap-2 self-start sm:self-auto shadow-inner">
              <span className="text-xs text-[#9E9E9E] font-semibold">Toplam XP:</span>
              <span className="text-sm font-black text-[#FBBF24] font-mono tracking-wide" style={{ fontFamily: "'Orbitron', monospace", filter: 'drop-shadow(0 0 4px rgba(251, 191, 36, 0.3))' }}>
                {state.xp.toLocaleString('tr-TR')} XP
              </span>
            </div>
          </div>

          {/* Detailed Linear XP Progress Bar */}
          <div>
            <div className="flex justify-between items-center text-xs font-semibold text-[#9E9E9E] mb-2">
              <span>Seviye İlerlemesi (%{pct})</span>
              {levelInfo.next ? (
                <span className="text-[#F5F5F0] font-mono">
                  {xpInLevel} / {xpNeeded} XP
                </span>
              ) : (
                <span className="text-[#F5F5F0]">Maksimum Seviye</span>
              )}
            </div>
            <div className="h-3.5 bg-[#1A1A1D] rounded-full p-0.5 overflow-hidden shadow-inner relative">
              <div
                className="h-full rounded-full futuristic-progress-fill transition-all duration-700 ease-out"
                style={{
                  width: `${pct}%`,
                }}
              />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
