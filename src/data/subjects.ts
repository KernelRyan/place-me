import type { Field, Province } from "./types";

const languages = ["English", "Afrikaans", "isiZulu", "isiXhosa", "Sepedi", "Sesotho", "Setswana", "Xitsonga", "Tshivenda", "siSwati", "isiNdebele"];

export const homeLanguages = languages.map((language) => `${language} Home Language`);
export const additionalLanguages = languages.map((language) => `${language} First Additional Language`);
export const secondAdditionalLanguages = languages.map((language) => `${language} Second Additional Language`);

export const MATHEMATICS = "Mathematics";
export const MATHS_LITERACY = "Mathematical Literacy";
export const TECHNICAL_MATHS = "Technical Mathematics";
export const LIFE_ORIENTATION = "Life Orientation";
export const ENGLISH = ["English Home Language", "English First Additional Language"];

export const mathsSubjects = [MATHEMATICS, MATHS_LITERACY, TECHNICAL_MATHS];

export const electives = [
  "Physical Sciences",
  "Technical Sciences",
  "Life Sciences",
  "Agricultural Sciences",
  "Accounting",
  "Business Studies",
  "Economics",
  "Geography",
  "History",
  "Information Technology",
  "Computer Applications Technology",
  "Engineering Graphics and Design",
  "Consumer Studies",
  "Tourism",
  "Dramatic Arts",
  "Visual Arts",
  "Music",
  "Religion Studies",
];

/** NSC subject combinations: these subjects may only be taken with the listed maths subject. */
export const requiredMathsFor: Record<string, string> = {
  "Physical Sciences": MATHEMATICS,
  "Technical Sciences": TECHNICAL_MATHS,
};

export function subjectCombinationProblems(names: string[]) {
  return Object.entries(requiredMathsFor)
    .filter(([subject, maths]) => names.includes(subject) && !names.includes(maths))
    .map(([subject, maths]) => `${subject} can only be taken with ${maths}. Check your Maths subject or pick a different elective.`);
}

export const allSubjects = [
  ...homeLanguages,
  ...additionalLanguages,
  ...secondAdditionalLanguages,
  ...mathsSubjects,
  ...electives,
  LIFE_ORIENTATION,
];

/** Minimum percentage for an NSC achievement level (Level 4 = 50%). */
export function nscLevel(level: number) {
  return level <= 1 ? 0 : (level + 1) * 10;
}

export const fields: Field[] = [
  "Computing & IT",
  "Engineering & Technology",
  "Science",
  "Health Sciences",
  "Business & Commerce",
  "Law",
  "Education",
  "Arts & Humanities",
];

export const provinces: Province[] = [
  "Eastern Cape",
  "Free State",
  "Gauteng",
  "KwaZulu-Natal",
  "Limpopo",
  "Mpumalanga",
  "North West",
  "Northern Cape",
  "Western Cape",
];
