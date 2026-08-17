import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User, ArrowRight, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';

const capitalizeWords = (str) => {
  if (!str) return '';
  return str
    .split(' ')
    .map(word => (word ? word.charAt(0).toLocaleUpperCase('tr-TR') + word.slice(1).toLocaleLowerCase('tr-TR') : ''))
    .join(' ');
};

export default function OnboardingModal() {
  const { state, saveUserProfile } = useApp();
  const [name, setName] = useState(state.userProfile?.name || '');
  const [surname, setSurname] = useState(state.userProfile?.surname || '');
  const [error, setError] = useState('');

  if (state.userProfile?.onboardingCompleted) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Lütfen adınızı giriniz.');
      return;
    }
    setError('');
    const formattedName = capitalizeWords(name.trim());
    const formattedSurname = capitalizeWords(surname.trim());
    saveUserProfile({
      name: formattedName,
      surname: formattedSurname,
      targetNet: 35, // default target net internally
    });
  };

  return (
    <div className="fixed inset-0 z-50 p-4 sm:p-6 md:p-8 flex items-center justify-center bg-black/85 backdrop-blur-2xl overflow-y-auto">
      
      {/* Background Radial Neon Orange Mesh Glow */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#FF6B00]/20 via-[#0B0C0E]/95 to-[#0B0C0E] pointer-events-none" />

      {/* Main SaaS Glassmorphism Card in Neon Orange Accents */}
      <div className="w-full max-w-md bg-[#18181C]/90 backdrop-blur-xl border border-[#FF6B00]/30 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] rounded-[32px] p-6 sm:p-10 fade-slide-up relative my-auto border-t border-t-white/10">
        
        {/* Subtle Ambient Neon Glow */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#FF6B00]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header Badge */}
        <div className="relative z-10 text-center mb-7">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF6B00]/10 border border-[#FF6B00]/25 text-[#FF6B00] text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <ShieldCheck size={14} className="text-[#FF6B00]" />
            <span>KPSS 2026 — Tarih & Coğrafya Koçu</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-[#F5F5F0] tracking-tight leading-snug">
            Hoş Geldiniz!
          </h2>
          <p className="text-xs sm:text-sm text-[#9E9E9E] mt-2 font-medium leading-relaxed">
            Sana özel çalışma takvimi ve konu takibini başlatmak için adınızı giriniz.
          </p>
        </div>

        {/* SINGLE STEP NAME FORM */}
        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          
          <div className="space-y-5">
            {/* Adınız Input */}
            <div>
              <label className="block text-xs font-bold text-[#F5F5F0] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <User size={15} className="text-[#FF6B00]" /> Adınız *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (error) setError('');
                  }}
                  onBlur={() => setName(capitalizeWords(name))}
                  placeholder="Örn: Ahmet"
                  className="w-full h-14 px-5 bg-[#121214] border border-white/10 rounded-2xl text-[#F5F5F0] placeholder-[#707074] text-sm font-bold focus:outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20 transition-all shadow-inner"
                />
              </div>

              {error && (
                <div className="animate-shake text-[#F87171] text-xs font-bold flex items-center gap-1.5 mt-2 pl-1">
                  <AlertCircle size={14} className="text-[#F87171] flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}
            </div>

            {/* Soyadınız Input */}
            <div>
              <label className="block text-xs font-bold text-[#F5F5F0] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <User size={15} className="text-[#FF6B00]" /> Soyadınız
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  onBlur={() => setSurname(capitalizeWords(surname))}
                  placeholder="Örn: Yılmaz (Opsiyonel)"
                  className="w-full h-14 px-5 bg-[#121214] border border-white/10 rounded-2xl text-[#F5F5F0] placeholder-[#707074] text-sm font-bold focus:outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20 transition-all shadow-inner"
                />
              </div>
            </div>
          </div>

          {/* Neon Orange Primary Action Button */}
          <div className="pt-3">
            <button
              type="submit"
              className="w-full h-15 rounded-2xl bg-[#FF6B00] hover:bg-[#FF8533] text-[#1A1A1D] font-black text-base shadow-xl shadow-[#FF6B00]/20 hover:shadow-[#FF6B00]/40 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <span>Planımı Oluştur ve Başla</span>
              <ArrowRight size={20} className="stroke-[3]" />
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
