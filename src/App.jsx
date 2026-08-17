import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import CurriculumView from './components/curriculum/CurriculumView';
import SpacedRepetitionView from './components/spaced/SpacedRepetitionView';
import MockExamTracker from './components/exams/MockExamTracker';
import OnboardingModal from './components/onboarding/OnboardingModal';

function AppContent() {
  const { state } = useApp();
  const view = state.view;

  const ViewComponents = {
    dashboard: <Dashboard />,
    curriculum: <CurriculumView />,
    spaced: <SpacedRepetitionView />,
    exams: <MockExamTracker />,
  };

  return (
    <div className="min-h-screen text-slate-100 flex flex-col font-sans bg-grid selection:bg-[#FF6B00]/30 selection:text-[#F5F5F0]">
      {/* Onboarding Modal for First Time Setup */}
      <OnboardingModal />

      {/* Sleek Dark Top Navbar */}
      <Navbar />

      {/* Main Workspace Container - 100% Full Width (Zero empty space) */}
      <main className="flex-1 w-full px-4 sm:px-8 md:px-10 py-6 pb-28 md:pb-12">
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
