import { AppHeader } from "@/components/app-header";
import { ProgrammeExplorer } from "./programme-explorer";

export default async function ProgrammesPage({ searchParams }: PageProps<"/programmes">) {
  const { university } = await searchParams;

  return (
    <div className="min-h-screen bg-[#fbfcff] pb-24 text-slate-950 transition-colors md:pb-0 dark:bg-slate-950 dark:text-white">
      <AppHeader />
      <main>
        <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-violet-700 via-indigo-700 to-sky-600 text-white">
          <div className="absolute -left-24 top-10 size-72 rounded-full bg-fuchsia-400/30 blur-3xl" />
          <div className="absolute -right-20 bottom-0 size-80 rounded-full bg-cyan-300/30 blur-3xl" />
          <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
            <p className="text-sm font-extrabold uppercase tracking-[.16em] text-violet-100">Explore your options</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">What could your future look like? 🔭</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-violet-100">
              Search by what you love, where you want to go, or simply explore until something feels right.
            </p>
          </div>
        </section>
        <ProgrammeExplorer key={typeof university === "string" ? university : "all"} initialUniversity={typeof university === "string" ? university : undefined} />
      </main>
    </div>
  );
}
