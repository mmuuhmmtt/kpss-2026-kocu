import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Flame, Award, CheckCircle2, Calendar, Sparkles, Target, Zap, RotateCcw, BookOpen, Check } from 'lucide-react';

const DEFAULT_HABITS = [
  { id: 'subtopic_complete', title: 'Ders Çalışması', desc: 'Bugün en az 1 alt konu veya ünite bitir', xp: 50, icon: Target, color: '#a855f7' },
  { id: 'spaced_review', title: 'Aralıklı Tekrar', desc: 'Unutma eğrisini yenmek için günün tekrarlarını yap', xp: 30, icon: RotateCcw, color: '#ec4899' },
  { id: 'mock_or_test', title: 'Test / Deneme Çözümü', desc: 'En az 1 deneme veya 30 test sorusu çöz', xp: 60, icon: Zap, color: '#38bdf8' },
  { id: 'reading_time', title: '30 Dk Not / Paragraf Okuma', desc: 'Türkçe paragraf veya ders notlarını gözden geçir', xp: 25, icon: BookOpen, color: '#f59e0b' },
];

function getTodayStr() {
  return new Date().toISOString().split('T')[0];
}

// Get current week's 7 days (Monday to Sunday)
function getCurrentWeekDays() {
  const curr = new Date();
  const first = curr.getDate() - (curr.getDay() === 0 ? 6 : curr.getDay() - 1); // Monday
  const week = [];
  const dayNames = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];
  const shortNames = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];

  for (let i = 0; i < 7; i++) {
    const day = new Date(curr.setDate(first + i));
    const dateStr = day.toISOString().split('T')[0];
    week.push({
      dateStr,
      dayNum: day.getDate(),
      monthName: day.toLocaleDateString('tr-TR', { month: 'short' }),
      dayName: dayNames[i],
      shortName: shortNames[i],
    });
  }
  return week;
}

