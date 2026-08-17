import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { MessageSquare, Sparkles, Trophy, Zap, Compass } from 'lucide-react';

const MASCOT_QUOTES = [
  "Tarih ve Coğrafya'da başaranlar, düzenli harita okuyanlar ve kronoloji takibi yapanlardır!",
  "Küçük günlük net artışları, sınav günü büyük zaferler getirir. Devam et!",
  "Osmanlı Kültür & Uygarlığı sorularını çözdün mü? Sınavda her yıl tam 3 soru gelir!",
  "Türkiye'nin İklim ve Bitki Örtüsü konusuna bugün göz attın mı? Harita sorularını kaçırma!",
  "Kurtuluş Savaşı kongreler dönemi KPSS Tarih'in bel kemiğidir, mutlaka tekrar et!",
  "Coğrafya madenler ve enerji kaynakları şifrelerini hatırla, her net seni öne geçirir!"
];

export default function MascotXPWidget() {
  const { state } = useApp();
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const idx = Math.floor(Math.random() * MASCOT_QUOTES.length);
    setQuoteIndex(idx);
  }, []);

  const totalCompletedSubs = Object.keys(state.completed || {}).length;

  let mascotEmoji = '🌱';
  let mascotTitle = 'Filizlenen Aday';
  if (totalCompletedSubs > 40) {
    mascotEmoji = '🦅';
    mascotTitle = 'KPSS Şampiyonu';
  } else if (totalCompletedSubs > 20) {
    mascotEmoji = '🦁';
    mascotTitle = 'Derece Adayı';
  } else if (totalCompletedSubs > 5) {
    mascotEmoji = '⚡';
    mascotTitle = 'Temposunu Yakalayan Aday';
  }

  return (
    <div className="p-5 sm:p-7 bg-[#1F170C]/90 backdrop-blur-xl border border-amber-500/30 shadow-[0_20px_50px_-15px_rgba(245,158,11,0.15)] rounded-[28px] relative overflow-hidden">
      
      {/* Amber Ambient Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-5">
        
        {/* Mascot Emoji Circle */}
        <div className="flex flex-col items-center flex-shrink-0">
          <div className="w-20 h-20 rounded-full bg-[#120E07] border-2 border-amber-500/40 flex items-center justify-center text-4xl shadow-xl relative group">
            <span className="select-none transition-transform group-hover:scale-110">{mascotEmoji}</span>
            
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-black text-[10px] shadow-md flex items-center gap-1">
              <Zap size={11} className="fill-slate-950 text-slate-950" />
              <span>{state.xp} XP</span>
            </div>
          </div>

          <div className="text-[11px] text-amber-400 font-extrabold mt-3 flex items-center gap-1">
            <MessageSquare size={12} className="text-amber-400" />
            <span>{mascotTitle}</span>
          </div>
        </div>

        {/* Speech Quote Box & Assistant Header */}
        <div className="flex-1 w-full space-y-4">
          
          {/* Quote */}
          <div className="relative bg-[#120E07] p-4.5 rounded-2xl border border-amber-500/20 shadow-inner">
            <p className="text-xs sm:text-sm font-semibold text-amber-100/90 leading-relaxed italic">
              "{MASCOT_QUOTES[quoteIndex]}"
            </p>
          </div>

          {/* Assistant Info */}
          <div className="flex items-center justify-between gap-2 pt-1 border-t border-white/5">
            <div className="flex items-center gap-2">
              <Compass size={18} className="text-amber-400" />
              <h3 className="font-black text-white text-xs sm:text-sm tracking-tight">
                KPSS Tarih & Coğrafya Strateji Asistanı
              </h3>
            </div>

            <div className="bg-[#120E07] px-3 py-1 rounded-xl border border-amber-500/20 flex items-center gap-1.5 shadow-inner">
              <Sparkles size={13} className="text-amber-400" />
              <span className="text-xs font-black text-amber-400 font-mono">
                {state.xp.toLocaleString('tr-TR')} XP
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
