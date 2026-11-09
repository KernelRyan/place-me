import type { Programme, StudentSubject, University } from "@/data/types";
import { describe, expect, it } from "vitest";
import { checkSubjects, matchProgramme } from "./matching";

const university: University = {
  id: "test",
  name: "Test University",
  shortName: "TU",
  province: "Gauteng",
  city: "Johannesburg",
  badgeGradient: "",
  website: "",
  applyUrl: "",
  applicationFee: null,
  applicationsOpen: null,
  applicationsClose: null,
  feesUrl: null,
  intakeYear: 2027,
  score: { label: "APS", kind: "points", subjectsCounted: 6, lifeOrientation: { kind: "exclude" }, explanation: "", sourceUrl: "" },
  prospectusYear: 2027,
  lastVerified: "2026-11-09",
};

const mathsRequirement = {
  label: "Mathematics",
  options: [
    { subjects: ["Mathematics"], minPercent: 60 },
    { subjects: ["Mathematical Literacy"], minPercent: 80 },
  ],
};

const programme: Programme = {
  id: "bsc",
  universityId: "test",
  name: "BSc",
  qualification: "Degree",
  years: 3,
  faculty: "Science",
  field: "Science",
  campus: "Main",
  minScore: 30,
  subjects: [mathsRequirement],
  pathways: [{ name: "Extended BSc", minScore: 22, subjects: [{ label: "Mathematics", options: [{ subjects: ["Mathematics"], minPercent: 50 }] }] }],
  url: "",
};

function learner(maths: number, others: number): StudentSubject[] {
  return [
    { name: "Mathematics", mark: maths },
    { name: "English Home Language", mark: others },
    { name: "Physical Sciences", mark: others },
    { name: "Life Sciences", mark: others },
    { name: "Geography", mark: others },
    { name: "History", mark: others },
  ];
}

describe("checkSubjects", () => {
  it("accepts any listed option", () => {
    expect(checkSubjects([mathsRequirement], [{ name: "Mathematical Literacy", mark: 85 }])).toEqual([]);
  });

  it("reports the closest unmet option", () => {
    expect(checkSubjects([mathsRequirement], [{ name: "Mathematics", mark: 55 }])).toEqual([
      { kind: "subject", label: "Mathematics", subject: "Mathematics", need: 60, have: 55 },
    ]);
  });

  it("reports a missing subject", () => {
    const [gap] = checkSubjects([mathsRequirement], []);
    expect(gap).toMatchObject({ kind: "subject", have: null });
  });
});

describe("matchProgramme", () => {
  it("is eligible when score and subjects are met", () => {
    expect(matchProgramme(programme, university, learner(75, 60)).status).toBe("eligible");
  });

  it("is close when only slightly short", () => {
    const result = matchProgramme(programme, university, [...learner(70, 60).slice(0, 5), { name: "History", mark: 40 }]);
    expect(result.score.value).toBe(29);
    expect(result.status).toBe("close");
  });

  it("suggests a pathway when the main programme is out of reach", () => {
    const result = matchProgramme(programme, university, learner(52, 50));
    expect(result.status).toBe("pathway");
    expect(result.pathway?.name).toBe("Extended BSc");
  });

  it("uses the Maths Literacy minimum when the learner takes Maths Literacy", () => {
    const law: Programme = { ...programme, minScore: 30, minScoreWithMathsLiteracy: 32, subjects: [], pathways: [] };
    const withMathsLit = learner(0, 60).map((subject) =>
      subject.name === "Mathematics" ? { name: "Mathematical Literacy", mark: 60 } : subject,
    );
    // Six subjects at 60% → APS 30
    expect(matchProgramme(law, university, withMathsLit).minScore).toBe(32);
    expect(matchProgramme(law, university, learner(60, 60)).status).toBe("eligible");
  });

  it("is not yet eligible when far off and no pathway fits", () => {
    expect(matchProgramme(programme, university, learner(30, 40)).status).toBe("notYet");
  });
});
