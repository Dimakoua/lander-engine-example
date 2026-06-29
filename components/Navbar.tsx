import React from 'react';
import { dispatcher } from 'lander-engine/core';

interface NavbarLink {
  label: string;
  action: any[];
}

interface NavbarProps {
  brandName?: string;
  logoUrl?: string;
  links?: NavbarLink[];
  ctaText?: string;
  onCtaClick?: any[];
}

export default function Navbar({ brandName = "SaaSify", logoUrl, links = [], ctaText, onCtaClick }: NavbarProps) {
  const handleLinkClick = (action: any[]) => {
    if (action) dispatcher.dispatch(action);
  };

  const handleCtaClick = () => {
    if (onCtaClick) dispatcher.dispatch(onCtaClick);
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="flex items-center gap-3">
        {logoUrl && <img src={logoUrl} alt={brandName} className="h-8 w-8 object-contain" />}
        <span className="text-xl font-bold text-[var(--color-primary)] tracking-tight">{brandName}</span>
      </div>

      <div className="hidden md:flex items-center gap-8">
        {links.map((link, idx) => (
          <button
            key={idx}
            onClick={() => handleLinkClick(link.action)}
            className="text-gray-600 hover:text-[var(--color-primary)] font-medium transition-colors"
          >
            {link.label}
          </button>
        ))}
      </div>

      <div>
        {ctaText && (
          <button
            onClick={handleCtaClick}
            className="px-5 py-2.5 bg-[var(--color-primary)] text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            style={{ borderRadius: 'var(--token-buttonRadius)' }}
          >
            {ctaText}
          </button>
        )}
      </div>
    </nav>
  );
}
