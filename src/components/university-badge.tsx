import type { University } from "@/data/types";

export function UniversityBadge({ university, size = "md" }: { university: University; size?: "sm" | "md" }) {
  const dimensions = size === "sm" ? "size-9 text-[10px]" : "size-12 text-xs";
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-xl bg-gradient-to-br ${university.badgeGradient} ${dimensions} font-black text-white shadow-md`}
      aria-hidden="true"
    >
      {university.shortName}
    </span>
  );
}
