import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Target, BookOpen, RotateCcw, BarChart2, Zap, Trophy } from 'lucide-react';
import BadgesModal from '../badges/BadgesModal';
import ProfileModal from '../profile/ProfileModal';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Ana Sayfa', icon: Target },
  { id: 'curriculum', label: 'Dersler', icon: BookOpen },
  { id: 'spaced', label: 'Tekrar', icon: RotateCcw },
  { id: 'exams', label: 'Denemeler', icon: BarChart2 },
];

export default function Navbar() {
  const { state, setView, getLevelInfo, getStreak } = useApp();
  const [showBadges, setShowBadges] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const levelInfo = getLevelInfo();
  const streak = getStreak();

  const today = new Date().toISOString().split('T')[0];
  const dueCount = state.spacedReps.filter(s => s.nextReview <= today && s.status !== 'mastered').length;

  const profileName = state.userProfile?.name || '';
  const profileSurname = state.userProfile?.surname || '';
  const avatarUrl = state.userProfile?.avatarUrl;
  const initials = `${profileName.charAt(0) || 'K'}${profileSurname.charAt(0) || 'P'}`.toUpperCase();

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#16171C]/95 backdrop-blur-md shadow-xl border-b border-white/10">
        <div className="w-full px-4 sm:px-8 md:px-10 h-16 flex items-center justify-between gap-4">
          
          {/* Logo & User Greeting Button (Opens Profile Modal) */}
          <button
            onClick={() => setShowProfileModal(true)}
            className="flex items-center gap-3 hover:opacity-90 transition-opacity flex-shrink-0 cursor-pointer min-h-[44px] py-1 text-left"
            title="Profili & Ayarları Yönet"
          >
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="Avatar"
                className="w-9 h-9 rounded-xl object-cover shadow-sm border border-white/10"
              />
            ) : (
              <div className="w-9 h-9 rounded-xl bg-[#FF6B00] flex items-center justify-center font-black text-slate-950 text-sm shadow-md">
                {profileName ? initials : 'K'}
              </div>
            )}

            <div className="text-left hidden sm:block">
              <div className="font-extrabold text-sm text-white leading-tight flex items-center gap-1.5">
                <span>{profileName ? `Merhaba, ${profileName.split(' ').map(w => w.charAt(0).toLocaleUpperCase('tr-TR') + w.slice(1).toLocaleLowerCase('tr-TR')).join(' ')}` : 'KPSS 2026'}</span>
                <span className="text-xs text-[#FF6B00]">⚙️</span>
              </div>
              <div className="text-[10px] text-slate-400 font-bold tracking-wider uppercase">Lisans Koçu • Profil Menüsü</div>
            </div>
          </button>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1.5 bg-[#111113] p-1.5 rounded-full shadow-inner border border-white/10">
            {NAV_ITEMS.map(item => {
              const Icon = item.icon;
              const isActive = state.view === item.id;
              const showBadge = item.id === 'spaced' && dueCount > 0;

              return (
                <button
                  key={item.id}
                  onClick={() => setView(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black transition-all duration-200 relative cursor-pointer ${
                    isActive
                      ? 'bg-[#FF6B00] text-slate-950 shadow-lg shadow-[#FF6B00]/30 scale-[1.02]'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon size={15} className={isActive ? 'text-slate-950 stroke-[2.5]' : 'text-slate-400'} />
                  <span>{item.label}</span>
                  {showBadge && (
                    <span className="bg-rose-500 text-slate-950 text-[10px] font-black rounded-full min-w-4 h-4 flex items-center justify-center px-1">
                      {dueCount}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* User Gamification Badges */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Streak */}
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#111113] border border-white/5 text-xs font-extrabold text-white shadow-inner">
              <span className="flame-icon text-base">🔥</span>
              <span className="text-[#FF6B00] font-black">{streak} Gün</span>
            </div>

            {/* Level & Badges Button */}
            <button
              onClick={() => setShowBadges(true)}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#111113] hover:bg-white/5 border border-white/5 text-xs font-bold transition-all cursor-pointer shadow-inner"
            >
              <Zap size={14} className="text-amber-400 fill-amber-400" />
              <span className="text-amber-400 font-black">L{levelInfo.level}</span>
              <span className="text-slate-400 font-mono text-[11px]">| {state.xp} XP</span>
              <Trophy size={13} className="text-amber-400 ml-1" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Bar at Bottom */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#16171C]/95 backdrop-blur-md shadow-2xl flex items-center justify-around px-1.5 py-2 border-t border-white/10">
        {NAV_ITEMS.map(item => {
          const Icon = item.icon;
          const isActive = state.view === item.id;
          const showBadge = item.id === 'spaced' && dueCount > 0;

          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`flex flex-col items-center justify-center gap-1 px-3 py-1.5 rounded-2xl transition-all cursor-pointer relative min-h-[48px] min-w-[56px] ${
                isActive ? 'text-[#FF6B00] font-extrabold bg-[#111113]' : 'text-slate-400 hover:text-white'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <Icon size={19} className={isActive ? 'text-[#FF6B00] stroke-[2.5]' : 'text-slate-400'} />
                {showBadge && (
                  <span className="absolute -top-1.5 -right-2 bg-rose-500 text-slate-950 text-[9px] font-black rounded-full min-w-4 h-4 flex items-center justify-center px-1 border border-[#18181C]">
                    {dueCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-semibold">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {showBadges && <BadgesModal onClose={() => setShowBadges(false)} />}
      {showProfileModal && <ProfileModal onClose={() => setShowProfileModal(false)} />}
    </>
  );
}
