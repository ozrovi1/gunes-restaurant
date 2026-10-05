import Image from "next/image";
import { Cormorant_Garamond } from "next/font/google";
import { logoUrl } from "@/data/site";
import {
  allergenLabel,
  type ChristmasCourse,
  type ChristmasDish,
  type ChristmasMenu,
} from "@/data/seasonal/christmas";

const serif = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const GOLD = "#d4af37";

function Allergens({ codes }: { codes?: string[] }) {
  if (!codes || codes.length === 0) return null;
  return (
    <span className="ml-1.5 inline-flex gap-1 align-middle">
      {codes.map((c) => (
        <abbr
          key={c}
          title={allergenLabel(c)}
          className="no-underline text-[9px] font-sans font-medium tracking-wider text-[#d4af37]/80"
        >
          ({c})
        </abbr>
      ))}
    </span>
  );
}

function Rule() {
  return (
    <div className="flex items-center justify-center gap-2 my-6" aria-hidden>
      <span className="h-px w-12 bg-[#d4af37]/40" />
      <span className="h-1 w-1 rotate-45 bg-[#d4af37]" />
      <span className="h-px w-12 bg-[#d4af37]/40" />
    </div>
  );
}

function CourseHeading({ course }: { course: ChristmasCourse }) {
  return (
    <div className="mb-3">
      <h3 className="font-sans text-[10px] sm:text-[11px] tracking-[0.35em] uppercase text-[#d4af37]">
        {course.title}
      </h3>
      {course.kind === "choose" && (
        <p className={`${serif.className} italic text-[13px] text-[#faf8f5]/55 mt-0.5`}>Choose one</p>
      )}
    </div>
  );
}

function InlineList({ course }: { course: ChristmasCourse }) {
  return (
    <div className="text-[15px] sm:text-base leading-relaxed text-[#faf8f5]/85">
      {course.intro && <p className="italic text-[#faf8f5]/60">{course.intro}</p>}
      <p>
        {course.dishes.map((d: ChristmasDish, i) => (
          <span key={d.name}>
            {i > 0 && " "}
            <span className="whitespace-nowrap">
              {i > 0 && (
                <span className="text-[#d4af37]" aria-hidden>
                  ·&nbsp;
                </span>
              )}
              {d.name}
              <Allergens codes={d.allergens} />
            </span>
          </span>
        ))}
      </p>
    </div>
  );
}

function DishList({ course }: { course: ChristmasCourse }) {
  return (
    <ul className="space-y-4">
      {course.dishes.map((d) => (
        <li key={d.name}>
          <p className="text-[16px] sm:text-[17px] font-semibold uppercase tracking-[0.06em] text-[#faf8f5]">
            {d.name}
            <Allergens codes={d.allergens} />
          </p>
          {d.description && (
            <p className="mt-0.5 text-[14px] sm:text-[15px] leading-snug text-[#faf8f5]/65 max-w-md mx-auto">
              {d.description}
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}

/**
 * The Christmas set menu drawn as a printed card (deep green, gold rules, serif),
 * matching the branch PDFs. Used in the site-wide popup and the menu page tab.
 */
export function ChristmasMenuCard({ menu, headingId }: { menu: ChristmasMenu; headingId?: string }) {
  return (
    <article
      className={`${serif.className} relative bg-[#081408] text-[#faf8f5] rounded-sm shadow-2xl shadow-black/60 border border-[#d4af37]/30`}
    >
      <div className="absolute inset-2 sm:inset-3 border border-[#d4af37]/45 pointer-events-none" aria-hidden />
      <div className="relative px-6 sm:px-12 py-10 sm:py-12 text-center">
        <div className="flex justify-center">
          <Image src={logoUrl} alt="Güneş" width={120} height={120} className="h-20 w-auto object-contain" />
        </div>
        <p className="mt-4 font-sans text-[10px] sm:text-[11px] tracking-[0.4em] uppercase text-[#d4af37]">
          {menu.branchName}
        </p>
        <h2 id={headingId} className="mt-1 text-4xl sm:text-5xl italic font-medium text-[#faf8f5]">
          {menu.title}
        </h2>

        <div className="mt-5 space-y-1">
          {menu.prices.map((p) => (
            <p key={p.label} className="flex items-baseline justify-center gap-3">
              <span className="text-xl sm:text-2xl font-semibold tabular-nums" style={{ color: GOLD }}>
                £{p.amount}
              </span>
              <span className="font-sans text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#faf8f5]/70">
                {p.label}
              </span>
            </p>
          ))}
        </div>
        <p className="mt-1 font-sans text-[10px] tracking-[0.2em] uppercase text-[#faf8f5]/45">Per person</p>

        {menu.courses.map((course) => (
          <section key={course.id} aria-label={course.title}>
            <Rule />
            <CourseHeading course={course} />
            {course.kind === "list" || course.dishes.every((d) => !d.description) ? (
              <InlineList course={course} />
            ) : (
              <DishList course={course} />
            )}
          </section>
        ))}

        <Rule />
        <div className="font-sans text-[10px] sm:text-[11px] leading-relaxed text-[#faf8f5]/55 max-w-lg mx-auto">
          <p>
            <span className="font-semibold tracking-[0.15em] uppercase text-[#d4af37]/80">Allergen key </span>
            {menu.allergenKey.map((a) => `(${a.code}) ${a.label}`).join(" · ")}
          </p>
          <p className="mt-2">{menu.disclaimer}</p>
        </div>
      </div>
    </article>
  );
}
