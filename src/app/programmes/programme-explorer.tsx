"use client";

import { UniversityBadge } from "@/components/university-badge";
import { programmes, universities } from "@/data/catalogue";
import { fields, provinces } from "@/data/subjects";
import { applicationWindow, formatScore, formatTuition, todayIso } from "@/lib/format";
import { ArrowUpRight, CalendarDays, MapPin, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const ALL_FIELDS = "All fields";
const ALL_PROVINCES = "All provinces";
const ALL_UNIVERSITIES = "All universities";

const filterClass =
  "h-12 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-bold text-slate-700 outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-100 dark:border-white/10 dark:bg-slate-800 dark:text-slate-100 dark:focus:ring-violet-500/20";

export function ProgrammeExplorer({ initialUniversity }: { initialUniversity?: string }) {
  const [query, setQuery] = useState("");
  const [field, setField] = useState(ALL_FIELDS);
  const [province, setProvince] = useState(ALL_PROVINCES);
  const [universityId, setUniversityId] = useState(
    universities.some((university) => university.id === initialUniversity) ? initialUniversity! : ALL_UNIVERSITIES,
  );

  const today = todayIso();
  const search = query.trim().toLowerCase();
  const filtered = programmes.flatMap((programme) => {
    const university = universities.find((item) => item.id === programme.universityId);
    if (!university) return [];
    const matches =
      (!search || `${programme.name} ${programme.faculty} ${university.name} ${university.shortName}`.toLowerCase().includes(search)) &&
      (field === ALL_FIELDS || programme.field === field) &&
      (province === ALL_PROVINCES || university.province === province) &&
      (universityId === ALL_UNIVERSITIES || university.id === universityId);
    return matches ? [{ programme, university }] : [];
  });

  return (
    <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
      <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-lg shadow-slate-200/50 md:grid-cols-2 lg:grid-cols-[1fr_200px_200px_200px] dark:border-white/10 dark:bg-slate-900 dark:shadow-black/20">
        <label className="relative md:col-span-2 lg:col-span-1">
          <span className="sr-only">Search programmes</span>
          <Search className="absolute left-4 top-3.5 text-slate-400" size={19} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try “nursing” or “computer science”"
            className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm font-semibold outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100 dark:border-white/10 dark:bg-slate-800 dark:text-white dark:focus:ring-violet-500/20"
          />
        </label>
        <select value={field} onChange={(event) => setField(event.target.value)} aria-label="Filter by field" className={filterClass}>
          {[ALL_FIELDS, ...fields].map((item) => <option key={item}>{item}</option>)}
        </select>
        <select value={province} onChange={(event) => setProvince(event.target.value)} aria-label="Filter by province" className={filterClass}>
          {[ALL_PROVINCES, ...provinces].map((item) => <option key={item}>{item}</option>)}
        </select>
        <select value={universityId} onChange={(event) => setUniversityId(event.target.value)} aria-label="Filter by university" className={filterClass}>
          <option value={ALL_UNIVERSITIES}>{ALL_UNIVERSITIES}</option>
          {universities.map((university) => <option key={university.id} value={university.id}>{university.name}</option>)}
        </select>
      </div>

      <div className="mt-8 flex items-center justify-between gap-3">
        <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
          {filtered.length} programme{filtered.length === 1 ? "" : "s"} found
        </p>
        <Link href="/match" className="text-sm font-extrabold text-violet-600 hover:text-violet-800 dark:text-violet-300">
          Check which ones I qualify for →
        </Link>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map(({ programme, university }) => {
          const rule = programme.scoreRule ?? university.score;
          return (
            <article key={programme.id} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-100/60 dark:border-white/10 dark:bg-slate-900 dark:hover:shadow-black/20">
              <div className="flex items-center gap-3">
                <UniversityBadge university={university} size="sm" />
                <div className="min-w-0">
                  <p className="truncate text-xs font-bold text-slate-500 dark:text-slate-400">{university.name}</p>
                  <p className="text-xs font-extrabold text-violet-600 dark:text-violet-300">{programme.field}</p>
                </div>
              </div>
              <h2 className="mt-4 text-xl font-black leading-tight dark:text-white">{programme.name}</h2>
              <p className="mt-2 flex items-start gap-1.5 text-sm font-semibold text-slate-500 dark:text-slate-400">
                <MapPin size={15} className="mt-0.5 shrink-0" /> {programme.campus}, {university.province}
              </p>
              <div className="mt-5 flex-1 space-y-2 border-t border-slate-100 pt-4 text-sm text-slate-600 dark:border-white/10 dark:text-slate-300">
                <p>
                  <strong>Minimum {rule.label}:</strong> {formatScore(rule.kind, programme.minScore)}
                  {programme.minScoreWithMathsLiteracy !== undefined &&
                    ` (${formatScore(rule.kind, programme.minScoreWithMathsLiteracy)} with Maths Literacy)`}
                </p>
                {programme.subjects.length > 0 && (
                  <p>
                    <strong>Subjects:</strong>{" "}
                    {programme.subjects
                      .map((requirement) =>
                        requirement.options
                          .map((option) => `${option.subjects.length === 1 ? option.subjects[0] : requirement.label} ${option.minPercent}%`)
                          .join(" or "),
                      )
                      .join(" · ")}
                  </p>
                )}
                {programme.admissionNote && <p className="text-slate-500 dark:text-slate-400">{programme.admissionNote}</p>}
                {programme.tuition && (
                  <p>
                    <strong>Tuition:</strong> about {formatTuition(programme.tuition)}
                  </p>
                )}
                <p className="flex items-start gap-2">
                  <CalendarDays size={16} className="mt-0.5 shrink-0 text-violet-500" /> {applicationWindow(university, today).text}
                </p>
              </div>
              <a href={programme.url} target="_blank" rel="noreferrer" className="mt-5 flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-950 text-sm font-extrabold text-white transition hover:bg-violet-700 dark:bg-white dark:text-slate-950 dark:hover:bg-violet-200">
                Programme page <ArrowUpRight size={16} />
              </a>
            </article>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center dark:border-white/10 dark:bg-slate-900">
          <h2 className="text-xl font-black dark:text-white">No programmes found</h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Try a broader search or reset one of your filters.</p>
        </div>
      )}
    </section>
  );
}
