"use client";

import { AppHeader } from "@/components/app-header";
import { UniversityBadge } from "@/components/university-badge";
import { universities } from "@/data/catalogue";
import { fields, provinces } from "@/data/subjects";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  CalendarDays,
  Check,
  ChevronDown,
  CircleUserRound,
  GraduationCap,
  MapPin,
  Search,
  SlidersHorizontal,
  Sparkles,
  TrendingUp,
  WalletCards,
} from "lucide-react";

const subjects = [
  { name: "Mathematics", mark: "76%" },
  { name: "English", mark: "72%" },
  { name: "Physical Sciences", mark: "68%" },
];

const shortName = (name: string) => name.replace("University of the ", "").replace("University of ", "").replace(" University", "");

const benefits = [
  {
    icon: SlidersHorizontal,
    title: "Matches made for your marks",
    copy: "Enter your subjects once and see programmes where you meet the real entry requirements.",
    colour: "bg-violet-100 text-violet-700",
  },
  {
    icon: TrendingUp,
    title: "More ways to get there",
    copy: "Discover extended, bridging and foundation options when you are just short of direct entry.",
    colour: "bg-amber-100 text-amber-700",
  },
  {
    icon: CalendarDays,
    title: "Never miss a deadline",
    copy: "Keep application dates, registration periods and important next steps together in one place.",
    colour: "bg-emerald-100 text-emerald-700",
  },
  {
    icon: WalletCards,
    title: "Plan for the full cost",
    copy: "Compare estimated tuition, registration fees and available funding information before applying.",
    colour: "bg-sky-100 text-sky-700",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#fbfcff] pb-20 text-slate-950 transition-colors md:pb-0 dark:bg-slate-950 dark:text-white">
      <AppHeader />

      <main>
        <section className="relative bg-gradient-to-br from-violet-100 via-[#fff8ef] to-sky-100 dark:from-violet-950/70 dark:via-slate-950 dark:to-sky-950/60">
          <div className="absolute inset-0 overflow-hidden">
            <div className="fun-dots absolute inset-0 opacity-25" />
            <div className="absolute -left-40 top-32 size-[28rem] rounded-full bg-fuchsia-300/45 blur-3xl dark:bg-fuchsia-600/20" />
            <div className="absolute -right-40 top-10 size-[32rem] rounded-full bg-cyan-300/50 blur-3xl dark:bg-cyan-500/20" />
            <div className="absolute left-[38%] top-16 size-48 rounded-full bg-amber-200/35 blur-3xl" />
            <div className="absolute bottom-8 right-[28%] size-56 rounded-full bg-fuchsia-200/30 blur-3xl" />
            <div className="colour-orb absolute right-[8%] top-28 size-20 rounded-[2rem] bg-gradient-to-br from-amber-300 to-orange-400 opacity-70 shadow-2xl shadow-orange-200" />
            <div className="colour-orb-delayed absolute bottom-24 left-[4%] size-14 rotate-12 rounded-2xl bg-gradient-to-br from-sky-400 to-cyan-300 opacity-60 shadow-xl shadow-sky-200" />
            <span className="floating-card absolute left-[7%] top-14 hidden rotate-[-12deg] text-4xl lg:block" aria-hidden="true">🎯</span>
            <span className="floating-card-delayed absolute right-[5%] top-[45%] hidden rotate-12 text-5xl lg:block" aria-hidden="true">🚀</span>
          </div>

          <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[1.02fr_.98fr] lg:py-28">
            <div className="max-w-2xl">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/70 px-3.5 py-2 text-xs font-extrabold uppercase tracking-[0.12em] text-violet-700 shadow-sm backdrop-blur dark:border-violet-500/30 dark:bg-violet-500/10 dark:text-violet-300">
                <Sparkles size={15} />
                Your future starts with the right match
              </div>
              <h1 className="text-balance text-5xl font-black leading-[1.04] tracking-[-0.045em] text-slate-950 sm:text-6xl lg:text-[4.6rem] dark:text-white">
                Big dreams?{" "}
                <span className="relative bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-500 bg-clip-text text-transparent">
                  Let&apos;s find your place.
                  <svg className="absolute -bottom-2 left-0 w-full text-amber-400" viewBox="0 0 300 16" fill="none" aria-hidden="true">
                    <path d="M3 12C79 2 198 2 297 10" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>
              <p className="mt-8 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                Add your marks, pick what excites you, and we&apos;ll show you where you could study. Easy, friendly and made for you.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link href="/match" className="group flex h-14 items-center justify-center gap-2.5 rounded-xl bg-violet-600 px-7 text-base font-extrabold text-white shadow-xl shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-700">
                  Find my matches
                  <ArrowRight size={19} className="transition group-hover:translate-x-1" />
                </Link>
                <Link href="/programmes" className="flex h-14 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-7 text-base font-bold text-slate-700 shadow-sm backdrop-blur transition hover:border-violet-300 hover:text-violet-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
                  <Search size={18} />
                  Browse programmes
                </Link>
              </div>
              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5"><Check size={16} className="text-emerald-500" /> Free to use</span>
                <span className="flex items-center gap-1.5"><Check size={16} className="text-emerald-500" /> Personalised results</span>
                <span className="flex items-center gap-1.5"><Check size={16} className="text-emerald-500" /> No commitment</span>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-xl lg:mx-0">
              <div className="floating-card absolute -left-10 top-16 hidden rounded-2xl border border-white bg-white/90 p-4 shadow-xl shadow-slate-200/60 backdrop-blur md:block dark:border-white/10 dark:bg-slate-900/90 dark:shadow-black/20">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-xl bg-emerald-100 text-emerald-600"><BadgeCheck size={22} /></span>
                  <div><p className="text-xs font-bold text-slate-400">Strong match</p><p className="text-sm font-extrabold">BSc Computer Science</p></div>
                </div>
              </div>
              <div className="floating-card-delayed absolute -right-8 bottom-14 z-20 hidden rounded-2xl border border-white bg-white/90 p-4 shadow-xl shadow-slate-200/60 backdrop-blur md:block dark:border-white/10 dark:bg-slate-900/90 dark:shadow-black/20">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-xl bg-amber-100 text-amber-600"><CalendarDays size={21} /></span>
                  <div><p className="text-xs font-bold text-slate-400">Applications close</p><p className="text-sm font-extrabold">30 September</p></div>
                </div>
              </div>

              <form action="/match" className="relative rounded-[2rem] border border-white/80 bg-white/90 p-5 shadow-[0_30px_80px_-20px_rgba(76,29,149,.28)] backdrop-blur-xl sm:p-7 dark:border-white/10 dark:bg-slate-900/90">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-[.14em] text-violet-600 dark:text-violet-300">Try it now ✨</p>
                    <h2 className="mt-1 text-xl font-black dark:text-white">What are you dreaming about?</h2>
                  </div>
                  <span className="grid size-11 place-items-center rounded-full bg-violet-50 text-violet-600"><CircleUserRound size={23} /></span>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-xs font-bold text-slate-600 dark:text-slate-300">I&apos;m interested in</span>
                    <span className="relative block">
                      <select name="field" defaultValue="Engineering & Technology" className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 pr-9 text-sm font-semibold text-slate-700 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100 dark:border-white/10 dark:bg-slate-800 dark:text-slate-100 dark:focus:ring-violet-500/20">
                        {["Any field", ...fields].map((field) => <option key={field}>{field}</option>)}
                      </select>
                      <ChevronDown size={16} className="pointer-events-none absolute right-3 top-4 text-slate-400" />
                    </span>
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs font-bold text-slate-600 dark:text-slate-300">Where would you like to study?</span>
                    <span className="relative block">
                      <MapPin size={15} className="pointer-events-none absolute left-3 top-4 z-10 text-violet-500" />
                      <select name="province" defaultValue="Gauteng" className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-9 text-sm font-semibold text-slate-700 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100 dark:border-white/10 dark:bg-slate-800 dark:text-slate-100 dark:focus:ring-violet-500/20">
                        {["Any province", ...provinces].map((province) => <option key={province}>{province}</option>)}
                      </select>
                      <ChevronDown size={16} className="pointer-events-none absolute right-3 top-4 text-slate-400" />
                    </span>
                  </label>
                </div>

                <div className="mt-5">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Add 3 quick marks</span>
                    <Link href="/match" className="text-xs font-bold text-violet-600 hover:text-violet-800">Add all subjects</Link>
                  </div>
                  <div className="space-y-2">
                    {subjects.map((subject) => (
                      <div key={subject.name} className="flex items-center justify-between rounded-xl border border-slate-100 px-4 py-3 dark:border-white/10">
                        <span className="flex items-center gap-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200">
                          <span className="size-2 rounded-full bg-violet-500" /> {subject.name}
                        </span>
                        <input
                          aria-label={`${subject.name} mark`}
                          className="w-16 rounded-lg border-0 bg-slate-100 px-2.5 py-1 text-right text-sm font-extrabold text-slate-700 outline-none focus:ring-2 focus:ring-violet-300 dark:bg-slate-800 dark:text-white"
                          defaultValue={subject.mark.replace("%", "")}
                          max="100"
                          min="0"
                          name={subject.name.toLowerCase().replaceAll(" ", "-")}
                          type="number"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <button type="submit" className="mt-5 flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 text-sm font-extrabold text-white transition hover:bg-violet-700">
                  Show me my options <ArrowRight size={17} />
                </button>
              </form>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white py-10 dark:border-white/10 dark:bg-slate-900">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <p className="text-center text-xs font-extrabold uppercase tracking-[.18em] text-slate-400">
              Discover universities across South Africa 🇿🇦
            </p>
            <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-6">
              {universities.map((university) => (
                <Link key={university.id} href={`/programmes?university=${university.id}`} className="group flex flex-col items-center gap-2 rounded-2xl border border-slate-100 bg-slate-50 p-3 text-center transition hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg dark:border-white/5 dark:bg-slate-800">
                  <span className="transition group-hover:rotate-[-4deg] group-hover:scale-110">
                    <UniversityBadge university={university} />
                  </span>
                  <span className="text-[11px] font-extrabold text-slate-600 dark:text-slate-300">{shortName(university.name)}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-extrabold uppercase tracking-[.16em] text-violet-600">Everything in one place</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl dark:text-white">We make the confusing stuff simple</h2>
            <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">No giant prospectuses or twenty open tabs. Just clear answers and exciting options.</p>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map(({ icon: Icon, title, copy, colour }) => (
              <article key={title} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:rotate-[-1deg] hover:border-violet-200 hover:shadow-xl hover:shadow-violet-100/60 dark:border-white/10 dark:bg-slate-900">
                <span className={`grid size-12 place-items-center rounded-xl ${colour}`}><Icon size={23} /></span>
                <h3 className="mt-5 text-lg font-extrabold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="how-it-works" className="bg-slate-950 py-24 text-white">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
              <div>
                <p className="text-sm font-extrabold uppercase tracking-[.16em] text-violet-400">How it works</p>
                <h2 className="mt-4 text-4xl font-black tracking-tight">From report card to the right course.</h2>
                <p className="mt-5 leading-7 text-slate-400">No confusing prospectuses. No endless tabs. Just relevant options and clear next steps.</p>
                <Link href="/match" className="mt-8 flex w-fit items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-extrabold text-slate-950 transition hover:bg-violet-100">
                  Start matching <ArrowRight size={17} />
                </Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  ["01", "Add your marks", "Capture your subjects and latest Grade 11 or 12 results."],
                  ["02", "Set your goals", "Choose fields of study and provinces you would consider."],
                  ["03", "Compare matches", "Explore direct and alternative pathways, costs and dates."],
                ].map(([number, title, copy]) => (
                  <div key={number} className="rounded-2xl border border-white/10 bg-white/[.06] p-6">
                    <span className="text-sm font-black text-violet-400">{number}</span>
                    <BookOpen className="mt-8 text-white" size={25} />
                    <h3 className="mt-4 font-extrabold">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{copy}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer id="resources" className="border-t border-slate-200 bg-white dark:border-white/10 dark:bg-slate-950">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-5 py-7 text-sm text-slate-500 sm:flex-row sm:px-8">
          <Link className="flex items-center gap-2 font-black text-slate-900 dark:text-white" href="/"><GraduationCap size={20} className="text-violet-600" /> PlaceMe</Link>
          <p>Helping South African learners find where they belong.</p>
          <p>© 2026 PlaceMe</p>
        </div>
      </footer>
    </div>
  );
}
