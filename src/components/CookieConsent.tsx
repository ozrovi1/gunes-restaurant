"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "gunes.cookie-consent.v1";

type Choice = "accepted" | "rejected";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored !== "accepted" && stored !== "rejected") {
        setVisible(true);
      }
    } catch {
      // Storage unavailable (e.g. private mode) — show the banner so the user
      // can still make a choice this session.
      setVisible(true);
    }
  }, []);

  const persist = (choice: Choice) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      // Ignore — choice will simply not persist across sessions.
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-4 sm:px-6 sm:pb-6"
    >
      <div className="mx-auto max-w-3xl rounded-2xl border border-[#d4af37]/30 bg-[#0a1a0a]/95 backdrop-blur-md shadow-2xl shadow-black/40 p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-[#faf8f5]/85 leading-relaxed">
            <p>
              We use cookies that are strictly necessary to run this site, plus
              optional analytics cookies to help us improve it. You can change
              your choice any time.{" "}
              <Link
                href="/legal/cookie-policy"
                className="text-[#d4af37] hover:text-[#e8c547] underline underline-offset-2"
              >
                Cookie Policy
              </Link>
            </p>
          </div>
          <div className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={() => persist("rejected")}
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-[#d4af37]/40 text-[#faf8f5] text-xs font-medium tracking-[0.15em] uppercase hover:border-[#d4af37] transition-colors"
            >
              Reject non-essential
            </button>
            <button
              type="button"
              onClick={() => persist("accepted")}
              className="inline-flex items-center justify-center px-5 py-2 rounded-lg bg-[#d4af37] text-[#0a0a0a] text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[#e8c547] transition-colors"
            >
              Accept all
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
