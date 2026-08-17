import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import CurriculumView from './components/curriculum/CurriculumView';
import SpacedRepetitionView from './components/spaced/SpacedRepetitionView';
import MockExamTracker from './components/exams/MockExamTracker';
import SettingsView from './components/settings/SettingsView';
import OnboardingModal from './components/onboarding/OnboardingModal';

function AppContent() {
  const { state } = useApp();
  const view = state.view;

  const ViewComponents = {
    dashboard: <Dashboard />,
    curriculum: <CurriculumView />,
    spaced: <SpacedRepetitionView />,
    exams: <MockExamTracker />,
    settings: <SettingsView />,
  };

  return (
    <div className="min-h-screen text-slate-100 flex flex-col font-sans bg-grid selection:bg-[#1E8449]/30 selection:text-[#E8F0EC]">
      {/* Onboarding Modal for First Time Setup */}
      <OnboardingModal />

      {/* Sleek Dark Top Navbar */}
      <Navbar />

      {/* Main Workspace Container */}
      <main className="flex-1 w-full max-w-4xl px-3 sm:px-6 py-4 sm:py-8 mx-auto flex flex-col items-center pb-28 md:pb-12">
        {ViewComponents[view] || <Dashboard />}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
