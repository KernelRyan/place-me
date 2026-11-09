import type { ScoreRule, Tuition, University } from "@/data/types";
import type { Gap, MatchStatus } from "./matching";

export function formatScore(kind: ScoreRule["kind"], value: number) {
  return kind === "percentageAverage" ? `${value}%` : `${value}`;
}

export function describeGap(gap: Gap, kind: ScoreRule["kind"]) {
  if (gap.kind === "score") {
    return `${gap.label}: you have ${formatScore(kind, gap.have)}, you need ${formatScore(kind, gap.need)}`;
  }
  return gap.have === null
    ? `${gap.label}: needs ${gap.subject} at ${gap.need}% (not in your subjects)`
    : `${gap.subject}: you have ${gap.have}%, you need ${gap.need}%`;
}

export function formatRand(amount: number) {
  return amount === 0 ? "Free" : `R${amount.toLocaleString("en-ZA")}`;
}

export function formatTuition(tuition: Tuition) {
  const amount = tuition.max ? `${formatRand(tuition.min)}–${formatRand(tuition.max)}` : formatRand(tuition.min);
  return `${amount} per year (${tuition.year} fees${tuition.note ? `; ${tuition.note}` : ""})`;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Formats an ISO date without timezone shifts, e.g. "31 Oct 2026". */
export function formatDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return `${day} ${MONTHS[month - 1]} ${year}`;
}

export function applicationWindow(university: University, today: string) {
  const { applicationsOpen: opens, applicationsClose: closes, intakeYear } = university;
  if (!closes) return { text: "Check the website for dates", open: false };
  if (today > closes) {
    return { text: `${intakeYear} applications closed ${formatDate(closes)}. ${intakeYear + 1} dates not out yet`, open: false };
  }
  if (opens && today < opens) return { text: `${intakeYear} applications open ${formatDate(opens)}`, open: false };
  return { text: `${intakeYear} applications close ${formatDate(closes)}`, open: true };
}

export function todayIso() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

export const statusMeta: Record<MatchStatus, { title: string; blurb: string; badge: string; ring: string }> = {
  eligible: {
    title: "You qualify 🎉",
    blurb: "You meet the published minimums. Apply early, as many programmes fill up.",
    badge: "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300",
    ring: "border-emerald-200 dark:border-emerald-500/30",
  },
  close: {
    title: "So close 🔥",
    blurb: "Just a little short. A few extra marks could get you there, so it's still worth applying.",
    badge: "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300",
    ring: "border-amber-200 dark:border-amber-500/30",
  },
  pathway: {
    title: "Another way in 🛤️",
    blurb: "You may qualify for an extended or foundation route into the same field.",
    badge: "bg-sky-100 text-sky-800 dark:bg-sky-500/15 dark:text-sky-300",
    ring: "border-sky-200 dark:border-sky-500/30",
  },
  notYet: {
    title: "Goals to work towards 🎯",
    blurb: "Not yet, but here's exactly what you'd need to improve.",
    badge: "bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-300",
    ring: "border-slate-200 dark:border-white/10",
  },
};
