import Link from "next/link";

export const metadata = {
  title: "Menu | Gunes",
  description: "View our full menu. Authentic cuisine at six locations across London.",
};

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-[#0a1a0a] text-[#faf8f5] py-16 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-2xl sm:text-3xl font-medium mb-4">Menu</h1>
        <p className="text-[#faf8f5]/80 mb-8">Our full menu. Select a branch for location-specific offerings.</p>
        <Link href="/locations" className="text-[#d4af37] hover:underline">View Locations →</Link>
      </div>
    </div>
  );
}
