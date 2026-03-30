"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef, useCallback } from "react";
import { logoUrl } from "@/data/site";

const SCROLL_THRESHOLD = 80;

/**
 * Derives branch slug from pathname when on /locations/[slug].
 * Use this to prefill reservation/menu links per location.
 */
function useBranchFromPath(): string | null {
  const pathname = usePathname();
  const match = pathname?.match(/^\/locations\/([^/]+)$/);
  return match ? match[1] : null;
}

function buildReserveHref(branch: string | null): string {
  return branch ? `/reservations?branch=${branch}` : "/reservations";
}

function buildMenuHref(branch: string | null): string {
  return branch ? `/menu?branch=${branch}` : "/menu";
}

export function StickyHeader() {
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const branch = useBranchFromPath();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    };
    handleScroll(); // initial
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    if (!menuOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen, closeMenu]);

  const reserveHref = buildReserveHref(branch);
  const menuHref = buildMenuHref(branch);

  return (
    <header
      ref={menuRef}
      role="banner"
      aria-label="Sticky navigation"
      className={`stickyHeader fixed top-0 left-0 right-0 z-50 border-b transition-all ease-out ${
        visible
          ? "translate-y-0 opacity-100 bg-[var(--header-bg)] backdrop-blur-md border-[var(--header-border)] shadow-lg shadow-black/10"
          : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
        <Link
          href="/"
          className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cta-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a1a0a] rounded transition-opacity hover:opacity-90"
          aria-label="Gunes home"
        >
          <Image src={logoUrl} alt="" width={160} height={50} className="h-12 sm:h-14 w-auto object-contain" />
        </Link>

        <nav className="hidden sm:flex items-center gap-3 sm:gap-4" aria-label="Primary actions">
          <Link
            href={menuHref}
            className="btn-secondary inline-flex items-center px-4 py-2 rounded-lg border-2 border-[var(--cta-secondary-border)] text-[#faf8f5] text-xs font-medium tracking-[0.15em] uppercase hover:border-[var(--cta-primary)] hover:text-[var(--cta-secondary-hover)]"
            aria-label="View menu"
          >
            View Menu
          </Link>
          <Link
            href={reserveHref}
            className="btn-primary inline-flex items-center px-5 py-2.5 rounded-lg bg-[var(--cta-primary)] text-[#0a0a0a] text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[var(--cta-primary-hover)]"
            aria-label="Reserve a table"
          >
            Reserve a Table
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="sm:hidden flex items-center justify-center w-10 h-10 rounded-lg border border-[#d4af37]/30 text-[#faf8f5] hover:border-[#d4af37]/60 transition-colors"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <nav className="sm:hidden border-t border-[#d4af37]/20 bg-[#0a1a0a]/95 backdrop-blur-md px-4 py-4 flex flex-col gap-3" aria-label="Mobile navigation">
          <Link
            href="/"
            onClick={closeMenu}
            className="text-sm font-medium text-[#faf8f5] tracking-[0.1em] uppercase py-2 px-3 rounded-lg hover:bg-[#d4af37]/10 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/locations"
            onClick={closeMenu}
            className="text-sm font-medium text-[#faf8f5] tracking-[0.1em] uppercase py-2 px-3 rounded-lg hover:bg-[#d4af37]/10 transition-colors"
          >
            Locations
          </Link>
          <Link
            href={menuHref}
            onClick={closeMenu}
            className="text-sm font-medium text-[#faf8f5] tracking-[0.1em] uppercase py-2 px-3 rounded-lg hover:bg-[#d4af37]/10 transition-colors"
          >
            Menu
          </Link>
          <Link
            href={reserveHref}
            onClick={closeMenu}
            className="text-sm font-semibold text-[#0a0a0a] tracking-[0.15em] uppercase py-2.5 px-3 rounded-lg bg-[#d4af37] hover:bg-[#e8c547] transition-colors text-center"
          >
            Reserve a Table
          </Link>
        </nav>
      )}
    </header>
  );
}
