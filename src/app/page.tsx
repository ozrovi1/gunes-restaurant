import Link from "next/link";
import Image from "next/image";
import { branches } from "@/data/branches";
import { logoUrl, aboutUs, turquazLanding } from "@/data/site";
import { LocationCard } from "@/components/LocationCard";
import { SectionReveal } from "@/components/SectionReveal";

const TURQUAZ_WEBSITE_URL = "https://www.turkuazfeltham.co.uk/";

export default function HomePage() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-10 sm:py-12 overflow-hidden bg-[#081408]">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-cover bg-center blur-[4px]" style={{ backgroundImage: "url('/landing-bg.png')" }} />
        <div className="heroOverlay" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex justify-center mb-4 sm:mb-6">
            <Image src={logoUrl} alt="Gunes" width={680} height={220} className="h-56 sm:h-72 w-auto object-contain" />
          </div>
          <p className="text-[#faf8f5]/80 text-sm sm:text-base leading-relaxed max-w-md mx-auto mb-6">
            {aboutUs.short}
          </p>
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="w-6 h-px bg-[#d4af37]/50" />
            <h1 className="text-lg sm:text-xl font-medium text-[#faf8f5]">Welcome</h1>
            <span className="w-6 h-px bg-[#d4af37]/50" />
          </div>
          <p className="text-[#d4af37]/90 text-[10px] sm:text-xs tracking-[0.25em] uppercase font-medium">Please Select Your Destination</p>
        </div>

        <SectionReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {branches.map((branch, i) => (
            <LocationCard
              key={branch.slug}
              branch={branch}
              badge={i % 2 === 0 ? "open" : "closes"}
            />
          ))}
        </div>
        </SectionReveal>

        <SectionReveal>
        <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-[#d4af37]/10 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-8 h-px bg-[#d4af37]/30" />
            <p className="text-[11px] sm:text-[12px] text-[#d4af37] tracking-[0.25em] uppercase">Contact</p>
            <span className="w-8 h-px bg-[#d4af37]/30" />
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[#faf8f5]/80 text-xs sm:text-sm">
            {branches.map((branch) => (
              <a key={branch.slug} href={`tel:${branch.phone.replace(/\s/g, "")}`} className="hover:text-[#d4af37] transition-colors">
                {branch.name}: {branch.phone}
              </a>
            ))}
          </div>
          <a href="mailto:info@gunes.co.uk" className="block mt-3 text-[#faf8f5]/80 text-xs sm:text-sm hover:text-[#d4af37] transition-colors">
            info@gunes.co.uk
          </a>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
            <Link href="/locations" className="text-[11px] sm:text-[12px] text-[#d4af37] font-medium tracking-[0.15em] uppercase hover:text-[#e8c547] transition-colors">
              Locations
            </Link>
            <Link href="/menu" className="text-[11px] sm:text-[12px] text-[#d4af37] font-medium tracking-[0.15em] uppercase hover:text-[#e8c547] transition-colors">
              View Menu
            </Link>
            <Link href="/reservations" className="text-[11px] sm:text-[12px] text-[#d4af37] font-semibold tracking-[0.15em] uppercase hover:text-[#e8c547] transition-colors">
              Reserve a Table
            </Link>
          </div>
        </div>
        </SectionReveal>

        <SectionReveal>
        <div className="mt-16 sm:mt-20 pt-8 sm:pt-10 border-t border-[#d4af37]/10">
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="w-8 h-px bg-[#d4af37]/30" />
            <p className="text-[11px] sm:text-[12px] text-[#d4af37] tracking-[0.25em] uppercase">Our Sister Branches</p>
            <span className="w-8 h-px bg-[#d4af37]/30" />
          </div>

          {/* Turquaz - link preview card to external website */}
          <a
            href={TURQUAZ_WEBSITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${turquazLanding.name} website`}
            className="group relative block rounded-2xl overflow-hidden border border-[#d4af37]/20 bg-[#0a1f0a] transition-all duration-300 hover:border-[#d4af37]/50 hover:shadow-[0_0_32px_rgba(212,175,55,0.18)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]"
          >
            <div className="absolute inset-0">
              <div
                className="absolute inset-0 bg-cover bg-center blur-[2px] transition-transform duration-500 group-hover:scale-[1.03]"
                style={{ backgroundImage: `url('${turquazLanding.heroBg}')` }}
              />
              <div className="absolute inset-0 bg-[#0a1f0a]/75" />
            </div>
            <div className="relative z-10 flex flex-col sm:flex-row items-center gap-5 sm:gap-8 px-6 py-7 sm:px-10 sm:py-9">
              <div className="shrink-0">
                <Image
                  src={turquazLanding.logoUrl}
                  alt={turquazLanding.name}
                  width={200}
                  height={67}
                  className="h-14 sm:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <p className="text-[10px] sm:text-[11px] text-[#d4af37] tracking-[0.3em] uppercase mb-2 [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]">Sister Restaurant</p>
                <h2 className="text-xl sm:text-2xl font-medium text-[#faf8f5] mb-2 [text-shadow:0_1px_4px_rgba(0,0,0,0.7)]">{turquazLanding.name}</h2>
                <p className="text-[#faf8f5]/85 text-xs sm:text-sm leading-relaxed max-w-md [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]">
                  {turquazLanding.tagline}
                </p>
              </div>
              <div className="shrink-0 inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-[#d4af37] tracking-[0.2em] uppercase transition-colors duration-200 group-hover:text-[#e8c547]">
                Visit Website
                <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </div>
            </div>
          </a>
        </div>
        </SectionReveal>
      </div>
    </section>
  );
}
