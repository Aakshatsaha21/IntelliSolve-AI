import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import {
  Problem,
  CandidateSolution,
  EvaluationCriteria,
  Agent,
  AgentType,
  Session,
  Settings,
} from '../types';
import { DEFAULT_WEIGHTS, calculateWeightedScore, rankSolutions } from '../utils/scoring';
import { DEFAULT_PROBLEM, SAMPLE_SOLUTIONS_ATTENDANCE } from '../data/mockProblems';

export type ActiveView =
  | 'dashboard'
  | 'new-problem'
  | 'agent-arena'
  | 'comparison'
  | 'evaluations'
  | 'refinement'
  | 'recommendation'
  | 'code-gen'
  | 'history'
  | 'how-it-works'
  | 'settings';

export type WorkflowStage =
  | 'analysis'
  | 'generation'
  | 'evaluation'
  | 'testing'
  | 'refinement'
  | 'ranking'
  | 'completed';

export interface StageInfo {
  id: WorkflowStage;
  label: string;
  description: string;
  activeAgent: AgentType;
  durationMs: number;
}

export const WORKFLOW_STAGES: StageInfo[] = [
  {
    id: 'analysis',
    label: '1. Problem Analysis',
    description: 'Decomposing constraints, scope, target stakeholders, and requirements.',
    activeAgent: 'analyst',
    durationMs: 3200,
  },
  {
    id: 'generation',
    label: '2. Solution Generation',
    description: 'Proposing architectural candidate approaches and implementation mechanisms.',
    activeAgent: 'innovator',
    durationMs: 3800,
  },
  {
    id: 'evaluation',
    label: '3. Multi-Criteria Evaluation',
    description: 'Scoring against feasibility, reliability, efficiency, and alignment criteria.',
    activeAgent: 'engineer',
    durationMs: 3400,
  },
  {
    id: 'testing',
    label: '4. Controlled Testing Demo',
    description: 'Simulating proxy fraud scenarios, network dropouts, and attendance throughput.',
    activeAgent: 'analyst',
    durationMs: 3600,
  },
  {
    id: 'refinement',
    label: '5. Iterative Refinement',
    description: 'Addressing edge case vulnerabilities and synthesizing enhanced architecture.',
    activeAgent: 'optimizer',
    durationMs: 3400,
  },
  {
    id: 'ranking',
    label: '6. Final Ranking & Synthesis',
    description: 'Computing final weighted matrix and compiling recommendation roadmap.',
    activeAgent: 'optimizer',
    durationMs: 2500,
  },
];

export const INITIAL_AGENTS: Agent[] = [
  {
    id: 'innovator',
    name: 'Innovator Agent',
    role: 'Creative Ideation & Alternative Approaches',
    avatarIcon: 'Lightbulb',
    description: 'Identifies non-traditional architectural vectors, novel automation patterns, and creative solutions to bypass legacy hardware bottlenecks.',
    status: 'idle',
    progress: 0,
    currentActivity: 'Standing by for problem submission.',
    detailedLogs: [
      'Initialized neural semantic mapping engine.',
      'Exploration temperature set to 0.7 for divergent conceptual proposals.',
    ],
    outputSummary: 'Proposes high-impact, modern architectures prioritizing user friction reduction.',
  },
  {
    id: 'engineer',
    name: 'Engineer Agent',
    role: 'Technical Feasibility & Implementation',
    avatarIcon: 'Code2',
    description: 'Focuses on pragmatic engineering constraints, stack feasibility, data schemas, throughput bottlenecks, and real-world deployment viability.',
    status: 'idle',
    progress: 0,
    currentActivity: 'Standing by for problem submission.',
    detailedLogs: [
      'Loaded enterprise architecture validation matrices.',
      'Calibrated for standard campus infrastructure constraints.',
    ],
    outputSummary: 'Constructs robust technical specifications with realistic resource allocations.',
  },
  {
    id: 'analyst',
    name: 'Analyst Agent',
    role: 'Logic, Risks & Trade-off Evaluation',
    avatarIcon: 'BarChart3',
    description: 'Rigorously audits candidate solutions for failure modes, edge-case vulnerabilities, security gaps, financial ROI, and regulatory compliance.',
    status: 'idle',
    progress: 0,
    currentActivity: 'Standing by for problem submission.',
    detailedLogs: [
      'Stress testing framework primed for failure-mode analysis.',
      'Security boundary rules enabled.',
    ],
    outputSummary: 'Conducts impartial trade-off comparisons across all evaluation dimensions.',
  },
  {
    id: 'optimizer',
    name: 'Optimizer Agent',
    role: 'Iterative Refinement & Score Enhancement',
    avatarIcon: 'Target',
    description: 'Ingests evaluation critiques and controlled test anomalies to synthesize upgraded iterations that resolve flagged vulnerabilities.',
    status: 'idle',
    progress: 0,
    currentActivity: 'Standing by for problem submission.',
    detailedLogs: [
      'Feedback synthesis pipeline ready.',
      'Weighted score optimization algorithm active.',
    ],
    outputSummary: 'Elevates candidate viability by closing identified technical gaps.',
  },
];

