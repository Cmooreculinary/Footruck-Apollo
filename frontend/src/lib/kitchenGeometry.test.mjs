import test from "node:test";
import assert from "node:assert/strict";

import {
  clampPlacement,
  findFirstAvailablePosition,
  getEquipmentDimensions,
  placementCollides,
  rectanglesOverlap,
} from "./kitchenGeometry.mjs";

const griddle = { id: "griddle", w: 36, d: 24 };
const fryer = { id: "fryer", w: 12, d: 18 };
const equipmentById = { griddle, fryer };
const interior = { width: 84, depth: 48 };

test("quarter-turn rotations swap equipment dimensions", () => {
  assert.deepEqual(getEquipmentDimensions(griddle, 0), { width: 36, depth: 24 });
  assert.deepEqual(getEquipmentDimensions(griddle, 90), { width: 24, depth: 36 });
  assert.deepEqual(getEquipmentDimensions(griddle, 270), { width: 24, depth: 36 });
});

test("edge-touching rectangles do not overlap", () => {
  assert.equal(
    rectanglesOverlap(
      { x: 0, y: 0, width: 36, depth: 24 },
      { x: 36, y: 0, width: 12, depth: 18 },
    ),
    false,
  );
});

test("true intersections are detected", () => {
  assert.equal(
    rectanglesOverlap(
      { x: 0, y: 0, width: 36, depth: 24 },
      { x: 30, y: 6, width: 12, depth: 18 },
    ),
    true,
  );
});

test("placements snap to grid and remain inside the truck", () => {
  assert.deepEqual(
    clampPlacement({
      x: 83,
      y: 47,
      equipment: griddle,
      interior,
      gridSize: 6,
    }),
    { x: 48, y: 24, width: 36, depth: 24 },
  );
});

test("collision checks honor existing item rotation", () => {
  const placedEquipment = [{
    id: "placed-griddle",
    equipmentId: "griddle",
    x: 0,
    y: 0,
    rotation: 90,
  }];
  assert.equal(
    placementCollides({
      candidate: { x: 20, y: 30, width: 12, depth: 18 },
      placedEquipment,
      equipmentById,
    }),
    true,
  );
});

test("quick placement finds the first open grid position", () => {
  const placedEquipment = [{
    id: "placed-griddle",
    equipmentId: "griddle",
    x: 0,
    y: 0,
    rotation: 0,
  }];
  assert.deepEqual(
    findFirstAvailablePosition({
      equipment: fryer,
      placedEquipment,
      equipmentById,
      interior,
      gridSize: 6,
    }),
    { x: 36, y: 0, rotation: 0 },
  );
});

test("oversized equipment cannot be clamped or auto-placed", () => {
  const oversized = { id: "oversized", w: 120, d: 60 };
  assert.equal(clampPlacement({ x: 0, y: 0, equipment: oversized, interior }), null);
  assert.equal(
    findFirstAvailablePosition({
      equipment: oversized,
      placedEquipment: [],
      equipmentById,
      interior,
    }),
    null,
  );
});
