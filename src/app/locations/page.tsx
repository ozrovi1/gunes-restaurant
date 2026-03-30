import Link from "next/link";
import Image from "next/image";
import { branches } from "@/data/branches";
import { logoUrl, aboutUs } from "@/data/site";
import { LocationCard } from "@/components/LocationCard";
import { SectionReveal } from "@/components/SectionReveal";

export const metadata = {
  title: "Locations | Gunes",
  description: "Find your nearest Gunes restaurant. Six locations across London.",
};

export default function LocationsPage() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-10 sm:py-12 overflow-hidden bg-[#081408]">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920')" }} />
        <div className="heroOverlay" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex justify-center mb-4 sm:mb-6">
            <Image src={logoUrl} alt="Gunes" width={280} height={90} className="h-28 sm:h-36 w-auto object-contain" />
          </div>
          <p className="text-[#faf8f5]/80 text-xs sm:text-sm leading-relaxed max-w-md mx-auto mb-6">
            {aboutUs.short}
          </p>
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="w-6 h-px bg-[#d4af37]/50" />
            <h1 className="text-lg sm:text-xl font-medium text-[#faf8f5]">Locations</h1>
            <span className="w-6 h-px bg-[#d4af37]/50" />
          </div>
          <p className="text-[#d4af37]/90 text-[10px] sm:text-xs tracking-[0.25em] uppercase font-medium">Please Select Your Destination</p>
        </div>

        <SectionReveal>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
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
            <Link href="/" className="text-[11px] sm:text-[12px] text-[#d4af37] font-medium tracking-[0.15em] uppercase hover:text-[#e8c547] transition-colors">
              Home
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
      </div>
    </section>
  );
}
