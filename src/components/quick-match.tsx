"use client";

import { programmes, universities } from "@/data/catalogue";
import { provinces } from "@/data/subjects";
import type { Field } from "@/data/types";
import { ArrowRight, ChevronDown, MapPin } from "lucide-react";
import { useState, type ReactNode } from "react";

const ANY_FIELD = "Any field";

const fieldChips: { value: Field | typeof ANY_FIELD; label: string; emoji: string }[] = [
  { value: "Computing & IT", label: "Computing", emoji: "💻" },
  { value: "Engineering & Technology", label: "Engineering", emoji: "⚙️" },
  { value: "Health Sciences", label: "Health", emoji: "🩺" },
  { value: "Business & Commerce", label: "Business", emoji: "💼" },
  { value: "Law", label: "Law", emoji: "⚖️" },
  { value: "Education", label: "Teaching", emoji: "🍎" },
  { value: "Arts & Humanities", label: "Arts", emoji: "🎨" },
  { value: ANY_FIELD, label: "Not sure yet", emoji: "🤔" },
];

const markTiles = [
  { name: "mathematics", label: "Maths", emoji: "➗", tint: "from-violet-500/15 to-violet-500/5 focus-within:ring-violet-300 dark:focus-within:ring-violet-500/40" },
  { name: "english", label: "English", emoji: "📖", tint: "from-fuchsia-500/15 to-fuchsia-500/5 focus-within:ring-fuchsia-300 dark:focus-within:ring-fuchsia-500/40" },
  { name: "physical-sciences", label: "Physical Sci.", emoji: "🧪", tint: "from-sky-500/15 to-sky-500/5 focus-within:ring-sky-300 dark:focus-within:ring-sky-500/40" },
];

function Step({ number, children }: { number: number; children: ReactNode }) {
  return (
    <p className="mb-3 flex items-center gap-2 text-sm font-extrabold text-slate-800 dark:text-slate-100">
      <span className="grid size-6 place-items-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500 text-[11px] font-black text-white">
        {number}
      </span>
      {children}
    </p>
  );
}

export function QuickMatch() {
  const [field, setField] = useState<string>(ANY_FIELD);

  return (
    <div className="relative mx-auto w-full max-w-xl lg:mx-0">
      <span className="absolute -top-4 right-6 z-10 rotate-3 rounded-full bg-gradient-to-r from-amber-300 to-orange-400 px-4 py-2 text-xs font-black text-slate-900 shadow-lg shadow-orange-200/60 dark:shadow-black/30">
        🎓 {universities.length} universities · {programmes.length} programmes
      </span>

      <form
        action="/match"
        className="relative rounded-[2rem] border border-white/80 bg-white/90 p-5 shadow-[0_30px_80px_-20px_rgba(76,29,149,.3)] backdrop-blur-xl sm:p-7 dark:border-white/10 dark:bg-slate-900/90"
      >
        <p className="text-xs font-extrabold uppercase tracking-[.14em] text-violet-600 dark:text-violet-300">⚡ 60-second check</p>
        <h2 className="mt-1 text-2xl font-black tracking-tight dark:text-white">Where could your marks take you?</h2>

        <fieldset className="mt-6">
          <legend className="sr-only">What do you want to study?</legend>
          <Step number={1}>What do you want to study?</Step>
          <input type="hidden" name="field" value={field} />
          <div className="flex flex-wrap gap-2">
            {fieldChips.map((chip) => {
              const selected = field === chip.value;
              return (
                <button
                  key={chip.value}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setField(chip.value)}
                  className={`flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-bold whitespace-nowrap transition hover:-translate-y-0.5 ${
                    selected
                      ? "border-transparent bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white shadow-lg shadow-violet-200 dark:shadow-none"
                      : "border-slate-200 bg-slate-50 text-slate-700 hover:border-violet-300 dark:border-white/10 dark:bg-slate-800 dark:text-slate-200"
                  }`}
                >
                  <span aria-hidden="true">{chip.emoji}</span>
                  {chip.label}
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className="mt-6">
          <Step number={2}>Where would you like to study?</Step>
          <label className="relative block">
            <span className="sr-only">Province</span>
            <MapPin size={16} className="pointer-events-none absolute left-3.5 top-3.5 text-violet-500" />
            <select
              name="province"
              defaultValue="Any province"
              className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-10 text-sm font-bold text-slate-700 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100 dark:border-white/10 dark:bg-slate-800 dark:text-slate-100 dark:focus:ring-violet-500/20"
            >
              {["Any province", ...provinces].map((province) => (
                <option key={province}>{province}</option>
              ))}
            </select>
            <ChevronDown size={16} className="pointer-events-none absolute right-3.5 top-4 text-slate-400" />
          </label>
        </div>

        <div className="mt-6">
          <Step number={3}>Your latest marks</Step>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {markTiles.map((tile) => (
              <label
                key={tile.name}
                className={`rounded-2xl bg-gradient-to-br p-3 ring-2 ring-transparent transition ${tile.tint}`}
              >
                <span className="flex items-center gap-1.5 text-xs font-extrabold text-slate-600 dark:text-slate-300">
                  <span aria-hidden="true">{tile.emoji}</span> {tile.label}
                </span>
                <span className="mt-1 flex items-baseline">
                  <input
                    name={tile.name}
                    type="number"
                    inputMode="numeric"
                    min={0}
                    max={100}
                    placeholder="—"
                    className="w-full min-w-0 bg-transparent text-3xl font-black text-slate-900 outline-none placeholder:text-slate-300 dark:text-white dark:placeholder:text-slate-600 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  />
                  <span className="text-lg font-black text-slate-400">%</span>
                </span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="group mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-orange-500 text-base font-extrabold text-white shadow-xl shadow-violet-200 transition hover:-translate-y-0.5 dark:shadow-none"
        >
          Show me where I fit <ArrowRight size={18} className="transition group-hover:translate-x-1" />
        </button>
        <p className="mt-3 text-center text-xs font-semibold text-slate-500 dark:text-slate-400">
          You&apos;ll add your other subjects on the next step. No sign-up needed.
        </p>
      </form>
    </div>
  );
}
