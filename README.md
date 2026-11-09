# PlaceMe 🎓

**Find out where your school marks can take you.**

PlaceMe helps South African Grade 11 and 12 learners see which university programmes they qualify for. Enter your marks, pick what you'd like to study and where, and PlaceMe scores you the way each university does. It then shows where you qualify, where you're close, and other ways in.

🔗 **Live site:** [place-me-rho.vercel.app](https://place-me-rho.vercel.app/)

---

## Features

- **Real admission scoring for each university.** Every university calculates its score differently, and PlaceMe uses each one's own published rules (see [How scoring works](#how-scoring-works)).
- **Clear results in four groups:**
  - 🎉 **You qualify**: you meet the published minimums.
  - 🔥 **So close**: just short, or within a published waiting-list band.
  - 🛤️ **Another way in**: an extended, foundation or alternative programme you may qualify for.
  - 🎯 **Goals to work towards**: exactly which marks you'd need to improve, and by how much.
- **Subject rules checked automatically**, such as Maths versus Maths Literacy, English Home Language versus First Additional Language, and minimum percentages per subject.
- **Application details on every result:** whether applications are open or closed, the application fee, approximate tuition, and links to the official programme, application and fees pages.
- **An Explore page** to browse and filter programmes by field, province and university.
- **Light and dark mode**, a mobile-first layout, and no sign-up needed.

## Universities covered

The data comes from each university's official **2027 undergraduate prospectus** and website, checked on 9 November 2026.

| University | Province | Score used |
| --- | --- | --- |
| University of Cape Town (UCT) | Western Cape | FPS (percentages, out of 600 or 800) |
| University of the Witwatersrand (Wits) | Gauteng | Wits APS (8-point scale with bonuses) |
| University of Pretoria (UP) | Gauteng | APS (7-point scale) |
| Stellenbosch University (SU) | Western Cape | NSC average (%) |
| University of Johannesburg (UJ) | Gauteng | APS (7-point scale) |
| University of KwaZulu-Natal (UKZN) | KwaZulu-Natal | APS (8-point scale) |

There are 43 programmes across Computing & IT, Engineering, Health Sciences, Business & Commerce, Law, Education and Arts & Humanities.

> ⚠️ **Important:** PlaceMe is a guide, not an official admissions tool. Requirements change every year, and meeting a minimum doesn't guarantee a place. Always confirm on the university's official website before applying.

## How scoring works

Each university's rule lives in its data file as a `ScoreRule`. The scoring engine in `src/lib/scoring.ts` supports all of them:

| University | Rule |
| --- | --- |
| **UP, UJ** | Best 6 subjects on the 7-point NSC scale. Life Orientation is excluded. |
| **UKZN** | English + Maths (or Maths Literacy) + the best 4 others. A mark of 90% or more earns 8 points. Life Orientation earns 0 points but needs 50%. |
| **Wits** | Best 7 subjects including Life Orientation, which is scored on a reduced scale. 90% or more earns 8 points. English and Maths get +2 each at 60% or more. |
| **UCT** | English + the best 5 others, added up as percentages (out of 600). Marks below 40% count as 0. Science counts Maths and Physical Sciences twice (out of 800). |
| **SU** | The average of English or Afrikaans plus the best 5 other subjects. |

The matching engine in `src/lib/matching.ts` compares a learner's score and subjects against each programme. It also handles minimums that differ depending on whether you take Maths or Maths Literacy, waiting-list bands, and alternative pathways.

Programmes whose selection depends on National Benchmark Test (NBT) results learners don't have yet (Wits and UCT Medicine, Nursing and Physiotherapy) are left out on purpose, so no one gets a misleading match.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router) with React 19 and TypeScript
- [Tailwind CSS 4](https://tailwindcss.com) for styling
- [next-themes](https://github.com/pacocoursey/next-themes) for light/dark mode
- [Lucide](https://lucide.dev) icons
- [Vitest](https://vitest.dev) for unit tests
- Deployed on [Vercel](https://vercel.com)

There is no database or login yet: all programme data is stored as typed TypeScript files in the repository.

## Getting started

You'll need Node.js 20.9 or newer (the project is developed on Node 24).

```bash
git clone https://github.com/KernelRyan/place-me.git
cd place-me
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm start` | Run the production build |
| `npm run lint` | Check code with ESLint |
| `npm test` | Run the unit tests |

## Project structure

```text
src/
├── app/
│   ├── page.tsx                 # Landing page
│   ├── match/                   # Marks form and results
│   └── programmes/              # Explore page
├── components/                  # Header, quick-match card, badges, theme
├── data/
│   ├── types.ts                 # University, Programme, ScoreRule types
│   ├── subjects.ts              # NSC subjects, fields, provinces
│   ├── helpers.ts               # Requirement helpers, e.g. maths(60)
│   ├── catalogue.ts             # All universities and programmes
│   └── universities/            # One file per university
└── lib/
    ├── scoring.ts               # Admission score calculation
    ├── matching.ts              # Eligibility, gaps and pathways
    └── format.ts                # Display helpers (dates, fees, scores)
```

## Adding a university

1. Create `src/data/universities/<id>.ts`. Export a `University`, including its `ScoreRule`, and a `Programme[]` list. Use an existing file as a template.
2. Write subject requirements with the helpers, for example:

   ```ts
   subjects: [english(60), maths(70), subject("Physical Sciences", 60)],
   ```

3. Add the university to `src/data/catalogue.ts`.
4. Run `npm test`. The catalogue tests check for duplicate IDs, unknown subject names, badly formatted dates and non-HTTPS links. They also check the sample-learner score expected for each university.

Only use official university sources, and update `lastVerified` whenever you check the data again.

## Roadmap

- [ ] More institutions, including universities of technology (TUT, CPUT, DUT) and their diplomas
- [ ] 2028 application dates once universities publish them
- [ ] Optional accounts to save marks, favourite programmes and get deadline reminders
- [ ] A database and admin tools for updating requirements each year
- [ ] Funding information (NSFAS and bursaries)

## Disclaimer

PlaceMe isn't affiliated with any university. University names are used only to identify their programmes, and the badges are simple coloured initials, not official logos. Admission decisions are made solely by each institution.
