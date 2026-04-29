import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPolicyBySlug, policies } from "@/data/legal";

export function generateStaticParams() {
  return policies.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const policy = getPolicyBySlug(slug);
  if (!policy) return { title: "Not found" };
  return {
    title: `${policy.title} | Gunes`,
    description: policy.summary,
  };
}

const updatedFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const policy = getPolicyBySlug(slug);
  if (!policy) notFound();

  const updated = updatedFormatter.format(new Date(policy.lastUpdated));

  return (
    <main className="relative min-h-screen bg-[#0a1a0a] text-[#faf8f5] pt-24 sm:pt-28 pb-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <nav aria-label="Breadcrumb" className="mb-6 text-[11px] sm:text-xs text-[#7a9e7a]/80 tracking-[0.15em] uppercase">
          <Link href="/" className="hover:text-[#d4af37] transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/legal" className="hover:text-[#d4af37] transition-colors">
            Legal
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[#d4af37]/90">{policy.title}</span>
        </nav>

        <header className="mb-10 border-b border-[#d4af37]/20 pb-6">
          <p className="text-[11px] sm:text-xs text-[#d4af37] tracking-[0.25em] uppercase mb-2">
            Legal
          </p>
          <h1 className="text-3xl sm:text-4xl font-medium leading-tight mb-4">
            {policy.title}
          </h1>
          <p className="text-sm sm:text-base text-[#faf8f5]/80 leading-relaxed">
            {policy.summary}
          </p>
          <p className="mt-4 text-xs text-[#7a9e7a]/80">
            Last updated {updated}
          </p>
        </header>

        <article className="space-y-8">
          {policy.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-lg sm:text-xl font-medium text-[#faf8f5] mb-3">
                {section.heading}
              </h2>
              {section.body?.map((para, i) => (
                <p
                  key={i}
                  className="text-sm sm:text-[15px] text-[#faf8f5]/85 leading-relaxed mb-3"
                >
                  {para}
                </p>
              ))}
              {section.list && (
                <ul className="list-disc pl-5 marker:text-[#d4af37]/70 space-y-2 text-sm sm:text-[15px] text-[#faf8f5]/85 leading-relaxed">
                  {section.list.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </article>

        <div className="mt-12 pt-6 border-t border-[#d4af37]/15 text-xs text-[#7a9e7a]/80">
          <p>
            Questions? Email{" "}
            <a
              href="mailto:info@gunes.co.uk"
              className="text-[#d4af37] hover:text-[#e8c547] transition-colors"
            >
              info@gunes.co.uk
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
