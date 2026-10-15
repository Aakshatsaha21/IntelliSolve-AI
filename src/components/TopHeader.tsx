import React from 'react';
import {
  Menu,
  Moon,
  Sun,
  PlusCircle,
  Code2,
  Bookmark,
  Share2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const TopHeader: React.FC<{ onToggleMobileMenu: () => void }> = ({
  onToggleMobileMenu,
}) => {
  const {
    activeView,
    setActiveView,
    settings,
    updateSettings,
    saveCurrentSession,
    showToast,
  } = useApp();

  const getBreadcrumbLabel = () => {
    switch (activeView) {
      case 'dashboard':
        return 'Overview Dashboard';
      case 'new-problem':
        return 'Problem Submission & Formulation';
      case 'agent-arena':
        return 'Agent Arena · Collaborative Workflow';
      case 'code-gen':
        return 'Code Generation & Live Sandbox';
      case 'comparison':
        return 'Solution Comparison Matrix';
      case 'evaluations':
        return 'Multi-Criteria Scoring Engine';
      case 'refinement':
        return 'Iterative Architectural Refinement';
      case 'recommendation':
        return 'Final Recommendation & Roadmap';
      case 'history':
        return 'Session Archives & History';
      case 'how-it-works':
        return 'Architecture & Methodology';
      case 'settings':
        return 'Application Preferences';
      default:
        return 'IntelliSolve AI';
    }
  };

  const toggleTheme = () => {
    const nextTheme = settings.theme === 'light' ? 'dark' : 'light';
    updateSettings({ theme: nextTheme });
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Dashboard link copied to clipboard.', 'success');
    } else {
      showToast('Direct link: ' + window.location.href, 'info');
    }
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs border-b border-slate-200 dark:border-slate-800 px-4 md:px-8 flex items-center justify-between gap-4">
      {/* Zone 1: Mobile Hamburger + Breadcrumb */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onToggleMobileMenu}
          className="p-1.5 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 md:hidden cursor-pointer"
          aria-label="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 truncate">
          <span className="hidden sm:inline">IntelliSolve AI</span>
          <span className="hidden sm:inline text-slate-300 dark:text-slate-600">/</span>
          <span className="font-semibold text-slate-900 dark:text-slate-100 truncate">
            {getBreadcrumbLabel()}
          </span>
        </div>
      </div>

      {/* Zone 2: Informational Notice (Anti-Pill clean unboxed text) */}
      <div className="hidden lg:flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <span>Frontend Engine Demo</span>
        <span aria-hidden="true">·</span>
        <span>Deterministic Scoring</span>
        <span aria-hidden="true">·</span>
        <span>Local Storage Active</span>
      </div>

      {/* Zone 3: Primary Actions */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => setActiveView('code-gen')}
          className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer whitespace-nowrap ${
            activeView === 'code-gen'
              ? 'bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-950/50 dark:border-indigo-800 dark:text-indigo-300'
              : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
          }`}
          title="Open Code Generation and Execution Sandbox"
        >
          <Code2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span>Code Workspace</span>
        </button>

        <button
          onClick={saveCurrentSession}
          className="p-1.5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          title="Save Current Session to History"
        >
          <Bookmark className="w-4 h-4" />
        </button>

        <button
          onClick={handleShare}
          className="p-1.5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          title="Copy Link"
        >
          <Share2 className="w-4 h-4" />
        </button>

        <button
          onClick={toggleTheme}
          className="p-1.5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          title={`Switch to ${settings.theme === 'light' ? 'Dark' : 'Light'} Mode`}
        >
          {settings.theme === 'light' ? (
            <Moon className="w-4 h-4" />
          ) : (
            <Sun className="w-4 h-4 text-amber-400" />
          )}
        </button>

        <button
          onClick={() => setActiveView('new-problem')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-lg transition-colors shadow-xs cursor-pointer whitespace-nowrap"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>New Problem</span>
        </button>
      </div>
    </header>
  );
};
