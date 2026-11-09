import type { ScoreRule, StudentSubject } from "@/data/types";
import { describe, expect, it } from "vitest";
import { calculateScore } from "./scoring";

const learner: StudentSubject[] = [
  { name: "English Home Language", mark: 72 },
  { name: "Afrikaans First Additional Language", mark: 58 },
  { name: "Mathematics", mark: 81 },
  { name: "Physical Sciences", mark: 66 },
  { name: "Life Sciences", mark: 64 },
  { name: "Geography", mark: 45 },
  { name: "Life Orientation", mark: 90 },
];

const baseRule: ScoreRule = {
  label: "APS",
  kind: "points",
  subjectsCounted: 6,
  lifeOrientation: { kind: "exclude" },
  explanation: "",
  sourceUrl: "",
};

describe("calculateScore", () => {
  it("sums NSC points for the best six subjects, excluding Life Orientation", () => {
    // 6 + 4 + 7 + 5 + 5 + 3
    expect(calculateScore(baseRule, learner).value).toBe(30);
  });

  it("only counts the best N subjects", () => {
    const result = calculateScore({ ...baseRule, subjectsCounted: 4 }, learner);
    expect(result.value).toBe(7 + 6 + 5 + 5);
  });

  it("can count Life Orientation as a capped subject", () => {
    const rule: ScoreRule = { ...baseRule, lifeOrientation: { kind: "countAsSubject", maxPoints: 4 } };
    // LO capped at 4 ties with Afrikaans; Geography (3) drops out
    expect(calculateScore(rule, learner).value).toBe(6 + 7 + 5 + 5 + 4 + 4);
  });

  it("can add Life Orientation on top of the counted subjects", () => {
    const rule: ScoreRule = { ...baseRule, lifeOrientation: { kind: "addOnTop", maxPoints: 2 } };
    expect(calculateScore(rule, learner).value).toBe(32);
  });

  it("applies custom bands such as an 8-point scale", () => {
    const rule: ScoreRule = {
      ...baseRule,
      bands: [
        { minPercent: 90, points: 8 },
        { minPercent: 80, points: 7 },
        { minPercent: 70, points: 6 },
        { minPercent: 60, points: 5 },
        { minPercent: 50, points: 4 },
        { minPercent: 40, points: 3 },
        { minPercent: 0, points: 0 },
      ],
      subjectsCounted: 1,
    };
    expect(calculateScore(rule, [{ name: "Mathematics", mark: 93 }]).value).toBe(8);
  });

  it("adds bonus points when the threshold is met", () => {
    const rule: ScoreRule = {
      ...baseRule,
      bonuses: [
        { subjects: ["Mathematics"], minPercent: 80, points: 2 },
        { subjects: ["English Home Language"], minPercent: 80, points: 2 },
      ],
    };
    expect(calculateScore(rule, learner).value).toBe(32);
  });

  it("forces required subjects into the count", () => {
    const rule: ScoreRule = { ...baseRule, subjectsCounted: 2, mustInclude: [["Geography"]] };
    expect(calculateScore(rule, learner).value).toBe(3 + 7);
  });

  it("uses a separate scale for Life Orientation when given", () => {
    const rule: ScoreRule = {
      ...baseRule,
      subjectsCounted: 7,
      lifeOrientation: { kind: "countAsSubject" },
      lifeOrientationBands: [
        { minPercent: 90, points: 4 },
        { minPercent: 60, points: 1 },
        { minPercent: 0, points: 0 },
      ],
    };
    expect(calculateScore(rule, learner).value).toBe(30 + 4);
  });

  it("counts marks below the floor as zero", () => {
    const rule: ScoreRule = { ...baseRule, kind: "percentageSum", minCountedPercent: 50 };
    expect(calculateScore(rule, learner).value).toBe(72 + 58 + 81 + 66 + 64 + 0);
  });

  it("sums percentages for percentage-based scores", () => {
    const rule: ScoreRule = { ...baseRule, kind: "percentageSum" };
    expect(calculateScore(rule, learner).value).toBe(72 + 58 + 81 + 66 + 64 + 45);
  });

  it("averages percentages with weights", () => {
    const rule: ScoreRule = {
      ...baseRule,
      kind: "percentageAverage",
      subjectsCounted: 2,
      weights: [{ subjects: ["Mathematics"], multiplier: 2 }],
    };
    // Maths (81 x2) + English 72, divided by total weight 3
    expect(calculateScore(rule, learner).value).toBe(78);
  });
});
