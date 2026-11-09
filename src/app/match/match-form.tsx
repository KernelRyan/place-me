"use client";

import { UniversityBadge } from "@/components/university-badge";
import { programmes, universities } from "@/data/catalogue";
import {
  additionalLanguages,
  electives,
  fields,
  homeLanguages,
  LIFE_ORIENTATION,
  mathsSubjects,
  provinces,
} from "@/data/subjects";
import type { Field, Province, StudentSubject } from "@/data/types";
import { formatScore, statusMeta } from "@/lib/format";
import { matchAll, type MatchStatus } from "@/lib/matching";
import { calculateScore } from "@/lib/scoring";
import { Calculator, ChevronDown, CircleAlert, RotateCcw, Sparkles } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { MatchCard } from "./match-card";

type Slot = { id: string; label: string; options: string[]; name: string; mark: string };

export type InitialValues = {
  field?: string;
  province?: string;
  maths?: string;
  homeLanguage?: string;
  science?: string;
};

const ANY_FIELD = "Any field";
const ANY_PROVINCE = "Any province";
const STATUS_GROUPS: MatchStatus[] = ["eligible", "close", "pathway", "notYet"];

function initialSlots(initial: InitialValues): Slot[] {
  return [
    { id: "home", label: "Home language", options: homeLanguages, name: "English Home Language", mark: initial.homeLanguage ?? "" },
    { id: "fal", label: "First additional language", options: additionalLanguages, name: "Afrikaans First Additional Language", mark: "" },
    { id: "maths", label: "Maths", options: mathsSubjects, name: "Mathematics", mark: initial.maths ?? "" },
    { id: "lo", label: "Life Orientation", options: [LIFE_ORIENTATION], name: LIFE_ORIENTATION, mark: "" },
    { id: "elective1", label: "Elective 1", options: electives, name: "Physical Sciences", mark: initial.science ?? "" },
    { id: "elective2", label: "Elective 2", options: electives, name: "Life Sciences", mark: "" },
    { id: "elective3", label: "Elective 3", options: electives, name: "Geography", mark: "" },
  ];
}

function validate(slots: Slot[]) {
  const problems: string[] = [];
  if (slots.some((slot) => slot.mark === "")) problems.push("Add a mark for every subject.");
  if (slots.some((slot) => slot.mark !== "" && (Number(slot.mark) < 0 || Number(slot.mark) > 100))) {
    problems.push("Marks must be between 0 and 100.");
  }
  const languageOf = (name: string) => name.split(" ")[0];
  const home = slots.find((slot) => slot.id === "home");
  const fal = slots.find((slot) => slot.id === "fal");
  if (home && fal && languageOf(home.name) === languageOf(fal.name)) {
    problems.push("Your home language and first additional language must be different.");
  }
  const electiveNames = slots.filter((slot) => slot.id.startsWith("elective")).map((slot) => slot.name);
  if (new Set(electiveNames).size !== electiveNames.length) problems.push("Pick three different electives.");
  return problems;
}

const selectClass =
  "h-12 w-full min-w-0 appearance-none rounded-xl border border-slate-200 bg-slate-50 px-3 pr-8 text-sm font-bold text-slate-700 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100 disabled:opacity-100 dark:border-white/10 dark:bg-slate-800 dark:text-slate-100 dark:focus:ring-violet-500/20";
const prefSelectClass =
  "mt-2 h-12 w-full appearance-none rounded-xl border border-white/20 bg-white/10 px-3 text-sm font-bold text-white outline-none focus:ring-4 focus:ring-white/15";

