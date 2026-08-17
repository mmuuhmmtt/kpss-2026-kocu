import React, { createContext, useContext, useReducer, useEffect, useCallback, useRef } from 'react';
import {
  INITIAL_CURRICULUM, LEVEL_THRESHOLDS, BADGE_DEFINITIONS,
  SR_INTERVALS, XP_REWARDS, EXAM_DATE
} from '../data/curriculum';
import confetti from 'canvas-confetti';

const AppContext = createContext(null);

// ─── Helpers ──────────────────────────────────────────────────────────────────

const todayStr = () => new Date().toISOString().split('T')[0];

const getLevel = (xp) => {
  let current = LEVEL_THRESHOLDS[0];
  for (const tier of LEVEL_THRESHOLDS) {
    if (xp >= tier.xp) current = tier;
    else break;
  }
  const next = LEVEL_THRESHOLDS.find(t => t.xp > xp) || null;
  return { ...current, next };
};

const loadState = () => {
  try {
    const raw = localStorage.getItem('kpss_tracker_v2');
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return null;
};

const saveState = (state) => {
  try {
    localStorage.setItem('kpss_tracker_v2', JSON.stringify(state));
  } catch { /* ignore */ }
};

const buildInitialState = () => {
  const saved = loadState();
  const validSubjectIds = new Set(INITIAL_CURRICULUM.map(s => s.id));

  if (saved) {
    const sanitizedCurriculum = (saved.curriculum || []).filter(s => validSubjectIds.has(s.id));
    const finalCurriculum = sanitizedCurriculum.length > 0 ? sanitizedCurriculum : INITIAL_CURRICULUM;
    const userProfile = {
      ...saved.userProfile,
      targetNet: (saved.userProfile?.targetNet && Number(saved.userProfile.targetNet) <= 45) ? Number(saved.userProfile.targetNet) : 35,
    };
    const dailyPractices = saved.dailyPractices || {};
    return { sidebarCollapsed: false, ...saved, userProfile, curriculum: finalCurriculum, dailyPractices };
  }
  return {
    sidebarCollapsed: false,
    userProfile: {
      name: '',
      surname: '',
      avatarUrl: null,
      targetNet: 35,
      onboardingCompleted: false,
    },
    curriculum: INITIAL_CURRICULUM,
    completed: {},        // { subtopicId: { completedAt, notes } }
    spacedReps: [],       // [{ id, subjectId, topicId, subtopicId, title, topicTitle, weight, nextReview, intervalIndex, status }]
    xp: 0,
    activityLog: {},      // { 'YYYY-MM-DD': count }
    badges: [],           // ['badge_id', ...]
    exams: [],            // [{ id, title, date, scores: { subjectId: { correct, wrong } } }]
    notes: {},            // { subtopicId: string }
    dailyPractices: {},   // { 'YYYY-MM-DD': { turkce: boolean, matematik: boolean } }
    streakCount: 0,
    lastActiveDate: null,
    view: 'dashboard',    // 'dashboard' | 'curriculum' | 'spaced' | 'exams' | 'heatmap' | 'settings'
    breadcrumb: [],       // [{id, name, level}]  level: 'subject' | 'topic'
    xpPopups: [],         // [{id, amount, x, y}]
  };
};

// ─── Reducer ──────────────────────────────────────────────────────────────────

function reducer(state, action) {
  switch (action.type) {

    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarCollapsed: !state.sidebarCollapsed };

    case 'SET_VIEW':
      return { ...state, view: action.view, breadcrumb: action.breadcrumb ?? [] };

    case 'SET_BREADCRUMB':
      return { ...state, breadcrumb: action.breadcrumb };

    case 'COMPLETE_SUBTOPIC': {
      const { subjectId, topicId, subtopicId, subtopicTitle, topicTitle, weight } = action;
      if (state.completed[subtopicId]) return state;

      const now = new Date().toISOString();
      const today = todayStr();
      const newCompleted = {
        ...state.completed,
        [subtopicId]: { completedAt: now, notes: state.notes[subtopicId] || '' }
      };

      // Spaced repetition entry
      const srEntry = {
        id: `sr_${subtopicId}_${Date.now()}`,
        subjectId, topicId, subtopicId,
        title: subtopicTitle,
        topicTitle,
        weight,
        nextReview: new Date(Date.now() + SR_INTERVALS[0] * 86400000).toISOString().split('T')[0],
        intervalIndex: 0,
        status: 'pending',
      };

      // Activity
      const actLog = { ...state.activityLog, [today]: (state.activityLog[today] || 0) + 1 };

      // Streak
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      let streak = state.streakCount;
      if (state.lastActiveDate === yesterday) streak += 1;
      else if (state.lastActiveDate !== today) streak = 1;

      return {
        ...state,
        completed: newCompleted,
        spacedReps: [...state.spacedReps, srEntry],
        activityLog: actLog,
        streakCount: streak,
        lastActiveDate: today,
      };
    }

    case 'UNCOMPLETE_SUBTOPIC': {
      const { subtopicId } = action;
      const newCompleted = { ...state.completed };
      delete newCompleted[subtopicId];
      const newSR = state.spacedReps.filter(s => s.subtopicId !== subtopicId);
      return { ...state, completed: newCompleted, spacedReps: newSR };
    }

    case 'MARK_REVIEW_DONE': {
      const { srId } = action;
      const today = todayStr();
      const actLog = { ...state.activityLog, [today]: (state.activityLog[today] || 0) + 1 };
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      let streak = state.streakCount;
      if (state.lastActiveDate === yesterday) streak += 1;
      else if (state.lastActiveDate !== today) streak = 1;

      const newSR = state.spacedReps.map(s => {
        if (s.id !== srId) return s;
        const nextIdx = Math.min(s.intervalIndex + 1, SR_INTERVALS.length - 1);
        const nextDays = SR_INTERVALS[nextIdx];
        return {
          ...s,
          intervalIndex: nextIdx,
          nextReview: new Date(Date.now() + nextDays * 86400000).toISOString().split('T')[0],
          status: nextIdx >= SR_INTERVALS.length - 1 ? 'mastered' : 'pending',
        };
      });

      return { ...state, spacedReps: newSR, activityLog: actLog, streakCount: streak, lastActiveDate: today };
    }

    case 'ADD_XP': {
      const newXP = state.xp + action.amount;
      return { ...state, xp: newXP };
    }

    case 'UNLOCK_BADGE': {
      if (state.badges.includes(action.badgeId)) return state;
      return { ...state, badges: [...state.badges, action.badgeId] };
    }

    case 'SAVE_EXAM': {
      const exam = {
        id: `exam_${Date.now()}`,
        title: action.title || `Deneme ${state.exams.length + 1}`,
        date: action.date || todayStr(),
        scores: action.scores,
      };
      const today = todayStr();
      const actLog = { ...state.activityLog, [today]: (state.activityLog[today] || 0) + 2 };
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      let streak = state.streakCount;
      if (state.lastActiveDate === yesterday) streak += 1;
      else if (state.lastActiveDate !== today) streak = 1;
      return {
        ...state,
        exams: [...state.exams, exam],
        activityLog: actLog,
        streakCount: streak,
        lastActiveDate: today,
      };
    }

    case 'DELETE_EXAM':
      return { ...state, exams: state.exams.filter(e => e.id !== action.id) };

    case 'UPDATE_ACTIVITY':
      return {
        ...state,
        activityLog: action.activityLog,
        streakCount: action.streakCount,
        lastActiveDate: action.lastActiveDate,
      };

    case 'SAVE_NOTE':
      return { ...state, notes: { ...state.notes, [action.subtopicId]: action.note } };

    case 'SAVE_USER_PROFILE':
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          ...action.profile,
          onboardingCompleted: true,
        },
      };

    case 'UPDATE_CURRICULUM':
      return { ...state, curriculum: action.curriculum };

    case 'ADD_XP_POPUP': {
      const popup = { id: Date.now(), amount: action.amount };
      return { ...state, xpPopups: [...state.xpPopups, popup] };
    }

    case 'TOGGLE_DAILY_PRACTICE': {
      const { date, practiceType } = action;
      const current = state.dailyPractices?.[date] || { turkce: false, matematik: false };
      const newValue = !current[practiceType];
      const updated = {
        ...(state.dailyPractices || {}),
        [date]: { ...current, [practiceType]: newValue },
      };
      return { ...state, dailyPractices: updated };
    }

    case 'RESET_DATA':
      return buildInitialState();

    default:
      return state;
  }
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, null, buildInitialState);
  const prevXPRef = useRef(state.xp);

  // Persist to localStorage
  useEffect(() => {
    saveState(state);
  }, [state]);

  // XP level up detection
  useEffect(() => {
    const prevLevel = getLevel(prevXPRef.current);
    const curLevel = getLevel(state.xp);
    if (curLevel.level > prevLevel.level) {
      confetti({ particleCount: 180, spread: 100, origin: { y: 0.5 } });
    }
    prevXPRef.current = state.xp;
  }, [state.xp]);

  // ─── Derived helpers ──────────────────────────────────────────────

  const getLevelInfo = useCallback(() => getLevel(state.xp), [state.xp]);

  const getSubjectStats = useCallback((subject) => {
    let totalWeight = 0, completedWeight = 0;
    let totalSubs = 0, completedSubs = 0;
    for (const topic of subject.topics) {
      for (const sub of topic.subtopics) {
        totalSubs++;
        totalWeight += topic.weight;
        if (state.completed[sub.id]) {
          completedSubs++;
          completedWeight += topic.weight;
        }
      }
    }
    const pct = totalWeight > 0 ? Math.round((completedWeight / totalWeight) * 100) : 0;
    return { totalWeight, completedWeight, totalSubs, completedSubs, pct };
  }, [state.completed]);

  const getTopicStats = useCallback((topic) => {
    const total = topic.subtopics.length;
    const done = topic.subtopics.filter(s => state.completed[s.id]).length;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;
    return { total, done, pct };
  }, [state.completed]);

  const getWeightedOverallProgress = useCallback(() => {
    let totalWeight = 0, completedWeight = 0;
    for (const subject of state.curriculum) {
      for (const topic of subject.topics) {
        const subCount = topic.subtopics.length;
        if (subCount === 0) continue;
        const weightPerSub = topic.weight / subCount;
        for (const sub of topic.subtopics) {
          totalWeight += weightPerSub;
          if (state.completed[sub.id]) completedWeight += weightPerSub;
        }
      }
    }
    const pct = totalWeight > 0 ? Math.round((completedWeight / totalWeight) * 100) : 0;
    return { totalWeight: Math.round(totalWeight), completedWeight: Math.round(completedWeight), pct };
  }, [state.curriculum, state.completed]);

  const getTodayReviews = useCallback(() => {
    const today = todayStr();
    return state.spacedReps.filter(s => s.nextReview <= today && s.status !== 'mastered');
  }, [state.spacedReps]);

  const getDailyTargets = useCallback(() => {
    const targets = [];

    // Iterate through subjects in natural curriculum order
    for (const subject of state.curriculum) {
      let foundForSubject = false;
      for (const topic of subject.topics) {
        if (foundForSubject) break;
        for (const sub of topic.subtopics) {
          if (!state.completed[sub.id]) {
            targets.push({
              subtopicId: sub.id,
              subtopicTitle: sub.title,
              topicTitle: topic.title,
              subjectId: subject.id,
              subjectName: subject.name,
              weight: topic.subtopics.length > 0 ? topic.weight / topic.subtopics.length : 0,
              subjectTotalWeight: subject.totalWeight,
              accentColor: subject.accentColor,
            });
            foundForSubject = true;
            break;
          }
        }
      }
    }

    return targets;
  }, [state.curriculum, state.completed]);

  const getStreak = useCallback(() => {
    const today = todayStr();
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    if (state.lastActiveDate === today || state.lastActiveDate === yesterday) return state.streakCount;
    return 0;
  }, [state.streakCount, state.lastActiveDate]);

  // ─── Action dispatchers ───────────────────────────────────────────

  const completeSubtopic = useCallback((subjectId, topicId, subtopicId, subtopicTitle, topicTitle, weight) => {
    dispatch({ type: 'COMPLETE_SUBTOPIC', subjectId, topicId, subtopicId, subtopicTitle, topicTitle, weight });
    dispatch({ type: 'ADD_XP', amount: XP_REWARDS.subtopic_complete });
    dispatch({ type: 'ADD_XP_POPUP', amount: `+${XP_REWARDS.subtopic_complete} XP` });

    // Badge checks are handled via effects in components
  }, []);

  const uncompleteSubtopic = useCallback((subtopicId) => {
    dispatch({ type: 'UNCOMPLETE_SUBTOPIC', subtopicId });
  }, []);

  const markReviewDone = useCallback((srId) => {
    dispatch({ type: 'MARK_REVIEW_DONE', srId });
    dispatch({ type: 'ADD_XP', amount: XP_REWARDS.review_done });
    dispatch({ type: 'ADD_XP_POPUP', amount: `+${XP_REWARDS.review_done} XP` });
  }, []);

  const unlockBadge = useCallback((badgeId) => {
    dispatch({ type: 'UNLOCK_BADGE', badgeId });
  }, []);

  const saveExam = useCallback((title, date, scores) => {
    dispatch({ type: 'SAVE_EXAM', title, date, scores });
    dispatch({ type: 'ADD_XP', amount: XP_REWARDS.exam_saved });
    dispatch({ type: 'ADD_XP_POPUP', amount: `+${XP_REWARDS.exam_saved} XP` });
  }, []);

  const deleteExam = useCallback((id) => {
    dispatch({ type: 'DELETE_EXAM', id });
  }, []);

  const saveNote = useCallback((subtopicId, note) => {
    dispatch({ type: 'SAVE_NOTE', subtopicId, note });
  }, []);

  const updateCurriculum = useCallback((curriculum) => {
    dispatch({ type: 'UPDATE_CURRICULUM', curriculum });
  }, []);

  const setView = useCallback((view, breadcrumb) => {
    dispatch({ type: 'SET_VIEW', view, breadcrumb });
  }, []);

  const toggleSidebar = useCallback(() => {
    dispatch({ type: 'TOGGLE_SIDEBAR' });
  }, []);

  const removeXpPopup = useCallback((id) => {
    dispatch({ type: 'REMOVE_XP_POPUP', id });
  }, []);

  const resetData = useCallback(() => {
    try {
      localStorage.removeItem('kpss_tracker_v2');
      localStorage.removeItem('kpss_daily_habits');
    } catch { /* ignore */ }
    dispatch({ type: 'RESET_DATA' });
  }, []);

  const toggleDailyPractice = useCallback((practiceType) => {
    const today = todayStr();
    const currentStatus = state.dailyPractices?.[today] || { turkce: false, matematik: false };
    const willBeCompleted = !currentStatus[practiceType];

    dispatch({ type: 'TOGGLE_DAILY_PRACTICE', date: today, practiceType });

    if (willBeCompleted) {
      dispatch({ type: 'ADD_XP', amount: 30 });
      dispatch({ type: 'ADD_XP_POPUP', amount: '+30 XP' });
    }
  }, [state.dailyPractices]);

  const saveUserProfile = useCallback((profile) => {
    dispatch({ type: 'SAVE_USER_PROFILE', profile });
  }, []);

  const getSmartDailyPlan = useCallback(() => {
    const today = todayStr();
    const dayOfWeek = new Date().getDay(); // 0 is Sunday
    const isWeeklyReviewDay = dayOfWeek === 0;

    // 1. Spaced Repetition Due Tasks
    const dueReviews = state.spacedReps.filter(s => s.nextReview <= today && s.status !== 'mastered');

    // 2. High-weight uncompleted subtopics from at least 3 distinct subjects
    const uncompletedList = [];
    for (const subject of state.curriculum) {
      for (const topic of subject.topics) {
        for (const sub of topic.subtopics) {
          if (!state.completed[sub.id]) {
            uncompletedList.push({
              subjectId: subject.id,
              subjectName: subject.name,
              topicId: topic.id,
              topicTitle: topic.title,
              subtopicId: sub.id,
              subtopicTitle: sub.title,
              weight: topic.weight,
            });
          }
        }
      }
    }

    // Sort by weight descending
    uncompletedList.sort((a, b) => b.weight - a.weight);

    // Pick up to 3 distinct subjects
    const dailyTopics = [];
    const usedSubjects = new Set();
    for (const item of uncompletedList) {
      if (!usedSubjects.has(item.subjectId) && dailyTopics.length < 3) {
        dailyTopics.push(item);
        usedSubjects.add(item.subjectId);
      }
    }

    return {
      isWeeklyReviewDay,
      dueReviews,
      dailyTopics,
      targetNet: state.userProfile?.targetNet || 85,
    };
  }, [state.curriculum, state.completed, state.spacedReps, state.userProfile]);

  return (
    <AppContext.Provider value={{
      state,
      dispatch,
      // Derived
      getLevelInfo,
      getSubjectStats,
      getTopicStats,
      getWeightedOverallProgress,
      getTodayReviews,
      getDailyTargets,
      getSmartDailyPlan,
      getStreak,
      // Actions
      completeSubtopic,
      uncompleteSubtopic,
      markReviewDone,
      unlockBadge,
      saveExam,
      deleteExam,
      saveNote,
      updateCurriculum,
      saveUserProfile,
      toggleDailyPractice,
      setView,
      toggleSidebar,
      removeXpPopup,
      resetData,
      // Constants
      BADGE_DEFINITIONS,
      LEVEL_THRESHOLDS,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
};
