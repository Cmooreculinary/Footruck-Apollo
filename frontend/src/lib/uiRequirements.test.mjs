import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const currentDirectory = dirname(fileURLToPath(import.meta.url));
const frontendRoot = join(currentDirectory, "..", "..");
const readSource = (...parts) => readFileSync(join(frontendRoot, ...parts), "utf8");

test("Paint Shop Level Up cards are BETA-only with no prices", () => {
  const paintShop = readSource("src", "pages", "PaintShop.jsx");
  const section = paintShop.match(/\{\/\* Level Up Your Build \*\/\}([\s\S]*?)\{\/\* Sticky Save Bar \*\/\}/)?.[1];

  assert.ok(section, "Level Up Your Build section must exist.");
  assert.equal(section.includes("$"), false, "Level Up cards must not expose dollar pricing.");
  assert.ok((section.match(/BETA/g) || []).length >= 3, "Every Level Up card must be marked BETA.");
});

test("Legacy Paint Shop is removed from source, routing, and sitemap", () => {
  const app = readSource("src", "App.jsx");
  const sitemap = readSource("public", "sitemap.xml");

  assert.equal(app.includes("TruckDesignStudio"), false);
  assert.equal(app.includes("Legacy Paint Shop"), false);
  assert.equal(app.includes('path="/truck-design"'), false);
  assert.equal(sitemap.includes("/truck-design"), false);
  assert.equal(existsSync(join(frontendRoot, "src", "pages", "TruckDesignStudio.jsx")), false);
});

test("Equipment Showroom has 76 unique, illustrated products and local chassis images", () => {
  const showroom = readSource("src", "pages", "KitchenOutfitter.jsx");
  const productLines = showroom.split("\n").filter((line) => line.includes("{ id:\""));
  const productIds = productLines.map((line) => line.match(/\{ id:\"([^\"]+)\"/)?.[1]).filter(Boolean);

  assert.equal(productIds.length, 76);
  assert.equal(new Set(productIds).size, productIds.length);
  assert.equal(productLines.every((line) => line.includes('type:"')), true);
  assert.equal(showroom.includes("placehold.co"), false);
  assert.equal(showroom.includes("Coming+Soon"), false);
  assert.match(showroom, /objectFit:\s*"contain"/);
  assert.match(showroom, /objectPosition:\s*"center"/);

  const imageBlock = showroom.match(/const PRODUCT_IMAGES = \{([\s\S]*?)\n\};/)?.[1] || "";
  const chassisPaths = [...imageBlock.matchAll(/\"ch-\d+\":\s*\"([^\"]+)\"/g)].map((match) => match[1]);
  assert.equal(chassisPaths.length, 6);
  assert.equal(chassisPaths.every((path) => existsSync(join(frontendRoot, "public", path))), true);
});

test("every local truck WebP has a complete image stream", () => {
  const trucksDirectory = join(frontendRoot, "public", "trucks");
  const webpPaths = readdirSync(trucksDirectory, { recursive: true })
    .filter((path) => path.endsWith(".webp"));

  assert.ok(webpPaths.length >= 8, "Expected the checked-in truck image set.");

  for (const relativePath of webpPaths) {
    const image = readFileSync(join(trucksDirectory, relativePath));
    assert.equal(image.subarray(0, 4).toString("ascii"), "RIFF", `${relativePath} must be a RIFF file.`);
    assert.equal(image.subarray(8, 12).toString("ascii"), "WEBP", `${relativePath} must be a WebP image.`);
    assert.equal(image.readUInt32LE(4) + 8, image.length, `${relativePath} contains a truncated WebP stream.`);
  }
});

test("Kitchen Builder renders diagrams and supports click-to-place selection", () => {
  const builder = readSource("src", "pages", "KitchenBuilder.jsx");

  assert.match(builder, /EquipmentPlanDiagram/);
  assert.match(builder, /handleQuickAdd/);
  assert.match(builder, /findFirstAvailablePosition/);
  assert.match(builder, /placementCollides/);
  assert.match(builder, /getEquipmentDimensions/);
});

test("Customer-facing name is Foodtruck Apollo and the old brand is gone", () => {
  const seo = readSource("src", "components", "SEO.jsx");
  const html = readSource("index.html");
  const walk = (dir) =>
    readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
      entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)],
    );
  const sources = walk(join(frontendRoot, "src")).filter((file) => /\.(jsx?|css)$/.test(file));

  assert.ok(html.includes("<title>Foodtruck Apollo"));
  assert.equal(seo.includes("foodtrucklaunchpad.com"), false);
  for (const file of sources) {
    assert.equal(/launch ?pad|FTLP/i.test(readFileSync(file, "utf8")), false, `${file} still uses the old name`);
  }
});

test("Deploy hosts are not hard-coded to Render and sitemap uses one domain", () => {
  const sitemap = readSource("public", "sitemap.xml");
  const robots = readSource("public", "robots.txt");

  assert.equal(/onrender/i.test(sitemap + robots), false);
  assert.ok(robots.includes("https://apollo.bcappz.com/sitemap.xml"));
  const hosts = new Set([...sitemap.matchAll(/<loc>(https:\/\/[^/]+)/g)].map((match) => match[1]));
  assert.deepEqual([...hosts], ["https://apollo.bcappz.com"]);
});

test("Help / Contact link reads VITE_SUPPORT_URL with a bcappz.com fallback, in the footer and on pricing", () => {
  const support = readSource("src", "components", "SupportLink.jsx");
  const landing = readSource("src", "pages", "LandingPage.jsx");
  const pricing = readSource("src", "pages", "PricingPage.jsx");

  assert.ok(support.includes("VITE_SUPPORT_URL"));
  assert.ok(support.includes("https://bcappz.com"));
  assert.ok(support.includes("Help / Contact"));
  assert.ok(landing.includes("<SupportLink"));
  assert.ok((pricing.match(/<SupportLink/g) || []).length >= 1);
});

test("Trench Design fonts and colors are in place; retired fonts and colors are removed", () => {
  const html = readSource("index.html");
  const tailwind = readSource("tailwind.config.js");
  const allCss = readSource("src", "index.css") + readSource("src", "App.css");

  for (const font of ["Bebas+Neue", "DM+Sans", "IBM+Plex+Mono"]) assert.ok(html.includes(font), font);
  for (const font of ["Outfit", "Manrope", "Oswald", "Space Grotesk", "Space+Grotesk"]) {
    assert.equal((html + tailwind + allCss).includes(font), false, `${font} must be removed`);
  }
  assert.ok(tailwind.includes("Bebas Neue") && tailwind.includes("DM Sans") && tailwind.includes("IBM Plex Mono"));
  assert.ok(allCss.includes("min-height: 44px"));

  const app = readSource("src", "App.jsx") + readSource("src", "pages", "LandingPage.jsx");
  assert.equal(/e8592f|0b0f17/i.test(app + allCss), false);
});