export default function ActivityHeatmap() {
  const { state, dispatch, getStreak } = useApp();
  const streak = getStreak();
  const today = getTodayStr();

  const weekDays = useMemo(() => getCurrentWeekDays(), []);

  // Local storage state for daily habit checklist
  const [habitChecks, setHabitChecks] = useState(() => {
    try {
      const raw = localStorage.getItem('kpss_daily_habits');
      if (raw) return JSON.parse(raw);
    } catch { /* ignore */ }
    return {};
  });

  useEffect(() => {
    try {
      localStorage.setItem('kpss_daily_habits', JSON.stringify(habitChecks));
    } catch { /* ignore */ }
  }, [habitChecks]);

  const toggleHabit = (habitId, xpAmount) => {
    const todayHabits = habitChecks[today] || {};
    const isChecked = !!todayHabits[habitId];

    const updatedToday = { ...todayHabits, [habitId]: !isChecked };
    setHabitChecks({ ...habitChecks, [today]: updatedToday });

    if (!isChecked) {
      // Reward XP when completing habit
      dispatch({ type: 'ADD_XP', amount: xpAmount });
      dispatch({ type: 'ADD_XP_POPUP', amount: `+${xpAmount} XP` });
      
      // Update activity log for today
      const currentCount = state.activityLog[today] || 0;
      const actLog = { ...state.activityLog, [today]: currentCount + 1 };
      
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      let newStreak = state.streakCount;
      if (state.lastActiveDate === yesterday) newStreak += 1;
      else if (state.lastActiveDate !== today) newStreak = 1;

      dispatch({
        type: 'UPDATE_ACTIVITY',
        activityLog: actLog,
        streakCount: newStreak,
        lastActiveDate: today,
      });
    }
  };

  // Calculate week stats
  const activeDaysThisWeek = weekDays.filter(d => (state.activityLog[d.dateStr] || 0) > 0).length;
  const weekCompletionPct = Math.round((activeDaysThisWeek / 7) * 100);

  const todayHabitState = habitChecks[today] || {};
  const todayCompletedHabitsCount = DEFAULT_HABITS.filter(h => !!todayHabitState[h.id]).length;

  return (
    <div className="fade-slide-up space-y-6">
      
      {/* Header Banner */}
      <div className="glass-card p-6 md:p-8 border border-purple-500/25 bg-gradient-to-br from-slate-900/90 via-purple-950/20 to-slate-900/90 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="flame-icon text-2xl">🔥</span>
              <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">
                Günlük Alışkanlık Takibi
              </h2>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              Her gün küçük adımlarla disiplin kazan. Günlük alışkanlıklarını tamamla, XP ve seriler kazan!
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Streak Card */}
            <div className="bg-slate-950/80 border border-amber-500/30 px-4 py-3 rounded-2xl flex items-center gap-3 shadow-md">
              <span className="flame-icon text-3xl">🔥</span>
              <div>
                <div className="text-xl font-black text-amber-400 font-mono" style={{ fontFamily: "'Orbitron', monospace" }}>
                  {streak} GÜN
                </div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Kesintisiz Seri</div>
              </div>
            </div>

            {/* Week Success Rate */}
            <div className="bg-slate-950/80 border border-purple-500/30 px-4 py-3 rounded-2xl flex items-center gap-3 shadow-md">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-black text-sm">
                %{weekCompletionPct}
              </div>
              <div>
                <div className="text-sm font-extrabold text-white">
                  {activeDaysThisWeek}/7 Gün
                </div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Haftalık Performans</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bu Haftanın Alışkanlık Çetelesi (Nokta Matrisi / Dot-Grid) */}
      <div className="glass-card p-6 border-0 bg-[#26262A] shadow-xl rounded-[28px]">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-extrabold text-[#F5F5F0] text-base flex items-center gap-2">
              <Calendar size={18} className="text-[#F5F5F0]" /> Haftalık Aktivite Çetelesi
            </h3>
            <p className="text-xs text-[#9E9E9E] mt-0.5 font-medium">Her gün için aktif çalışma durumu</p>
          </div>
          <span className="text-xs font-bold text-[#9E9E9E] bg-[#1A1A1D] px-3.5 py-1 rounded-full shadow-inner">
            Pazartesi — Pazar
          </span>
        </div>

        <div className="grid grid-cols-7 gap-2 md:gap-3">
          {weekDays.map(day => {
            const isToday = day.dateStr === today;
            const activityCount = state.activityLog[day.dateStr] || 0;
            const isCompleted = activityCount > 0;

            return (
              <div
                key={day.dateStr}
                className={`flex flex-col items-center justify-between p-3.5 rounded-[20px] transition-all text-center relative ${
                  isToday
                    ? 'bg-[#1A1A1D] shadow-inner'
                    : isCompleted
                    ? 'bg-[#2E2E33] shadow-md'
                    : 'bg-[#1A1A1D]/60'
                }`}
              >
                {/* Day Header */}
                <div>
                  <span className="text-[10px] font-extrabold text-[#9E9E9E] uppercase tracking-wider block">
                    {day.shortName}
                  </span>
                  <span className="text-xs font-black text-[#F5F5F0]">
                    {day.dayNum} {day.monthName}
                  </span>
                </div>

                {/* Round Dot-Grid Matrix Node */}
                <div className="my-3 flex items-center justify-center">
                  {isCompleted ? (
                    <div className="w-9 h-9 rounded-full bg-[#F5F5F0] text-[#1A1A1D] flex items-center justify-center shadow-md transform scale-105">
                      <Check size={18} className="stroke-[3]" />
                    </div>
                  ) : isToday ? (
                    <div className="w-9 h-9 rounded-full bg-[#1A1A1D] text-[#F5F5F0] flex items-center justify-center shadow-inner">
                      <Sparkles size={16} />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-[#1A1A1D] flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#707074]" />
                    </div>
                  )}
                </div>

                {/* Subtext */}
                <span className={`text-[10px] font-bold ${isCompleted ? 'text-[#F5F5F0]' : isToday ? 'text-[#F5F5F0]' : 'text-[#9E9E9E]'}`}>
                  {isCompleted ? `${activityCount} Aksiyon` : isToday ? 'Bugün' : 'Bekliyor'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bugünün KPSS Alışkanlık Maddeleri (Habit Checklist) */}
      <div className="glass-card p-6 md:p-8 border border-slate-800/80">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-extrabold text-white text-base md:text-lg flex items-center gap-2">
              <CheckCircle2 size={20} className="text-emerald-400" /> Bugünün Alışkanlık Hedefleri
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Tamamladığın alışkanlıkları işaretle, anında XP kazan!</p>
          </div>

          <div className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-slate-300">
            {todayCompletedHabitsCount} / {DEFAULT_HABITS.length} Tamamlandı
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {DEFAULT_HABITS.map(habit => {
            const isChecked = !!todayHabitState[habit.id];
            const Icon = habit.icon;

            return (
              <div
                key={habit.id}
                onClick={() => toggleHabit(habit.id, habit.xp)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer select-none flex items-center gap-4 group ${
                  isChecked
                    ? 'bg-slate-900/90 border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.15)]'
                    : 'bg-slate-950/60 border-slate-800 hover:border-purple-500/40 hover:bg-slate-900/60'
                }`}
              >
                {/* Custom Checkbox */}
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                    isChecked
                      ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-slate-950 shadow-md shadow-emerald-500/30'
                      : 'border-2 border-slate-700 bg-slate-900 group-hover:border-purple-400'
                  }`}
                >
                  {isChecked && <Check size={16} className="stroke-[3]" />}
                </div>

                {/* Habit Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={`text-sm font-extrabold ${isChecked ? 'text-emerald-300 line-through' : 'text-white group-hover:text-purple-300'}`}>
                      {habit.title}
                    </span>
                    <span className="text-[10px] font-black font-mono px-2 py-0.5 rounded-md bg-purple-950/80 border border-purple-500/30 text-purple-300">
                      +{habit.xp} XP
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 truncate">
                    {habit.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Seri Hedefleri (Streak Milestones) */}
      <div className="glass-card p-6 border border-slate-800/80">
        <h3 className="text-base font-extrabold text-white mb-4 flex items-center gap-2">
          <Award size={18} className="text-amber-400" /> Seri Başarım Hedefleri
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { days: 3, label: '3 Günlük Alev', icon: '🔥', color: '#f97316' },
            { days: 7, label: 'Haftalık Fırtına', icon: '⚡', color: '#a855f7' },
            { days: 14, label: 'Kristal Kararlılık', icon: '💎', color: '#38bdf8' },
            { days: 30, label: 'Efsane Seri', icon: '👑', color: '#ec4899' },
          ].map(milestone => {
            const achieved = streak >= milestone.days;
            return (
              <div
                key={milestone.days}
                className={`flex items-center gap-3 p-3.5 rounded-2xl border transition-all ${
                  achieved
                    ? 'border-amber-500/40 bg-gradient-to-br from-amber-500/15 to-slate-900 shadow-[0_0_15px_rgba(245,158,11,0.15)]'
                    : 'border-slate-800 bg-slate-950/60 opacity-60'
                }`}
              >
                <span className={`text-2xl ${achieved ? 'filter drop-shadow-md' : 'grayscale opacity-50'}`}>{milestone.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className={`text-xs font-bold ${achieved ? 'text-white' : 'text-slate-400'}`}>{milestone.label}</div>
                  <div className="text-[10px] text-slate-500 font-medium">{milestone.days} Gün Seri</div>
                </div>
                <div className="text-[10px]">
                  {achieved ? (
                    <span className="text-amber-400 font-extrabold bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/30">✓ Kazanıldı</span>
                  ) : (
                    <span className="text-slate-500 font-mono">{milestone.days - Math.min(streak, milestone.days)}g kaldı</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
