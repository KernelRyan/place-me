import { AppHeader } from "@/components/app-header";
import { MatchForm } from "./match-form";

type MatchPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function value(params: Record<string, string | string[] | undefined>, key: string) {
  const entry = params[key];
  return typeof entry === "string" ? entry : undefined;
}

export default async function MatchPage({ searchParams }: MatchPageProps) {
  const params = await searchParams;

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-sky-50 pb-24 text-slate-950 transition-colors md:pb-10 dark:from-slate-950 dark:via-slate-950 dark:to-indigo-950 dark:text-white">
      <AppHeader />
      <main className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-32 top-20 size-96 rounded-full bg-violet-200/50 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 top-64 size-96 rounded-full bg-sky-200/45 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-extrabold uppercase tracking-[.16em] text-violet-600 dark:text-violet-300">Your match adventure 🚀</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">Ready to discover your options?</h1>
            <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">
              It only takes a minute. Add your marks, tell us what you enjoy, and see your matches.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-xs font-extrabold">
              <span className="rounded-full bg-violet-600 px-3 py-2 text-white">1 · Add your info</span>
              <span className="rounded-full bg-white px-3 py-2 text-slate-500 shadow-sm dark:bg-slate-800 dark:text-slate-300">2 · See matches</span>
              <span className="rounded-full bg-white px-3 py-2 text-slate-500 shadow-sm dark:bg-slate-800 dark:text-slate-300">3 · Explore your future</span>
            </div>
          </div>
          <MatchForm
            initial={{
              field: value(params, "field"),
              province: value(params, "province"),
              mathematics: value(params, "mathematics"),
              english: value(params, "english"),
              physicalSciences: value(params, "physical-sciences"),
            }}
          />
        </div>
      </main>
    </div>
  );
}
