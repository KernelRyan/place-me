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
  Menu,
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
    <div className="min-h-screen overflow-hidden bg-[#fbfcff] text-slate-950">
      <header className="relative z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <a className="flex items-center gap-2.5" href="#">
            <span className="grid size-10 place-items-center rounded-xl bg-violet-600 text-white shadow-lg shadow-violet-200">
              <GraduationCap size={23} strokeWidth={2.2} />
            </span>
            <span className="text-xl font-extrabold tracking-tight">
              Place<span className="text-violet-600">Me</span>
            </span>
          </a>

          <div className="hidden items-center gap-8 text-sm font-semibold text-slate-600 md:flex">
            <a className="transition hover:text-violet-600" href="#how-it-works">How it works</a>
            <a className="transition hover:text-violet-600" href="#features">Explore programmes</a>
            <a className="transition hover:text-violet-600" href="#resources">Resources</a>
          </div>

          <div className="hidden items-center gap-3 sm:flex">
            <button className="rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-100">Sign in</button>
            <button className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-700">Get started</button>
          </div>
          <button className="grid size-10 place-items-center rounded-lg border border-slate-200 sm:hidden" aria-label="Open menu">
            <Menu size={20} />
          </button>
        </nav>
      </header>

      <main>
        <section className="relative">
          <div className="absolute inset-0 overflow-hidden">
            <div className="hero-grid absolute inset-0 opacity-50" />
            <div className="absolute -left-40 top-32 size-[28rem] rounded-full bg-violet-200/50 blur-3xl" />
            <div className="absolute -right-40 top-10 size-[32rem] rounded-full bg-sky-200/45 blur-3xl" />
          </div>

          <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[1.02fr_.98fr] lg:py-28">
            <div className="max-w-2xl">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3.5 py-2 text-xs font-extrabold uppercase tracking-[0.12em] text-violet-700">
                <Sparkles size={15} />
                Your future starts with the right match
              </div>
              <h1 className="text-balance text-5xl font-black leading-[1.04] tracking-[-0.045em] text-slate-950 sm:text-6xl lg:text-[4.6rem]">
                Your marks. Your goals.{" "}
                <span className="relative text-violet-600">
                  Your place.
                  <svg className="absolute -bottom-2 left-0 w-full text-amber-400" viewBox="0 0 300 16" fill="none" aria-hidden="true">
                    <path d="M3 12C79 2 198 2 297 10" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>
              <p className="mt-8 max-w-xl text-lg leading-8 text-slate-600">
                Find South African university programmes that match your results, interests and location—without the guesswork.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <button className="group flex h-14 items-center justify-center gap-2.5 rounded-xl bg-violet-600 px-7 text-base font-extrabold text-white shadow-xl shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-700">
                  Find my matches
                  <ArrowRight size={19} className="transition group-hover:translate-x-1" />
                </button>
                <button className="flex h-14 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-7 text-base font-bold text-slate-700 shadow-sm transition hover:border-violet-200 hover:text-violet-700">
                  <Search size={18} />
                  Browse programmes
                </button>
              </div>
              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-slate-500">
                <span className="flex items-center gap-1.5"><Check size={16} className="text-emerald-500" /> Free to use</span>
                <span className="flex items-center gap-1.5"><Check size={16} className="text-emerald-500" /> Personalised results</span>
                <span className="flex items-center gap-1.5"><Check size={16} className="text-emerald-500" /> No commitment</span>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-xl lg:mx-0">
              <div className="floating-card absolute -left-10 top-16 hidden rounded-2xl border border-white bg-white/90 p-4 shadow-xl shadow-slate-200/60 backdrop-blur md:block">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-xl bg-emerald-100 text-emerald-600"><BadgeCheck size={22} /></span>
                  <div><p className="text-xs font-bold text-slate-400">Strong match</p><p className="text-sm font-extrabold">BSc Computer Science</p></div>
                </div>
              </div>
              <div className="floating-card-delayed absolute -right-8 bottom-14 z-20 hidden rounded-2xl border border-white bg-white/90 p-4 shadow-xl shadow-slate-200/60 backdrop-blur md:block">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-xl bg-amber-100 text-amber-600"><CalendarDays size={21} /></span>
                  <div><p className="text-xs font-bold text-slate-400">Applications close</p><p className="text-sm font-extrabold">30 September</p></div>
                </div>
              </div>

              <div className="relative rounded-[2rem] border border-slate-200/80 bg-white p-5 shadow-[0_30px_80px_-20px_rgba(76,29,149,.22)] sm:p-7">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-[.14em] text-violet-600">Quick match</p>
                    <h2 className="mt-1 text-xl font-black">Tell us about your goals</h2>
                  </div>
                  <span className="grid size-11 place-items-center rounded-full bg-violet-50 text-violet-600"><CircleUserRound size={23} /></span>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-xs font-bold text-slate-600">I&apos;m interested in</span>
                    <span className="flex h-12 items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-700">
                      Engineering &amp; Tech <ChevronDown size={16} className="text-slate-400" />
                    </span>
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs font-bold text-slate-600">Preferred province</span>
                    <span className="flex h-12 items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-700">
                      <span className="flex items-center gap-2"><MapPin size={15} className="text-violet-500" /> Gauteng</span>
                      <ChevronDown size={16} className="text-slate-400" />
                    </span>
                  </label>
                </div>

                <div className="mt-5">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-600">Your latest marks</span>
                    <span className="text-xs font-bold text-violet-600">Edit subjects</span>
                  </div>
                  <div className="space-y-2">
                    {subjects.map((subject) => (
                      <div key={subject.name} className="flex items-center justify-between rounded-xl border border-slate-100 px-4 py-3">
                        <span className="flex items-center gap-2.5 text-sm font-semibold text-slate-700">
                          <span className="size-2 rounded-full bg-violet-500" /> {subject.name}
                        </span>
                        <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-sm font-extrabold text-slate-700">{subject.mark}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <button className="mt-5 flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 text-sm font-extrabold text-white transition hover:bg-violet-700">
                  Show my university matches <ArrowRight size={17} />
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white py-8">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-5 sm:px-8 lg:flex-row">
            <p className="text-center text-xs font-extrabold uppercase tracking-[.18em] text-slate-400 lg:text-left">
              Explore opportunities across South Africa
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm font-black text-slate-400 sm:gap-x-12">
              <span>UCT</span><span>WITS</span><span>UP</span><span>STELLENBOSCH</span><span>UJ</span><span>UKZN</span>
            </div>
          </div>
        </section>

        <section id="features" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-extrabold uppercase tracking-[.16em] text-violet-600">Everything in one place</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">A clearer path to your next chapter</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">From your first search to application day, PlaceMe helps you make informed choices with confidence.</p>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map(({ icon: Icon, title, copy, colour }) => (
              <article key={title} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-100/60">
                <span className={`grid size-12 place-items-center rounded-xl ${colour}`}><Icon size={23} /></span>
                <h3 className="mt-5 text-lg font-extrabold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{copy}</p>
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
                <button className="mt-8 flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-extrabold text-slate-950 transition hover:bg-violet-100">
                  Start matching <ArrowRight size={17} />
                </button>
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

      <footer id="resources" className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-5 py-7 text-sm text-slate-500 sm:flex-row sm:px-8">
          <a className="flex items-center gap-2 font-black text-slate-900" href="#"><GraduationCap size={20} className="text-violet-600" /> PlaceMe</a>
          <p>Helping South African learners find where they belong.</p>
          <p>© 2026 PlaceMe</p>
        </div>
      </footer>
    </div>
  );
}
