import React, { useState } from 'react';
import {
  Lightbulb,
  Code2,
  BarChart3,
  Target,
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ShieldAlert,
  Terminal,
  Activity,
  Layers,
  Sparkles,
} from 'lucide-react';
import { useApp, WORKFLOW_STAGES } from '../context/AppContext';
import { AgentType } from '../types';

export const AgentArenaView: React.FC = () => {
  const {
    currentProblem,
    agents,
    currentStageIndex,
    stageProgress,
    overallArenaProgress,
    isArenaRunning,
    isArenaPaused,
    isArenaCompleted,
    startArenaDemo,
    pauseArenaDemo,
    resumeArenaDemo,
    resetArenaDemo,
    setActiveView,
    settings,
    updateSettings,
  } = useApp();

  const [expandedAgentId, setExpandedAgentId] = useState<string | null>('innovator');

  const currentStage = WORKFLOW_STAGES[currentStageIndex] || WORKFLOW_STAGES[0];

  const getAgentTheme = (type: AgentType) => {
    switch (type) {
      case 'innovator':
        return {
          icon: Lightbulb,
          accent: 'text-amber-500',
          bg: 'bg-amber-500/10',
          border: 'border-amber-500/20',
          progress: 'bg-amber-500',
          tag: 'Creative Ideation',
        };
      case 'engineer':
        return {
          icon: Code2,
          accent: 'text-indigo-500',
          bg: 'bg-indigo-500/10',
          border: 'border-indigo-500/20',
          progress: 'bg-indigo-500',
          tag: 'Technical Feasibility',
        };
      case 'analyst':
        return {
          icon: BarChart3,
          accent: 'text-emerald-500',
          bg: 'bg-emerald-500/10',
          border: 'border-emerald-500/20',
          progress: 'bg-emerald-500',
          tag: 'Risk & Tradeoffs',
        };
      case 'optimizer':
        return {
          icon: Target,
          accent: 'text-cyan-500',
          bg: 'bg-cyan-500/10',
          border: 'border-cyan-500/20',
          progress: 'bg-cyan-500',
          tag: 'Feedback Refinement',
        };
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'analyzing':
      case 'generating':
      case 'evaluating':
      case 'testing':
      case 'refining':
        return {
          label: 'Active Working',
          badgeClass: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300',
        };
      case 'complete':
        return {
          label: 'Stage Complete',
          badgeClass: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
        };
      default:
        return {
          label: 'Standing By',
          badgeClass: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
        };
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Simulation Disclaimer Banner */}
      <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 flex items-start gap-3">
        <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
          <span className="font-semibold">Simulated Multi-Agent Workflow: </span>
          This workspace is a deterministic frontend demonstration of collaborative agent workflows.
          Agent activities and test runs are simulated locally using browser timers and mock state; no external AI services or live sandbox environments are engaged.
        </div>
      </div>

      {/* Arena Stage Header & Controls */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
              <Activity className="w-4 h-4" />
              <span>Multi-Agent Orchestration Arena</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-1">
              {currentProblem.title}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Current Stage:{' '}
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {currentStage.label}
              </span>{' '}
              · {currentStage.description}
            </p>
          </div>

          {/* Workflow Execution Controls */}
          <div className="flex items-center gap-2 flex-wrap">
            {!isArenaRunning && !isArenaCompleted && (
              <button
                onClick={startArenaDemo}
                className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs flex items-center gap-2 cursor-pointer transition-colors"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Start Simulation</span>
              </button>
            )}

            {isArenaRunning && !isArenaPaused && (
              <button
                onClick={pauseArenaDemo}
                className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 rounded-lg flex items-center gap-2 cursor-pointer transition-colors"
              >
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>Pause</span>
              </button>
            )}

            {isArenaRunning && isArenaPaused && (
              <button
                onClick={resumeArenaDemo}
                className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs flex items-center gap-2 cursor-pointer transition-colors"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Resume</span>
              </button>
            )}

            <button
              onClick={resetArenaDemo}
              className="px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 cursor-pointer transition-colors"
              title="Reset Arena Workflow"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>

            {/* Speed Selector */}
            <div className="flex items-center gap-1 border border-slate-200 dark:border-slate-700 rounded-lg p-0.5 bg-slate-50 dark:bg-slate-900">
              {(['fast', 'normal', 'slow'] as const).map((spd) => (
                <button
                  key={spd}
                  onClick={() => updateSettings({ animationSpeed: spd })}
                  className={`px-2 py-1 text-[10px] font-semibold rounded-md uppercase tracking-wider transition-colors ${
                    settings.animationSpeed === spd
                      ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  {spd}
                </button>
              ))}
            </div>

            {isArenaCompleted && (
              <button
                onClick={() => setActiveView('comparison')}
                className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <span>View Comparison Results</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              Overall Workflow Progress
            </span>
            <span className="font-mono tabular-nums text-slate-500 dark:text-slate-400">
              {overallArenaProgress}% Completed
            </span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-700/60 rounded-full h-2 overflow-hidden">
            <div
              className="bg-indigo-600 h-2 transition-all duration-300 ease-out"
              style={{ width: `${overallArenaProgress}%` }}
            />
          </div>
        </div>

        {/* 6 Workflow Stages Timeline */}
        <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-700/60">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {WORKFLOW_STAGES.map((stg, idx) => {
              const isPast = idx < currentStageIndex || isArenaCompleted;
              const isCurrent = idx === currentStageIndex && !isArenaCompleted;
              return (
                <div
                  key={stg.id}
                  className={`p-2.5 rounded-lg border text-xs transition-all ${
                    isCurrent
                      ? 'border-indigo-600 bg-indigo-50/80 dark:bg-indigo-950/40 shadow-xs'
                      : isPast
                      ? 'border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-emerald-950/20 text-slate-700 dark:text-slate-300'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[10px] text-slate-400">0{idx + 1}</span>
                    {isPast && <CheckCircle className="w-3 h-3 text-emerald-500" />}
                    {isCurrent && (
                      <span className="w-2 h-2 rounded-full bg-indigo-600" />
                    )}
                  </div>
                  <div className="font-semibold leading-tight line-clamp-1">{stg.label}</div>
                  {isCurrent && (
                    <div className="mt-1.5 w-full bg-indigo-200 dark:bg-indigo-900 rounded-full h-1 overflow-hidden">
                      <div
                        className="bg-indigo-600 h-1 transition-all duration-150"
                        style={{ width: `${stageProgress}%` }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4 Agent Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {agents.map((ag) => {
          const theme = getAgentTheme(ag.id);
          const Icon = theme.icon;
          const statusInfo = getStatusBadge(ag.status);
          const isExpanded = expandedAgentId === ag.id;

          return (
            <div
              key={ag.id}
              className={`rounded-xl border bg-white dark:bg-slate-800 shadow-xs transition-all ${
                ag.status !== 'idle' && ag.status !== 'complete'
                  ? 'border-indigo-400 dark:border-indigo-600 ring-2 ring-indigo-500/20'
                  : 'border-slate-200 dark:border-slate-700'
              }`}
            >
              {/* Card Header */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl ${theme.bg} ${theme.border} border flex items-center justify-center shrink-0`}
                    >
                      <Icon className={`w-5 h-5 ${theme.accent}`} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span>{ag.name}</span>
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{ag.role}</p>
                    </div>
                  </div>

                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${statusInfo.badgeClass}`}
                  >
                    {statusInfo.label}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {ag.description}
                </p>

                {/* Current Activity Box */}
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80 mb-4">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
                    Current Focus
                  </div>
                  <div className="text-xs font-medium text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                    <span className="line-clamp-2">{ag.currentActivity}</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    <span>Agent Cycle Progress</span>
                    <span className="font-mono tabular-nums">{ag.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`${theme.progress} h-1.5 transition-all duration-200`}
                      style={{ width: `${ag.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Expandable Section: Execution Logs & Mock Outputs */}
              <div className="border-t border-slate-100 dark:border-slate-700 px-5 py-2.5 bg-slate-50/50 dark:bg-slate-900/30 flex items-center justify-between">
                <button
                  onClick={() => setExpandedAgentId(isExpanded ? null : ag.id)}
                  className="w-full flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-indigo-600 cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Agent Activity Stream & Outputs</span>
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
              </div>

              {isExpanded && (
                <div className="p-4 border-t border-slate-100 dark:border-slate-700 bg-slate-950 text-slate-300 font-mono text-[11px] space-y-2 rounded-b-xl overflow-x-auto">
                  <div className="text-slate-500 text-[10px] tracking-wider uppercase font-semibold">
                    Simulated Output Buffer:
                  </div>
                  {ag.detailedLogs.map((log, i) => (
                    <div key={i} className="flex items-start gap-2 text-slate-400">
                      <span className="text-slate-600 select-none">&gt;</span>
                      <span className="leading-relaxed">{log}</span>
                    </div>
                  ))}
                  {ag.outputSummary && (
                    <div className="mt-3 pt-2 border-t border-slate-800 text-indigo-300 text-xs font-sans">
                      <span className="font-semibold text-white">Synthesized Result: </span>
                      {ag.outputSummary}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Completion Banner */}
      {isArenaCompleted && (
        <div className="p-5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-emerald-900 dark:text-emerald-100">
                Multi-Agent Workflow Cycle Finished
              </h3>
              <p className="text-xs text-emerald-700 dark:text-emerald-300">
                All 6 stages evaluated. 3 candidate solutions ranked and ready for side-by-side analysis.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => setActiveView('comparison')}
              className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Explore Solution Comparison</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
