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
    <div className="min-h-screen bg-[#f8f7ff] text-slate-950">
      <AppHeader />
      <main className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-32 top-20 size-96 rounded-full bg-violet-200/50 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 top-64 size-96 rounded-full bg-sky-200/45 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-extrabold uppercase tracking-[.16em] text-violet-600">Your match profile</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">Let&apos;s find where you fit.</h1>
            <p className="mt-4 leading-7 text-slate-600">
              Add your latest marks and preferences. You can update these whenever your results improve.
            </p>
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
