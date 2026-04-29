/**
 * Legal & policy content for Gunes Restaurant.
 *
 * Each policy renders at /legal/[slug]. Update `lastUpdated` whenever the
 * substance of a document changes — that timestamp is shown to users and is
 * relied on by UK GDPR / Consumer Rights notices.
 *
 * Online ordering is performed on third-party platforms (Uber Eats,
 * Deliveroo, Just Eat). Each of those platforms applies its own contract
 * with the customer; the policies below cover the relationship between the
 * customer and Gunes Restaurant Ltd directly.
 */

export interface PolicySection {
  heading: string;
  /** Paragraphs (rendered as <p>). */
  body?: string[];
  /** Optional bullet list rendered after `body`. */
  list?: string[];
}

export interface Policy {
  slug: string;
  title: string;
  /** Short, SEO-friendly summary. */
  summary: string;
  /** ISO date — bump whenever substance changes. */
  lastUpdated: string;
  sections: PolicySection[];
}

const COMPANY_NAME = "Gunes Restaurant";
const TRADING_ADDRESS = "204 Southbury Rd, Enfield EN1 1YQ, United Kingdom";
const CONTACT_EMAIL = "info@gunes.co.uk";

export const policies: Policy[] = [
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    summary:
      "How Gunes Restaurant collects, uses and protects your personal data under UK GDPR and the Data Protection Act 2018.",
    lastUpdated: "2026-04-29",
    sections: [
      {
        heading: "1. Who we are",
        body: [
          `${COMPANY_NAME} ("we", "us", "our") operates this website and our restaurants in the United Kingdom. Our trading address is ${TRADING_ADDRESS}. For any privacy-related question you can reach us at ${CONTACT_EMAIL}.`,
          "We are the data controller for the personal data described in this policy. We comply with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.",
        ],
      },
      {
        heading: "2. What data we collect",
        body: [
          "We only collect personal data that is necessary to provide our services and to comply with our legal obligations. Depending on how you interact with us this can include:",
        ],
        list: [
          "Identity & contact details: name, phone number, email address (when you make a reservation, contact us, or place an order through one of our delivery partners).",
          "Reservation details: party size, date, time, dietary or accessibility requirements you choose to share.",
          "Technical data: IP address, browser type, device information and pages visited (collected via cookies — see our Cookie Policy).",
          "Marketing preferences: whether you have opted in to receive updates from us.",
        ],
      },
      {
        heading: "3. How we use your data",
        body: [
          "We use your personal data only for the purposes set out below, and only where we have a lawful basis under UK GDPR.",
        ],
        list: [
          "To take and confirm bookings (lawful basis: performance of a contract).",
          "To respond to enquiries you send us (lawful basis: legitimate interests).",
          "To improve and secure our website (lawful basis: legitimate interests).",
          "To send you marketing communications, where you have given consent (lawful basis: consent — you can withdraw at any time).",
          "To comply with legal, accounting and food-safety obligations (lawful basis: legal obligation).",
        ],
      },
      {
        heading: "4. Online ordering & delivery partners",
        body: [
          "Online orders are processed on the platforms of Uber Eats, Deliveroo and Just Eat. When you place an order on those platforms, the platform acts as the controller for the data you submit there. We receive only the information necessary to prepare and hand over your order (for example: name, items, allergens declared, and delivery instructions).",
          "Please review the privacy policy of the platform you use to order. We are not responsible for their data-handling practices.",
        ],
      },
      {
        heading: "5. Sharing your data",
        body: [
          "We never sell your personal data. We share it only with parties who help us run our business and only to the extent necessary, including:",
        ],
        list: [
          "Reservation provider (Dojo) — to process and confirm bookings.",
          "Hosting and analytics providers — to operate our website.",
          "Delivery partners (Uber Eats, Deliveroo, Just Eat) — to fulfil your order.",
          "Professional advisers, regulators and law-enforcement bodies — only where required by law.",
        ],
      },
      {
        heading: "6. How long we keep your data",
        body: [
          "We keep personal data only for as long as necessary for the purpose we collected it. Reservation records are retained for up to 24 months. Accounting records are retained for 6 years as required by HMRC. Marketing-consent records are kept until you withdraw consent.",
        ],
      },
      {
        heading: "7. Your rights",
        body: [
          "Under UK GDPR you have the right to: access your data, ask us to correct or delete it, object to or restrict processing, withdraw any consent you have given, and request that we transfer your data to another controller.",
          `To exercise any of these rights, email us at ${CONTACT_EMAIL}. We will respond within one month.`,
          "If you are not satisfied with our response, you have the right to lodge a complaint with the Information Commissioner's Office (ICO) at ico.org.uk.",
        ],
      },
      {
        heading: "8. International transfers",
        body: [
          "Some of our service providers process data outside the UK. Where they do, we rely on the UK International Data Transfer Agreement or equivalent safeguards approved by the ICO.",
        ],
      },
      {
        heading: "9. Changes to this policy",
        body: [
          "We may update this policy from time to time. The date at the top of this page reflects the most recent change. Material changes will be flagged on our website.",
        ],
      },
    ],
  },
  {
    slug: "terms-and-conditions",
    title: "Terms & Conditions",
    summary:
      "The terms that apply to your use of the Gunes Restaurant website, our reservations service and any orders placed with us.",
    lastUpdated: "2026-04-29",
    sections: [
      {
        heading: "1. About these terms",
        body: [
          `These terms govern your use of this website (the "Site") operated by ${COMPANY_NAME}, registered in the United Kingdom at ${TRADING_ADDRESS}. By using the Site you agree to these terms. If you do not agree, please do not use the Site.`,
        ],
      },
      {
        heading: "2. Reservations",
        body: [
          "Reservations made through this Site are processed by our booking partner Dojo. A reservation is confirmed only once you receive a confirmation email or message from Dojo. We reserve the right to refuse or cancel a reservation in cases of force majeure, double-booking, or breach of these terms.",
          "If you cannot keep a reservation, please cancel through the link in your confirmation email so that the table can be released. Repeated no-shows may result in us declining future bookings.",
        ],
      },
      {
        heading: "3. Online orders",
        body: [
          "Orders placed through Uber Eats, Deliveroo or Just Eat are governed by the terms of the platform you order from. The contract for the supply of food is between you and the relevant platform. Our role is to prepare and hand over the food you have ordered.",
          "Allergen and dietary information shown on the platforms reflects the same information published on our website. If you have a severe allergy please call the restaurant directly before placing an order.",
        ],
      },
      {
        heading: "4. Pricing and availability",
        body: [
          "All prices on the Site are quoted in pounds sterling (GBP) and include VAT where applicable. Menu prices on third-party platforms may differ to reflect platform commission. Items are subject to availability and we may withdraw or substitute dishes at short notice.",
        ],
      },
      {
        heading: "5. Acceptable use",
        body: [
          "You agree not to use the Site in any way that is unlawful, fraudulent, or that interferes with its operation. You may not attempt to gain unauthorised access to any part of the Site or its underlying systems.",
        ],
      },
      {
        heading: "6. Intellectual property",
        body: [
          "All content on the Site — including text, photography, branding and the Gunes name and logo — is owned by us or our licensors. You may view and share content for personal, non-commercial use, but you may not reproduce or use it commercially without our written permission.",
        ],
      },
      {
        heading: "7. Liability",
        body: [
          "Nothing in these terms limits our liability for death or personal injury caused by negligence, for fraud, or for any other liability that cannot be limited under UK law. Subject to that, we are not liable for any indirect or consequential loss arising from your use of the Site.",
        ],
      },
      {
        heading: "8. Governing law",
        body: [
          "These terms are governed by the laws of England and Wales. The courts of England and Wales have exclusive jurisdiction over any dispute arising out of them.",
        ],
      },
      {
        heading: "9. Contact",
        body: [`Questions about these terms? Email us at ${CONTACT_EMAIL}.`],
      },
    ],
  },
  {
    slug: "cookie-policy",
    title: "Cookie Policy",
    summary:
      "What cookies we use, why, and how you can control them. Compliant with the Privacy and Electronic Communications Regulations (PECR).",
    lastUpdated: "2026-04-29",
    sections: [
      {
        heading: "1. What cookies are",
        body: [
          "Cookies are small text files placed on your device when you visit a website. They are widely used to make sites work, or work more efficiently, and to provide information to the site's owner.",
        ],
      },
      {
        heading: "2. Cookies we use",
        body: ["We keep our cookie use to the minimum needed to run the Site."],
        list: [
          "Strictly necessary cookies: required for the Site to function (for example, to remember your cookie choices). These do not require consent.",
          "Analytics cookies: help us understand how visitors use the Site so we can improve it. Set only if you accept.",
          "Marketing cookies: used to measure the effectiveness of any advertising we run. Set only if you accept.",
        ],
      },
      {
        heading: "3. Managing cookies",
        body: [
          "When you first visit the Site, you can accept or reject non-essential cookies via the banner shown. You can change your choice at any time by clearing the Site's storage in your browser, after which the banner will show again.",
          "Most browsers also let you block or delete cookies through their settings. Note that blocking strictly necessary cookies may stop parts of the Site from working.",
        ],
      },
      {
        heading: "4. Third-party cookies",
        body: [
          "Pages that embed content from third parties (for example, Instagram or our reservation provider) may set their own cookies. We do not control those cookies — please refer to the relevant provider's policy.",
        ],
      },
    ],
  },
  {
    slug: "refund-policy",
    title: "Refund & Returns Policy",
    summary:
      "How refunds work for reservations and online orders, in line with the UK Consumer Rights Act 2015.",
    lastUpdated: "2026-04-29",
    sections: [
      {
        heading: "1. Your statutory rights",
        body: [
          "Under the Consumer Rights Act 2015, food we serve must be of satisfactory quality, fit for purpose and as described. If it is not, you are entitled to an appropriate remedy. This policy explains how to claim that remedy and does not affect those rights.",
        ],
      },
      {
        heading: "2. Reservations and deposits",
        body: [
          "Standard reservations do not require payment. Where we hold a deposit (for example, large group bookings or special events), the deposit is fully refundable up to 48 hours before your booking. After that point the deposit may be retained to cover the cost of the table being held.",
        ],
      },
      {
        heading: "3. Online orders (Uber Eats, Deliveroo, Just Eat)",
        body: [
          "Refunds for delivery orders are handled by the platform you ordered from. If your order is incorrect, missing items, arrives cold, or is otherwise not as described, please open a complaint in that platform's app within 48 hours. The platform will assess the claim and process the refund.",
          "If the issue clearly relates to how the food was prepared rather than delivery, the platform will contact us. You can also email us with your order number and we will help where we can.",
        ],
      },
      {
        heading: "4. Dine-in",
        body: [
          "If something is wrong with a dish during your visit, please tell a member of our team straight away — we'd rather fix it on the spot than have you leave unhappy. Where a complaint is raised after the meal has finished, please email us with your bill reference within 14 days.",
        ],
      },
      {
        heading: "5. How refunds are paid",
        body: [
          "Where we issue a refund directly, it is returned to the original payment method within 14 days of the refund being agreed.",
        ],
      },
      {
        heading: "6. Contact",
        body: [
          `For any refund question that is not handled by a delivery platform, email us at ${CONTACT_EMAIL} with your order or booking reference.`,
        ],
      },
    ],
  },
  {
    slug: "delivery-policy",
    title: "Delivery Policy",
    summary:
      "How delivery works at Gunes Restaurant — areas, timings, and what to do if something goes wrong.",
    lastUpdated: "2026-04-29",
    sections: [
      {
        heading: "1. Who delivers your order",
        body: [
          "We do not run our own delivery fleet. All deliveries are operated by Uber Eats, Deliveroo or Just Eat. Each platform sets its own delivery area, fees and timings around our restaurants.",
        ],
      },
      {
        heading: "2. Delivery area & timings",
        body: [
          "Delivery zones and estimated times are shown on each platform when you enter your address. Estimates are provided by the platform and may change with traffic, weather, or kitchen volume.",
        ],
      },
      {
        heading: "3. Order accuracy",
        body: [
          "We pack each order against the platform receipt before handing it to the courier. If something is missing, damaged or incorrect on arrival, please raise it through the platform's app within 48 hours so the issue can be reviewed and refunded where appropriate.",
        ],
      },
      {
        heading: "4. Allergens",
        body: [
          "If you have a severe allergy, please call the restaurant before ordering. While we make every effort to avoid cross-contamination, our kitchens handle a wide range of ingredients and we cannot guarantee a fully allergen-free environment.",
        ],
      },
      {
        heading: "5. Failed delivery",
        body: [
          "If a courier cannot reach you (wrong address, no answer at the door, or restricted access), the platform may end the delivery and apply its own rules on refunds. Contact the platform's support team in that case.",
        ],
      },
    ],
  },
  {
    slug: "allergen-information",
    title: "Allergen Information",
    summary:
      "How to find allergen information for our menu and what to do if you have specific dietary needs.",
    lastUpdated: "2026-04-29",
    sections: [
      {
        heading: "1. Our obligations",
        body: [
          "Under the Food Information Regulations 2014, we provide allergen information for every dish on our menu. The 14 major allergens we declare are: cereals containing gluten, crustaceans, eggs, fish, peanuts, soybeans, milk, nuts, celery, mustard, sesame, sulphur dioxide / sulphites, lupin and molluscs.",
        ],
      },
      {
        heading: "2. How to check allergens",
        body: [
          "Allergen information is available on request in any of our restaurants — please ask your server before ordering. Online, the same information is shown on the menu pages of Uber Eats, Deliveroo and Just Eat for each dish.",
        ],
      },
      {
        heading: "3. Cross-contamination",
        body: [
          "Our kitchens prepare a wide range of dishes in a shared environment. Although we follow strict food-safety procedures, we cannot guarantee that any dish is completely free of any allergen. Customers with severe allergies should speak to the manager on duty before ordering.",
        ],
      },
      {
        heading: "4. Changes to recipes & suppliers",
        body: [
          "Recipes and suppliers may change from time to time. Always check the current allergen information rather than relying on a previous visit.",
        ],
      },
      {
        heading: "5. Contact",
        body: [
          `If you cannot find the information you need, email us at ${CONTACT_EMAIL} or call the branch directly.`,
        ],
      },
    ],
  },
  {
    slug: "accessibility",
    title: "Accessibility Statement",
    summary:
      "Our commitment to making this website usable by as many people as possible.",
    lastUpdated: "2026-04-29",
    sections: [
      {
        heading: "1. Our commitment",
        body: [
          "We want everyone to be able to use the Gunes Restaurant website. We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.1 at AA level.",
        ],
      },
      {
        heading: "2. What we do",
        body: ["The Site is designed so that you can:"],
        list: [
          "Navigate the whole site by keyboard.",
          "Use it with most modern screen readers.",
          "Resize text up to 200% without loss of functionality.",
          "Read content with sufficient colour contrast.",
        ],
      },
      {
        heading: "3. Known limitations",
        body: [
          "Some embedded third-party content (for example, the live preview of partner websites or our Instagram feed) is provided by external services and may not fully meet WCAG. We are working with our partners to improve this.",
        ],
      },
      {
        heading: "4. Telling us about a problem",
        body: [
          `If you find something on this Site difficult to use, please email ${CONTACT_EMAIL} describing the page and the issue. We aim to respond within five working days.`,
        ],
      },
    ],
  },
];

export function getPolicyBySlug(slug: string): Policy | undefined {
  return policies.find((p) => p.slug === slug);
}
