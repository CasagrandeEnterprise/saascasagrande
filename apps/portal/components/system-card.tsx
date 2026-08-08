import Link from "next/link";
import { ArrowUpRight, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type SystemCardProps = {
  href: string;
  title: string;
  description: string;
  accentClassName: string;
  icon: LucideIcon;
};

export function SystemCard({
  href,
  title,
  description,
  accentClassName,
  icon: Icon,
}: SystemCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-ink-700/80 bg-ink-900/60 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-md transition duration-300",
        "hover:-translate-y-1 hover:border-ink-500 hover:shadow-[0_28px_70px_rgba(0,0,0,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper-400"
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute -right-8 -top-8 h-36 w-36 rounded-full opacity-40 blur-2xl transition group-hover:opacity-70",
          accentClassName
        )}
        aria-hidden
      />

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5">
          <Icon className="h-6 w-6 text-ink-50" aria-hidden />
        </div>
        <ArrowUpRight className="h-5 w-5 text-ink-400 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink-100" />
      </div>

      <div className="relative mt-8 space-y-2">
        <h2 className="font-display text-2xl font-semibold text-ink-50">
          {title}
        </h2>
        <p className="text-sm leading-relaxed text-ink-300">{description}</p>
      </div>

      <span className="relative mt-6 text-sm font-medium text-copper-400 transition group-hover:text-copper-300">
        Abrir sistema
      </span>
    </Link>
  );
}
