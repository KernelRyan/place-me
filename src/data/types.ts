export type Field =
  | "Engineering & Technology"
  | "Computing & IT"
  | "Business & Commerce"
  | "Health Sciences"
  | "Law"
  | "Education"
  | "Arts & Humanities"
  | "Science";

export type Province =
  | "Eastern Cape"
  | "Free State"
  | "Gauteng"
  | "KwaZulu-Natal"
  | "Limpopo"
  | "Mpumalanga"
  | "North West"
  | "Northern Cape"
  | "Western Cape";

export type StudentSubject = { name: string; mark: number };

export type PointsBand = { minPercent: number; points: number };

export type LifeOrientationRule =
  | { kind: "exclude" }
  /** LO competes with other subjects for one of the counted slots. */
  | { kind: "countAsSubject"; maxPoints?: number }
  /** LO is added on top of the counted subjects. */
  | { kind: "addOnTop"; maxPoints?: number };

export type ScoreBonus = { subjects: string[]; minPercent: number; points: number };

export type ScoreRule = {
  label: string;
  kind: "points" | "percentageSum" | "percentageAverage";
  bands?: PointsBand[];
  /** Separate points scale for Life Orientation. */
  lifeOrientationBands?: PointsBand[];
  /** Subjects below this percentage contribute 0. */
  minCountedPercent?: number;
  subjectsCounted: number;
  lifeOrientation: LifeOrientationRule;
  /** Subject groups that must be among the counted subjects, e.g. a home language. */
  mustInclude?: string[][];
  /** Subjects whose contribution is multiplied, e.g. Maths counted twice. */
  weights?: { subjects: string[]; multiplier: number }[];
  bonuses?: ScoreBonus[];
  /** How far below the minimum still counts as "close" (in score units). */
  closeMargin?: number;
  explanation: string;
  sourceUrl: string;
};

export type SubjectOption = { subjects: string[]; minPercent: number };

/** Satisfied when any one option is met. */
export type SubjectRequirement = { label: string; options: SubjectOption[] };

export type Tuition = { min: number; max?: number; year: number; note?: string };

export type Pathway = {
  name: string;
  minScore?: number;
  minScoreWithMathsLiteracy?: number;
  subjects?: SubjectRequirement[];
  note?: string;
  url?: string;
};

export type Programme = {
  id: string;
  universityId: string;
  name: string;
  qualification: "Degree" | "Diploma" | "Higher Certificate";
  years: number;
  faculty: string;
  field: Field;
  campus: string;
  minScore: number;
  /** Used instead of minScore when the learner takes Mathematical Literacy. */
  minScoreWithMathsLiteracy?: number;
  /** Applicants at or above this score may be considered / waitlisted. */
  consideredFrom?: number;
  tuition?: Tuition;
  /** Short plain-language note shown to learners, e.g. guaranteed vs considered scores. */
  admissionNote?: string;
  /** Overrides the university's default score rule (e.g. faculty-specific weighting). */
  scoreRule?: ScoreRule;
  subjects: SubjectRequirement[];
  pathways?: Pathway[];
  extraSelection?: string[];
  url: string;
};

/** Dates are ISO strings (YYYY-MM-DD). */
export type KeyDate = { label: string; date: string };

export type University = {
  id: string;
  name: string;
  shortName: string;
  province: Province;
  city: string;
  badgeGradient: string;
  website: string;
  applyUrl: string;
  applicationFee: number | null;
  applicationNote?: string;
  /** For the intake named by `intakeYear`. ISO dates. */
  intakeYear: number;
  applicationsOpen: string | null;
  applicationsClose: string | null;
  earlierClosingDates?: KeyDate[];
  feesUrl: string | null;
  score: ScoreRule;
  prospectusYear: number;
  lastVerified: string;
};
