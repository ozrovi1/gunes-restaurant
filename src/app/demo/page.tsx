import { ShapedMedia } from "@/components/ShapedMedia";

/**
 * ShapedMedia demo – visit /demo to see the component.
 *
 * To replace an <img> with ShapedMedia:
 *
 *   // Before:
 *   <img src="/photo.jpg" alt="Dish" />
 *
 *   // After (arch):
 *   <div className="w-full aspect-[4/3]">
 *     <ShapedMedia src="/photo.jpg" alt="Dish" variant="arch" />
 *   </div>
 *
 *   // After (circle):
 *   <div className="w-24 h-24">
 *     <ShapedMedia src="/photo.jpg" alt="Highlight" variant="circle" />
 *   </div>
 */
export default function DemoPage() {
  return (
    <div className="min-h-screen bg-[#0a1a0a] text-[#faf8f5] py-16 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-xl font-medium text-[#d4af37] mb-8">ShapedMedia Demo</h1>
        <div className="grid sm:grid-cols-2 gap-8">
          <div>
            <p className="text-sm text-[#7a9e7a]/90 mb-4">variant=&quot;arch&quot;</p>
            <div className="w-full aspect-[4/3]">
              <ShapedMedia
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400"
                alt="Arch variant demo"
                variant="arch"
              />
            </div>
          </div>
          <div>
            <p className="text-sm text-[#7a9e7a]/90 mb-4">variant=&quot;circle&quot;</p>
            <div className="w-32 h-32">
              <ShapedMedia
                src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=200"
                alt="Circle variant demo"
                variant="circle"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
