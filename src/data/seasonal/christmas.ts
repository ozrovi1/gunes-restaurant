/**
 * Christmas set menu, one per branch.
 * Source: Gunes_Christmas_Set_Menu.pdf (Walthamstow) and
 * Gunes_Christmas_Set_Menu (1).pdf (Enfield), client, 2026-10-05.
 *
 * The two branches share everything except one main course:
 * Walthamstow offers Mix Doner, Enfield offers Lamb or Chicken Sauté.
 *
 * Allergen codes follow the PRINT menu's own key, which differs from the
 * à la carte schema in menus/types.ts (there S = Soya; here S = Sesame).
 * Keep them separate; never map one onto the other.
 */

export interface ChristmasDish {
  name: string;
  description?: string;
  allergens?: string[];
}

export interface ChristmasCourse {
  id: string;
  title: string;
  intro?: string;
  /** "choose" = guest picks one dish; "list" = everything is served */
  kind: "choose" | "list";
  dishes: ChristmasDish[];
}

export interface ChristmasMenu {
  branch: string;
  branchName: string;
  title: string;
  prices: { label: string; amount: string }[];
  courses: ChristmasCourse[];
  allergenKey: { code: string; label: string }[];
  disclaimer: string;
  pdfUrl: string;
}

/** ISO date (inclusive). Popup and menu tab only appear inside this window. */
export const CHRISTMAS_ACTIVE_FROM = "2026-10-05";
/** ISO date (exclusive). Everything disappears on its own after this. */
// TODO(client): confirm the real season dates. Placeholder: live now, gone on 1 Jan.
export const CHRISTMAS_ACTIVE_UNTIL = "2027-01-01";

const prices = [
  { label: "Monday to Thursday", amount: "39.95" },
  { label: "Friday to Sunday", amount: "49.95" },
];

const arrival: ChristmasCourse = {
  id: "arrival",
  title: "Upon Arrival",
  intro: "A glass of your choice",
  kind: "list",
  dishes: [
    { name: "Prosecco", allergens: ["SU"] },
    { name: "Kir Royale", allergens: ["SU"] },
    { name: "Beer", allergens: ["G"] },
    { name: "Soft drink" },
  ],
};

const starters: ChristmasCourse = {
  id: "starters",
  title: "Starters to Share",
  intro: "A selection of cold and hot mezze",
  kind: "list",
  dishes: [
    { name: "Falafel", allergens: ["S"] },
    { name: "Grilled halloumi", allergens: ["D"] },
    { name: "Calamari", allergens: ["M", "G"] },
    { name: "Hummus", allergens: ["S"] },
    { name: "Beetroot paté", allergens: ["D"] },
    { name: "Kısır", allergens: ["G"] },
  ],
};

const specialMixGrill: ChristmasDish = {
  name: "Special Mix Grill",
  description:
    "One lamb chop, one adana, two chicken shish, two lamb shish and three chicken wings, served with rice and salad",
};

const mixDoner: ChristmasDish = {
  name: "Mix Doner",
  description: "Our mouthwatering mix of lamb and chicken doner, served with rice and salad",
};

const lambOrChickenSaute: ChristmasDish = {
  name: "Lamb or Chicken Sauté",
  description:
    "Tender pieces of lamb or chicken sautéed with peppers, onions, mushrooms and tomatoes, served with rice and salad",
};

const sharedMains: ChristmasDish[] = [
  {
    name: "Grilled Salmon or Sea Bass",
    description: "Served with seasonal mixed vegetables and mashed potatoes",
    allergens: ["F", "D"],
  },
  {
    name: "Veggie & Halloumi Kebab",
    description:
      "Grilled mixed peppers, halloumi, mushrooms, onions, courgette and aubergine in a special tomato sauce, served with rice and salad",
    allergens: ["V", "D"],
  },
  {
    name: "Veggie Moussaka",
    description:
      "Slow-cooked layers of aubergine, potato, onion and garlic with a béchamel cheese sauce, served with rice and salad",
    allergens: ["V", "D", "G"],
  },
  {
    name: "Falafel & Hummus",
    description: "Served with baby potatoes and mixed seasonal vegetables",
    allergens: ["V", "G", "S"],
  },
];

const dessert: ChristmasCourse = {
  id: "dessert",
  title: "Dessert",
  kind: "choose",
  dishes: [
    { name: "Chocolate Brownie", allergens: ["D", "E", "G"] },
    { name: "Baklava", allergens: ["D", "G", "N"] },
    { name: "Rice Pudding", allergens: ["D"] },
  ],
};

const allergenKey = [
  { code: "F", label: "Fish" },
  { code: "M", label: "Molluscs" },
  { code: "D", label: "Dairy" },
  { code: "E", label: "Egg" },
  { code: "G", label: "Gluten" },
  { code: "N", label: "Nuts" },
  { code: "S", label: "Sesame" },
  { code: "SU", label: "Sulphites" },
  { code: "V", label: "Suitable for vegetarians" },
];

const disclaimer =
  "Please tell a member of the team about any allergies or dietary requirements before ordering. Our dishes are prepared in a kitchen where allergens are present, so we cannot guarantee any dish is free from traces.";

function buildMenu(branch: string, branchName: string, secondMain: ChristmasDish): ChristmasMenu {
  return {
    branch,
    branchName,
    title: "Christmas Set Menu",
    prices,
    courses: [
      arrival,
      starters,
      { id: "main", title: "Main Course", kind: "choose", dishes: [specialMixGrill, secondMain, ...sharedMains] },
      dessert,
    ],
    allergenKey,
    disclaimer,
    pdfUrl: `/menus/christmas-${branch}.pdf`,
  };
}

export const christmasMenus: Record<string, ChristmasMenu> = {
  enfield: buildMenu("enfield", "Enfield", lambOrChickenSaute),
  walthamstow: buildMenu("walthamstow", "Walthamstow", mixDoner),
};

export const christmasBranchSlugs = Object.keys(christmasMenus);

export function getChristmasMenu(slug: string): ChristmasMenu | undefined {
  return christmasMenus[slug];
}

/** Lowest per-person price across all branches (same at both). */
export const christmasLowestPrice = prices[0].amount;

export function isChristmasMenuActive(now: Date = new Date()): boolean {
  const t = now.getTime();
  return t >= Date.parse(CHRISTMAS_ACTIVE_FROM) && t < Date.parse(CHRISTMAS_ACTIVE_UNTIL);
}

export function allergenLabel(code: string): string {
  return allergenKey.find((a) => a.code === code)?.label ?? code;
}
