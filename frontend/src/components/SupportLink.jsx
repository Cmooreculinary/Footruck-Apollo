import React from "react";
import { LifeBuoy } from "lucide-react";

const FALLBACK_SUPPORT_URL = "https://bcappz.com";

// Build-time variable VITE_SUPPORT_URL; only https/mailto links are accepted.
const configured = (import.meta.env.VITE_SUPPORT_URL || "").trim();
export const SUPPORT_URL = /^(https:\/\/|mailto:)/i.test(configured) ? configured : FALLBACK_SUPPORT_URL;

const SupportLink = ({ className = "", label = "Help / Contact" }) => (
  <a
    href={SUPPORT_URL}
    target="_blank"
    rel="noopener noreferrer"
    data-testid="support-link"
    className={`inline-flex items-center justify-center gap-2 min-h-[44px] px-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors ${className}`}
  >
    <LifeBuoy className="w-4 h-4" aria-hidden="true" />
    {label}
  </a>
);

export default SupportLink;
