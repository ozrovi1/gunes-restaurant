/**
 * Renders the Christmas set menu PDFs (one per branch) from the same data the
 * site uses, so the download never drifts from what is on screen.
 *
 *   node scripts/build-christmas-pdf.mts
 *
 * Needs Google Chrome installed (headless print) and network access for the
 * Google Fonts stylesheet. Output: public/menus/christmas-<branch>.pdf
 */
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { christmasMenus, type ChristmasCourse, type ChristmasMenu } from "../src/data/seasonal/christmas.ts";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CHROME = process.env.CHROME_BIN ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const LOGO_DATA_URI = `data:image/png;base64,${readFileSync(path.join(ROOT, "public/logo.png")).toString("base64")}`;

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const allergens = (codes?: string[]) =>
  codes && codes.length ? `<span class="al">${codes.map((c) => `(${c})`).join(" ")}</span>` : "";

const rule = () => `<div class="rule" aria-hidden><i></i><b></b><i></i></div>`;

function course(c: ChristmasCourse): string {
  const head = `<h2>${esc(c.title)}</h2>${c.kind === "choose" ? `<p class="choose">Choose one</p>` : ""}`;
  const inlineStyle = c.kind === "list" || c.dishes.every((d) => !d.description);
  if (inlineStyle) {
    const intro = c.intro ? `<p class="intro">${esc(c.intro)}</p>` : "";
    const items = c.dishes
      .map((d, i) => `${i ? `<span class="dot">·</span>` : ""}<span class="nw">${esc(d.name)}${allergens(d.allergens)}</span>`)
      .join(" ");
    return `<section>${rule()}${head}${intro}<p class="inline">${items}</p></section>`;
  }
  const items = c.dishes
    .map(
      (d) =>
        `<li><p class="name">${esc(d.name)}${allergens(d.allergens)}</p>${d.description ? `<p class="desc">${esc(d.description)}</p>` : ""}</li>`,
    )
    .join("");
  return `<section>${rule()}${head}<ul>${items}</ul></section>`;
}

