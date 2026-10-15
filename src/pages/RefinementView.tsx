import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  History,
  ShieldAlert,
  Award,
  Layers,
  ArrowUpRight,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const RefinementView: React.FC = () => {
  const {
    solutions,
    applyRefinement,
    setActiveView,
  } = useApp();

  const [activeSolutionId, setActiveSolutionId] = useState<string>(
    solutions[0]?.id || ''
  );

  const selectedSolution =
    solutions.find((s) => s.id === activeSolutionId) || solutions[0];

  const refinementData = selectedSolution?.refined;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Simulation Disclaimer */}
      <div className="p-3.5 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/60 flex items-start gap-3">
        <ShieldAlert className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
        <div className="text-xs text-indigo-800 dark:text-indigo-300 leading-relaxed">
          <span className="font-semibold">Iterative Refinement Pipeline (Frontend Demo): </span>
          This view demonstrates how evaluation critique and edge-case anomalies drive architecture revisions.
          Refinement cycles, score deltas, and weakness remediation use predefined frontend models; no external LLM APIs are invoked.
        </div>
      </div>

      {/* Header & Solution Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
            <Sparkles className="w-4 h-4" />
            <span>Iterative Architecture Refinement</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            Weakness Remediation & Score Uplift
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Examine identified architectural risks and trigger automated engineering enhancements.
          </p>
        </div>

        {/* Solution Switcher Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl overflow-x-auto">
          {solutions.map((sol) => (
            <button
              key={sol.id}
              onClick={() => setActiveSolutionId(sol.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeSolutionId === sol.id
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {sol.name.length > 22 ? sol.name.substring(0, 20) + '...' : sol.name}
            </button>
          ))}
        </div>
      </div>

      {/* Before vs After Score Uplift Card */}
      {refinementData && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-700">
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Refinement Candidate
              </span>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                {selectedSolution.name}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xl leading-relaxed">
                {selectedSolution.summary}
              </p>
            </div>

            {/* Score Comparison Gauge */}
            <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shrink-0">
              <div className="text-center">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">
                  Original Score
                </span>
                <div className="text-xl font-bold font-mono text-slate-500">
                  {refinementData.originalScore}
                </div>
              </div>

              <div className="flex flex-col items-center text-emerald-500">
                <ArrowRight className="w-5 h-5" />
                <span className="text-[11px] font-bold font-mono">
                  +{refinementData.scoreDelta} pts
                </span>
              </div>

              <div className="text-center">
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 uppercase font-semibold">
                  Refined Score
                </span>
                <div className="text-2xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400">
                  {refinementData.isApplied
                    ? selectedSolution.overallScore
                    : refinementData.improvedScore}
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Trigger Button */}
          <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs text-slate-600 dark:text-slate-400">
              Status:{' '}
              {refinementData.isApplied ? (
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  ✓ Refinement Patched & Applied to Active Model
                </span>
              ) : (
                <span className="font-semibold text-amber-600 dark:text-amber-400">
                  Pending Application — Click below to incorporate improvements
                </span>
              )}
            </div>

            <button
              onClick={() => applyRefinement(selectedSolution.id)}
              disabled={refinementData.isApplied}
              className={`px-5 py-2.5 text-xs font-bold rounded-lg shadow-xs flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                refinementData.isApplied
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>
                {refinementData.isApplied ? 'Refinement Applied' : 'Improve Solution Now'}
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Weaknesses vs Improvements 2-Column Split */}
      {refinementData && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Identified Weaknesses */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
            <div className="flex items-center gap-2 mb-4 text-amber-600 dark:text-amber-400">
              <AlertTriangle className="w-4 h-4" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Analyst & Engineer Identified Weaknesses
              </h3>
            </div>

            <div className="space-y-3">
              {refinementData.weaknessesIdentified.map((weak, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-950 dark:text-amber-200 leading-relaxed flex items-start gap-2.5"
                >
                  <span className="w-5 h-5 rounded-full bg-amber-200 dark:bg-amber-900/80 text-amber-800 dark:text-amber-200 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{weak}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Suggested & Applied Improvements */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
            <div className="flex items-center gap-2 mb-4 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Optimizer Synthesized Enhancements
              </h3>
            </div>

            <div className="space-y-3">
              {refinementData.improvementsApplied.map((imp, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/60 text-xs text-emerald-950 dark:text-emerald-200 leading-relaxed flex items-start gap-2.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>{imp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Revision History & Timeline */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
        <div className="flex items-center gap-2 mb-4">
          <History className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Architectural Evolution Trail
          </h3>
        </div>

        <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-700">
          {selectedSolution.revisionHistory.map((rev, idx) => (
            <div key={idx} className="relative">
              <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-indigo-600 ring-4 ring-white dark:ring-slate-800" />
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between text-xs font-mono mb-1">
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">
                    {rev.version} — {rev.timestamp}
                  </span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    Score: {rev.score}/100
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {rev.notes}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
