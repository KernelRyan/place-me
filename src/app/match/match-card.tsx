import { UniversityBadge } from "@/components/university-badge";
import { applicationWindow, describeGap, formatRand, formatScore, formatTuition, statusMeta, todayIso } from "@/lib/format";
import type { MatchResult } from "@/lib/matching";
import { ArrowUpRight, BookOpenCheck, CalendarDays, CircleAlert, Info, MapPin, WalletCards } from "lucide-react";

export function MatchCard({ result }: { result: MatchResult }) {
  const { programme, university, status, score, gaps, pathway, minScore } = result;
  const rule = programme.scoreRule ?? university.score;
  const meta = statusMeta[status];
  const dates = applicationWindow(university, todayIso());
  const subjectGaps = gaps.filter((gap) => gap.kind === "subject");

  return (
    <article className={`rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-lg sm:p-6 dark:bg-slate-900 ${meta.ring}`}>
      <div className="flex items-start gap-4">
        <UniversityBadge university={university} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-3 py-1 text-xs font-extrabold ${meta.badge}`}>{meta.title}</span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 dark:bg-white/10 dark:text-slate-300">
              {programme.qualification} · {programme.years} years
            </span>
          </div>
          <h3 className="mt-3 text-xl font-black leading-tight dark:text-white">{programme.name}</h3>
          <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-slate-500 dark:text-slate-400">
            <MapPin size={15} /> {university.name} · {programme.campus}
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-xl bg-slate-50 p-3 text-sm dark:bg-white/5">
        <p className="font-bold text-slate-700 dark:text-slate-200">
          Your {score.label}: <span className="text-violet-600 dark:text-violet-300">{formatScore(rule.kind, score.value)}</span>
          <span className="font-semibold text-slate-400"> · needs {formatScore(rule.kind, minScore)}</span>
        </p>
        {subjectGaps.length > 0 && (
          <ul className="mt-2 space-y-1 text-slate-600 dark:text-slate-300">
            {subjectGaps.map((gap) => (
              <li key={`${gap.kind}-${gap.label}`} className="flex items-start gap-2">
                <CircleAlert size={15} className="mt-0.5 shrink-0 text-amber-500" /> {describeGap(gap, rule.kind)}
              </li>
            ))}
          </ul>
        )}
      </div>

      {programme.admissionNote && (
        <p className="mt-3 flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
          <Info size={16} className="mt-0.5 shrink-0 text-violet-500" /> {programme.admissionNote}
        </p>
      )}

      {pathway && (
        <p className="mt-3 flex items-start gap-2 rounded-xl bg-sky-50 p-3 text-sm font-semibold text-sky-900 dark:bg-sky-500/10 dark:text-sky-200">
          <BookOpenCheck size={17} className="mt-0.5 shrink-0" />
          <span>
            You may qualify for <strong>{pathway.name}</strong>
            {pathway.note ? `. ${pathway.note}` : ""}
          </span>
        </p>
      )}

      {programme.extraSelection && programme.extraSelection.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {programme.extraSelection.map((item) => (
            <span key={item} className="rounded-full border border-violet-200 px-2.5 py-1 text-xs font-bold text-violet-700 dark:border-violet-500/30 dark:text-violet-300">
              {item}
            </span>
          ))}
        </div>
      )}

      <div className="mt-4 space-y-1.5 text-sm text-slate-600 dark:text-slate-300">
        <p className={`flex items-start gap-2 ${dates.open ? "font-bold text-emerald-700 dark:text-emerald-300" : ""}`}>
          <CalendarDays size={16} className="mt-0.5 shrink-0 text-violet-500" /> {dates.text}
        </p>
        <p className="flex items-start gap-2">
          <WalletCards size={16} className="mt-0.5 shrink-0 text-violet-500" />
          <span>
            Application fee: {university.applicationFee === null ? "check website" : formatRand(university.applicationFee)}
            {university.applicationNote && <span className="text-slate-500 dark:text-slate-400"> ({university.applicationNote})</span>}
          </span>
        </p>
        {programme.tuition && <p className="pl-6">Tuition about {formatTuition(programme.tuition)}</p>}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <a href={programme.url} target="_blank" rel="noreferrer" className="flex h-10 items-center gap-1.5 rounded-xl bg-violet-600 px-4 text-sm font-extrabold text-white transition hover:bg-violet-700">
          Programme page <ArrowUpRight size={15} />
        </a>
        <a href={university.applyUrl} target="_blank" rel="noreferrer" className="flex h-10 items-center gap-1.5 rounded-xl border border-slate-200 px-4 text-sm font-bold text-slate-700 transition hover:border-violet-300 dark:border-white/10 dark:text-slate-200">
          How to apply <ArrowUpRight size={15} />
        </a>
        {university.feesUrl && (
          <a href={university.feesUrl} target="_blank" rel="noreferrer" className="flex h-10 items-center gap-1.5 rounded-xl border border-slate-200 px-4 text-sm font-bold text-slate-700 transition hover:border-violet-300 dark:border-white/10 dark:text-slate-200">
            Fees <ArrowUpRight size={15} />
          </a>
        )}
      </div>
    </article>
  );
}
