import { MATHEMATICS, MATHS_LITERACY, TECHNICAL_MATHS } from "@/data/subjects";
import type { Pathway, Programme, ScoreRule, StudentSubject, SubjectRequirement, University } from "@/data/types";
import { calculateScore, type ScoreResult } from "./scoring";

export type MatchStatus = "eligible" | "close" | "pathway" | "notYet";

export type Gap =
  | { kind: "score"; label: string; need: number; have: number }
  | { kind: "subject"; label: string; need: number; have: number | null; subject: string };

export type MatchResult = {
  programme: Programme;
  university: University;
  status: MatchStatus;
  score: ScoreResult;
  gaps: Gap[];
  pathway?: Pathway;
  minScore: number;
};

const DEFAULT_CLOSE_MARGIN: Record<ScoreRule["kind"], number> = {
  points: 3,
  percentageSum: 20,
  percentageAverage: 4,
};

const CLOSE_SUBJECT_MARGIN = 5;

export function checkSubjects(requirements: SubjectRequirement[], subjects: StudentSubject[]): Gap[] {
  const gaps: Gap[] = [];
  for (const requirement of requirements) {
    let bestGap: Gap | null = null;
    let met = false;
    for (const option of requirement.options) {
      const taken = subjects.filter((subject) => option.subjects.includes(subject.name));
      const best = taken.sort((a, b) => b.mark - a.mark)[0];
      if (best && best.mark >= option.minPercent) {
        met = true;
        break;
      }
      const candidate: Gap = {
        kind: "subject",
        label: requirement.label,
        subject: best?.name ?? option.subjects[0],
        need: option.minPercent,
        have: best?.mark ?? null,
      };
      const shortfall = (gap: Gap) => (gap.have === null ? Infinity : gap.need - gap.have);
      if (!bestGap || shortfall(candidate) < shortfall(bestGap)) bestGap = candidate;
    }
    if (!met && bestGap) gaps.push(bestGap);
  }
  return gaps;
}

function scoreGap(score: ScoreResult, need: number): Gap[] {
  return score.value >= need ? [] : [{ kind: "score", label: score.label, need, have: score.value }];
}

export function takesMathsLiteracy(subjects: StudentSubject[]) {
  const names = subjects.map((subject) => subject.name);
  return names.includes(MATHS_LITERACY) && !names.includes(MATHEMATICS) && !names.includes(TECHNICAL_MATHS);
}

export function requiredScore(target: { minScore?: number; minScoreWithMathsLiteracy?: number }, subjects: StudentSubject[]) {
  return takesMathsLiteracy(subjects) ? (target.minScoreWithMathsLiteracy ?? target.minScore) : target.minScore;
}

export function matchProgramme(programme: Programme, university: University, subjects: StudentSubject[]): MatchResult {
  const rule = programme.scoreRule ?? university.score;
  const score = calculateScore(rule, subjects);
  const minScore = requiredScore(programme, subjects) ?? programme.minScore;
  const gaps = [...scoreGap(score, minScore), ...checkSubjects(programme.subjects, subjects)];

  if (gaps.length === 0) return { programme, university, status: "eligible", score, gaps, minScore };

  const margin = rule.closeMargin ?? DEFAULT_CLOSE_MARGIN[rule.kind];
  const scoreFloor = programme.consideredFrom ?? minScore - margin;
  const isClose = gaps.every((gap) =>
    gap.kind === "score" ? gap.have >= scoreFloor : gap.have !== null && gap.need - gap.have <= CLOSE_SUBJECT_MARGIN,
  );

  for (const pathway of programme.pathways ?? []) {
    if (pathway.minScore === undefined && !pathway.subjects) continue;
    const pathwayMin = requiredScore(pathway, subjects);
    const pathwayGaps = [
      ...(pathwayMin === undefined ? [] : scoreGap(score, pathwayMin)),
      ...checkSubjects(pathway.subjects ?? [], subjects),
    ];
    if (pathwayGaps.length === 0) {
      return { programme, university, status: isClose ? "close" : "pathway", score, gaps, pathway, minScore };
    }
  }

  return { programme, university, status: isClose ? "close" : "notYet", score, gaps, minScore };
}

const STATUS_ORDER: Record<MatchStatus, number> = { eligible: 0, close: 1, pathway: 2, notYet: 3 };

export function matchAll(
  programmes: Programme[],
  universities: University[],
  subjects: StudentSubject[],
): MatchResult[] {
  const byId = new Map(universities.map((university) => [university.id, university]));
  return programmes
    .flatMap((programme) => {
      const university = byId.get(programme.universityId);
      return university ? [matchProgramme(programme, university, subjects)] : [];
    })
    .sort((a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status] || a.gaps.length - b.gaps.length);
}
