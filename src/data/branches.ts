export interface Branch {
  slug: string;
  name: string;
  area: string;
  address: string;
  phone: string;
  hours: string;
  menuUrl?: string;
  /** Shared drinks menu PDF (same across all Gunes branches) */
  drinksMenuUrl?: string;
  /** Shared dessert menu PDF (same across all Gunes branches) */
  dessertMenuUrl?: string;
  /** External Dojo booking URL when the branch is on Reserve-with-Google */
  dojoBookingUrl?: string;
  mapEmbedUrl?: string;
  imageUrl?: string;
  /** Map center: [lat, lng] */
  mapCoords?: [number, number];
  /** Uber Eats order URL — shows "Order Online" button when set */
  uberEatsUrl?: string;
  /** Deliveroo order URL */
  deliverooUrl?: string;
  /** Just Eat order URL */
  justEatUrl?: string;
  /** Instagram handle (e.g. "gunes_restaurant") - add per branch later for live stats & photos */
  instagramHandle?: string;
  /** Instagram post URLs for embed carousel */
  instagramPostUrls?: string[];
  /** Local thumbnail paths matching instagramPostUrls order */
  instagramThumbnails?: string[];
  /** Live stats when Instagram connected: postsCount, followersCount, followingCount */
  instagramPostsCount?: number;
  instagramFollowersCount?: number;
  instagramFollowingCount?: number;
  /** Optional section-specific backgrounds (overrides imageUrl for these sections) */
  findUsBgUrl?: string;
  testimonialsBgUrl?: string;
}

export const branches: Branch[] = [
  { slug: "enfield", name: "Enfield", area: "North London", imageUrl: "/enfield-bg.png", address: "Enfield, London", phone: "+44 20 8886 1234", hours: "Mon–Fri 11:00–23:00, Sat–Sun 10:00–23:00", menuUrl: "/menus/enfield.pdf", drinksMenuUrl: "/menus/drinks-menu.pdf", dessertMenuUrl: "/menus/desserts.pdf", dojoBookingUrl: "https://web.dojo.app/create_booking/vendor/cSl-7yVE0uIDbEWfAzOahJ_Ly8lQpuWjc226RaeJ55A_restaurant?utm_source=reserve_with_google_action_link&rwg_token=AFd1xnF1HyU-jrjFapC7n2RVQqV_3I3V_ZmSrahsLIe83Xs4Ry2Rpg7W8NpzAVqE_rfKnfZmwIbThvVMmZZ0j6vj71geJ5UxrcoI6JreWm-EhSvQ7q_jH7o%3D", mapCoords: [51.652, -0.079], findUsBgUrl: "/enfield-findus-bg.png", testimonialsBgUrl: "/enfield-testimonials-bg.png", uberEatsUrl: "https://www.ubereats.com/gb/store/gunes-restaurant/SwilDhaeT1O2olUCAEYfYA", instagramHandle: "gunesrestaurantuk", instagramPostsCount: 710, instagramFollowersCount: 14000, instagramFollowingCount: 1052, instagramPostUrls: ["https://www.instagram.com/p/DSCd9NLjTe_/", "https://www.instagram.com/reel/DTlEii_kmP-/", "https://www.instagram.com/reel/C_AqGaKI2QX/", "https://www.instagram.com/gunesrestaurantuk/reel/C71zqK6C0RP/"], instagramThumbnails: ["/instagram/post1.jpg", "/instagram/post2.jpg", "/instagram/post3.jpg", "/instagram/post4.jpg"] },
  { slug: "walthamstow", name: "Walthamstow", area: "East London", imageUrl: "/walthamstow-bg.png", address: "328 Hoe Street, Walthamstow, London E17 9PX", phone: "020 8521 6789", hours: "Mon–Fri 11:00–23:00, Sat–Sun 10:00–22:30", menuUrl: "/menus/walthamstow.pdf", drinksMenuUrl: "/menus/drinks-menu.pdf", dessertMenuUrl: "/menus/desserts.pdf", dojoBookingUrl: "https://web.dojo.app/create_booking/vendor/UBCxlpkuGirIiVZW8aUl_hPLAWQ5-LYh-9vXA9cjAqs_restaurant?utm_source=reserve_with_google_action_link&rwg_token=AFd1xnHvpxAfDvaKPbGidFR4tcr818kOENZEnb2Exf1voKL-JIdWXxy0uKr2fqKgq3xLQRevQSILm6zN8AVVgrEMFKtLY2S_FcTBvI87pAfg7Lkd_otH_Bc%3D", mapCoords: [51.5838, -0.0224], findUsBgUrl: "/walthamstow-findus-bg.png", testimonialsBgUrl: "/walthamstow-testimonials-bg.png", uberEatsUrl: "https://www.ubereats.com/gb/store/gunes-restaurant/SwilDhaeT1O2olUCAEYfYA", deliverooUrl: "https://deliveroo.co.uk/menu/london/walthamstow/gunes-restaurant", justEatUrl: "https://www.just-eat.co.uk/restaurants-gunes-restaurant-walthamstow/menu", instagramHandle: "gunesrestaurantuk", instagramPostsCount: 710, instagramFollowersCount: 14000, instagramFollowingCount: 1052, instagramPostUrls: ["https://www.instagram.com/p/DSCd9NLjTe_/", "https://www.instagram.com/reel/DTlEii_kmP-/", "https://www.instagram.com/reel/C_AqGaKI2QX/", "https://www.instagram.com/gunesrestaurantuk/reel/C71zqK6C0RP/"], instagramThumbnails: ["/instagram/post1.jpg", "/instagram/post2.jpg", "/instagram/post3.jpg", "/instagram/post4.jpg"] },
];

export function getBranchBySlug(slug: string): Branch | undefined {
  return branches.find((b) => b.slug === slug);
}
