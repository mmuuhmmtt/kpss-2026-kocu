import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User, Target, Sparkles, ArrowRight } from 'lucide-react';

const NET_PRESETS = [60, 75, 85, 95, 105, 115];

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
  const [targetNet, setTargetNet] = useState(state.userProfile?.targetNet || 85);
  const [error, setError] = useState('');

  if (state.userProfile?.onboardingCompleted) return null;

  const handleNameChange = (val) => {
    setName(val);
  };

  const handleSurnameChange = (val) => {
    setSurname(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Lütfen adınızı giriniz.');
      return;
    }
    const formattedName = capitalizeWords(name.trim());
    const formattedSurname = capitalizeWords(surname.trim());
    saveUserProfile({
      name: formattedName,
      surname: formattedSurname,
      targetNet: Number(targetNet),
    });
  };

  const sliderPct = Math.round(((targetNet - 40) / (120 - 40)) * 100);

  return (
    <div className="modal-backdrop p-4 flex items-center justify-center overflow-y-auto">
      <div className="glass-card max-w-lg w-full p-8 md:p-10 border-0 bg-[#26262A] shadow-2xl rounded-[32px] fade-slide-up relative my-auto">
        
        {/* Header */}
        <div className="text-center mb-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A1A1D] text-[#FF6B00] text-xs font-black uppercase tracking-wider mb-3 shadow-inner border border-[#26262A]">
            <Sparkles size={14} className="text-[#FF6B00]" />
            <span>KPSS 2026 KOÇUNUZ</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-[#F5F5F0] tracking-tight">Hoş Geldin! Profilini Oluştur</h2>
          <p className="text-xs md:text-sm text-[#9E9E9E] mt-1.5 font-medium">Sana özel çalışma hedeflerini ve net beklentini belirleyelim</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-[#1A1A1D] text-[#F87171] text-xs font-bold text-center shadow-inner border border-[#F87171]/20">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          
          {/* Name & Surname Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-extrabold text-[#F5F5F0] mb-2 flex items-center gap-1.5">
                <User size={14} className="text-[#FF6B00]" /> Adınız *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                onBlur={() => setName(capitalizeWords(name))}
                placeholder="Örn: Ahmet"
                className="w-full h-12 px-4 rounded-2xl bg-[#1A1A1D] border border-[#333338] text-[#F5F5F0] placeholder-[#9E9E9E] text-sm font-bold focus:outline-none focus:border-[#FF6B00] shadow-inner transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-[#F5F5F0] mb-2 flex items-center gap-1.5">
                <User size={14} className="text-[#FF6B00]" /> Soyadınız
              </label>
              <input
                type="text"
                value={surname}
                onChange={(e) => handleSurnameChange(e.target.value)}
                onBlur={() => setSurname(capitalizeWords(surname))}
                placeholder="Örn: Yılmaz"
                className="w-full h-12 px-4 rounded-2xl bg-[#1A1A1D] border border-[#333338] text-[#F5F5F0] placeholder-[#9E9E9E] text-sm font-bold focus:outline-none focus:border-[#FF6B00] shadow-inner transition-colors"
              />
            </div>
          </div>

          {/* TARGET NET SLIDER CONTAINER */}
          <div className="bg-[#1A1A1D] p-6 rounded-[24px] shadow-inner border border-[#26262A] space-y-5">
            
            <div className="flex justify-between items-center pb-1">
              <label className="text-xs md:text-sm font-extrabold text-[#F5F5F0] flex items-center gap-2">
                <Target size={16} className="text-[#FF6B00]" /> Hedeflenen KPSS Netiniz:
              </label>
              <div
                className="px-3.5 py-1 rounded-full bg-[#FF6B00] text-[#1A1A1D] font-black text-sm shadow-md"
                style={{ fontFamily: "'Orbitron', monospace", filter: 'drop-shadow(0 0 6px rgba(255, 107, 0, 0.45))' }}
              >
                {targetNet} Net
              </div>
            </div>

            {/* Slider Control */}
            <div className="relative py-2">
              <div className="h-3.5 bg-[#26262A] rounded-full overflow-hidden p-0.5 shadow-inner">
                <div
                  className="h-full rounded-full bg-[#FF6B00] transition-all duration-150"
                  style={{ width: `${sliderPct}%`, boxShadow: '0 0 10px rgba(255, 107, 0, 0.5)' }}
                />
              </div>
              <input
                type="range"
                min="40"
                max="120"
                step="1"
                value={targetNet}
                onChange={(e) => setTargetNet(Number(e.target.value))}
                className="w-full h-4 opacity-0 cursor-pointer absolute inset-0 z-10"
              />
            </div>

            {/* Quick Click Preset Net Chips */}
            <div>
              <div className="text-[10px] font-bold text-[#9E9E9E] uppercase tracking-wider mb-2">Hızlı Net Seçimi</div>
              <div className="grid grid-cols-6 gap-2">
                {NET_PRESETS.map(preset => {
                  const isActive = Number(targetNet) === preset;
                  return (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setTargetNet(preset)}
                      className={`py-2 rounded-xl text-xs font-black transition-all cursor-pointer text-center ${
                        isActive
                          ? 'bg-[#FF6B00] text-[#1A1A1D] shadow-md scale-105'
                          : 'bg-[#26262A] text-[#9E9E9E] hover:text-[#F5F5F0] hover:bg-[#2E2E33]'
                      }`}
                    >
                      {preset}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Neon Orange Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full h-14 rounded-full bg-[#FF6B00] text-[#1A1A1D] font-black text-sm md:text-base hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-2xl"
              style={{ filter: 'drop-shadow(0 0 14px rgba(255, 107, 0, 0.5))' }}
            >
              <span>Planımı Oluştur ve Başla</span>
              <ArrowRight size={18} className="stroke-[3]" />
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
