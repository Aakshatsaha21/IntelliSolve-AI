export type CategoryType = 
  | 'Software Development'
  | 'Education'
  | 'Business'
  | 'Research'
  | 'Data Analysis'
  | 'Productivity'
  | 'Other';

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface EvaluationCriteria {
  correctness: number;   // 0-100 (Alignment with requirements)
  feasibility: number;   // 0-100 (Technical practicality & resources)
  reliability: number;   // 0-100 (Robustness, safety, security)
  efficiency: number;    // 0-100 (Performance, speed, cost-effectiveness)
  innovation: number;    // 0-100 (Novelty, forward-looking design)
}

export type AgentType = 'innovator' | 'engineer' | 'analyst' | 'optimizer';

export interface Agent {
  id: AgentType;
  name: string;
  role: string;
  avatarIcon: string;
  description: string;
  status: 'idle' | 'analyzing' | 'generating' | 'evaluating' | 'testing' | 'refining' | 'complete';
  progress: number;
  currentActivity: string;
  detailedLogs: string[];
  outputSummary?: string;
}

export interface Problem {
  id: string;
  title: string;
  description: string;
  category: CategoryType;
  desiredOutcome: string;
  constraints: string;
  difficulty: DifficultyLevel;
  solutionCount: 2 | 3 | 4;
  evaluationPriorities: string;
  refinementEnabled: boolean;
  createdAt: string;
  isCodingRelated?: boolean;
}

export interface CandidateSolution {
  id: string;
  name: string;
  summary: string;
  approach: string;
  architecture: string[];
  advantages: string[];
  limitations: string[];
  complexity: 'Low' | 'Medium' | 'High';
  resourceRequirements: string;
  risksAndAssumptions: string[];
  criteriaScores: EvaluationCriteria;
  overallScore: number;
  ranking: number;
  agentAuthor: AgentType;
  tags: string[];
  revisionHistory: {
    version: string;
    timestamp: string;
    notes: string;
    score: number;
  }[];
  refined?: {
    originalScore: number;
    improvedScore: number;
    scoreDelta: number;
    weaknessesIdentified: string[];
    improvementsApplied: string[];
    whatChanged: string;
    refinedSummary: string;
    isApplied: boolean;
  };
}

export interface Session {
  id: string;
  problem: Problem;
  solutions: CandidateSolution[];
  weights: Record<keyof EvaluationCriteria, number>;
  recommendedSolutionId: string;
  timestamp: string;
  stagesCompleted: boolean;
}

export interface Settings {
  theme: 'light' | 'dark';
  animationSpeed: 'fast' | 'normal' | 'slow';
  defaultSolutionCount: 2 | 3 | 4;
  defaultWeights: Record<keyof EvaluationCriteria, number>;
}

export type ProgrammingLanguage = 
  | 'HTML' 
  | 'CSS' 
  | 'JavaScript' 
  | 'TypeScript' 
  | 'Python' 
  | 'Java' 
  | 'C++' 
  | 'React';

export interface CodeTemplateFile {
  filename: string;
  code: string;
  language: string;
}

export interface CodeTemplate {
  id: string;
  title: string;
  category: string;
  language: ProgrammingLanguage;
  framework?: string;
  description: string;
  tags: string[];
  files: CodeTemplateFile[];
  executionType: 'browser_iframe' | 'simulated_output';
  simulatedOutput?: string;
  explanation: {
    purpose: string;
    importantVariables: { name: string; purpose: string }[];
    functions: { name: string; description: string }[];
    conditionsAndLoops: string[];
    inputOutput: { input: string; output: string };
    stepByStep: string[];
    complexity: { time: string; space: string };
    edgeCases: string[];
  };
  improvement: {
    originalCode: string;
    improvedCode: string;
    whatChanged: string[];
    whyChanged: string[];
    readabilityImprovements: string;
    errorHandlingImprovements: string;
    performanceConsiderations: string;
  };
  agentAlternatives?: {
    innovatorVersion: {
      title: string;
      code: string;
      description: string;
      score: number;
    };
    engineerVersion: {
      title: string;
      code: string;
      description: string;
      score: number;
    };
    analystComparison: {
      correctness: string;
      readability: string;
      maintainability: string;
      efficiency: string;
      errorHandling: string;
      recommended: 'innovator' | 'engineer';
      rationale: string;
    };
    optimizerVersion: {
      title: string;
      code: string;
      improvements: string[];
      score: number;
    };
  };
  testCases?: {
    input: string;
    expectedOutput: string;
    note?: string;
  }[];
}
