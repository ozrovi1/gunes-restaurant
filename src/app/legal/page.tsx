import type { Metadata } from "next";
import Link from "next/link";
import { policies } from "@/data/legal";

export const metadata: Metadata = {
  title: "Legal & Policies | Gunes",
  description:
    "Privacy, terms, refunds, delivery, allergens and accessibility for Gunes Restaurant.",
};

export default function LegalIndexPage() {
  return (
    <main className="relative min-h-screen bg-[#0a1a0a] text-[#faf8f5] pt-24 sm:pt-28 pb-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <header className="mb-10 border-b border-[#d4af37]/20 pb-6">
          <p className="text-[11px] sm:text-xs text-[#d4af37] tracking-[0.25em] uppercase mb-2">
            Legal
          </p>
          <h1 className="text-3xl sm:text-4xl font-medium leading-tight mb-4">
            Policies & legal information
          </h1>
          <p className="text-sm sm:text-base text-[#faf8f5]/80 leading-relaxed">
            Everything we&rsquo;re required to share — and a few things we want
            you to know — about how we run the restaurant, our website and our
            online orders.
          </p>
        </header>

        <ul className="grid sm:grid-cols-2 gap-4">
          {policies.map((policy) => (
            <li key={policy.slug}>
              <Link
                href={`/legal/${policy.slug}`}
                className="group block h-full rounded-2xl border border-[#d4af37]/20 bg-[#0d1f0d]/60 p-5 transition-colors hover:border-[#d4af37]/50"
              >
                <h2 className="text-base sm:text-lg font-medium text-[#faf8f5] mb-2 group-hover:text-[#d4af37] transition-colors">
                  {policy.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#7a9e7a]/90 leading-relaxed">
                  {policy.summary}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
