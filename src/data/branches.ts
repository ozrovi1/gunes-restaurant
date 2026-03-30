export interface Branch {
  slug: string;
  name: string;
  area: string;
  address: string;
  phone: string;
  hours: string;
  menuUrl?: string;
  mapEmbedUrl?: string;
  imageUrl?: string;
  /** Map center: [lat, lng] */
  mapCoords?: [number, number];
  /** Instagram handle (e.g. "gunes_restaurant") - add per branch later for live stats & photos */
  instagramHandle?: string;
  /** Instagram post URLs for embed carousel - add per branch later */
  instagramPostUrls?: string[];
  /** Live stats when Instagram connected: postsCount, followersCount, followingCount */
  instagramPostsCount?: number;
  instagramFollowersCount?: number;
  instagramFollowingCount?: number;
  /** Optional section-specific backgrounds (overrides imageUrl for these sections) */
  findUsBgUrl?: string;
  testimonialsBgUrl?: string;
}

export const branches: Branch[] = [
  { slug: "enfield", name: "Enfield", area: "North London", imageUrl: "/enfield-bg.png", address: "Enfield, London", phone: "+44 20 8886 1234", hours: "Mon–Sun 12:00–23:00", menuUrl: "/menus/enfield.pdf", mapCoords: [51.652, -0.079], findUsBgUrl: "/enfield-findus-bg.png", testimonialsBgUrl: "/enfield-testimonials-bg.png", instagramHandle: "gunesrestaurantuk", instagramPostsCount: 710, instagramFollowersCount: 14000, instagramFollowingCount: 1052, instagramPostUrls: ["https://www.instagram.com/p/DSCd9NLjTe_/", "https://www.instagram.com/reel/DTlEii_kmP-/", "https://www.instagram.com/reel/C_AqGaKI2QX/", "https://www.instagram.com/gunesrestaurantuk/reel/C71zqK6C0RP/"] },
  { slug: "walthamstow", name: "Walthamstow", area: "East London", imageUrl: "/walthamstow-bg.png", address: "328 Hoe Street, Walthamstow, London E17 9PX", phone: "020 8521 6789", hours: "Mon–Sun 12:00–23:00", menuUrl: "/menus/walthamstow.pdf", mapCoords: [51.5838, -0.0224], findUsBgUrl: "/walthamstow-findus-bg.png", testimonialsBgUrl: "/walthamstow-testimonials-bg.png", instagramHandle: "gunesrestaurantuk", instagramPostsCount: 710, instagramFollowersCount: 14000, instagramFollowingCount: 1052, instagramPostUrls: ["https://www.instagram.com/p/DSCd9NLjTe_/", "https://www.instagram.com/reel/DTlEii_kmP-/", "https://www.instagram.com/reel/C_AqGaKI2QX/", "https://www.instagram.com/gunesrestaurantuk/reel/C71zqK6C0RP/"] },
];

export function getBranchBySlug(slug: string): Branch | undefined {
  return branches.find((b) => b.slug === slug);
}
