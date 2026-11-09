import { englishHomeOrAdditional, lifeOrientation, maths, subject } from "../helpers";
import { ENGLISH, MATHEMATICS } from "../subjects";
import type { Programme, ScoreRule, University } from "../types";

const PROSPECTUS = "https://uct.ac.za/sites/default/files/media/documents/2027-uct-undergraduate-prospectus-1-april-2026.pdf";
const NBT = "National Benchmark Test (NBT) required";

const fps: ScoreRule = {
  label: "FPS",
  kind: "percentageSum",
  subjectsCounted: 6,
  lifeOrientation: { kind: "exclude" },
  minCountedPercent: 40,
  mustInclude: [ENGLISH],
  explanation: "English plus your best 5 other subjects, added up as percentages (out of 600). Marks below 40% count as 0. Life Orientation isn't counted.",
  sourceUrl: PROSPECTUS,
};

const scienceFps: ScoreRule = {
  ...fps,
  mustInclude: [ENGLISH, [MATHEMATICS], ["Physical Sciences"]],
  weights: [{ subjects: [MATHEMATICS, "Physical Sciences"], multiplier: 2 }],
  explanation: "Like the normal FPS, but Maths and Physical Sciences count twice (out of 800).",
};

export const uct: University = {
  id: "uct",
  name: "University of Cape Town",
  shortName: "UCT",
  province: "Western Cape",
  city: "Cape Town",
  badgeGradient: "from-blue-600 to-cyan-400",
  website: "https://www.uct.ac.za",
  applyUrl: "https://applyonline.uct.ac.za",
  applicationFee: 100,
  applicationNote: "Up to 2 programme choices. Every applicant must write the NBT by 3 October.",
  intakeYear: 2027,
  applicationsOpen: "2026-04-01",
  applicationsClose: "2026-07-31",
  feesUrl: "https://uct.ac.za/students/fees-funding-fees/fees-handbook",
  score: fps,
  prospectusYear: 2027,
  lastVerified: "2026-11-09",
};

const base = { universityId: "uct", campus: "Cape Town", url: PROSPECTUS } as const;
const redressNote = (guaranteed: number, considered: number) =>
  `FPS ${guaranteed}+ guarantees a place. From ${considered}, you may still be considered depending on your school and background.`;

export const uctProgrammes: Programme[] = [
  {
    ...base,
    id: "uct-bsc-cs",
    name: "BSc Computer Science",
    qualification: "Degree",
    years: 3,
    faculty: "Science",
    field: "Computing & IT",
    scoreRule: scienceFps,
    minScore: 660,
    consideredFrom: 550,
    admissionNote: `${redressNote(660, 550)} Weak first-year results can move you onto a 4-year extended degree.`,
    subjects: [maths(70), subject("Physical Sciences", 60)],
    extraSelection: [NBT, "Limited Computer Science places"],
    tuition: { min: 87000, year: 2026, note: "Typical BSc first year" },
    url: "https://sit.uct.ac.za/",
  },
  {
    ...base,
    id: "uct-bsceng-mechanical",
    name: "BSc Engineering (Mechanical)",
    qualification: "Degree",
    years: 4,
    faculty: "Engineering and the Built Environment",
    field: "Engineering & Technology",
    minScore: 500,
    consideredFrom: 420,
    admissionNote: `${redressNote(500, 420)} Students who need support can switch to the 5-year ASPECT programme.`,
    subjects: [maths(80), subject("Physical Sciences", 75)],
    extraSelection: [NBT],
    tuition: { min: 82820, max: 89780, year: 2026, note: "Typical BSc(Eng) first year" },
  },
  {
    ...base,
    id: "uct-bcom-ca",
    name: "BCom Financial Accounting (Chartered Accountant)",
    qualification: "Degree",
    years: 3,
    faculty: "Commerce",
    field: "Business & Commerce",
    minScore: 435,
    consideredFrom: 430,
    admissionNote: "FPS 435+ guarantees a place if your NBT results are good enough.",
    subjects: [maths(60), englishHomeOrAdditional(50, 60)],
    pathways: [
      {
        name: "Education Development Unit (augmented or extended BCom)",
        minScore: 430,
        note: "For South African applicants who qualify for academic development support",
      },
    ],
    extraSelection: [NBT],
    url: "https://commerce.uct.ac.za/college-accounting",
  },
  {
    ...base,
    id: "uct-llb",
    name: "Bachelor of Laws (LLB)",
    qualification: "Degree",
    years: 4,
    faculty: "Law",
    field: "Law",
    minScore: 500,
    consideredFrom: 470,
    admissionNote: redressNote(500, 470),
    subjects: [],
    extraSelection: [NBT],
    tuition: { min: 80410, year: 2026, note: "Typical first year" },
    url: "https://law.uct.ac.za",
  },
  {
    ...base,
    id: "uct-ba",
    name: "BA / Bachelor of Social Science",
    qualification: "Degree",
    years: 3,
    faculty: "Humanities",
    field: "Arts & Humanities",
    minScore: 450,
    consideredFrom: 380,
    admissionNote: redressNote(450, 380),
    subjects: [englishHomeOrAdditional(50, 60), lifeOrientation(50)],
    extraSelection: [NBT],
    tuition: { min: 79000, year: 2026, note: "Typical first year" },
    url: "https://humanities.uct.ac.za",
  },
];
