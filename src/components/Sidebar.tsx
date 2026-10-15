import React from 'react';
import {
  LayoutDashboard,
  PlusCircle,
  Cpu,
  GitCompare,
  BarChart2,
  RefreshCw,
  Award,
  Code2,
  History,
  HelpCircle,
  Settings as SettingsIcon,
  Sparkles,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { useApp, ActiveView } from '../context/AppContext';

interface NavItem {
  id: ActiveView;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  isSpecial?: boolean;
}

export const Sidebar: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const { activeView, setActiveView, isArenaRunning } = useApp();

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'new-problem', label: 'New Problem', icon: PlusCircle },
    {
      id: 'agent-arena',
      label: 'Agent Arena',
      icon: Cpu,
      badge: isArenaRunning ? 'Active' : undefined,
    },
    { id: 'code-gen', label: 'Code Workspace', icon: Code2, isSpecial: true, badge: 'Live Demo' },
    { id: 'comparison', label: 'Solution Comparison', icon: GitCompare },
    { id: 'evaluations', label: 'Evaluations', icon: BarChart2 },
    { id: 'refinement', label: 'Iterative Refinement', icon: RefreshCw },
    { id: 'recommendation', label: 'Recommendation', icon: Award },
    { id: 'history', label: 'History & Sessions', icon: History },
    { id: 'how-it-works', label: 'How It Works', icon: HelpCircle },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  const handleNav = (view: ActiveView) => {
    setActiveView(view);
    onClose();
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 flex flex-col transition-transform duration-200 ease-in-out md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Lockup */}
        <div className="h-16 px-5 border-b border-slate-800 flex items-center justify-between shrink-0">
          <button
            onClick={() => handleNav('dashboard')}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus-visible:outline-indigo-500 rounded-md"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-xs group-hover:bg-indigo-500 transition-colors">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-base font-bold text-white tracking-tight block leading-tight">
                IntelliSolve AI
              </span>
              <span className="text-[11px] text-slate-400 font-medium block leading-none mt-0.5">
                Multi-Agent Solver
              </span>
            </div>
          </button>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="px-3 pb-2 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
            Workspaces
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer text-left ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-xs font-semibold'
                    : item.isSpecial
                    ? 'text-indigo-300 hover:text-white hover:bg-slate-800/80'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      isActive ? 'text-white' : item.isSpecial ? 'text-indigo-400' : 'text-slate-400'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-sm ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-indigo-950 text-indigo-300 border border-indigo-800'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Demo Mode Guard Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/40">
          <div className="flex items-start gap-2.5 text-slate-400 text-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-slate-200 text-[11px]">Frontend Simulation</p>
              <p className="text-[10px] text-slate-400 leading-relaxed mt-0.5">
                Deterministic client demo. Zero external API calls or server fees.
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