const DEFAULT_SETTINGS: Settings = {
  theme: 'light',
  animationSpeed: 'normal',
  defaultSolutionCount: 3,
  defaultWeights: DEFAULT_WEIGHTS,
};

interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

interface AppContextType {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  currentProblem: Problem;
  setCurrentProblem: (problem: Problem) => void;
  solutions: CandidateSolution[];
  setSolutions: React.Dispatch<React.SetStateAction<CandidateSolution[]>>;
  weights: Record<keyof EvaluationCriteria, number>;
  setWeights: (weights: Record<keyof EvaluationCriteria, number>) => void;
  resetWeights: () => void;
  selectedSolutionIds: string[];
  toggleSelectSolution: (id: string) => void;
  // Arena State
  agents: Agent[];
  currentStageIndex: number;
  stageProgress: number; // 0 - 100 within stage
  overallArenaProgress: number; // 0 - 100 overall
  isArenaRunning: boolean;
  isArenaPaused: boolean;
  isArenaCompleted: boolean;
  startArenaDemo: () => void;
  pauseArenaDemo: () => void;
  resumeArenaDemo: () => void;
  resetArenaDemo: () => void;
  // Refinement
  applyRefinement: (solutionId: string) => void;
  // History & Storage
  history: Session[];
  saveCurrentSession: () => void;
  loadSession: (sessionId: string) => void;
  deleteSession: (sessionId: string) => void;
  clearHistory: () => void;
  // Settings
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
  resetSettings: () => void;
  // Toast
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
  // Code workspace quick open
  selectedCodeTemplateId: string;
  setSelectedCodeTemplateId: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');
  const [currentProblem, setCurrentProblemState] = useState<Problem>(() => {
    const saved = localStorage.getItem('intellisolve_active_problem');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return DEFAULT_PROBLEM;
  });

  const [weights, setWeightsState] = useState<Record<keyof EvaluationCriteria, number>>(() => {
    const saved = localStorage.getItem('intellisolve_weights');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return DEFAULT_WEIGHTS;
  });

  const [solutions, setSolutionsState] = useState<CandidateSolution[]>(() => {
    const saved = localStorage.getItem('intellisolve_active_solutions');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return rankSolutions(SAMPLE_SOLUTIONS_ATTENDANCE, DEFAULT_WEIGHTS);
  });

  const [selectedSolutionIds, setSelectedSolutionIds] = useState<string[]>(['sol-smart-anomaly', 'sol-qr-basic']);
  const [agents, setAgents] = useState<Agent[]>(INITIAL_AGENTS);
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(0);
  const [stageProgress, setStageProgress] = useState<number>(0);
  const [overallArenaProgress, setOverallArenaProgress] = useState<number>(0);
  const [isArenaRunning, setIsArenaRunning] = useState<boolean>(false);
  const [isArenaPaused, setIsArenaPaused] = useState<boolean>(false);
  const [isArenaCompleted, setIsArenaCompleted] = useState<boolean>(false);

  const [history, setHistory] = useState<Session[]>(() => {
    const saved = localStorage.getItem('intellisolve_history');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return [
      {
        id: 'sess-default-attendance',
        problem: DEFAULT_PROBLEM,
        solutions: rankSolutions(SAMPLE_SOLUTIONS_ATTENDANCE, DEFAULT_WEIGHTS),
        weights: DEFAULT_WEIGHTS,
        recommendedSolutionId: 'sol-smart-anomaly',
        timestamp: new Date().toISOString(),
        stagesCompleted: true,
      },
    ];
  });

