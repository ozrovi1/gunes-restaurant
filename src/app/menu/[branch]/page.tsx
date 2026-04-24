import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { branchMenus, getBranchMenu, hasTakeaway } from "@/data/menus";
import type { ServiceMode } from "@/data/menus/types";
import { getBranchBySlug } from "@/data/branches";
import { logoUrl } from "@/data/site";
import { MenuRenderer } from "@/components/MenuRenderer";
import { SectionReveal } from "@/components/SectionReveal";

export async function generateStaticParams() {
  return Object.keys(branchMenus).map((branch) => ({ branch }));
}

export async function generateMetadata({ params }: { params: Promise<{ branch: string }> }) {
  const { branch } = await params;
  const b = getBranchBySlug(branch);
  if (!b) return { title: "Menu | Güneş" };
  return {
    title: `${b.name} Menu | Güneş`,
    description: `Full menu for Güneş ${b.name}. Authentic Turkish cuisine.`,
  };
}

function parseMode(raw: string | undefined): ServiceMode {
  return raw === "takeaway" ? "takeaway" : "dinein";
}

export default async function BranchMenuPage({
  params,
  searchParams,
}: {
  params: Promise<{ branch: string }>;
  searchParams: Promise<{ mode?: string; category?: string }>;
}) {
  const { branch } = await params;
  const sp = await searchParams;
  const requestedMode = parseMode(sp.mode);
  const branchHasTakeaway = hasTakeaway(branch);
  const activeMode: ServiceMode = requestedMode === "takeaway" && branchHasTakeaway ? "takeaway" : "dinein";

  const menu = getBranchMenu(branch, activeMode);
  const branchData = getBranchBySlug(branch);
  if (!menu || !branchData) notFound();

  const categoryParam = sp.category ? `&category=${sp.category}` : "";

  return (
    <div className="min-h-screen bg-[#081408] text-[#faf8f5]">
      <section className="relative py-14 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {branchData.imageUrl && (
          <div className="absolute inset-0">
            <Image src={branchData.imageUrl} alt="" fill className="object-cover scale-[1.02] blur-sm" sizes="100vw" priority />
            <div className="absolute inset-0 bg-[#081408]/80" />
          </div>
        )}
        <SectionReveal className="relative z-10 max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-5">
            <Image src={logoUrl} alt="Güneş" width={220} height={72} className="h-16 sm:h-20 w-auto object-contain opacity-95" priority />
          </div>
          <p className="text-[#d4af37] text-[11px] sm:text-[12px] tracking-[0.3em] uppercase mb-2">{branchData.area}</p>
          <h1 className="text-2xl sm:text-3xl font-medium mb-3">{branchData.name} Menu</h1>
          <p className="text-[#faf8f5]/75 text-xs sm:text-sm max-w-xl mx-auto">
            Authentic Turkish cuisine, freshly prepared every day.
          </p>

          {branchHasTakeaway && (
            <div className="mt-6 inline-flex items-center gap-0 p-1 rounded-full border border-[#d4af37]/40 bg-[#0d1f0d]/70 backdrop-blur-sm">
              <Link
                href={`/menu/${branch}?mode=dinein${categoryParam}`}
                aria-pressed={activeMode === "dinein"}
                className={
                  activeMode === "dinein"
                    ? "px-5 py-2 rounded-full bg-[#d4af37] text-[#081408] text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase shadow-md shadow-black/30 transition-colors"
                    : "px-5 py-2 rounded-full text-[#faf8f5]/80 text-[10px] sm:text-[11px] font-medium tracking-[0.2em] uppercase hover:text-[#d4af37] transition-colors"
                }
              >
                Dine In
              </Link>
              <Link
                href={`/menu/${branch}?mode=takeaway${categoryParam}`}
                aria-pressed={activeMode === "takeaway"}
                className={
                  activeMode === "takeaway"
                    ? "px-5 py-2 rounded-full bg-[#d4af37] text-[#081408] text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase shadow-md shadow-black/30 transition-colors"
                    : "px-5 py-2 rounded-full text-[#faf8f5]/80 text-[10px] sm:text-[11px] font-medium tracking-[0.2em] uppercase hover:text-[#d4af37] transition-colors"
                }
              >
                Takeaway
              </Link>
            </div>
          )}

          <div className="mt-6 flex items-center justify-center gap-4 flex-wrap">
            <Link
              href={`/locations/${branchData.slug}`}
              className="text-[11px] sm:text-[12px] text-[#faf8f5]/80 font-medium tracking-[0.15em] uppercase hover:text-[#d4af37] transition-colors"
            >
              ← Back to {branchData.name}
            </Link>
            {branchData.menuUrl && (
              <a
                href={branchData.menuUrl}
                download
                className="text-[11px] sm:text-[12px] text-[#d4af37] font-semibold tracking-[0.15em] uppercase hover:text-[#e8c547] transition-colors"
              >
                Download PDF ↓
              </a>
            )}
            {branchData.drinksMenuUrl && (
              <a
                href={branchData.drinksMenuUrl}
                download
                className="text-[11px] sm:text-[12px] text-[#d4af37] font-semibold tracking-[0.15em] uppercase hover:text-[#e8c547] transition-colors"
              >
                Drinks ↓
              </a>
            )}
            {branchData.dessertMenuUrl && (
              <a
                href={branchData.dessertMenuUrl}
                download
                className="text-[11px] sm:text-[12px] text-[#d4af37] font-semibold tracking-[0.15em] uppercase hover:text-[#e8c547] transition-colors"
              >
                Desserts ↓
              </a>
            )}
          </div>
        </SectionReveal>
      </section>

      <section className="relative px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-6xl mx-auto">
          <MenuRenderer menu={menu} brandName="Güneş" />
        </div>
      </section>
    </div>
  );
}
