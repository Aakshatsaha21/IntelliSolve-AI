import React, { useState } from 'react';
import {
  BarChart2,
  Sliders,
  RotateCcw,
  CheckCircle,
  AlertTriangle,
  Award,
  Info,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  CartesianGrid,
} from 'recharts';
import { useApp } from '../context/AppContext';
import { EvaluationCriteria } from '../types';
import { CRITERIA_DEFINITIONS, areWeightsValid, calculateWeightedScore } from '../utils/scoring';

export const EvaluationsView: React.FC = () => {
  const {
    solutions,
    weights,
    setWeights,
    resetWeights,
    setActiveView,
    showToast,
  } = useApp();

  const [localWeights, setLocalWeights] = useState<Record<keyof EvaluationCriteria, number>>(weights);

  const totalWeight = Object.values(localWeights).reduce((a, b) => a + b, 0);
  const isValid = Math.abs(totalWeight - 100) < 0.1;

  const handleSliderChange = (criterion: keyof EvaluationCriteria, val: number) => {
    const updated = { ...localWeights, [criterion]: val };
    setLocalWeights(updated);
    // Real-time calculation if valid or normalized
    setWeights(updated);
  };

  const handleNormalizeWeights = () => {
    if (totalWeight === 0) return;
    const factor = 100 / totalWeight;
    const normalized: Record<keyof EvaluationCriteria, number> = {
      correctness: Math.round(localWeights.correctness * factor),
      feasibility: Math.round(localWeights.feasibility * factor),
      reliability: Math.round(localWeights.reliability * factor),
      efficiency: Math.round(localWeights.efficiency * factor),
      innovation: 0,
    };
    // Adjust remainder into innovation so it totals exactly 100
    const subTotal =
      normalized.correctness +
      normalized.feasibility +
      normalized.reliability +
      normalized.efficiency;
    normalized.innovation = Math.max(0, 100 - subTotal);

    setLocalWeights(normalized);
    setWeights(normalized);
    showToast('Weights normalized to 100%.', 'success');
  };

  // Prepare Radar Chart data
  const criteriaKeys: (keyof EvaluationCriteria)[] = [
    'correctness',
    'feasibility',
    'reliability',
    'efficiency',
    'innovation',
  ];

  const radarData = criteriaKeys.map((crit) => {
    const item: any = {
      criterion: CRITERIA_DEFINITIONS[crit].label.split(' ')[0],
      fullName: CRITERIA_DEFINITIONS[crit].label,
    };
    solutions.forEach((sol, i) => {
      item[sol.name] = sol.criteriaScores[crit];
    });
    return item;
  });

  // Prepare Horizontal Bar Chart data
  const barData = solutions.map((sol) => ({
    name: sol.name,
    overallScore: sol.overallScore,
    correctness: sol.criteriaScores.correctness,
    feasibility: sol.criteriaScores.feasibility,
    reliability: sol.criteriaScores.reliability,
    efficiency: sol.criteriaScores.efficiency,
    innovation: sol.criteriaScores.innovation,
  }));

  const topSolution = solutions.slice().sort((a, b) => b.overallScore - a.overallScore)[0] || solutions[0];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
            <BarChart2 className="w-4 h-4" />
            <span>Deterministic Scoring Engine</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            Multi-Criteria Evaluation & Weight Tuning
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Adjust strategic priority weights in real time. Transparent mathematical calculations instantly re-rank all candidate proposals.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              resetWeights();
              setLocalWeights(weights);
            }}
            className="px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
        </div>
      </div>

      {/* Interactive Weight Tuning Sliders & Total Status */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-700 pb-3">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Strategic Priority Weights
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div
              className={`text-xs font-semibold px-2.5 py-1 rounded-md flex items-center gap-1.5 ${
                isValid
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                  : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
              }`}
            >
              {isValid ? (
                <CheckCircle className="w-3.5 h-3.5" />
              ) : (
                <AlertTriangle className="w-3.5 h-3.5" />
              )}
              <span>Total Weight: {totalWeight}% (Must equal 100%)</span>
            </div>

            {!isValid && (
              <button
                onClick={handleNormalizeWeights}
                className="px-2.5 py-1 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-md cursor-pointer"
              >
                Auto-Normalize to 100%
              </button>
            )}
          </div>
        </div>

        {/* 5 Criteria Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {criteriaKeys.map((crit) => {
            const def = CRITERIA_DEFINITIONS[crit];
            const val = localWeights[crit];
            return (
              <div
                key={crit}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      {def.label.split(' ')[0]}
                    </span>
                    <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                      {val}%
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-3">
                    {def.description}
                  </p>
                </div>

                <div className="space-y-1">
                  <input
                    type="range"
                    min="0"
                    max="60"
                    step="5"
                    value={val}
                    onChange={(e) => handleSliderChange(crit, parseInt(e.target.value, 10))}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] text-slate-400 font-mono">
                    <span>0%</span>
                    <span>30%</span>
                    <span>60%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dynamic Visualizations: Horizontal Bar & Radar Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Horizontal Bar Chart */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
              Overall Weighted Score Breakdown
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Composite score calculated via deterministic dot product of criteria and weights
            </p>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={barData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} opacity={0.2} />
                  <XAxis
                    type="number"
                    domain={[0, 100]}
                    fontSize={11}
                    tickLine={false}
                    axisLine={{ stroke: '#94a3b8', opacity: 0.3 }}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={110}
                    fontSize={11}
                    tickLine={false}
                    axisLine={{ stroke: '#94a3b8', opacity: 0.3 }}
                    tickFormatter={(v) => (v.length > 14 ? v.substring(0, 12) + '...' : v)}
                  />
                  <Tooltip
                    formatter={(val: any) => [`${val}/100`, 'Weighted Score']}
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      borderColor: '#334155',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '12px',
                    }}
                  />
                  <Bar
                    dataKey="overallScore"
                    fill="#4f46e5"
                    radius={[0, 6, 6, 0]}
                    name="Weighted Score"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-2 pt-3 border-t border-slate-100 dark:border-slate-700 text-xs text-slate-500 flex items-center justify-between">
            <span>Formula: Σ (Criterion Score × Weight %)</span>
            <span className="font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
              Top: {topSolution.overallScore}/100
            </span>
          </div>
        </div>

        {/* Multi-Axial Radar Chart */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
              Multi-Axial Tradeoff Radar
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
              Cross-comparing solution profiles across all 5 evaluation dimensions
            </p>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke="#94a3b8" strokeOpacity={0.2} />
                  <PolarAngleAxis dataKey="criterion" fontSize={11} stroke="#64748b" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} fontSize={10} stroke="#94a3b8" />
                  {solutions.map((sol, idx) => {
                    const colors = ['#4f46e5', '#06b6d4', '#f59e0b', '#10b981'];
                    const color = colors[idx % colors.length];
                    return (
                      <Radar
                        key={sol.id}
                        name={sol.name}
                        dataKey={sol.name}
                        stroke={color}
                        fill={color}
                        fillOpacity={0.2}
                      />
                    );
                  })}
                  <Legend
                    wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }}
                    formatter={(v) => (v.length > 20 ? v.substring(0, 18) + '...' : v)}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      borderColor: '#334155',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '12px',
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-2 pt-3 border-t border-slate-100 dark:border-slate-700 text-xs text-slate-500 flex items-center justify-between">
            <span>Visualizes structural strengths & trade-off gaps</span>
            <button
              onClick={() => setActiveView('refinement')}
              className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline cursor-pointer"
            >
              Refine Identified Gaps &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* Ranked Candidate List & Rationale Breakdown */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Award className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span>Ranked Proposals & Selection Rationale</span>
        </h2>

        <div className="space-y-3">
          {solutions
            .slice()
            .sort((a, b) => b.overallScore - a.overallScore)
            .map((sol, index) => {
              const isFirst = index === 0;
              return (
                <div
                  key={sol.id}
                  className={`p-4 rounded-xl border transition-all ${
                    isFirst
                      ? 'border-indigo-400 dark:border-indigo-600 bg-indigo-50/40 dark:bg-indigo-950/20 shadow-xs'
                      : 'border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-900/40'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs font-bold ${
                          isFirst
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {index + 1}
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        {sol.name}
                      </h3>
                      {isFirst && (
                        <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider bg-indigo-100 dark:bg-indigo-900/60 px-2 py-0.5 rounded-sm">
                          Recommended Winner
                        </span>
                      )}
                    </div>

                    <div className="text-right">
                      <span className="text-base font-bold font-mono text-slate-900 dark:text-white">
                        {sol.overallScore}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">/100</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                    {sol.summary}
                  </p>

                  {/* Individual Criteria Pill Strip */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-xs font-mono">
                    {criteriaKeys.map((k) => (
                      <div key={k} className="flex justify-between items-center text-slate-500">
                        <span className="capitalize text-[11px] font-sans">
                          {k.substring(0, 5)}:
                        </span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                          {sol.criteriaScores[k]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
