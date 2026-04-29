import Link from "next/link";
import Image from "next/image";
import { branches } from "@/data/branches";
import { logoUrl } from "@/data/site";
import { policies } from "@/data/legal";

const PRIMARY_LEGAL_SLUGS = [
  "privacy-policy",
  "terms-and-conditions",
  "cookie-policy",
  "refund-policy",
  "delivery-policy",
  "allergen-information",
  "accessibility",
];

export function Footer() {
  const year = new Date().getFullYear();
  const orderedPolicies = PRIMARY_LEGAL_SLUGS.map((slug) =>
    policies.find((p) => p.slug === slug),
  ).filter((p): p is (typeof policies)[number] => Boolean(p));

  return (
    <footer
      role="contentinfo"
      className="relative bg-[#081408] border-t border-[#d4af37]/15 text-[#faf8f5]/80"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="inline-block mb-4"
              aria-label="Gunes home"
            >
              <Image
                src={logoUrl}
                alt="Gunes"
                width={140}
                height={45}
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-xs sm:text-sm text-[#faf8f5]/70 leading-relaxed">
              Authentic cuisine and warm hospitality across London.
            </p>
          </div>

          {/* Locations */}
          <div>
            <h2 className="text-[11px] tracking-[0.25em] uppercase text-[#d4af37] mb-4">
              Locations
            </h2>
            <ul className="space-y-2 text-sm">
              {branches.map((branch) => (
                <li key={branch.slug}>
                  <Link
                    href={`/locations/${branch.slug}`}
                    className="hover:text-[#d4af37] transition-colors"
                  >
                    {branch.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-[11px] tracking-[0.25em] uppercase text-[#d4af37] mb-4">
              Contact
            </h2>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="mailto:info@gunes.co.uk"
                  className="hover:text-[#d4af37] transition-colors"
                >
                  info@gunes.co.uk
                </a>
              </li>
              {branches.map((branch) => (
                <li key={branch.slug}>
                  <a
                    href={`tel:${branch.phone.replace(/\s/g, "")}`}
                    className="hover:text-[#d4af37] transition-colors"
                  >
                    <span className="text-[#7a9e7a]/80">{branch.name}: </span>
                    {branch.phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h2 className="text-[11px] tracking-[0.25em] uppercase text-[#d4af37] mb-4">
              Legal
            </h2>
            <ul className="space-y-2 text-sm">
              {orderedPolicies.map((policy) => (
                <li key={policy.slug}>
                  <Link
                    href={`/legal/${policy.slug}`}
                    className="hover:text-[#d4af37] transition-colors"
                  >
                    {policy.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#d4af37]/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-[11px] sm:text-xs text-[#7a9e7a]/80">
          <p>&copy; {year} Gunes Restaurant. All rights reserved.</p>
          <p>
            Online orders are fulfilled via Uber Eats, Deliveroo and Just Eat.
          </p>
        </div>
      </div>
    </footer>
  );
}
