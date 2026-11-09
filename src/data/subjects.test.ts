import { describe, expect, it } from "vitest";
import { subjectCombinationProblems } from "./subjects";

describe("subjectCombinationProblems", () => {
  it("allows Physical Sciences with Mathematics", () => {
    expect(subjectCombinationProblems(["Mathematics", "Physical Sciences"])).toEqual([]);
  });

  it("rejects Physical Sciences with Mathematical Literacy", () => {
    expect(subjectCombinationProblems(["Mathematical Literacy", "Physical Sciences"])).toHaveLength(1);
  });

  it("rejects Technical Sciences without Technical Mathematics", () => {
    expect(subjectCombinationProblems(["Mathematics", "Technical Sciences"])).toHaveLength(1);
    expect(subjectCombinationProblems(["Technical Mathematics", "Technical Sciences"])).toEqual([]);
  });

  it("allows Maths Literacy with other electives", () => {
    expect(subjectCombinationProblems(["Mathematical Literacy", "Life Sciences", "Geography"])).toEqual([]);
  });
});
