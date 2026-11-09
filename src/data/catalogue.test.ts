import { calculateScore } from "@/lib/scoring";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { programmes, universities } from "./catalogue";
import { allSubjects } from "./subjects";
import type { SubjectRequirement } from "./types";

const isoDate = /^\d{4}-\d{2}-\d{2}$/;

function subjectNames(requirements: SubjectRequirement[] = []) {
  return requirements.flatMap((requirement) => requirement.options.flatMap((option) => option.subjects));
}

describe("catalogue", () => {
  it("has unique university and programme ids", () => {
    const ids = [...universities.map((u) => u.id), ...programmes.map((p) => p.id)];
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("links every programme to a known university", () => {
    const known = new Set(universities.map((u) => u.id));
    for (const programme of programmes) expect(known, programme.id).toContain(programme.universityId);
  });

  it("only uses subjects learners can pick", () => {
    const valid = new Set(allSubjects);
    for (const programme of programmes) {
      const names = [
        ...subjectNames(programme.subjects),
        ...(programme.pathways ?? []).flatMap((pathway) => subjectNames(pathway.subjects)),
      ];
      for (const name of names) expect(valid, `${programme.id}: ${name}`).toContain(name);
    }
  });

  it("uses ISO dates", () => {
    for (const university of universities) {
      const dates = [university.applicationsOpen, university.applicationsClose, ...(university.earlierClosingDates ?? []).map((d) => d.date)];
      for (const date of dates) if (date !== null) expect(date, university.id).toMatch(isoDate);
    }
  });

  it("scores a sample learner the way each prospectus describes", () => {
    const learner = [
      { name: "English Home Language", mark: 72 },
      { name: "Afrikaans First Additional Language", mark: 58 },
      { name: "Mathematics", mark: 81 },
      { name: "Physical Sciences", mark: 66 },
      { name: "Life Sciences", mark: 64 },
      { name: "Geography", mark: 45 },
      { name: "Life Orientation", mark: 90 },
    ];
    const score = (id: string) => calculateScore(universities.find((u) => u.id === id)!.score, learner).value;

    expect(score("up")).toBe(30);
    expect(score("uj")).toBe(30);
    expect(score("ukzn")).toBe(30);
    // 6+4+7+5+5+3 + LO 4 + English and Maths bonuses 2+2
    expect(score("wits")).toBe(38);
    expect(score("uct")).toBe(72 + 81 + 66 + 64 + 58 + 45);
    expect(score("su")).toBe(64.3);

    const science = programmes.find((p) => p.id === "uct-bsc-cs")!.scoreRule!;
    expect(calculateScore(science, learner).value).toBe(72 + 81 * 2 + 66 * 2 + 64 + 58 + 45);
  });

  it("has a logo file for every university that declares one", () => {
    for (const university of universities) {
      if (university.logo) expect(existsSync(join(process.cwd(), "public", university.logo)), university.id).toBe(true);
    }
  });

  it("links to https pages", () => {
    for (const programme of programmes) expect(programme.url, programme.id).toMatch(/^https:\/\//);
    for (const university of universities) expect(university.applyUrl, university.id).toMatch(/^https:\/\//);
  });
});
