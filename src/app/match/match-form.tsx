"use client";

import { programmes, studyFields } from "@/data/programmes";
import {
  ArrowUpRight,
  BadgeCheck,
  BookOpenCheck,
  Calculator,
  CalendarDays,
  CircleAlert,
  MapPin,
  RotateCcw,
  Sparkles,
  WalletCards,
} from "lucide-react";
import { FormEvent, useMemo, useState } from "react";

const subjectOptions = [
  "English",
  "Afrikaans",
  "isiZulu",
  "isiXhosa",
  "Sepedi",
  "Mathematics",
  "Mathematical Literacy",
  "Physical Sciences",
  "Life Sciences",
  "Accounting",
  "Business Studies",
  "Economics",
  "Geography",
  "History",
  "Information Technology",
  "Computer Applications Technology",
  "Life Orientation",
];

const provinces = [
  "Any province",
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

type Subject = { name: string; mark: number };
type InitialValues = {
  field?: string;
  province?: string;
  mathematics?: string;
  english?: string;
  physicalSciences?: string;
};

function markToPoints(mark: number) {
  if (mark >= 80) return 7;
  if (mark >= 70) return 6;
  if (mark >= 60) return 5;
  if (mark >= 50) return 4;
  if (mark >= 40) return 3;
  if (mark >= 30) return 2;
  return 1;
}

export function MatchForm({ initial }: { initial: InitialValues }) {
  const [field, setField] = useState(initial.field ?? "Engineering & Technology");
  const [province, setProvince] = useState(initial.province ?? "Any province");
  const [grade, setGrade] = useState("Grade 12");
  const [subjects, setSubjects] = useState<Subject[]>([
    { name: "English", mark: Number(initial.english) || 72 },
    { name: "Mathematics", mark: Number(initial.mathematics) || 76 },
    { name: "Physical Sciences", mark: Number(initial.physicalSciences) || 68 },
    { name: "Life Sciences", mark: 65 },
    { name: "Geography", mark: 64 },
    { name: "Business Studies", mark: 71 },
    { name: "Life Orientation", mark: 78 },
  ]);
  const [showResults, setShowResults] = useState(false);

  const aps = useMemo(
    () =>
      subjects
        .filter((subject) => subject.name !== "Life Orientation")
        .sort((a, b) => b.mark - a.mark)
        .slice(0, 6)
        .reduce((total, subject) => total + markToPoints(subject.mark), 0),
    [subjects],
  );

  const mathsMark = subjects.find((subject) => subject.name === "Mathematics")?.mark ?? 0;
  const matches = programmes
    .filter((programme) => programme.field === field)
    .filter((programme) => province === "Any province" || programme.province === province)
    .map((programme) => ({
      ...programme,
      qualifies:
        aps >= programme.minimumAps &&
        (!programme.mathsMinimum || mathsMark >= programme.mathsMinimum),
    }))
    .sort((a, b) => Number(b.qualifies) - Number(a.qualifies));

  function updateSubject(index: number, update: Partial<Subject>) {
    setSubjects((current) =>
      current.map((subject, subjectIndex) =>
        subjectIndex === index ? { ...subject, ...update } : subject,
      ),
    );
    setShowResults(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setShowResults(true);
    requestAnimationFrame(() => {
      document.getElementById("match-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[.72fr_1.28fr]">
        <aside className="h-fit rounded-3xl border border-violet-200 bg-gradient-to-br from-violet-600 to-indigo-700 p-6 text-white shadow-xl shadow-violet-200/50">
          <span className="grid size-12 place-items-center rounded-2xl bg-white/15"><Sparkles size={24} /></span>
          <h2 className="mt-5 text-2xl font-black">First, what do you like?</h2>
          <p className="mt-2 text-sm leading-6 text-violet-100">No pressure—you can change these choices anytime.</p>

          <label className="mt-7 block text-xs font-extrabold uppercase tracking-wider text-violet-100">
            Current grade
            <select value={grade} onChange={(event) => setGrade(event.target.value)} className="mt-2 h-12 w-full rounded-xl border border-white/20 bg-white/10 px-3 text-sm font-bold text-white outline-none focus:ring-4 focus:ring-white/15">
              <option className="text-slate-900">Grade 11</option>
              <option className="text-slate-900">Grade 12</option>
            </select>
          </label>
          <label className="mt-4 block text-xs font-extrabold uppercase tracking-wider text-violet-100">
            Field of study
            <select value={field} onChange={(event) => { setField(event.target.value); setShowResults(false); }} className="mt-2 h-12 w-full rounded-xl border border-white/20 bg-white/10 px-3 text-sm font-bold text-white outline-none focus:ring-4 focus:ring-white/15">
              {studyFields.map((item) => <option key={item} className="text-slate-900">{item}</option>)}
            </select>
          </label>
          <label className="mt-4 block text-xs font-extrabold uppercase tracking-wider text-violet-100">
            Preferred province
            <select value={province} onChange={(event) => { setProvince(event.target.value); setShowResults(false); }} className="mt-2 h-12 w-full rounded-xl border border-white/20 bg-white/10 px-3 text-sm font-bold text-white outline-none focus:ring-4 focus:ring-white/15">
              {provinces.map((item) => <option key={item} className="text-slate-900">{item}</option>)}
            </select>
          </label>
          <div className="mt-7 rounded-2xl bg-white/10 p-4">
            <p className="text-xs font-bold text-violet-100">Estimated APS</p>
            <div className="mt-1 flex items-end gap-2">
              <strong className="text-4xl font-black">{aps}</strong>
              <span className="pb-1 text-sm text-violet-100">points</span>
            </div>
            <p className="mt-2 text-xs leading-5 text-violet-100">This is a guide only. Every institution calculates APS differently.</p>
          </div>
        </aside>

        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/50 sm:p-7 dark:border-white/10 dark:bg-slate-900 dark:shadow-black/20">
          <div className="flex flex-col justify-between gap-3 border-b border-slate-100 pb-5 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-2xl font-black dark:text-white">Next, add your marks 📝</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Use your latest report. It doesn&apos;t need to be perfect!</p>
            </div>
            <span className="w-fit rounded-full bg-amber-100 px-3 py-1.5 text-xs font-extrabold text-amber-800">{grade} results</span>
          </div>

          <div className="mt-5 space-y-3">
            {subjects.map((subject, index) => (
              <div key={index} className="grid grid-cols-[1fr_88px] gap-3">
                <select
                  aria-label={`Subject ${index + 1}`}
                  value={subject.name}
                  onChange={(event) => updateSubject(index, { name: event.target.value })}
                  className="h-12 min-w-0 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-bold text-slate-700 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100 dark:border-white/10 dark:bg-slate-800 dark:text-slate-100 dark:focus:ring-violet-500/20"
                >
                  {subjectOptions.map((option) => <option key={option}>{option}</option>)}
                </select>
                <div className="relative">
                  <input
                    aria-label={`${subject.name} percentage`}
                    type="number"
                    min="0"
                    max="100"
                    value={subject.mark}
                    onChange={(event) => updateSubject(index, { mark: Math.min(100, Math.max(0, Number(event.target.value))) })}
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 pr-7 text-sm font-black text-slate-800 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100 dark:border-white/10 dark:bg-slate-800 dark:text-white dark:focus:ring-violet-500/20"
                  />
                  <span className="pointer-events-none absolute right-3 top-3.5 text-sm font-bold text-slate-400">%</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button type="submit" className="flex h-13 flex-1 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-violet-700">
              <Calculator size={18} /> Calculate my matches
            </button>
            <button type="button" onClick={() => { setShowResults(false); setSubjects((current) => current.map((subject) => ({ ...subject, mark: 0 }))); }} className="flex h-13 items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 text-sm font-bold text-slate-600 transition hover:bg-slate-50">
              <RotateCcw size={16} /> Clear marks
            </button>
          </div>
        </section>
      </form>

      {showResults && (
        <section id="match-results" className="scroll-mt-6 pt-16">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[.16em] text-violet-600">Demo matches</p>
              <h2 className="mt-2 text-3xl font-black">{matches.length} programme{matches.length === 1 ? "" : "s"} to explore</h2>
              <p className="mt-2 text-sm text-slate-500">Based on an estimated APS of {aps}. Official requirements must still be confirmed.</p>
            </div>
          </div>

          <div className="mt-7 grid gap-5">
            {matches.map((programme) => (
              <article key={programme.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 dark:border-white/10 dark:bg-slate-900">
                <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
                  <div className="max-w-2xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`rounded-full px-3 py-1 text-xs font-extrabold ${programme.qualifies ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-800"}`}>
                        {programme.qualifies ? "Likely match" : "Alternative pathway"}
                      </span>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">{programme.qualification}</span>
                    </div>
                    <h3 className="mt-3 text-xl font-black dark:text-white">{programme.name}</h3>
                    <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-slate-500 dark:text-slate-400"><MapPin size={15} /> {programme.university} · {programme.province}</p>
                    {!programme.qualifies && programme.pathway && (
                      <p className="mt-3 flex items-start gap-2 rounded-xl bg-amber-50 p-3 text-sm font-semibold text-amber-900">
                        <BookOpenCheck size={17} className="mt-0.5 shrink-0" /> Consider: {programme.pathway}
                      </p>
                    )}
                  </div>
                  <div className="grid min-w-72 gap-2 text-sm">
                    <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300"><BadgeCheck size={16} className="text-violet-500" /> Indicative APS: {programme.minimumAps}</span>
                    <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300"><CalendarDays size={16} className="text-violet-500" /> Closes: {programme.closingDate}</span>
                    <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300"><WalletCards size={16} className="text-violet-500" /> Est. {programme.estimatedAnnualCost}</span>
                    <a href={programme.url} target="_blank" rel="noreferrer" className="mt-2 flex h-11 items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 font-extrabold text-white transition hover:bg-violet-700">
                      View official website <ArrowUpRight size={16} />
                    </a>
                  </div>
                </div>
              </article>
            ))}
            {matches.length === 0 && (
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-amber-950">
                <CircleAlert size={24} />
                <h3 className="mt-3 font-black">No demo programmes match both filters yet.</h3>
                <p className="mt-1 text-sm">Try “Any province”. The production database will contain a much broader set of programmes.</p>
              </div>
            )}
          </div>

          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-sky-200 bg-sky-50 p-5 text-sm leading-6 text-sky-950">
            <CircleAlert className="mt-0.5 shrink-0" size={19} />
            <p><strong>Prototype data:</strong> costs, dates and requirements shown here are examples for testing the experience. We&apos;ll verify every record against official prospectuses before launch.</p>
          </div>
        </section>
      )}
    </>
  );
}
