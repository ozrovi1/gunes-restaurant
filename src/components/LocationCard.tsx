import Link from "next/link";
import Image from "next/image";
import type { Branch } from "@/data/branches";

interface LocationCardProps {
  branch: Branch;
  /** Static mock badge: "Open now" or "Closes 23:00" */
  badge?: "open" | "closes";
}

export function LocationCard({ branch, badge = "open" }: LocationCardProps) {
  const badgeText = badge === "open" ? "Open now" : "Closes 23:00";

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#d4af37]/25 bg-[#0d1f0d]/60 shadow-lg shadow-black/20 transition-all duration-300 hover:scale-[1.02] hover:border-[#d4af37]/50 hover:shadow-[0_0_28px_rgba(212,175,55,0.15)] h-full">
      {/* Stretched link: entire card → location */}
      <Link href={`/locations/${branch.slug}`} className="absolute inset-0 z-0" aria-label={`View ${branch.name} location`} />

      <div className="relative z-10 flex flex-1 flex-col pointer-events-none">
        {/* Image + bottom gradient overlay */}
        <div className="relative aspect-[4/3] min-h-[200px] sm:min-h-[260px] overflow-hidden">
          {branch.imageUrl ? (
            <>
              <Image
                src={branch.imageUrl}
                alt={`Gunes ${branch.name}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a0a]/95 via-[#0a1a0a]/30 to-transparent" />
            </>
          ) : (
            <div className="absolute inset-0 bg-[#0d1f0d]" />
          )}
          {/* Badge */}
          <span
            className={`absolute top-3 right-3 px-2.5 py-1 rounded-lg text-[10px] font-medium tracking-wider uppercase ${
              badge === "open"
                ? "bg-[#2d5a2d]/90 text-[#a8d4a8] border border-[#3d7a3d]/50"
                : "bg-[#0d1f0d]/90 text-[#d4af37]/90 border border-[#d4af37]/30"
            }`}
          >
            {badgeText}
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-end p-5 sm:p-6">
          <p className="text-[11px] sm:text-xs text-[#d4af37] tracking-[0.2em] uppercase mb-1">
            {branch.area}
          </p>
          <h2 className="text-lg sm:text-xl font-medium text-[#faf8f5] leading-tight mb-2">
            <span className="inline-block transition-all duration-300 group-hover:text-[#d4af37] border-b-2 border-transparent group-hover:border-[#d4af37]/60">
              {branch.name}
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-[#7a9e7a]/90 line-clamp-2 leading-relaxed">
            {branch.address}
          </p>
          <p className="text-[11px] sm:text-xs text-[#7a9e7a]/80 mt-2 flex items-center gap-1.5">
            <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {branch.phone}
          </p>
          {/* Primary CTA: Reserve a Table | Secondary: View Menu */}
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 pointer-events-auto">
            <Link
              href={`/reservations?branch=${branch.slug}`}
              className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-[#d4af37] tracking-[0.15em] uppercase hover:text-[#e8c547] transition-colors"
              aria-label={`Reserve a table at ${branch.name}`}
            >
              Reserve a Table
              <span className="card-arrow" aria-hidden>→</span>
            </Link>
            {branch.menuUrl && (
              <Link
                href={branch.menuUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex text-[11px] sm:text-xs font-medium text-[#7a9e7a]/90 tracking-[0.1em] uppercase hover:text-[#d4af37] transition-colors"
                aria-label={`View menu at ${branch.name}`}
              >
                View Menu
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
