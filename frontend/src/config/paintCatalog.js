export const APP_IMAGES = {
  paintShop: {
    colorCatalog: {
      src: "/trucks/catalog/paint-catalog-30.png",
      alt: "Six food truck chassis shown in the same 30 numbered paint colors",
      dataImg: "paint-shop-color-catalog",
      width: 1635,
      height: 962,
    },
  },
};

export const PAINT_CATALOG = [
  { id: 1, name: "Signal Red", hex: "#C92F25" },
  { id: 2, name: "Fire Orange", hex: "#EC5B13" },
  { id: 3, name: "Burnt Orange", hex: "#D86620" },
  { id: 4, name: "Amber", hex: "#DD8A20" },
  { id: 5, name: "Goldenrod", hex: "#DDAA25" },
  { id: 6, name: "Galley Gold", hex: "#D9B64B" },
  { id: 7, name: "Citrus Green", hex: "#98B641" },
  { id: 8, name: "Field Green", hex: "#648A2F" },
  { id: 9, name: "Olive Press", hex: "#6E8B31" },
  { id: 10, name: "Avocado", hex: "#8CA843" },
  { id: 11, name: "Sage", hex: "#80A55A" },
  { id: 12, name: "Service Teal", hex: "#3FA79A" },
  { id: 13, name: "Ice Blue", hex: "#73A8D0" },
  { id: 14, name: "Cobalt", hex: "#315D9D" },
  { id: 15, name: "Deep Navy", hex: "#24466F" },
  { id: 16, name: "Workshop Blue", hex: "#2D648F" },
  { id: 17, name: "Steel Blue", hex: "#6795B8" },
  { id: 18, name: "Harbor Blue", hex: "#2D8BAF" },
  { id: 19, name: "Royal Purple", hex: "#5B338A" },
  { id: 20, name: "Plum", hex: "#58366E" },
  { id: 21, name: "Lavender", hex: "#8A5BA8" },
  { id: 22, name: "Hot Pink", hex: "#CE4E86" },
  { id: 23, name: "Rose", hex: "#D66B83" },
  { id: 24, name: "Salmon", hex: "#D17B6E" },
  { id: 25, name: "Apron Cream", hex: "#C9B092" },
  { id: 26, name: "Foundry Bronze", hex: "#795333" },
  { id: 27, name: "Brushed Silver", hex: "#A8A8A4" },
  { id: 28, name: "Graphite", hex: "#686B69" },
  { id: 29, name: "Obsidian", hex: "#16191B" },
  { id: 30, name: "Service White", hex: "#E8E7E1" },
];

export const PAINT_CATALOG_PANELS = {
  truck_01: { x: 7, y: 8, width: 526, height: 461 },
  truck_02: { x: 553, y: 8, width: 528, height: 461 },
  truck_03: { x: 1101, y: 8, width: 527, height: 461 },
  truck_04: { x: 7, y: 490, width: 526, height: 462 },
  truck_05: { x: 553, y: 490, width: 528, height: 462 },
  truck_06: { x: 1101, y: 490, width: 527, height: 462 },
};

export const getPaintById = (paintId) =>
  PAINT_CATALOG.find((paint) => paint.id === Number(paintId)) || PAINT_CATALOG[1];

export const getPaintIdByHex = (hex) => {
  if (!hex) return 2;
  const normalized = hex.toUpperCase();
  return PAINT_CATALOG.find((paint) => paint.hex === normalized)?.id || 2;
};

export const getPaintCatalogPanel = (truckModel) =>
  PAINT_CATALOG_PANELS[truckModel] || PAINT_CATALOG_PANELS.truck_01;
