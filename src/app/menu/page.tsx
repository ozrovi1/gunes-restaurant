import Link from "next/link";
import Image from "next/image";
import { branches } from "@/data/branches";
import { branchMenus } from "@/data/menus";
import { logoUrl, aboutUs } from "@/data/site";
import { SectionReveal } from "@/components/SectionReveal";

export const metadata = {
  title: "Menu | Güneş",
  description: "Browse our menus by location. Authentic Turkish cuisine at Güneş branches.",
};

export default function MenuPickerPage() {
  const bookableBranches = branches.filter((b) => branchMenus[b.slug]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-10 sm:py-14 overflow-hidden bg-[#081408]">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-cover bg-center blur-[8px]" style={{ backgroundImage: "url('/landing-bg.png')" }} />
        <div className="absolute inset-0 bg-[#081408]/55" aria-hidden />
        <div className="heroOverlay" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto">
        <div className="text-center mb-8 flex flex-col items-center gap-3">
          <Image src={logoUrl} alt="Güneş" width={300} height={100} className="h-24 sm:h-32 w-auto object-contain" priority />
          <p className="text-[#faf8f5]/80 text-xs sm:text-sm leading-relaxed max-w-md">
            {aboutUs.short}
          </p>
          <div className="flex items-center justify-center gap-2 mt-1">
            <span className="w-6 h-px bg-[#d4af37]/50" />
            <h1 className="text-lg sm:text-xl font-medium text-[#faf8f5]">Menu</h1>
            <span className="w-6 h-px bg-[#d4af37]/50" />
          </div>
          <p className="text-[#d4af37]/90 text-[10px] sm:text-xs tracking-[0.25em] uppercase font-medium">Choose your branch</p>
        </div>

        <SectionReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {bookableBranches.map((branch) => (
              <Link
                key={branch.slug}
                href={`/menu/${branch.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#d4af37]/30 bg-[#0d1f0d]/60 shadow-lg shadow-black/20 transition-all duration-300 hover:scale-[1.02] hover:border-[#d4af37]/70 hover:shadow-[0_0_28px_rgba(212,175,55,0.18)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  {branch.imageUrl ? (
                    <>
                      <Image
                        src={branch.imageUrl}
                        alt={`Güneş ${branch.name}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#081408]/95 via-[#081408]/35 to-transparent" />
                    </>
                  ) : (
                    <div className="absolute inset-0 bg-[#0d1f0d]" />
                  )}
                </div>
                <div className="p-5 sm:p-6">
                  <p className="text-[10px] sm:text-[11px] text-[#d4af37] tracking-[0.2em] uppercase mb-1">
                    {branch.area}
                  </p>
                  <h2 className="text-lg sm:text-xl font-medium text-[#faf8f5] mb-2 transition-colors duration-300 group-hover:text-[#d4af37]">
                    {branch.name}
                  </h2>
                  <p className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-[#d4af37] tracking-[0.15em] uppercase">
                    View Menu
                    <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </SectionReveal>

        <div className="mt-10 text-center">
          <Link href="/" className="text-[11px] sm:text-[12px] text-[#faf8f5]/80 font-medium tracking-[0.15em] uppercase hover:text-[#d4af37] transition-colors">
            ← Home
          </Link>
        </div>
      </div>
    </section>
  );
}