export function MatchForm({ initial }: { initial: InitialValues }) {
  const [field, setField] = useState<Field | typeof ANY_FIELD>(fields.find((item) => item === initial.field) ?? ANY_FIELD);
  const [province, setProvince] = useState<Province | typeof ANY_PROVINCE>(
    provinces.find((item) => item === initial.province) ?? ANY_PROVINCE,
  );
  const [grade, setGrade] = useState("Grade 12");
  const [slots, setSlots] = useState(() => initialSlots(initial));
  const [submitted, setSubmitted] = useState(false);
  const [problems, setProblems] = useState<string[]>([]);
  const [showAllGoals, setShowAllGoals] = useState(false);

  const subjects: StudentSubject[] = useMemo(
    () => slots.filter((slot) => slot.mark !== "").map((slot) => ({ name: slot.name, mark: Number(slot.mark) })),
    [slots],
  );

  const results = useMemo(() => {
    const filtered = programmes.filter((programme) => {
      const university = universities.find((item) => item.id === programme.universityId);
      return (field === ANY_FIELD || programme.field === field) && (province === ANY_PROVINCE || university?.province === province);
    });
    return matchAll(filtered, universities, subjects);
  }, [field, province, subjects]);

  function updateSlot(id: string, update: Partial<Slot>) {
    setSlots((current) => current.map((slot) => (slot.id === id ? { ...slot, ...update } : slot)));
    setSubmitted(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validate(slots);
    setProblems(found);
    if (found.length > 0) return;
    setSubmitted(true);
    requestAnimationFrame(() => document.getElementById("match-results")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  return (
    <>
      <form onSubmit={handleSubmit} noValidate className="grid gap-6 lg:grid-cols-[.72fr_1.28fr]">
        <aside className="h-fit rounded-3xl bg-gradient-to-br from-violet-600 via-fuchsia-600 to-orange-500 p-6 text-white shadow-xl shadow-violet-200/50 dark:shadow-black/30">
          <span className="grid size-12 place-items-center rounded-2xl bg-white/15"><Sparkles size={24} /></span>
          <h2 className="mt-5 text-2xl font-black">First, what do you like?</h2>
          <p className="mt-2 text-sm leading-6 text-white/80">No pressure. You can change these anytime.</p>

          <label className="mt-7 block text-xs font-extrabold uppercase tracking-wider text-white/80">
            I&apos;m in
            <select value={grade} onChange={(event) => setGrade(event.target.value)} className={prefSelectClass}>
              <option className="text-slate-900">Grade 11</option>
              <option className="text-slate-900">Grade 12</option>
            </select>
          </label>
          <label className="mt-4 block text-xs font-extrabold uppercase tracking-wider text-white/80">
            I want to study
            <select value={field} onChange={(event) => setField(event.target.value as Field | typeof ANY_FIELD)} className={prefSelectClass}>
              {[ANY_FIELD, ...fields].map((item) => <option key={item} className="text-slate-900">{item}</option>)}
            </select>
          </label>
          <label className="mt-4 block text-xs font-extrabold uppercase tracking-wider text-white/80">
            In this province
            <select value={province} onChange={(event) => setProvince(event.target.value as Province | typeof ANY_PROVINCE)} className={prefSelectClass}>
              {[ANY_PROVINCE, ...provinces].map((item) => <option key={item} className="text-slate-900">{item}</option>)}
            </select>
          </label>

          {grade === "Grade 11" && (
            <p className="mt-6 rounded-2xl bg-white/15 p-4 text-sm leading-6">
              💡 Many universities make <strong>provisional offers</strong> using your final Grade 11 results, so these marks really count.
            </p>
          )}
        </aside>

        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/50 sm:p-7 dark:border-white/10 dark:bg-slate-900 dark:shadow-black/20">
          <div className="border-b border-slate-100 pb-5 dark:border-white/10">
            <h2 className="text-2xl font-black dark:text-white">Next, add your marks 📝</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Use your latest {grade} report. Rough marks are fine for now!</p>
          </div>

          <div className="mt-5 space-y-3">
            {slots.map((slot) => (
              <div key={slot.id} className="grid grid-cols-[1fr_92px] items-end gap-3">
                <label className="min-w-0">
                  <span className="mb-1 block text-[11px] font-extrabold uppercase tracking-wider text-slate-400">{slot.label}</span>
                  <span className="relative block">
                    <select
                      value={slot.name}
                      disabled={slot.options.length === 1}
                      onChange={(event) => updateSlot(slot.id, { name: event.target.value })}
                      className={selectClass}
                    >
                      {slot.options.map((option) => <option key={option}>{option}</option>)}
                    </select>
                    {slot.options.length > 1 && <ChevronDown size={16} className="pointer-events-none absolute right-3 top-4 text-slate-400" />}
                  </span>
                </label>
                <label className="relative">
                  <span className="sr-only">{slot.name} mark</span>
                  <input
                    type="number"
                    inputMode="numeric"
                    min={0}
                    max={100}
                    placeholder="—"
                    value={slot.mark}
                    onChange={(event) => updateSlot(slot.id, { mark: event.target.value })}
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 pr-7 text-sm font-black text-slate-800 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100 dark:border-white/10 dark:bg-slate-800 dark:text-white dark:focus:ring-violet-500/20"
                  />
                  <span className="pointer-events-none absolute right-3 top-3.5 text-sm font-bold text-slate-400">%</span>
                </label>
              </div>
            ))}
          </div>

          {problems.length > 0 && (
            <div role="alert" className="mt-5 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm font-semibold text-rose-800 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-200">
              {problems.map((problem) => (
                <p key={problem} className="flex items-start gap-2"><CircleAlert size={16} className="mt-0.5 shrink-0" /> {problem}</p>
              ))}
            </div>
          )}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button type="submit" className="flex h-13 flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 text-sm font-extrabold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 dark:shadow-none">
              <Calculator size={18} /> Show my matches
            </button>
            <button
              type="button"
              onClick={() => { setSlots((current) => current.map((slot) => ({ ...slot, mark: "" }))); setSubmitted(false); setProblems([]); }}
              className="flex h-13 items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 text-sm font-bold text-slate-600 transition hover:bg-slate-50 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5"
            >
              <RotateCcw size={16} /> Clear marks
            </button>
          </div>
        </section>
      </form>

      {submitted && (
        <section id="match-results" className="scroll-mt-24 pt-16">
          <p className="text-sm font-extrabold uppercase tracking-[.16em] text-violet-600 dark:text-violet-300">Your results</p>
          <h2 className="mt-2 text-3xl font-black dark:text-white">Here&apos;s where you stand ✨</h2>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-slate-900">
            <p className="text-sm font-bold text-slate-600 dark:text-slate-300">
              Every university scores you differently. Here&apos;s your score at each one:
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {universities.map((university) => {
                const score = calculateScore(university.score, subjects);
                return (
                  <div key={university.id} className="flex items-center gap-3 rounded-xl bg-slate-50 p-3 dark:bg-white/5">
                    <UniversityBadge university={university} size="sm" />
                    <div className="min-w-0">
                      <p className="truncate text-xs font-bold text-slate-500 dark:text-slate-400">{university.name}</p>
                      <p className="text-lg font-black dark:text-white">
                        {formatScore(university.score.kind, score.value)}{" "}
                        <span className="text-xs font-bold text-slate-400">{university.score.label}</span>
                      </p>
                      <p className="text-[11px] leading-4 text-slate-500 dark:text-slate-400">{university.score.explanation}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {results.length === 0 && (
            <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-amber-950 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-100">
              <h3 className="font-black">No programmes for that field and province yet.</h3>
              <p className="mt-1 text-sm">Try &quot;Any province&quot;. We&apos;re adding more universities all the time.</p>
            </div>
          )}

          {STATUS_GROUPS.map((status) => {
            const group = results.filter((result) => result.status === status);
            if (group.length === 0) return null;
            const visible = status === "notYet" && !showAllGoals ? group.slice(0, 3) : group;
            return (
              <div key={status} className="mt-10">
                <h3 className="text-2xl font-black dark:text-white">
                  {statusMeta[status].title} <span className="text-base font-bold text-slate-400">({group.length})</span>
                </h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{statusMeta[status].blurb}</p>
                <div className="mt-5 grid gap-5 lg:grid-cols-2">
                  {visible.map((result) => <MatchCard key={result.programme.id} result={result} />)}
                </div>
                {visible.length < group.length && (
                  <button type="button" onClick={() => setShowAllGoals(true)} className="mt-4 text-sm font-extrabold text-violet-600 hover:text-violet-800 dark:text-violet-300">
                    Show all {group.length} →
                  </button>
                )}
              </div>
            );
          })}

          <div className="mt-10 flex items-start gap-3 rounded-2xl border border-sky-200 bg-sky-50 p-5 text-sm leading-6 text-sky-950 dark:border-sky-500/30 dark:bg-sky-500/10 dark:text-sky-100">
            <CircleAlert className="mt-0.5 shrink-0" size={19} />
            <p>
              Requirements come from each university&apos;s official prospectus, but they can change and meeting the minimum
              doesn&apos;t guarantee a place. Always confirm on the programme page before you apply.
            </p>
          </div>
        </section>
      )}
    </>
  );
}
