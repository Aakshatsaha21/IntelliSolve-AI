/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';
import { ToastContainer } from './components/ToastContainer';
import { DashboardView } from './pages/DashboardView';
import { NewProblemView } from './pages/NewProblemView';
import { AgentArenaView } from './pages/AgentArenaView';
import { ComparisonView } from './pages/ComparisonView';
import { EvaluationsView } from './pages/EvaluationsView';
import { RefinementView } from './pages/RefinementView';
import { RecommendationView } from './pages/RecommendationView';
import { CodeWorkspaceView } from './pages/CodeWorkspaceView';
import { HistoryView } from './pages/HistoryView';
import { HowItWorksView } from './pages/HowItWorksView';
import { SettingsView } from './pages/SettingsView';

const MainLayout: React.FC = () => {
  const { activeView } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView />;
      case 'new-problem':
        return <NewProblemView />;
      case 'agent-arena':
        return <AgentArenaView />;
      case 'comparison':
        return <ComparisonView />;
      case 'evaluations':
        return <EvaluationsView />;
      case 'refinement':
        return <RefinementView />;
      case 'recommendation':
        return <RecommendationView />;
      case 'code-gen':
        return <CodeWorkspaceView />;
      case 'history':
        return <HistoryView />;
      case 'how-it-works':
        return <HowItWorksView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex transition-colors duration-150">
      {/* Sidebar Navigation */}
      <Sidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Workspace Frame */}
      <div className="flex-1 flex flex-col md:pl-64 min-w-0">
        <TopHeader onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {renderActiveView()}
        </main>

        {/* Quiet Footer */}
        <footer className="no-print py-4 px-6 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-500 bg-white dark:bg-slate-900">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>IntelliSolve AI · Autonomous Multi-Agent Decision Platform</span>
            <span>Frontend-Only Interactive Prototype · Zero External Cloud APIs Required</span>
          </div>
        </footer>
      </div>

      {/* Feedback Toast Notification Manager */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
