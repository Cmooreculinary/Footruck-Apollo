import React from "react";

const FIRE = "#EC5B13";
const STEEL = "#CBD5E1";
const DARK_STEEL = "#64748B";
const INK = "#111827";

const idIncludes = (equipment, ...needles) => needles.some((needle) => equipment.id.includes(needle));

const EquipmentPlanDiagram = ({ equipment, className = "" }) => {
  const id = equipment.id;
  let diagram;

  if (idIncludes(equipment, "griddle", "charbroiler", "range")) {
    const isRange = id.includes("range");
    const burnerCount = id.includes("2burner") ? 2 : id.includes("6burner") ? 6 : 4;
    diagram = isRange ? (
      <g>
        {Array.from({ length: burnerCount }, (_, index) => {
          const columns = burnerCount > 4 ? 3 : 2;
          const x = 28 + (index % columns) * (columns === 3 ? 22 : 44);
          const y = 31 + Math.floor(index / columns) * 38;
          return <circle key={index} cx={x} cy={y} r="11" fill="none" stroke={FIRE} strokeWidth="4"/>;
        })}
      </g>
    ) : (
      <g>
        <rect x="12" y="18" width="76" height="64" rx="5" fill={INK} stroke={STEEL} strokeWidth="3"/>
        {id.includes("charbroiler")
          ? Array.from({ length: 7 }, (_, index) => <path key={index} d={`M${20 + index * 10} 25 V75`} stroke={DARK_STEEL} strokeWidth="3"/>)
          : Array.from({ length: 4 }, (_, index) => <path key={index} d={`M18 ${30 + index * 13} H82`} stroke={DARK_STEEL} strokeWidth="2"/>)}
        <rect x="12" y="78" width="76" height="8" rx="3" fill={FIRE}/>
      </g>
    );
  } else if (id.includes("fryer")) {
    const wells = id.includes("double") ? 2 : 1;
    diagram = (
      <g>
        {Array.from({ length: wells }, (_, index) => {
          const width = wells === 2 ? 34 : 62;
          const x = wells === 2 ? 13 + index * 40 : 19;
          return (
            <g key={index}>
              <rect x={x} y="18" width={width} height="64" rx="6" fill={INK} stroke={STEEL} strokeWidth="3"/>
              <path d={`M${x + 8} 30 H${x + width - 8} V66 H${x + 8} Z`} fill="none" stroke={FIRE} strokeWidth="3"/>
              <path d={`M${x + width / 2} 10 V31`} stroke={DARK_STEEL} strokeWidth="5" strokeLinecap="round"/>
            </g>
          );
        })}
      </g>
    );
  } else if (idIncludes(equipment, "convection", "pizza_deck", "microwave")) {
    diagram = (
      <g>
        <rect x="15" y="14" width="70" height="72" rx="7" fill={INK} stroke={STEEL} strokeWidth="3"/>
        <rect x="22" y="25" width="56" height="43" rx="4" fill="#0D0D0D" stroke={FIRE} strokeWidth="3"/>
        {[34, 48, 62].map((y) => <path key={y} d={`M27 ${y} H73`} stroke={DARK_STEEL} strokeWidth="2"/>)}
        <circle cx="30" cy="77" r="4" fill={FIRE}/>
        <circle cx="44" cy="77" r="4" fill={DARK_STEEL}/>
      </g>
    );
  } else if (idIncludes(equipment, "fridge", "freezer", "prep", "display_case", "ice_")) {
    const prepTop = id.includes("prep");
    diagram = (
      <g>
        <rect x="10" y="16" width="80" height="68" rx="6" fill={INK} stroke="#38BDF8" strokeWidth="3"/>
        {prepTop
          ? Array.from({ length: 6 }, (_, index) => <rect key={index} x={15 + index * 12} y="22" width="9" height="20" rx="2" fill="#38BDF8" opacity="0.45"/>)
          : <path d="M50 18 V82" stroke={DARK_STEEL} strokeWidth="3"/>}
        <path d="M17 51 H83" stroke={DARK_STEEL} strokeWidth="3"/>
        <circle cx="77" cy="66" r="5" fill="#38BDF8"/>
      </g>
    );
  } else if (idIncludes(equipment, "table", "shelf", "rack")) {
    diagram = (
      <g>
        <rect x="9" y="22" width="82" height="56" rx="4" fill={INK} stroke={STEEL} strokeWidth="4"/>
        <path d="M18 33 H82 M18 50 H82 M18 67 H82" stroke={DARK_STEEL} strokeWidth="3"/>
        <circle cx="18" cy="78" r="5" fill={FIRE}/>
        <circle cx="82" cy="78" r="5" fill={FIRE}/>
      </g>
    );
  } else if (id.includes("sink")) {
    const basins = id.includes("3comp") ? 3 : 1;
    diagram = (
      <g>
        <rect x="7" y="20" width="86" height="66" rx="5" fill={INK} stroke={STEEL} strokeWidth="3"/>
        {Array.from({ length: basins }, (_, index) => {
          const width = basins === 3 ? 23 : 54;
          const x = basins === 3 ? 12 + index * 27 : 23;
          return <rect key={index} x={x} y="32" width={width} height="42" rx="7" fill="#0D0D0D" stroke="#38BDF8" strokeWidth="3"/>;
        })}
        <path d="M50 8 V25 Q50 31 44 31" fill="none" stroke="#38BDF8" strokeWidth="5" strokeLinecap="round"/>
      </g>
    );
  } else if (idIncludes(equipment, "water_heater", "water_tank")) {
    diagram = (
      <g>
        <rect x="18" y="14" width="64" height="72" rx="18" fill={INK} stroke="#38BDF8" strokeWidth="4"/>
        <path d="M28 32 H72 M28 50 H72 M28 68 H72" stroke={DARK_STEEL} strokeWidth="3"/>
        <circle cx="50" cy="50" r="10" fill={id.includes("heater") ? FIRE : "#38BDF8"} opacity="0.75"/>
      </g>
    );
  } else if (id.includes("hood")) {
    diagram = (
      <g>
        <path d="M8 76 L18 20 H82 L92 76 Z" fill={INK} stroke={STEEL} strokeWidth="4"/>
        {[28, 43, 58, 73].map((x) => <path key={x} d={`M${x} 30 L${x - 5} 66`} stroke={FIRE} strokeWidth="4"/>)}
      </g>
    );
  } else if (id.includes("fire_ext")) {
    diagram = (
      <g>
        <circle cx="50" cy="56" r="25" fill="#7F1D1D" stroke="#FCA5A5" strokeWidth="4"/>
        <path d="M50 31 V14 H66" fill="none" stroke={STEEL} strokeWidth="6" strokeLinecap="round"/>
        <path d="M37 44 H63 V70 H37 Z" fill={FIRE}/>
      </g>
    );
  } else if (idIncludes(equipment, "espresso", "coffee", "tea", "fountain", "smoothie", "soft_serve")) {
    diagram = (
      <g>
        <rect x="15" y="17" width="70" height="65" rx="8" fill={INK} stroke={STEEL} strokeWidth="3"/>
        <circle cx="37" cy="38" r="10" fill={FIRE} opacity="0.65"/>
        <circle cx="63" cy="38" r="10" fill={FIRE} opacity="0.65"/>
        <path d="M31 52 V68 M50 52 V68 M69 52 V68" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round"/>
        <rect x="24" y="70" width="52" height="8" rx="3" fill={DARK_STEEL}/>
      </g>
    );
  } else if (idIncludes(equipment, "heat_lamp", "warming", "hot_cabinet", "steam_table")) {
    diagram = (
      <g>
        <rect x="10" y="23" width="80" height="60" rx="6" fill={INK} stroke={STEEL} strokeWidth="3"/>
        {[25, 50, 75].map((x) => <circle key={x} cx={x} cy="43" r="10" fill={FIRE} opacity="0.7"/>)}
        <path d="M20 66 H80" stroke={DARK_STEEL} strokeWidth="6"/>
      </g>
    );
  } else if (id.includes("pos_terminal")) {
    diagram = (
      <g>
        <rect x="20" y="12" width="60" height="52" rx="5" fill={INK} stroke={FIRE} strokeWidth="4"/>
        <rect x="28" y="20" width="44" height="35" rx="3" fill={FIRE} opacity="0.2"/>
        <path d="M50 64 V82 M34 84 H66" stroke={STEEL} strokeWidth="6" strokeLinecap="round"/>
      </g>
    );
  } else if (id.includes("ticket_rail")) {
    diagram = (
      <g>
        <rect x="8" y="18" width="84" height="14" rx="5" fill={STEEL}/>
        {[18, 35, 52, 69].map((x) => (
          <g key={x}>
            <circle cx={x + 6} cy="25" r="4" fill={FIRE}/>
            <rect x={x} y="34" width="14" height="48" rx="2" fill="#F8FAFC"/>
            <path d={`M${x + 3} 45 H${x + 11} M${x + 3} 54 H${x + 11} M${x + 3} 63 H${x + 11}`} stroke={DARK_STEEL} strokeWidth="2"/>
          </g>
        ))}
      </g>
    );
  } else {
    diagram = (
      <g>
        <rect x="12" y="16" width="76" height="68" rx="8" fill={INK} stroke={STEEL} strokeWidth="3"/>
        <circle cx="50" cy="50" r="20" fill={FIRE} opacity="0.28"/>
        <path d="M34 50 H66 M50 34 V66" stroke={FIRE} strokeWidth="5" strokeLinecap="round"/>
      </g>
    );
  }

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className={className}
      role="img"
      aria-label={`${equipment.name} top-down equipment diagram`}
    >
      <title>{equipment.name}</title>
      <rect width="100" height="100" rx="7" fill="#1E1E1E"/>
      {diagram}
      {equipment.required && <circle cx="91" cy="9" r="5" fill={FIRE}/>}
    </svg>
  );
};

export default EquipmentPlanDiagram;
