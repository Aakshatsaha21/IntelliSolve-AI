import React from 'react';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  Award,
  Layers,
  Cpu,
  CheckCircle,
  FileText,
  Clock,
  Play,
  Lightbulb,
  Code2,
  BarChart3,
  Target,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from 'recharts';
import { useApp } from '../context/AppContext';
import { QUICK_START_PROBLEMS } from '../data/mockProblems';

export const DashboardView: React.FC = () => {
  const {
    currentProblem,
    setCurrentProblem,
    solutions,
    setActiveView,
    startArenaDemo,
    agents,
    history,
  } = useApp();

  const chartData = solutions.map((sol) => ({
    name: sol.name.length > 20 ? sol.name.substring(0, 18) + '...' : sol.name,
    fullName: sol.name,
    score: sol.overallScore,
    author: sol.agentAuthor,
  }));

  const recommendedSolution =
    solutions.slice().sort((a, b) => b.overallScore - a.overallScore)[0] || solutions[0];

  const getAgentIcon = (id: string) => {
    switch (id) {
      case 'innovator':
        return <Lightbulb className="w-4 h-4 text-amber-500" />;
      case 'engineer':
        return <Code2 className="w-4 h-4 text-indigo-500" />;
      case 'analyst':
        return <BarChart3 className="w-4 h-4 text-emerald-500" />;
      case 'optimizer':
        return <Target className="w-4 h-4 text-cyan-500" />;
      default:
        return <Cpu className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 border border-slate-800 shadow-sm">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold mb-2 tracking-wide uppercase">
            <Sparkles className="w-4 h-4" />
            <span>Autonomous Multi-Agent Problem-Solving Platform</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2 text-balance">
            Welcome to IntelliSolve AI
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mb-6 leading-relaxed">
            Explore ideas. Compare solutions. Find the best approach.
            Coordinate four specialized agents through ideation, engineering feasibility, deterministic
            evaluation, and automated refinement.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveView('new-problem')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <span>Solve a New Problem</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setActiveView('agent-arena');
                startArenaDemo();
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-medium border border-white/10 transition-colors cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Launch Agent Arena</span>
            </button>
            <button
              onClick={() => setActiveView('code-gen')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-indigo-300 text-xs font-medium border border-slate-700 transition-colors cursor-pointer"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Code Workspace</span>
            </button>
          </div>
        </div>

        {/* Subtle decorative grid lines */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      {/* Metrics Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-medium">Demo Analyses</span>
            <FileText className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white font-mono tabular-nums">
            {24 + history.length}
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Simulated problem workflows
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-medium">Solutions Generated</span>
            <Layers className="w-4 h-4 text-cyan-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white font-mono tabular-nums">
            {72 + history.length * 3}
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Architectural proposals
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-medium">Evaluations Completed</span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white font-mono tabular-nums">
            19
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            5-dimension weighted matrices
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-medium">Refinements Applied</span>
            <CheckCircle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white font-mono tabular-nums">
            14
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Synthesized revisions
          </p>
        </div>
      </div>

      {/* Main 2-Column Split: Active Problem Chart & Recommended Solution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Solution Scores Chart */}
        <div className="lg:col-span-2 p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Current Problem: Solution Score Benchmark
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate max-w-md">
                {currentProblem.title}
              </p>
            </div>
            <button
              onClick={() => setActiveView('evaluations')}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium cursor-pointer"
            >
              Adjust Weights &rarr;
            </button>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                <XAxis
                  dataKey="name"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: '#94a3b8', opacity: 0.3 }}
                />
                <YAxis
                  domain={[0, 100]}
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: '#94a3b8', opacity: 0.3 }}
                />
                <Tooltip
                  formatter={(value: any) => [`${value}/100`, 'Weighted Score']}
                  labelFormatter={(name) => {
                    const match = chartData.find((d) => d.name === name);
                    return match ? match.fullName : name;
                  }}
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    borderColor: '#334155',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="score" radius={[6, 6, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        index === 0
                          ? '#4f46e5'
                          : index === 1
                          ? '#06b6d4'
                          : '#8b5cf6'
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Deterministic scores calculated from current 5-criteria weights</span>
            <button
              onClick={() => setActiveView('comparison')}
              className="font-medium text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
            >
              Side-by-side comparison &rarr;
            </button>
          </div>
        </div>

        {/* Latest Recommended Solution Card */}
        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide flex items-center gap-1.5">
                <Award className="w-4 h-4" />
                <span>Top Recommendation</span>
              </span>
              <span className="text-sm font-bold font-mono text-indigo-600 dark:text-indigo-400">
                {recommendedSolution?.overallScore}/100
              </span>
            </div>

            <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug mb-2">
              {recommendedSolution?.name}
            </h3>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              {recommendedSolution?.summary}
            </p>

            <div className="space-y-2 mb-4">
              <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Key Advantages
              </div>
              {recommendedSolution?.advantages.slice(0, 2).map((adv, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="leading-snug">{adv}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
            <button
              onClick={() => setActiveView('recommendation')}
              className="w-full py-2 px-3 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-500 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>View Full Recommendation & Roadmap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Agents Overview */}
      <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Specialized Agent Collective
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Four autonomous perspectives collaborating to formulate and validate solutions
            </p>
          </div>
          <button
            onClick={() => setActiveView('agent-arena')}
            className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium cursor-pointer"
          >
            Open Agent Arena &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {agents.map((ag) => (
            <div
              key={ag.id}
              className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      {getAgentIcon(ag.id)}
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                        {ag.name}
                      </h3>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 capitalize">
                        {ag.status}
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-slate-600 dark:text-slate-400">
                    {ag.progress}%
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug line-clamp-2 mt-1">
                  {ag.description}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-800">
                <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-1 overflow-hidden">
                  <div
                    className="bg-indigo-600 h-1 transition-all duration-300"
                    style={{ width: `${ag.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick-Start Example Problems */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Quick-Start Example Problems
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Select a pre-configured domain challenge to immediately explore candidate solutions
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {QUICK_START_PROBLEMS.map((prob) => {
            const isSelected = currentProblem.id === prob.id;
            return (
              <button
                key={prob.id}
                onClick={() => {
                  setCurrentProblem(prob);
                  setActiveView('agent-arena');
                }}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/20 shadow-xs'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-indigo-300 dark:hover:border-slate-600'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mb-2">
                    <span className="font-medium text-indigo-600 dark:text-indigo-400">
                      {prob.category}
                    </span>
                    <span className="font-mono">{prob.difficulty}</span>
                  </div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug mb-2">
                    {prob.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {prob.description}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">3 Solutions</span>
                  <span className="font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                    <span>Load</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