function page(m: ChristmasMenu): string {
  const prices = m.prices
    .map((p) => `<p class="price"><span class="amt">£${p.amount}</span><span class="lbl">${esc(p.label)}</span></p>`)
    .join("");
  const key = m.allergenKey.map((a) => `(${a.code}) ${esc(a.label)}`).join(" · ");
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<title>Güneş ${esc(m.branchName)} Christmas Set Menu</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Jost:wght@400;500;600&display=block" rel="stylesheet">
<style>
  @page { size: A4; margin: 0; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: 210mm; height: 297mm; background: #081408; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body { font-family: "Cormorant Garamond", Georgia, serif; color: #faf8f5; position: relative; overflow: hidden; }
  .frame { position: absolute; inset: 8mm; border: 0.6pt solid rgba(212,175,55,.55); }
  .frame::after { content: ""; position: absolute; inset: 1.6mm; border: 0.3pt solid rgba(212,175,55,.35); }
  .corner { position: absolute; width: 9mm; height: 9mm; border-color: #d4af37; border-style: solid; border-width: 0; }
  .corner.tl { top: 6.2mm; left: 6.2mm; border-top-width: 1pt; border-left-width: 1pt; }
  .corner.tr { top: 6.2mm; right: 6.2mm; border-top-width: 1pt; border-right-width: 1pt; }
  .corner.bl { bottom: 6.2mm; left: 6.2mm; border-bottom-width: 1pt; border-left-width: 1pt; }
  .corner.br { bottom: 6.2mm; right: 6.2mm; border-bottom-width: 1pt; border-right-width: 1pt; }
  .glow { position: absolute; left: 50%; top: 0; width: 160mm; height: 110mm; transform: translateX(-50%); background: radial-gradient(ellipse at 50% 0%, rgba(212,175,55,.16), transparent 65%); pointer-events: none; }
  main { position: relative; padding: 14mm 24mm 12mm; text-align: center; }
  .logo { height: 22mm; width: auto; display: block; margin: 0 auto; }
  .branch { margin-top: 4mm; font-family: Jost, sans-serif; font-size: 8.5pt; letter-spacing: .42em; text-transform: uppercase; color: #d4af37; }
  h1 { margin-top: 1mm; font-size: 31pt; font-weight: 500; font-style: italic; line-height: 1.05; color: #faf8f5; }
  .prices { margin-top: 3mm; }
  .price { display: flex; justify-content: center; align-items: baseline; gap: 3mm; line-height: 1.3; }
  .amt { font-size: 17pt; font-weight: 600; color: #d4af37; font-variant-numeric: tabular-nums; }
  .lbl { font-family: Jost, sans-serif; font-size: 7.5pt; letter-spacing: .26em; text-transform: uppercase; color: rgba(250,248,245,.72); }
  .pp { margin-top: .5mm; font-family: Jost, sans-serif; font-size: 7pt; letter-spacing: .22em; text-transform: uppercase; color: rgba(250,248,245,.45); }
  .rule { display: flex; align-items: center; justify-content: center; gap: 2mm; margin: 3.8mm 0 2.2mm; }
  .rule i { display: block; width: 14mm; height: .4pt; background: rgba(212,175,55,.5); }
  .rule b { display: block; width: 1.4mm; height: 1.4mm; background: #d4af37; transform: rotate(45deg); }
  h2 { font-family: Jost, sans-serif; font-weight: 500; font-size: 8pt; letter-spacing: .36em; text-transform: uppercase; color: #d4af37; }
  .choose { font-style: italic; font-size: 10.5pt; color: rgba(250,248,245,.55); margin-top: .4mm; }
  .intro { font-style: italic; font-size: 11.5pt; color: rgba(250,248,245,.62); margin-top: 1.6mm; }
  .inline { font-size: 12.5pt; line-height: 1.5; color: rgba(250,248,245,.88); margin-top: .6mm; }
  .nw { white-space: nowrap; }
  .dot { color: #d4af37; margin: 0 1mm; }
  ul { list-style: none; margin-top: 2.2mm; }
  li + li { margin-top: 1.9mm; }
  .name { font-size: 12.5pt; font-weight: 600; letter-spacing: .07em; text-transform: uppercase; color: #faf8f5; }
  .desc { font-size: 10.8pt; line-height: 1.3; color: rgba(250,248,245,.66); max-width: 128mm; margin: .3mm auto 0; }
  .al { font-family: Jost, sans-serif; font-size: 6.6pt; font-weight: 500; letter-spacing: .08em; text-transform: none; color: rgba(212,175,55,.85); margin-left: 1.4mm; vertical-align: middle; }
  footer { margin-top: 1mm; font-family: Jost, sans-serif; font-size: 6.8pt; line-height: 1.5; color: rgba(250,248,245,.55); max-width: 150mm; margin-left: auto; margin-right: auto; }
  footer strong { font-weight: 600; letter-spacing: .16em; text-transform: uppercase; color: rgba(212,175,55,.85); }
  footer p + p { margin-top: 1.2mm; }
</style></head>
<body>
  <div class="glow"></div>
  <div class="frame"></div>
  <span class="corner tl"></span><span class="corner tr"></span><span class="corner bl"></span><span class="corner br"></span>
  <main>
    <img class="logo" src="${LOGO_DATA_URI}" alt="Güneş Turkish Restaurant">
    <p class="branch">${esc(m.branchName)}</p>
    <h1>${esc(m.title)}</h1>
    <div class="prices">${prices}</div>
    <p class="pp">Per person</p>
    ${m.courses.map(course).join("")}
    ${rule()}
    <footer>
      <p><strong>Allergen key</strong> ${key}</p>
      <p>${esc(m.disclaimer)}</p>
    </footer>
  </main>
</body></html>`;
}

const work = mkdtempSync(path.join(tmpdir(), "gunes-christmas-"));
for (const m of Object.values(christmasMenus)) {
  const html = path.join(work, `${m.branch}.html`);
  const out = path.join(ROOT, "public/menus", `christmas-${m.branch}.pdf`);
  writeFileSync(html, page(m));
  execFileSync(CHROME, [
    "--headless=new",
    "--disable-gpu",
    "--no-pdf-header-footer",
    "--virtual-time-budget=12000",
    `--print-to-pdf=${out}`,
    `file://${html}`,
  ]);
  console.log(`wrote ${path.relative(ROOT, out)}`);
}
