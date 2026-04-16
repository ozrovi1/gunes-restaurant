
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import type { Branch } from "@/data/branches";
import { getOpenStatus } from "@/utils/openStatus";

interface LocationCardProps {
  branch: Branch;
  /** @deprecated — ignored, status is now computed from branch hours */
  badge?: "open" | "closes";
}

export function LocationCard({ branch }: LocationCardProps) {
  const [status, setStatus] = useState(() => getOpenStatus(branch));
  const [orderOpen, setOrderOpen] = useState(false);
  const orderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => setStatus(getOpenStatus(branch)), 60_000);
    return () => clearInterval(interval);
  }, [branch]);

  useEffect(() => {
    if (!orderOpen) return;
    function handleClick(e: MouseEvent) {
      if (orderRef.current && !orderRef.current.contains(e.target as Node)) {
        setOrderOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [orderOpen]);

  const badgeText = status.isOpen ? status.detail : status.label;

  const orderPlatforms = [
    branch.uberEatsUrl ? { label: "Uber Eats", url: branch.uberEatsUrl } : null,
    branch.deliverooUrl ? { label: "Deliveroo", url: branch.deliverooUrl } : null,
    branch.justEatUrl ? { label: "Just Eat", url: branch.justEatUrl } : null,
  ].filter(Boolean) as { label: string; url: string }[];

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
              status.isOpen
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
            {orderPlatforms.length > 0 && (
              <div ref={orderRef} className="relative">
                <button
                  onClick={() => setOrderOpen((v) => !v)}
                  className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-[#d4af37] tracking-[0.15em] uppercase hover:text-[#e8c547] transition-colors"
                  aria-label={`Order online from ${branch.name}`}
                >
                  Order Online
                  <svg className={`w-3 h-3 transition-transform duration-200 ${orderOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {orderOpen && (
                  <div className="absolute bottom-full left-0 mb-2 min-w-[140px] rounded-lg border border-[#d4af37]/30 bg-[#0d1f0d]/95 backdrop-blur-sm shadow-xl shadow-black/30 py-1.5 z-50">
                    {orderPlatforms.map((p) => (
                      <a
                        key={p.label}
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-3 py-1.5 text-[11px] text-[#faf8f5] hover:bg-[#d4af37]/15 hover:text-[#e8c547] transition-colors"
                      >
                        {p.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
