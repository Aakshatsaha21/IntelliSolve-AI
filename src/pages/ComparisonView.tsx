import React, { useState } from 'react';
import {
  CheckCircle,
  AlertTriangle,
  ArrowUpDown,
  Layers,
  Award,
  Clock,
  Sparkles,
  GitCompare,
  ArrowRight,
  Shield,
  Server,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CandidateSolution } from '../types';
import { getScoreBadgeStyle } from '../utils/scoring';

type SortOption = 'highest_score' | 'lowest_complexity' | 'highest_feasibility' | 'lowest_risk';
type TabType = 'overview' | 'implementation' | 'advantages' | 'risks' | 'revision_history';

export const ComparisonView: React.FC = () => {
  const {
    solutions,
    selectedSolutionIds,
    toggleSelectSolution,
    setActiveView,
  } = useApp();

  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [sortOption, setSortOption] = useState<SortOption>('highest_score');

  // Sorting logic
  const sortedSolutions = [...solutions].sort((a, b) => {
    switch (sortOption) {
      case 'highest_score':
        return b.overallScore - a.overallScore;
      case 'lowest_complexity': {
        const order = { Low: 1, Medium: 2, High: 3 };
        return order[a.complexity] - order[b.complexity];
      }
      case 'highest_feasibility':
        return b.criteriaScores.feasibility - a.criteriaScores.feasibility;
      case 'lowest_risk':
        return b.criteriaScores.reliability - a.criteriaScores.reliability;
      default:
        return 0;
    }
  });

  const comparedSolutions = sortedSolutions.filter((s) =>
    selectedSolutionIds.includes(s.id)
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Top Header & Sort Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
            <GitCompare className="w-4 h-4" />
            <span>Side-by-Side Solution Comparison</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            Candidate Architectural Solutions
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Select 2 or more proposals to compare trade-offs, architecture, and risk profiles.
          </p>
        </div>

        {/* Sorting Dropdown & Selection Indicator */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span>Sort by:</span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-medium cursor-pointer"
            >
              <option value="highest_score">Highest Demo Score</option>
              <option value="lowest_complexity">Lowest Complexity</option>
              <option value="highest_feasibility">Highest Feasibility</option>
              <option value="lowest_risk">Lowest Risk (Reliability)</option>
            </select>
          </div>

          <button
            onClick={() => setActiveView('evaluations')}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <span>Weighting Engine</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Selector Checkbox Strip */}
      <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <span className="font-semibold text-slate-700 dark:text-slate-300">
          Selected for Comparison ({selectedSolutionIds.length} of {solutions.length}):
        </span>
        <div className="flex flex-wrap items-center gap-2">
          {solutions.map((sol) => {
            const isChecked = selectedSolutionIds.includes(sol.id);
            return (
              <label
                key={sol.id}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium border cursor-pointer transition-colors ${
                  isChecked
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleSelectSolution(sol.id)}
                  className="rounded-xs text-indigo-600 focus:ring-indigo-500"
                />
                <span className="truncate max-w-[200px]">{sol.name}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl overflow-x-auto">
        {(
          [
            { id: 'overview', label: 'Overview & Approach' },
            { id: 'implementation', label: 'Architecture & Resources' },
            { id: 'advantages', label: 'Advantages & Limitations' },
            { id: 'risks', label: 'Risks & Assumptions' },
            { id: 'revision_history', label: 'Revision History' },
          ] as { id: TabType; label: string }[]
        ).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === tab.id
                ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Side-by-Side Comparison Grid */}
      <div
        className={`grid gap-6 ${
          comparedSolutions.length === 1
            ? 'grid-cols-1 max-w-2xl mx-auto'
            : comparedSolutions.length === 2
            ? 'grid-cols-1 md:grid-cols-2'
            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        }`}
      >
        {comparedSolutions.map((sol) => {
          const badge = getScoreBadgeStyle(sol.overallScore);
          const isTopRanked = sol.ranking === 1;

          return (
            <div
              key={sol.id}
              className={`rounded-2xl bg-white dark:bg-slate-800 border p-5 flex flex-col justify-between shadow-xs transition-all ${
                isTopRanked
                  ? 'border-indigo-400 dark:border-indigo-600 ring-2 ring-indigo-500/10'
                  : 'border-slate-200 dark:border-slate-700'
              }`}
            >
              <div>
                {/* Header Lockup */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                      <span>Rank #{sol.ranking}</span>
                      <span aria-hidden="true">·</span>
                      <span className="capitalize">{sol.agentAuthor} Agent</span>
                      {isTopRanked && (
                        <span className="text-amber-500 flex items-center gap-0.5">
                          <Award className="w-3.5 h-3.5" />
                          <span>Leader</span>
                        </span>
                      )}
                    </div>
                    <h2 className="text-base font-bold text-slate-900 dark:text-white mt-1 leading-snug">
                      {sol.name}
                    </h2>
                  </div>

                  {/* Score Pill */}
                  <div
                    className={`px-2.5 py-1 rounded-lg border text-right shrink-0 ${badge.bg} ${badge.border}`}
                  >
                    <div className={`text-sm font-bold font-mono ${badge.text}`}>
                      {sol.overallScore}
                      <span className="text-[10px] text-slate-400">/100</span>
                    </div>
                    <div className="text-[9px] font-medium text-slate-500 dark:text-slate-400">
                      {badge.label}
                    </div>
                  </div>
                </div>

                {/* Tab Specific Content */}
                {activeTab === 'overview' && (
                  <div className="space-y-4 text-xs">
                    <div>
                      <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                        Executive Summary
                      </span>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        {sol.summary}
                      </p>
                    </div>

                    <div>
                      <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                        Operational Approach
                      </span>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        {sol.approach}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-700">
                      <div>
                        <span className="text-[10px] font-medium text-slate-400 uppercase">
                          Complexity
                        </span>
                        <p className="font-semibold text-slate-800 dark:text-slate-200">
                          {sol.complexity}
                        </p>
                      </div>
                      <div>
                        <span className="text-[10px] font-medium text-slate-400 uppercase">
                          Feasibility Score
                        </span>
                        <p className="font-semibold font-mono text-slate-800 dark:text-slate-200">
                          {sol.criteriaScores.feasibility}/100
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'implementation' && (
                  <div className="space-y-4 text-xs">
                    <div>
                      <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-2 flex items-center gap-1.5">
                        <Server className="w-3.5 h-3.5 text-indigo-500" />
                        <span>Architectural Building Blocks</span>
                      </span>
                      <ul className="space-y-1.5">
                        {sol.architecture.map((arch, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-slate-600 dark:text-slate-400"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-1.5" />
                            <span>{arch}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-700">
                      <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                        Resource Requirements
                      </span>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        {sol.resourceRequirements}
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'advantages' && (
                  <div className="space-y-4 text-xs">
                    <div>
                      <span className="font-semibold text-emerald-700 dark:text-emerald-400 block mb-2">
                        Key Advantages
                      </span>
                      <ul className="space-y-2">
                        {sol.advantages.map((adv, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-slate-600 dark:text-slate-400"
                          >
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span className="leading-snug">{adv}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-700">
                      <span className="font-semibold text-amber-700 dark:text-amber-400 block mb-2">
                        Limitations & Bottlenecks
                      </span>
                      <ul className="space-y-2">
                        {sol.limitations.map((lim, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-slate-600 dark:text-slate-400"
                          >
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                            <span className="leading-snug">{lim}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === 'risks' && (
                  <div className="space-y-4 text-xs">
                    <div>
                      <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-2 flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5 text-indigo-500" />
                        <span>Risks & Operational Assumptions</span>
                      </span>
                      <ul className="space-y-2">
                        {sol.risksAndAssumptions.map((risk, i) => (
                          <li
                            key={i}
                            className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 leading-snug"
                          >
                            {risk}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === 'revision_history' && (
                  <div className="space-y-3 text-xs">
                    <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Evolution & Refinement Trail
                    </span>
                    <div className="space-y-2">
                      {sol.revisionHistory.map((rev, i) => (
                        <div
                          key={i}
                          className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60"
                        >
                          <div className="flex items-center justify-between font-mono text-[11px] mb-1">
                            <span className="font-bold text-indigo-600 dark:text-indigo-400">
                              {rev.version}
                            </span>
                            <span className="text-slate-400">{rev.timestamp}</span>
                          </div>
                          <p className="text-slate-600 dark:text-slate-400">{rev.notes}</p>
                          <div className="text-[10px] text-right text-slate-400 font-mono mt-1">
                            Score: {rev.score}/100
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Card Footer Actions */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs">
                <button
                  onClick={() => setActiveView('refinement')}
                  className="font-medium text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Iterative Refine</span>
                </button>
                <button
                  onClick={() => setActiveView('recommendation')}
                  className="font-semibold text-slate-800 dark:text-slate-200 hover:text-indigo-600 cursor-pointer flex items-center gap-1"
                >
                  <span>Roadmap</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
