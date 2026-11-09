"use client";

import { Compass, GraduationCap, Home, Moon, Sparkles, Sun } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

export function AppHeader() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  const links = [
    { href: "/", label: "Home", icon: Home },
    { href: "/match", label: "My match", icon: Sparkles },
    { href: "/programmes", label: "Explore", icon: Compass },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/85">
        <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:h-20 sm:px-8">
        <Link className="flex items-center gap-2.5" href="/">
          <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white shadow-lg shadow-violet-200 dark:shadow-violet-950">
            <GraduationCap size={23} strokeWidth={2.2} />
          </span>
          <span className="text-xl font-extrabold tracking-tight text-slate-950 dark:text-white">
            Place<span className="text-violet-600">Me</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 rounded-2xl bg-slate-100 p-1 md:flex dark:bg-white/5">
          {links.map(({ href, label, icon: Icon }) => {
            const active = href === "/" ? pathname === href : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-extrabold transition ${
                  active
                    ? "bg-white text-violet-700 shadow-sm dark:bg-slate-800 dark:text-violet-300"
                    : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                }`}
              >
                <Icon size={17} /> {label}
              </Link>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          className="grid size-11 place-items-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-violet-300 dark:border-white/10 dark:bg-slate-900 dark:text-amber-300"
          aria-label="Toggle colour theme"
        >
          {mounted && resolvedTheme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        </nav>
      </header>

      <nav className="fixed inset-x-3 bottom-3 z-50 flex items-center justify-around rounded-2xl border border-slate-200 bg-white/95 p-1.5 shadow-2xl backdrop-blur-xl md:hidden dark:border-white/10 dark:bg-slate-900/95" aria-label="Mobile navigation">
        {links.map(({ href, label, icon: Icon }) => {
          const active = href === "/" ? pathname === href : pathname.startsWith(href);
          return (
            <Link key={href} href={href} className={`flex min-w-20 flex-col items-center gap-1 rounded-xl px-3 py-2 text-[11px] font-extrabold transition ${active ? "bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300" : "text-slate-500 dark:text-slate-400"}`}>
              <Icon size={19} /> {label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
