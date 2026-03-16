import React from "react";

// Skeleton loading animation
const shimmer = `
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
`;

export const Skeleton = ({ className = "", style = {} }) => (
  <div
    className={`rounded-lg ${className}`}
    style={{
      background: "linear-gradient(90deg, #1A1A2E 25%, #2A2A3E 50%, #1A1A2E 75%)",
      backgroundSize: "200% 100%",
      animation: "shimmer 1.5s infinite linear",
      ...style
    }}
  />
);

export const SkeletonText = ({ lines = 3, className = "" }) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton
        key={i}
        style={{
          height: "16px",
          width: i === lines - 1 ? "60%" : "100%"
        }}
      />
    ))}
  </div>
);

export const SkeletonCard = ({ className = "" }) => (
  <div className={`p-4 rounded-xl border border-industrial-gray bg-background-dark/50 ${className}`}>
    <Skeleton style={{ height: "120px", marginBottom: "12px" }} />
    <Skeleton style={{ height: "20px", width: "70%", marginBottom: "8px" }} />
    <Skeleton style={{ height: "14px", width: "40%" }} />
  </div>
);

export const SkeletonForm = ({ fields = 4 }) => (
  <div className="space-y-6">
    {Array.from({ length: fields }).map((_, i) => (
      <div key={i} className="space-y-2">
        <Skeleton style={{ height: "14px", width: "100px" }} />
        <Skeleton style={{ height: "44px", width: "100%" }} />
      </div>
    ))}
  </div>
);

export const SkeletonTable = ({ rows = 5, cols = 4 }) => (
  <div className="rounded-xl border border-industrial-gray overflow-hidden">
    <div className="bg-industrial-gray/30 p-3 flex gap-4">
      {Array.from({ length: cols }).map((_, i) => (
        <Skeleton key={i} style={{ height: "16px", flex: 1 }} />
      ))}
    </div>
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <div key={rowIndex} className="p-3 flex gap-4 border-t border-industrial-gray/30">
        {Array.from({ length: cols }).map((_, colIndex) => (
          <Skeleton key={colIndex} style={{ height: "14px", flex: 1 }} />
        ))}
      </div>
    ))}
  </div>
);

// CSS injection for animation
if (typeof document !== 'undefined') {
  const styleEl = document.createElement('style');
  styleEl.textContent = shimmer;
  if (!document.head.querySelector('[data-skeleton-shimmer]')) {
    styleEl.setAttribute('data-skeleton-shimmer', 'true');
    document.head.appendChild(styleEl);
  }
}

export default Skeleton;
