import React, { useState } from 'react';
import {
  FileText,
  Sparkles,
  Code2,
  Sliders,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Problem, CategoryType, DifficultyLevel } from '../types';
import { QUICK_START_PROBLEMS, DEFAULT_PROBLEM } from '../data/mockProblems';

const CATEGORIES: CategoryType[] = [
  'Software Development',
  'Education',
  'Business',
  'Research',
  'Data Analysis',
  'Productivity',
  'Other',
];

const CODING_KEYWORDS = [
  'code',
  'program',
  'function',
  'html',
  'css',
  'javascript',
  'typescript',
  'python',
  'java',
  'c++',
  'react',
  'algorithm',
  'array',
  'calculator',
  'prime',
  'api',
  'database',
  'login',
  'frontend',
];

export const NewProblemView: React.FC = () => {
  const { setCurrentProblem, setActiveView, showToast } = useApp();

  const [title, setTitle] = useState(DEFAULT_PROBLEM.title);
  const [category, setCategory] = useState<CategoryType>(DEFAULT_PROBLEM.category);
  const [description, setDescription] = useState(DEFAULT_PROBLEM.description);
  const [desiredOutcome, setDesiredOutcome] = useState(DEFAULT_PROBLEM.desiredOutcome);
  const [constraints, setConstraints] = useState(DEFAULT_PROBLEM.constraints);
  const [difficulty, setDifficulty] = useState<DifficultyLevel>(DEFAULT_PROBLEM.difficulty);
  const [solutionCount, setSolutionCount] = useState<2 | 3 | 4>(3);
  const [evaluationPriorities, setEvaluationPriorities] = useState(
    DEFAULT_PROBLEM.evaluationPriorities
  );
  const [refinementEnabled, setRefinementEnabled] = useState(true);

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Check if problem contains coding keywords
  const isCodingProblem =
    category === 'Software Development' ||
    CODING_KEYWORDS.some(
      (kw) =>
        title.toLowerCase().includes(kw) ||
        description.toLowerCase().includes(kw)
    );

  const handleSelectExample = (prob: Problem) => {
    setTitle(prob.title);
    setCategory(prob.category);
    setDescription(prob.description);
    setDesiredOutcome(prob.desiredOutcome);
    setConstraints(prob.constraints);
    setDifficulty(prob.difficulty);
    setSolutionCount(prob.solutionCount);
    setEvaluationPriorities(prob.evaluationPriorities);
    setRefinementEnabled(prob.refinementEnabled);
    setErrors({});
    showToast(`Loaded example: "${prob.title}"`, 'info');
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!title.trim() || title.length < 5) {
      errs.title = 'Title must be at least 5 characters.';
    }
    if (!description.trim() || description.length < 20) {
      errs.description = 'Please describe the problem in at least 20 characters.';
    }
    if (!desiredOutcome.trim()) {
      errs.desiredOutcome = 'Please specify the desired outcome or target success metric.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (target: 'arena' | 'code-gen') => {
    if (!validate()) {
      showToast('Please resolve highlighted form validation errors.', 'warning');
      return;
    }

    const newProblem: Problem = {
      id: `prob-${Date.now()}`,
      title: title.trim(),
      category,
      description: description.trim(),
      desiredOutcome: desiredOutcome.trim(),
      constraints: constraints.trim() || 'No explicit constraints provided.',
      difficulty,
      solutionCount,
      evaluationPriorities:
        evaluationPriorities.trim() ||
        'Balanced multi-criteria evaluation with focus on feasibility.',
      refinementEnabled,
      createdAt: new Date().toISOString(),
      isCodingRelated: isCodingProblem,
    };

    setCurrentProblem(newProblem);

    if (target === 'code-gen') {
      setActiveView('code-gen');
      showToast('Problem loaded into Code Generation Workspace.', 'success');
    } else {
      setActiveView('agent-arena');
      showToast('Problem submitted. Proceeding to Agent Arena.', 'success');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">
          Formulate & Submit a Problem
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Provide contextual specifications, constraints, and success criteria for the specialized agent collective to analyze.
        </p>
      </div>

      {/* Selectable Example Problem Cards */}
      <div className="space-y-2">
        <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          <span>Quick Example Templates</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {QUICK_START_PROBLEMS.map((prob) => {
            const isCurrent = title === prob.title;
            return (
              <button
                key={prob.id}
                type="button"
                onClick={() => handleSelectExample(prob)}
                className={`p-3 rounded-lg border text-left text-xs transition-all cursor-pointer ${
                  isCurrent
                    ? 'border-indigo-600 bg-indigo-50/60 dark:bg-indigo-950/30'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-indigo-300'
                }`}
              >
                <span className="font-semibold text-slate-900 dark:text-white block line-clamp-1">
                  {prob.title}
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block line-clamp-1 mt-0.5">
                  {prob.category}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Submission Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit('arena');
        }}
        className="p-6 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-5 shadow-xs"
      >
        {/* Coding Detection Notice Banner */}
        {isCodingProblem && (
          <div className="p-3.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Code2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <div>
                <p className="text-xs font-bold text-indigo-950 dark:text-indigo-200">
                  Programming Problem Detected
                </p>
                <p className="text-[11px] text-indigo-700 dark:text-indigo-300">
                  This problem involves software code generation, execution preview, or algorithm comparison.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleSubmit('code-gen')}
              className="px-3 py-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-md whitespace-nowrap shadow-xs cursor-pointer"
            >
              Open in Code Workspace
            </button>
          </div>
        )}

        {/* Title & Category Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Problem Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Smart Student Attendance Management System"
              className={`w-full px-3 py-2 text-xs rounded-lg border bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 ${
                errors.title ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
              }`}
            />
            {errors.title && (
              <p className="text-[11px] text-rose-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                <span>{errors.title}</span>
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as CategoryType)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Problem Description */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Problem Description <span className="text-rose-500">*</span>
            </label>
            <span className="text-[11px] text-slate-400">
              {description.length} characters (min 20)
            </span>
          </div>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the current pain point, workflow, scale, and operational background..."
            className={`w-full px-3 py-2 text-xs rounded-lg border bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 ${
              errors.description ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
            }`}
          />
          {errors.description && (
            <p className="text-[11px] text-rose-500 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              <span>{errors.description}</span>
            </p>
          )}
        </div>

        {/* Desired Outcome & Constraints */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Desired Outcome & Success Metrics <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={3}
              value={desiredOutcome}
              onChange={(e) => setDesiredOutcome(e.target.value)}
              placeholder="e.g. Eliminate 15 minutes of wasted class time per lecture..."
              className={`w-full px-3 py-2 text-xs rounded-lg border bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 ${
                errors.desiredOutcome ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
              }`}
            />
            {errors.desiredOutcome && (
              <p className="text-[11px] text-rose-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                <span>{errors.desiredOutcome}</span>
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Technical Constraints & Requirements
            </label>
            <textarea
              rows={3}
              value={constraints}
              onChange={(e) => setConstraints(e.target.value)}
              placeholder="e.g. Zero proprietary hardware cost, must run in web browser..."
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Scope Parameters: Difficulty, Solution Count, Refinement */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-100 dark:border-slate-700/60">
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
              Difficulty Scale
            </label>
            <div className="flex gap-1.5 p-1 bg-slate-100 dark:bg-slate-900 rounded-lg">
              {(['Beginner', 'Intermediate', 'Advanced'] as DifficultyLevel[]).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setDifficulty(lvl)}
                  className={`flex-1 py-1 text-xs font-medium rounded-md transition-colors ${
                    difficulty === lvl
                      ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
              Candidate Solutions
            </label>
            <div className="flex gap-1.5 p-1 bg-slate-100 dark:bg-slate-900 rounded-lg">
              {([2, 3, 4] as const).map((cnt) => (
                <button
                  key={cnt}
                  type="button"
                  onClick={() => setSolutionCount(cnt)}
                  className={`flex-1 py-1 text-xs font-medium rounded-md transition-colors ${
                    solutionCount === cnt
                      ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  {cnt} Solutions
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
              Iterative Refinement
            </label>
            <button
              type="button"
              onClick={() => setRefinementEnabled(!refinementEnabled)}
              className={`w-full py-1.5 px-3 text-xs font-medium rounded-lg border transition-colors flex items-center justify-between cursor-pointer ${
                refinementEnabled
                  ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300'
                  : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-500'
              }`}
            >
              <span>{refinementEnabled ? 'Enabled' : 'Disabled'}</span>
              <CheckCircle2
                className={`w-3.5 h-3.5 ${
                  refinementEnabled ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Evaluation Priorities */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Evaluation Guidance / Strategic Priorities
          </label>
          <input
            type="text"
            value={evaluationPriorities}
            onChange={(e) => setEvaluationPriorities(e.target.value)}
            placeholder="e.g. Prioritize high feasibility and low capital expenditure..."
            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3">
          <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Simulated frontend execution. Session is saved to browser storage.</span>
          </div>

          <div className="flex items-center gap-3">
            {isCodingProblem && (
              <button
                type="button"
                onClick={() => handleSubmit('code-gen')}
                className="px-4 py-2 text-xs font-semibold text-indigo-600 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 rounded-lg border border-indigo-200 dark:border-indigo-800 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Generate Code</span>
              </button>
            )}

            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-lg shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>Analyze My Problem</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
