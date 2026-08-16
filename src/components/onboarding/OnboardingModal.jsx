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
    <div className="modal-backdrop p-4 flex items-center justify-center">
      <div className="glass-card max-w-md w-full p-6 md:p-8 border-0 bg-[#26262A] shadow-2xl rounded-[28px] fade-slide-up relative my-auto">
        
        {/* Header */}
        <div className="text-center mb-6 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#1A1A1D] text-[#FF6B00] text-[11px] font-black uppercase tracking-wider mb-2 shadow-inner">
            <Sparkles size={12} className="text-[#FF6B00]" />
            <span>KPSS 2026 KOÇUNUZ</span>
          </div>
          <h2 className="text-lg md:text-xl font-black text-[#F5F5F0] tracking-tight">Hoş Geldin! Profilini Oluştur</h2>
          <p className="text-[11px] text-[#9E9E9E] mt-1 font-medium">Sana özel hedefleri ve net beklentini belirleyelim</p>
        </div>

        {error && (
          <div className="mb-4 p-3.5 rounded-2xl bg-[#1A1A1D] text-[#F87171] text-xs font-bold text-center shadow-inner">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          
          {/* Name & Surname Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-[11px] font-extrabold text-[#F5F5F0] mb-1 flex items-center gap-1">
                <User size={13} className="text-[#FF6B00]" /> Adınız *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                onBlur={() => setName(capitalizeWords(name))}
                placeholder="Örn: Ahmet"
                className="w-full min-h-[44px] px-4 py-2.5 rounded-2xl bg-[#1A1A1D] border-0 text-[#F5F5F0] placeholder-[#9E9E9E] text-xs font-bold focus:outline-none shadow-inner"
              />
            </div>

            <div>
              <label className="block text-[11px] font-extrabold text-[#F5F5F0] mb-1 flex items-center gap-1">
                <User size={13} className="text-[#FF6B00]" /> Soyadınız
              </label>
              <input
                type="text"
                value={surname}
                onChange={(e) => handleSurnameChange(e.target.value)}
                onBlur={() => setSurname(capitalizeWords(surname))}
                placeholder="Örn: Yılmaz"
                className="w-full min-h-[44px] px-4 py-2.5 rounded-2xl bg-[#1A1A1D] border-0 text-[#F5F5F0] placeholder-[#9E9E9E] text-xs font-bold focus:outline-none shadow-inner"
              />
            </div>
          </div>

          {/* TARGET NET SLIDER */}
          <div className="bg-[#1A1A1D] p-5 rounded-[22px] shadow-inner space-y-4">
            
            <div className="flex justify-between items-center">
              <label className="text-xs font-extrabold text-[#F5F5F0] flex items-center gap-1.5">
                <Target size={15} className="text-[#FF6B00]" /> Hedeflenen KPSS Netiniz:
              </label>
            </div>

            {/* Slider Track with Floating Badge */}
            <div className="relative pt-6 pb-2">
              
              {/* Floating Dynamic Badge */}
              <div
                className="absolute top-0 px-2.5 py-0.5 rounded-full bg-[#FF6B00] text-[#1A1A1D] font-black text-[11px] shadow-md transition-all duration-75 flex items-center gap-1 pointer-events-none z-20"
                style={{
                  left: `${sliderPct}%`,
                  transform: 'translateX(-50%)',
                  fontFamily: "'Orbitron', monospace",
                  filter: 'drop-shadow(0 0 6px rgba(255, 107, 0, 0.45))'
                }}
              >
                <span>{targetNet}</span>
                <span className="text-[9px]">NET</span>
              </div>

              {/* Slider Track background fill */}
              <div className="h-3 bg-[#26262A] rounded-full overflow-hidden p-0.5 relative shadow-inner">
                <div
                  className="h-full rounded-full bg-[#FF6B00] transition-all duration-150"
                  style={{ width: `${sliderPct}%`, boxShadow: '0 0 10px rgba(255, 107, 0, 0.5)' }}
                />
              </div>

              {/* Native HTML Range Control */}
              <input
                type="range"
                min="40"
                max="120"
                step="1"
                value={targetNet}
                onChange={(e) => setTargetNet(Number(e.target.value))}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full min-h-[44px]"
              />
            </div>

            {/* Quick Click Preset Net Chips */}
            <div className="flex items-center justify-between gap-1 pt-1">
              {NET_PRESETS.map(preset => {
                const isActive = Number(targetNet) === preset;
                return (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setTargetNet(preset)}
                    className={`px-2.5 py-1.5 rounded-full text-[10px] font-black transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#FF6B00] text-[#1A1A1D] shadow-md'
                        : 'bg-[#26262A] text-[#9E9E9E] hover:text-[#F5F5F0]'
                    }`}
                  >
                    {preset} Net
                  </button>
                );
              })}
            </div>
          </div>

          {/* Neon Orange Submit Button */}
          <button
            type="submit"
            className="w-full min-h-[48px] py-3.5 rounded-full bg-[#FF6B00] text-[#1A1A1D] font-black text-xs md:text-sm hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl"
            style={{ filter: 'drop-shadow(0 0 10px rgba(255, 107, 0, 0.45))' }}
          >
            <span>Planımı Oluştur ve Başla</span>
            <ArrowRight size={16} className="stroke-[3]" />
          </button>
        </form>

      </div>
    </div>
  );
}
