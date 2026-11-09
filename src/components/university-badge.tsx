import type { University } from "@/data/types";
import Image from "next/image";

const sizes = {
  sm: { box: "size-9 text-[10px]", px: 36 },
  md: { box: "size-12 text-xs", px: 48 },
  lg: { box: "size-16 text-sm", px: 64 },
};

export function UniversityBadge({ university, size = "md" }: { university: University; size?: keyof typeof sizes }) {
  const { box, px } = sizes[size];

  if (university.logo) {
    return (
      <span className={`flex shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-1 shadow-md ring-1 ring-slate-200 dark:ring-white/10 ${box}`}>
        <Image src={university.logo} alt="" width={px} height={px} className="h-auto max-h-full w-auto max-w-full object-contain" />
      </span>
    );
  }

  return (
    <span
      className={`grid shrink-0 place-items-center rounded-xl bg-gradient-to-br ${university.badgeGradient} ${box} font-black text-white shadow-md`}
      aria-hidden="true"
    >
      {university.shortName}
    </span>
  );
}
