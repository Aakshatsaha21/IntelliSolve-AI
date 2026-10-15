import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  Moon,
  Sun,
  Zap,
  RotateCcw,
  Trash2,
  Sliders,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { EvaluationCriteria } from '../types';
import { CRITERIA_DEFINITIONS } from '../utils/scoring';

export const SettingsView: React.FC = () => {
  const {
    settings,
    updateSettings,
    resetSettings,
    clearHistory,
    showToast,
  } = useApp();

  const [isConfirmingReset, setIsConfirmingReset] = useState(false);
  const [isConfirmingClearData, setIsConfirmingClearData] = useState(false);

  const handleSpeedChange = (spd: 'fast' | 'normal' | 'slow') => {
    updateSettings({ animationSpeed: spd });
  };

  const handleCountChange = (cnt: 2 | 3 | 4) => {
    updateSettings({ defaultSolutionCount: cnt });
  };

  const handleWeightDefaultChange = (crit: keyof EvaluationCriteria, val: number) => {
    const updated = {
      ...settings.defaultWeights,
      [crit]: val,
    };
    updateSettings({ defaultWeights: updated });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      {/* Header */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
          <SettingsIcon className="w-4 h-4" />
          <span>Configuration & Preferences</span>
        </div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
          Application Settings
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Configure interface appearance, animation cadence, and evaluation baseline defaults.
        </p>
      </div>

      {/* Visual & Workflow Settings */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-6">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white">
          Visual Interface & Simulation Cadence
        </h2>

        {/* Theme Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100 dark:border-slate-700">
          <div>
            <h3 className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              Interface Theme
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Select clean light mode or dark navy theme.
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-900 rounded-lg">
            <button
              onClick={() => updateSettings({ theme: 'light' })}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                settings.theme === 'light'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              <span>Light Mode</span>
            </button>
            <button
              onClick={() => updateSettings({ theme: 'dark' })}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                settings.theme === 'dark'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Moon className="w-3.5 h-3.5 text-indigo-400" />
              <span>Dark Theme</span>
            </button>
          </div>
        </div>

        {/* Animation Speed */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100 dark:border-slate-700">
          <div>
            <h3 className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              Agent Arena Simulation Speed
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Controls the timer speed during the 6-stage agent demonstration.
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-900 rounded-lg">
            {(['fast', 'normal', 'slow'] as const).map((spd) => (
              <button
                key={spd}
                onClick={() => handleSpeedChange(spd)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md uppercase tracking-wider transition-colors ${
                  settings.animationSpeed === spd
                    ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                {spd}
              </button>
            ))}
          </div>
        </div>

        {/* Default Solutions Count */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              Default Solution Candidate Count
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Number of candidate solutions generated per new problem analysis.
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-900 rounded-lg">
            {([2, 3, 4] as const).map((cnt) => (
              <button
                key={cnt}
                onClick={() => handleCountChange(cnt)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  settings.defaultSolutionCount === cnt
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                {cnt} Solutions
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Default Evaluation Weights */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
        <div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">
            Default Evaluation Weight Matrix
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Baseline weights applied whenever a fresh problem is submitted.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {(
            [
              'correctness',
              'feasibility',
              'reliability',
              'efficiency',
              'innovation',
            ] as (keyof EvaluationCriteria)[]
          ).map((crit) => {
            const def = CRITERIA_DEFINITIONS[crit];
            const val = settings.defaultWeights[crit];
            return (
              <div
                key={crit}
                className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                    {def.label.split(' ')[0]}
                  </span>
                  <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                    {val}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  step="5"
                  value={val}
                  onChange={(e) =>
                    handleWeightDefaultChange(crit, parseInt(e.target.value, 10))
                  }
                  className="w-full accent-indigo-600 cursor-pointer mt-1"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Data Management & Danger Zone */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-rose-200 dark:border-rose-900/60 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-rose-700 dark:text-rose-400 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          <span>Local Storage & Reset Operations</span>
        </h2>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <div>
            <h3 className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              Clear All Saved Demo Data
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Purges all problem history, custom solution drafts, and local cache.
            </p>
          </div>

          <button
            onClick={() => setIsConfirmingClearData(true)}
            className="px-3.5 py-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg border border-rose-200 dark:border-rose-800 transition-colors cursor-pointer self-start sm:self-auto"
          >
            Clear Demo Data
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              Reset Application Preferences
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Restores animation cadence, default criteria weights, and theme to factory defaults.
            </p>
          </div>

          <button
            onClick={() => setIsConfirmingReset(true)}
            className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer self-start sm:self-auto"
          >
            Reset Defaults
          </button>
        </div>
      </div>

      {/* Confirmation Modals */}
      {isConfirmingReset && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-xl">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Reset All Preferences?
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              This will reset your weights, default solution count, and simulation speed back to initial defaults.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsConfirmingReset(false)}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  resetSettings();
                  setIsConfirmingReset(false);
                }}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {isConfirmingClearData && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-xl">
            <h3 className="text-sm font-bold text-rose-600 dark:text-rose-400">
              Clear All Local Data?
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              All saved problem sessions, candidate solutions, and custom configurations will be deleted from browser storage.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsConfirmingClearData(false)}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  clearHistory();
                  localStorage.clear();
                  resetSettings();
                  setIsConfirmingClearData(false);
                  showToast('Local application storage wiped.', 'warning');
                }}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-rose-600 hover:bg-rose-700 text-white cursor-pointer"
              >
                Confirm Clear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