  const [settings, setSettings] = useState<Settings>(() => {
    const saved = localStorage.getItem('intellisolve_settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return DEFAULT_SETTINGS;
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [selectedCodeTemplateId, setSelectedCodeTemplateId] = useState<string>('grade-calculator');

  // Persistence effects
  useEffect(() => {
    localStorage.setItem('intellisolve_active_problem', JSON.stringify(currentProblem));
  }, [currentProblem]);

  useEffect(() => {
    localStorage.setItem('intellisolve_weights', JSON.stringify(weights));
  }, [weights]);

  useEffect(() => {
    localStorage.setItem('intellisolve_active_solutions', JSON.stringify(solutions));
  }, [solutions]);

  useEffect(() => {
    localStorage.setItem('intellisolve_history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('intellisolve_settings', JSON.stringify(settings));
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings]);

  const showToast = useCallback((message: string, type: 'success' | 'info' | 'warning' = 'info') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const setCurrentProblem = (problem: Problem) => {
    setCurrentProblemState(problem);
    // If selecting a standard mock problem, populate its candidate solutions
    setSolutionsState(rankSolutions(SAMPLE_SOLUTIONS_ATTENDANCE, weights));
    setIsArenaCompleted(false);
    resetArenaDemo();
  };

  const setWeights = (newWeights: Record<keyof EvaluationCriteria, number>) => {
    setWeightsState(newWeights);
    // Immediately re-rank solutions with genuine deterministic calculation!
    setSolutionsState((prev) => rankSolutions(prev, newWeights));
  };

  const resetWeights = () => {
    setWeights(settings.defaultWeights);
    showToast('Evaluation weights restored to default values.', 'info');
  };

  const toggleSelectSolution = (id: string) => {
    setSelectedSolutionIds((prev) => {
      if (prev.includes(id)) {
        if (prev.length <= 1) {
          showToast('At least one solution must remain selected for comparison.', 'warning');
          return prev;
        }
        return prev.filter((item) => item !== id);
      } else {
        if (prev.length >= 3) {
          showToast('Maximum 3 solutions can be compared side-by-side.', 'info');
          return [prev[1], prev[2], id];
        }
        return [...prev, id];
      }
    });
  };

  const applyRefinement = (solutionId: string) => {
    setSolutionsState((prev) =>
      prev.map((sol) => {
        if (sol.id === solutionId && sol.refined && !sol.refined.isApplied) {
          const updatedScore = sol.refined.improvedScore;
          const updatedCriteria = {
            ...sol.criteriaScores,
            correctness: Math.min(100, sol.criteriaScores.correctness + 3),
            reliability: Math.min(100, sol.criteriaScores.reliability + 5),
            efficiency: Math.min(100, sol.criteriaScores.efficiency + 3),
          };
          const newOverall = calculateWeightedScore(updatedCriteria, weights);
          return {
            ...sol,
            criteriaScores: updatedCriteria,
            overallScore: newOverall,
            summary: sol.refined.refinedSummary,
            advantages: [...sol.advantages, sol.refined.whatChanged],
            revisionHistory: [
              ...sol.revisionHistory,
              {
                version: `v${(sol.revisionHistory.length + 1).toFixed(1)}`,
                timestamp: 'Interactive Refinement',
                notes: sol.refined.whatChanged,
                score: newOverall,
              },
            ],
            refined: {
              ...sol.refined,
              isApplied: true,
            },
          };
        }
        return sol;
      })
    );
    showToast('Solution refined successfully! Weighted score updated.', 'success');
  };

  // Arena Workflow Animation Timer
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetArenaDemo = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsArenaRunning(false);
    setIsArenaPaused(false);
    setIsArenaCompleted(false);
    setCurrentStageIndex(0);
    setStageProgress(0);
    setOverallArenaProgress(0);
    setAgents(INITIAL_AGENTS);
  }, []);

  const startArenaDemo = () => {
    resetArenaDemo();
    setIsArenaRunning(true);
    setIsArenaPaused(false);
    showToast('Simulated agent workflow started.', 'info');
  };

  const pauseArenaDemo = () => {
    setIsArenaPaused(true);
    showToast('Workflow paused.', 'info');
  };

  const resumeArenaDemo = () => {
    setIsArenaPaused(false);
    showToast('Workflow resumed.', 'info');
  };

  // Step engine for arena
  useEffect(() => {
    if (!isArenaRunning || isArenaPaused || isArenaCompleted) return;

    const currentStage = WORKFLOW_STAGES[currentStageIndex];
    if (!currentStage) {
      setIsArenaRunning(false);
      setIsArenaCompleted(true);
      return;
    }

    const speedMultiplier = settings.animationSpeed === 'fast' ? 0.4 : settings.animationSpeed === 'slow' ? 1.8 : 1.0;
    const tickInterval = 80;
    const totalTicks = Math.max(10, Math.round((currentStage.durationMs * speedMultiplier) / tickInterval));
    let tickCount = 0;

    // Update active agent status
    setAgents((prev) =>
      prev.map((ag) => {
        if (ag.id === currentStage.activeAgent) {
          const statusMap: Record<WorkflowStage, Agent['status']> = {
            analysis: 'analyzing',
            generation: 'generating',
            evaluation: 'evaluating',
            testing: 'testing',
            refinement: 'refining',
            ranking: 'complete',
            completed: 'complete',
          };
          return {
            ...ag,
            status: statusMap[currentStage.id],
            currentActivity: currentStage.description,
            detailedLogs: [
              ...ag.detailedLogs,
              `[Stage: ${currentStage.label}] Executing simulated analysis loop...`,
            ].slice(-6),
          };
        }
        return ag;
      })
    );

    timerRef.current = setInterval(() => {
      tickCount++;
      const currentProgress = Math.min(100, Math.round((tickCount / totalTicks) * 100));
      setStageProgress(currentProgress);

      const overall = Math.round(
        ((currentStageIndex + currentProgress / 100) / WORKFLOW_STAGES.length) * 100
      );
      setOverallArenaProgress(overall);

      // Update active agent progress
      setAgents((prev) =>
        prev.map((ag) => {
          if (ag.id === currentStage.activeAgent) {
            return { ...ag, progress: currentProgress };
          }
          return ag;
        })
      );

      if (tickCount >= totalTicks) {
        if (timerRef.current) clearInterval(timerRef.current);
        if (currentStageIndex + 1 < WORKFLOW_STAGES.length) {
          setCurrentStageIndex((prev) => prev + 1);
          setStageProgress(0);
        } else {
          setIsArenaRunning(false);
          setIsArenaCompleted(true);
          setOverallArenaProgress(100);
          setAgents((prev) =>
            prev.map((ag) => ({
              ...ag,
              status: 'complete',
              progress: 100,
              currentActivity: 'Workflow cycle complete. Solutions evaluated & ranked.',
            }))
          );
          showToast('Multi-agent workflow completed! Comparison ready.', 'success');
        }
      }
    }, tickInterval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isArenaRunning, isArenaPaused, isArenaCompleted, currentStageIndex, settings.animationSpeed, showToast]);

  const saveCurrentSession = () => {
    const topSolution = solutions.slice().sort((a, b) => b.overallScore - a.overallScore)[0];
    const newSession: Session = {
      id: `sess-${Date.now()}`,
      problem: currentProblem,
      solutions,
      weights,
      recommendedSolutionId: topSolution ? topSolution.id : solutions[0]?.id || '',
      timestamp: new Date().toISOString(),
      stagesCompleted: isArenaCompleted || true,
    };
    setHistory((prev) => [newSession, ...prev]);
    showToast('Current problem session saved to local history.', 'success');
  };

  const loadSession = (sessionId: string) => {
    const found = history.find((s) => s.id === sessionId);
    if (found) {
      setCurrentProblemState(found.problem);
      setSolutionsState(found.solutions);
      setWeightsState(found.weights);
      setActiveView('comparison');
      showToast(`Loaded session: "${found.problem.title}"`, 'info');
    }
  };

  const deleteSession = (sessionId: string) => {
    setHistory((prev) => prev.filter((s) => s.id !== sessionId));
    showToast('Session removed from history.', 'info');
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('intellisolve_history');
    showToast('All session history cleared.', 'warning');
  };

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    showToast('Settings saved successfully.', 'success');
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
    setWeightsState(DEFAULT_WEIGHTS);
    showToast('Application preferences restored to factory defaults.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        activeView,
        setActiveView,
        currentProblem,
        setCurrentProblem,
        solutions,
        setSolutions: setSolutionsState,
        weights,
        setWeights,
        resetWeights,
        selectedSolutionIds,
        toggleSelectSolution,
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
        applyRefinement,
        history,
        saveCurrentSession,
        loadSession,
        deleteSession,
        clearHistory,
        settings,
        updateSettings,
        resetSettings,
        toasts,
        showToast,
        removeToast,
        selectedCodeTemplateId,
        setSelectedCodeTemplateId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
