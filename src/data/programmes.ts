export type Programme = {
  id: number;
  name: string;
  university: string;
  province: string;
  field: string;
  qualification: string;
  minimumAps: number;
  mathsMinimum?: number;
  estimatedAnnualCost: string;
  closingDate: string;
  pathway?: string;
  url: string;
};

// Demonstration records only. Replace these with verified university data before launch.
export const programmes: Programme[] = [
  {
    id: 1,
    name: "BSc Computer Science",
    university: "University of Pretoria",
    province: "Gauteng",
    field: "Engineering & Technology",
    qualification: "Bachelor's degree",
    minimumAps: 32,
    mathsMinimum: 70,
    estimatedAnnualCost: "R48,000 – R72,000",
    closingDate: "30 June",
    pathway: "BSc Extended Programme",
    url: "https://www.up.ac.za/programmes",
  },
  {
    id: 2,
    name: "BEng Electrical Engineering",
    university: "University of Johannesburg",
    province: "Gauteng",
    field: "Engineering & Technology",
    qualification: "Bachelor's degree",
    minimumAps: 32,
    mathsMinimum: 65,
    estimatedAnnualCost: "R52,000 – R76,000",
    closingDate: "31 October",
    pathway: "Engineering extended degree",
    url: "https://www.uj.ac.za/admission-aid/",
  },
  {
    id: 3,
    name: "Bachelor of Commerce",
    university: "University of the Free State",
    province: "Free State",
    field: "Business & Commerce",
    qualification: "Bachelor's degree",
    minimumAps: 28,
    mathsMinimum: 50,
    estimatedAnnualCost: "R38,000 – R55,000",
    closingDate: "30 September",
    url: "https://www.ufs.ac.za/prospective",
  },
  {
    id: 4,
    name: "Bachelor of Nursing",
    university: "University of KwaZulu-Natal",
    province: "KwaZulu-Natal",
    field: "Health Sciences",
    qualification: "Bachelor's degree",
    minimumAps: 30,
    mathsMinimum: 50,
    estimatedAnnualCost: "R42,000 – R64,000",
    closingDate: "30 September",
    pathway: "Health Sciences foundation pathway",
    url: "https://applications.ukzn.ac.za/",
  },
  {
    id: 5,
    name: "Bachelor of Laws (LLB)",
    university: "University of Cape Town",
    province: "Western Cape",
    field: "Law",
    qualification: "Bachelor's degree",
    minimumAps: 36,
    estimatedAnnualCost: "R68,000 – R92,000",
    closingDate: "31 July",
    url: "https://www.uct.ac.za/students/applications",
  },
  {
    id: 6,
    name: "Bachelor of Education",
    university: "North-West University",
    province: "North West",
    field: "Education",
    qualification: "Bachelor's degree",
    minimumAps: 26,
    estimatedAnnualCost: "R36,000 – R52,000",
    closingDate: "31 August",
    url: "https://studies.nwu.ac.za/",
  },
  {
    id: 7,
    name: "BA Humanities",
    university: "Stellenbosch University",
    province: "Western Cape",
    field: "Arts & Humanities",
    qualification: "Bachelor's degree",
    minimumAps: 30,
    estimatedAnnualCost: "R46,000 – R68,000",
    closingDate: "31 July",
    url: "https://www.sun.ac.za/english/maties",
  },
  {
    id: 8,
    name: "Diploma in Information Technology",
    university: "Tshwane University of Technology",
    province: "Gauteng",
    field: "Engineering & Technology",
    qualification: "Diploma",
    minimumAps: 24,
    mathsMinimum: 50,
    estimatedAnnualCost: "R32,000 – R46,000",
    closingDate: "30 September",
    pathway: "Higher Certificate in IT",
    url: "https://www.tut.ac.za/study-at-tut",
  },
];

export const studyFields = [...new Set(programmes.map((programme) => programme.field))];
export const universityProvinces = [...new Set(programmes.map((programme) => programme.province))];
