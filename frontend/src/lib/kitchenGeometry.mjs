export const normalizeRotation = (rotation = 0) => {
  const normalized = rotation % 360;
  return normalized < 0 ? normalized + 360 : normalized;
};

export const getEquipmentDimensions = (equipment, rotation = 0) => {
  if (!equipment || !Number.isFinite(equipment.w) || !Number.isFinite(equipment.d)) {
    throw new TypeError("Equipment must provide finite width and depth values.");
  }

  const normalized = normalizeRotation(rotation);
  const isQuarterTurn = normalized === 90 || normalized === 270;

  return {
    width: isQuarterTurn ? equipment.d : equipment.w,
    depth: isQuarterTurn ? equipment.w : equipment.d,
  };
};

export const getPlacementBounds = (placement, equipment) => {
  const dimensions = getEquipmentDimensions(equipment, placement.rotation);
  return {
    x: placement.x,
    y: placement.y,
    width: dimensions.width,
    depth: dimensions.depth,
  };
};

export const rectanglesOverlap = (first, second) => (
  first.x < second.x + second.width
  && first.x + first.width > second.x
  && first.y < second.y + second.depth
  && first.y + first.depth > second.y
);

export const clampPlacement = ({
  x,
  y,
  equipment,
  rotation = 0,
  interior,
  gridSize = 6,
}) => {
  if (!interior || !Number.isFinite(interior.width) || !Number.isFinite(interior.depth)) {
    throw new TypeError("Interior must provide finite width and depth values.");
  }
  if (!Number.isFinite(gridSize) || gridSize <= 0) {
    throw new RangeError("Grid size must be greater than zero.");
  }

  const { width, depth } = getEquipmentDimensions(equipment, rotation);
  if (width > interior.width || depth > interior.depth) {
    return null;
  }

  const snappedX = Math.round(x / gridSize) * gridSize;
  const snappedY = Math.round(y / gridSize) * gridSize;

  return {
    x: Math.max(0, Math.min(snappedX, interior.width - width)),
    y: Math.max(0, Math.min(snappedY, interior.depth - depth)),
    width,
    depth,
  };
};

export const placementCollides = ({
  candidate,
  placedEquipment,
  equipmentById,
  ignorePlacementId = null,
}) => placedEquipment.some((placement) => {
  if (placement.id === ignorePlacementId) return false;
  const equipment = equipmentById[placement.equipmentId];
  if (!equipment) return false;
  return rectanglesOverlap(candidate, getPlacementBounds(placement, equipment));
});

export const findFirstAvailablePosition = ({
  equipment,
  placedEquipment,
  equipmentById,
  interior,
  gridSize = 6,
  rotation = 0,
}) => {
  const dimensions = getEquipmentDimensions(equipment, rotation);
  if (dimensions.width > interior.width || dimensions.depth > interior.depth) {
    return null;
  }

  const maxX = interior.width - dimensions.width;
  const maxY = interior.depth - dimensions.depth;

  for (let y = 0; y <= maxY; y += gridSize) {
    for (let x = 0; x <= maxX; x += gridSize) {
      const candidate = { x, y, ...dimensions };
      if (!placementCollides({ candidate, placedEquipment, equipmentById })) {
        return { x, y, rotation: normalizeRotation(rotation) };
      }
    }
  }

  return null;
};
