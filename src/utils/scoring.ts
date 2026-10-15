import { EvaluationCriteria, CandidateSolution } from '../types';

export const DEFAULT_WEIGHTS: Record<keyof EvaluationCriteria, number> = {
  correctness: 30,
  feasibility: 25,
  reliability: 20,
  efficiency: 15,
  innovation: 10,
};

export const CRITERIA_DEFINITIONS: Record<
  keyof EvaluationCriteria,
  { label: string; description: string; impact: string }
> = {
  correctness: {
    label: 'Correctness & Alignment',
    description: 'How thoroughly and accurately the solution addresses the stated problem, constraints, and functional requirements.',
    impact: 'Ensures the primary objective is met without missing critical deliverables.',
  },
  feasibility: {
    label: 'Technical Feasibility',
    description: 'Practicality of engineering implementation, resource availability, team skill requirements, and delivery timeframes.',
    impact: 'Prevents over-engineering and aligns with realistic deployment capabilities.',
  },
  reliability: {
    label: 'Reliability & Robustness',
    description: 'System resilience under failure conditions, security integrity, error recovery, and data protection.',
    impact: 'Protects business continuity and user trust in edge cases.',
  },
  efficiency: {
    label: 'Resource Efficiency',
    description: 'Operational performance, compute overhead, power consumption, network bandwidth, and ongoing maintenance cost.',
    impact: 'Maximizes ROI and guarantees scalability without runaway operational expenditures.',
  },
  innovation: {
    label: 'Architectural Innovation',
    description: 'Novelty of approach, modern automation paradigms, future-proofing, and distinctive competitive advantage.',
    impact: 'Provides sustainable technological leadership rather than obsolete legacy patterns.',
  },
};

/**
 * Calculates deterministic weighted score out of 100
 */
export function calculateWeightedScore(
  scores: EvaluationCriteria,
  weights: Record<keyof EvaluationCriteria, number>
): number {
  const totalWeight = Object.values(weights).reduce((sum, w) => sum + w, 0);
  if (totalWeight === 0) return 0;

  const rawScore =
    scores.correctness * (weights.correctness / 100) +
    scores.feasibility * (weights.feasibility / 100) +
    scores.reliability * (weights.reliability / 100) +
    scores.efficiency * (weights.efficiency / 100) +
    scores.innovation * (weights.innovation / 100);

  // Normalize by total weight in case weights temporarily deviate during adjustment
  const normalized = (rawScore * 100) / totalWeight;
  return Math.round(normalized * 10) / 10;
}

/**
 * Validates whether the weights add up to 100
 */
export function areWeightsValid(weights: Record<keyof EvaluationCriteria, number>): boolean {
  const sum = Object.values(weights).reduce((acc, curr) => acc + curr, 0);
  return Math.abs(sum - 100) < 0.01;
}

/**
 * Rank solutions by recalculating scores with current weights
 */
export function rankSolutions(
  solutions: CandidateSolution[],
  weights: Record<keyof EvaluationCriteria, number>
): CandidateSolution[] {
  const scored = solutions.map((sol) => {
    const overallScore = calculateWeightedScore(sol.criteriaScores, weights);
    return {
      ...sol,
      overallScore,
    };
  });

  scored.sort((a, b) => b.overallScore - a.overallScore);

  return scored.map((sol, index) => ({
    ...sol,
    ranking: index + 1,
  }));
}

/**
 * Returns accessible styling based on score ranges
 */
export function getScoreBadgeStyle(score: number): {
  bg: string;
  text: string;
  border: string;
  label: string;
} {
  if (score >= 88) {
    return {
      bg: 'bg-emerald-50 dark:bg-emerald-950/40',
      text: 'text-emerald-700 dark:text-emerald-400',
      border: 'border-emerald-200 dark:border-emerald-800',
      label: 'Exceptional Fit',
    };
  }
  if (score >= 75) {
    return {
      bg: 'bg-indigo-50 dark:bg-indigo-950/40',
      text: 'text-indigo-700 dark:text-indigo-400',
      border: 'border-indigo-200 dark:border-indigo-800',
      label: 'Strong Contender',
    };
  }
  if (score >= 60) {
    return {
      bg: 'bg-amber-50 dark:bg-amber-950/40',
      text: 'text-amber-700 dark:text-amber-400',
      border: 'border-amber-200 dark:border-amber-800',
      label: 'Moderate Viability',
    };
  }
  return {
    bg: 'bg-rose-50 dark:bg-rose-950/40',
    text: 'text-rose-700 dark:text-rose-400',
    border: 'border-rose-200 dark:border-rose-800',
    label: 'Needs Re-evaluation',
  };
}
