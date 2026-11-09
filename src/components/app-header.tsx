import { GraduationCap } from "lucide-react";
import Link from "next/link";

export function AppHeader() {
  return (
    <header className="border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link className="flex items-center gap-2.5" href="/">
          <span className="grid size-10 place-items-center rounded-xl bg-violet-600 text-white shadow-lg shadow-violet-200">
            <GraduationCap size={23} strokeWidth={2.2} />
          </span>
          <span className="text-xl font-extrabold tracking-tight">
            Place<span className="text-violet-600">Me</span>
          </span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link className="rounded-xl px-3 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-100 sm:px-4" href="/programmes">
            Programmes
          </Link>
          <Link className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-700 sm:px-5" href="/match">
            Match me
          </Link>
        </div>
      </nav>
    </header>
  );
}
