"use client";

import { programmes, studyFields, universityProvinces } from "@/data/programmes";
import { ArrowUpRight, CalendarDays, MapPin, Search, WalletCards } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

export function ProgrammeExplorer() {
  const [query, setQuery] = useState("");
  const [field, setField] = useState("All fields");
  const [province, setProvince] = useState("All provinces");

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();
    return programmes.filter((programme) => {
      const matchesSearch =
        !search ||
        `${programme.name} ${programme.university}`.toLowerCase().includes(search);
      const matchesField = field === "All fields" || programme.field === field;
      const matchesProvince = province === "All provinces" || programme.province === province;
      return matchesSearch && matchesField && matchesProvince;
    });
  }, [field, province, query]);

  return (
    <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
      <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-lg shadow-slate-200/50 md:grid-cols-[1fr_240px_220px]">
        <label className="relative">
          <span className="sr-only">Search programmes</span>
          <Search className="absolute left-4 top-3.5 text-slate-400" size={19} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search programme or university" className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm font-semibold outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100" />
        </label>
        <select value={field} onChange={(event) => setField(event.target.value)} aria-label="Filter by field" className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-bold text-slate-700 outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-100">
          <option>All fields</option>
          {studyFields.map((item) => <option key={item}>{item}</option>)}
        </select>
        <select value={province} onChange={(event) => setProvince(event.target.value)} aria-label="Filter by province" className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-bold text-slate-700 outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-100">
          <option>All provinces</option>
          {universityProvinces.map((item) => <option key={item}>{item}</option>)}
        </select>
      </div>

      <div className="mt-8 flex items-center justify-between gap-3">
        <p className="text-sm font-bold text-slate-500">{filtered.length} programme{filtered.length === 1 ? "" : "s"} found</p>
        <Link href="/match" className="text-sm font-extrabold text-violet-600 hover:text-violet-800">Match using my marks →</Link>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((programme) => (
          <article key={programme.id} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-100/60">
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-extrabold text-violet-700">{programme.field}</span>
              <span className="text-xs font-bold text-slate-400">APS {programme.minimumAps}+</span>
            </div>
            <h2 className="mt-4 text-xl font-black">{programme.name}</h2>
            <p className="mt-2 flex items-start gap-1.5 text-sm font-semibold text-slate-500"><MapPin size={15} className="mt-0.5 shrink-0" /> {programme.university}, {programme.province}</p>
            <div className="mt-5 space-y-2 border-t border-slate-100 pt-4 text-sm text-slate-600">
              <p className="flex items-center gap-2"><CalendarDays size={16} className="text-violet-500" /> Closes {programme.closingDate}</p>
              <p className="flex items-center gap-2"><WalletCards size={16} className="text-violet-500" /> Est. {programme.estimatedAnnualCost}</p>
            </div>
            <a href={programme.url} target="_blank" rel="noreferrer" className="mt-5 flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-950 text-sm font-extrabold text-white transition hover:bg-violet-700">
              Official website <ArrowUpRight size={16} />
            </a>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <h2 className="text-xl font-black">No programmes found</h2>
          <p className="mt-2 text-sm text-slate-500">Try a broader search or reset one of your filters.</p>
        </div>
      )}

      <p className="mt-8 rounded-xl bg-amber-50 p-4 text-center text-xs font-semibold leading-5 text-amber-900">
        Prototype catalogue: details are examples and must be checked against each university&apos;s official prospectus.
      </p>
    </section>
  );
}
