import { ENGLISH, LIFE_ORIENTATION, MATHEMATICS, MATHS_LITERACY, TECHNICAL_MATHS, homeLanguages, additionalLanguages } from "./subjects";
import type { SubjectRequirement } from "./types";

export function req(label: string, ...options: [string | string[], number][]): SubjectRequirement {
  return {
    label,
    options: options.map(([subjects, minPercent]) => ({ subjects: Array.isArray(subjects) ? subjects : [subjects], minPercent })),
  };
}

export const english = (min: number) => req("English", [ENGLISH, min]);
export const englishHomeOrAdditional = (home: number, additional: number) =>
  req("English", ["English Home Language", home], ["English First Additional Language", additional]);
export const maths = (min: number) => req("Mathematics", [MATHEMATICS, min]);
export const mathsOrTechnical = (min: number) => req("Mathematics", [[MATHEMATICS, TECHNICAL_MATHS], min]);
export const mathsOrLiteracy = (maths: number, literacy: number) =>
  req("Mathematics", [MATHEMATICS, maths], [MATHS_LITERACY, literacy]);
export const lifeOrientation = (min: number) => req("Life Orientation", [LIFE_ORIENTATION, min]);
export const subject = (name: string, min: number) => req(name, [name, min]);
export const anyAdditionalLanguage = (min: number) => req("Additional language", [[...additionalLanguages, ...homeLanguages], min]);
