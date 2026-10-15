import React from 'react';
import {
  HelpCircle,
  Lightbulb,
  Code2,
  BarChart3,
  Target,
  Cpu,
  Layers,
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  FileQuestion,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const HowItWorksView: React.FC = () => {
  const { setActiveView } = useApp();

  const workflowSteps = [
    {
      num: '01',
      title: 'Problem Formulation',
      actor: 'User Specification',
      desc: 'You define the operational scope, technical constraints, difficulty tier, and desired success metric.',
    },
    {
      num: '02',
      title: 'Multi-Agent Collaboration',
      actor: 'Agent Arena',
      desc: 'Four specialized roles (Innovator, Engineer, Analyst, Optimizer) ingest the constraints simultaneously.',
    },
    {
      num: '03',
      title: 'Solution Generation',
      actor: 'Innovator & Engineer',
      desc: 'Formulate diverse architectural approaches, from low-cost software abstractions to enterprise physical systems.',
    },
    {
      num: '04',
      title: 'Deterministic Evaluation',
      actor: 'Scoring Engine',
      desc: 'Candidate proposals are mathematically scored across 5 transparent criteria totaling 100% weight.',
    },
    {
      num: '05',
      title: 'Controlled Testing Demo',
      actor: 'Analyst Agent',
      desc: 'Simulated edge-case scenarios (e.g. proxy attendance, peak concurrency) uncover hidden vulnerabilities.',
    },
    {
      num: '06',
      title: 'Iterative Refinement',
      actor: 'Optimizer Agent',
      desc: 'Addresses discovered weaknesses with targeted engineering patches, generating a higher score delta.',
    },
    {
      num: '07',
      title: 'Final Recommendation & Roadmap',
      actor: 'Synthesis Dossier',
      desc: 'Outputs an actionable phased execution roadmap, complete trade-off rationale, and exportable JSON report.',
    },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
          <HelpCircle className="w-4 h-4" />
          <span>IntelliSolve AI Architecture</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
          How IntelliSolve AI Works
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed max-w-3xl">
          IntelliSolve AI bridges <strong>Generative AI</strong> and <strong>Agentic AI</strong>.
          Instead of relying on a single monolithic answer, our architecture simulates a committee of
          specialized agents with distinct cognitive biases to surface diverse solutions, stress-test them,
          and synthesize optimal recommendations.
        </p>
      </div>

      {/* Visual SVG Workflow Diagram */}
      <div className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-lg space-y-4">
        <div className="flex items-center justify-between text-xs font-semibold text-indigo-400">
          <span>End-to-End Orchestration Flow</span>
          <span className="font-mono text-slate-400">Deterministic Pipeline</span>
        </div>

        {/* Workflow Chain */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          {workflowSteps.slice(0, 4).map((st) => (
            <div
              key={st.num}
              className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 relative"
            >
              <div className="text-[10px] font-mono text-indigo-400 font-bold mb-1">
                STAGE {st.num}
              </div>
              <h3 className="text-sm font-bold text-white leading-snug mb-1">{st.title}</h3>
              <p className="text-[11px] text-slate-300 leading-relaxed">{st.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {workflowSteps.slice(4).map((st) => (
            <div
              key={st.num}
              className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 relative"
            >
              <div className="text-[10px] font-mono text-emerald-400 font-bold mb-1">
                STAGE {st.num}
              </div>
              <h3 className="text-sm font-bold text-white leading-snug mb-1">{st.title}</h3>
              <p className="text-[11px] text-slate-300 leading-relaxed">{st.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Conceptual Core Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center">
            <Lightbulb className="w-5 h-5" />
          </div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">
            Generative AI vs. Agentic AI
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Standard Generative AI produces raw text completions. <strong>Agentic AI</strong> introduces autonomy, goal-oriented reflection, iterative verification, and persona-driven multi-agent consensus. Each agent holds specialized responsibilities rather than one model attempting everything.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 flex items-center justify-center">
            <BarChart3 className="w-5 h-5" />
          </div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">
            Deterministic Scoring Engine
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Rather than relying on opaque AI judgements, solution viability is evaluated using a verifiable mathematical weighting formula:
            <code className="block mt-2 p-2 rounded-md bg-slate-100 dark:bg-slate-900 font-mono text-[11px] text-indigo-600 dark:text-indigo-400">
              Score = Σ (Criterion_Score × Weight_Percentage)
            </code>
            Weights are 100% transparent and recomputed in JavaScript on every adjustment.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">
            Iterative Refinement Loops
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Real solutions are rarely optimal on the first pass. The <strong>Optimizer Agent</strong> absorbs critiques generated by the <strong>Analyst Agent</strong>, addresses edge-case bottlenecks (such as proxy fraud or basement Wi-Fi loss), and proves measurable score deltas.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-3">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-500 flex items-center justify-center">
            <Code2 className="w-5 h-5" />
          </div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">
            Live Code Generation & Preview
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            When software problems are detected, IntelliSolve AI generates production-ready source code, structured explanations (complexity, edge cases, step-by-step), and renders real-time sandboxed iframe previews with full DOM interactivity.
          </p>
        </div>
      </div>

      {/* CTA Box */}
      <div className="p-6 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-indigo-950 dark:text-indigo-200">
            Ready to test IntelliSolve AI?
          </h3>
          <p className="text-xs text-indigo-700 dark:text-indigo-300 mt-0.5">
            Submit a real-world problem or explore the pre-loaded student attendance challenge.
          </p>
        </div>

        <button
          onClick={() => setActiveView('new-problem')}
          className="px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <span>Launch New Problem</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
