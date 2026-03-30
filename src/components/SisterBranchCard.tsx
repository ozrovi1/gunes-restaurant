import Image from "next/image";

interface SisterBranch {
  slug: string;
  name: string;
  area: string;
  address: string;
  phone: string;
  imageUrl?: string;
  url?: string;
  comingSoon?: boolean;
}

interface SisterBranchCardProps {
  branch: SisterBranch;
  badge?: "open" | "closes";
}

export function SisterBranchCard({ branch, badge = "open" }: SisterBranchCardProps) {
  const badgeText = badge === "open" ? "Open now" : "Closes 23:00";

  const cardContent = (
    <div className="relative z-10 flex flex-1 flex-col">
      <div className="relative aspect-[4/3] overflow-hidden">
        {branch.imageUrl ? (
          <>
            <Image
              src={branch.imageUrl}
              alt={`Turquaz ${branch.name}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              style={{ objectPosition: "center 35%" }}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1f0a]/95 via-[#0a1f0a]/30 to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 bg-[#0d2818]" />
        )}
        {branch.comingSoon ? (
          <span className="absolute top-3 right-3 px-2.5 py-1 rounded-lg text-[10px] font-medium tracking-wider uppercase bg-[#d4a017]/20 text-[#d4a017] border border-[#d4a017]/40">
            Coming Soon
          </span>
        ) : (
          <span
            className={`absolute top-3 right-3 px-2.5 py-1 rounded-lg text-[10px] font-medium tracking-wider uppercase ${
              badge === "open"
                ? "bg-[#2d5a2d]/90 text-[#a8d4a8] border border-[#3d7a3d]/50"
                : "bg-[#0d2818]/90 text-[#166534]/90 border border-[#d4a017]/30"
            }`}
          >
            {badgeText}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col justify-end p-4 sm:p-5 min-h-[180px] sm:min-h-[200px]">
        <p className="text-[10px] sm:text-[11px] text-[#166534] tracking-[0.2em] uppercase mb-1">{branch.area}</p>
        <h2 className="text-base sm:text-lg font-medium text-[#faf8f5] leading-tight mb-2">{branch.name}</h2>
        <p className="text-[11px] sm:text-xs text-[#e8c547]/90 line-clamp-2 leading-relaxed min-h-[2.5rem]">{branch.address}</p>
        <p className="text-[10px] sm:text-[11px] text-[#e8c547]/80 mt-2 flex items-center gap-1.5">
          <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          {branch.phone}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
          {branch.url ? (
            <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-[#166534] tracking-[0.15em] uppercase transition-colors duration-200 group-hover:text-[#2d5a2d]">
              Visit Website
              <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
            </span>
          ) : branch.comingSoon ? (
            <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-medium text-[#d4a017]/60 tracking-[0.15em] uppercase">
              Opening Soon
            </span>
          ) : (
            <>
              <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-[#166534] tracking-[0.15em] uppercase transition-colors duration-200 group-hover:text-[#2d5a2d]">
                Reserve a Table
                <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </span>
              <span className="inline-flex text-[11px] sm:text-xs font-medium text-[#e8c547]/90 tracking-[0.1em] uppercase transition-colors duration-200 group-hover:text-[#e8c547]">
                View Menu
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );

  const cardClasses = `group relative flex flex-col overflow-hidden rounded-2xl border border-[#d4a017]/25 bg-[#0d2818]/60 shadow-lg shadow-black/20 transition-all duration-300 ${
    branch.comingSoon
      ? "opacity-60"
      : "hover:scale-[1.02] hover:border-[#d4a017]/50 hover:shadow-[0_0_24px_rgba(212,160,23,0.12)]"
  }`;

  if (branch.url) {
    return (
      <a href={branch.url} target="_blank" rel="noopener noreferrer" className={cardClasses}>
        {cardContent}
      </a>
    );
  }

  return (
    <article className={cardClasses}>
      {cardContent}
    </article>
  );
}
