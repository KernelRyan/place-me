import { LIFE_ORIENTATION } from "@/data/subjects";
import type { ScoreRule, StudentSubject } from "@/data/types";

export type CountedSubject = { name: string; mark: number; contribution: number };

export type ScoreResult = {
  value: number;
  max: number;
  label: string;
  counted: CountedSubject[];
  bonus: number;
};

export const NSC_POINTS_BANDS = [
  { minPercent: 80, points: 7 },
  { minPercent: 70, points: 6 },
  { minPercent: 60, points: 5 },
  { minPercent: 50, points: 4 },
  { minPercent: 40, points: 3 },
  { minPercent: 30, points: 2 },
  { minPercent: 0, points: 1 },
];

function bandPoints(rule: ScoreRule, subject: StudentSubject) {
  const scale = subject.name === LIFE_ORIENTATION && rule.lifeOrientationBands ? rule.lifeOrientationBands : (rule.bands ?? NSC_POINTS_BANDS);
  const bands = [...scale].sort((a, b) => b.minPercent - a.minPercent);
  return bands.find((band) => subject.mark >= band.minPercent)?.points ?? 0;
}

function weightFor(rule: ScoreRule, subject: string) {
  return rule.weights?.find((weight) => weight.subjects.includes(subject))?.multiplier ?? 1;
}

function contribution(rule: ScoreRule, subject: StudentSubject, maxPoints?: number) {
  const raw =
    rule.kind === "points" ? bandPoints(rule, subject) : subject.mark < (rule.minCountedPercent ?? 0) ? 0 : subject.mark;
  const capped = maxPoints === undefined ? raw : Math.min(raw, maxPoints);
  return capped * weightFor(rule, subject.name);
}

function maxContribution(rule: ScoreRule, subject?: string) {
  const top = rule.kind === "points" ? Math.max(...(rule.bands ?? NSC_POINTS_BANDS).map((band) => band.points)) : 100;
  return top * (subject ? weightFor(rule, subject) : 1);
}

export function calculateScore(rule: ScoreRule, subjects: StudentSubject[]): ScoreResult {
  const valid = subjects.filter((subject) => subject.name && Number.isFinite(subject.mark));
  const lo = valid.find((subject) => subject.name === LIFE_ORIENTATION);
  const lifeRule = rule.lifeOrientation;

  const pool = valid
    .filter((subject) => subject.name !== LIFE_ORIENTATION || lifeRule.kind === "countAsSubject")
    .map((subject) => ({
      ...subject,
      contribution: contribution(
        rule,
        subject,
        subject.name === LIFE_ORIENTATION && lifeRule.kind === "countAsSubject" ? lifeRule.maxPoints : undefined,
      ),
    }));

  const counted: CountedSubject[] = [];
  for (const group of rule.mustInclude ?? []) {
    const best = pool
      .filter((subject) => group.includes(subject.name) && !counted.includes(subject))
      .sort((a, b) => b.contribution - a.contribution)[0];
    if (best) counted.push(best);
  }
  const remaining = pool.filter((subject) => !counted.includes(subject)).sort((a, b) => b.contribution - a.contribution);
  counted.push(...remaining.slice(0, Math.max(0, rule.subjectsCounted - counted.length)));

  if (lo && lifeRule.kind === "addOnTop") {
    counted.push({ ...lo, contribution: contribution(rule, lo, lifeRule.maxPoints) });
  }

  const bonus = (rule.bonuses ?? []).reduce(
    (total, bonusRule) =>
      total + (valid.some((subject) => bonusRule.subjects.includes(subject.name) && subject.mark >= bonusRule.minPercent) ? bonusRule.points : 0),
    0,
  );

  const total = counted.reduce((sum, subject) => sum + subject.contribution, 0) + bonus;
  const loMax = lifeRule.kind === "addOnTop" ? (lifeRule.maxPoints ?? maxContribution(rule)) : 0;
  const maxTotal = rule.subjectsCounted * maxContribution(rule) + loMax + (rule.bonuses ?? []).reduce((sum, b) => sum + b.points, 0);

  if (rule.kind === "percentageAverage") {
    const weightTotal = Math.max(1, counted.reduce((sum, subject) => sum + weightFor(rule, subject.name), 0));
    return { value: Math.round((total / weightTotal) * 10) / 10, max: 100, label: rule.label, counted, bonus };
  }

  return { value: total, max: maxTotal, label: rule.label, counted, bonus };
}
