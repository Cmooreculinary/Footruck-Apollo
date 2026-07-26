import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
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

test("Kitchen Builder renders diagrams and supports click-to-place selection", () => {
  const builder = readSource("src", "pages", "KitchenBuilder.jsx");

  assert.match(builder, /EquipmentPlanDiagram/);
  assert.match(builder, /handleQuickAdd/);
  assert.match(builder, /findFirstAvailablePosition/);
  assert.match(builder, /placementCollides/);
  assert.match(builder, /getEquipmentDimensions/);
});
