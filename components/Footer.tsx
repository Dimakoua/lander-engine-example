import React from 'react';
import { dispatcher } from 'lander-engine/core';

interface FooterLink {
  label: string;
  action: any[];
}

interface FooterProps {
  brandName?: string;
  description?: string;
  copyrightYear?: string | number;
  links?: FooterLink[];
}

export default function Footer({ brandName = "SaaSify", description = "Making the world a better place through innovative SaaS solutions.", copyrightYear, links = [] }: FooterProps) {
  const year = copyrightYear || new Date().getFullYear();

  const handleLinkClick = (action: any[]) => {
    if (action) dispatcher.dispatch(action);
  };

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-6 border-t border-gray-800">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Brand Column */}
        <div className="flex flex-col gap-4">
          <span className="text-2xl font-bold text-white tracking-tight">{brandName}</span>
          <p className="text-sm text-gray-400 max-w-sm">
            {description}
          </p>
        </div>

        {/* Links Column */}
        {links.length > 0 && (
          <div className="flex flex-col gap-4 md:col-span-2">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {links.map((link, idx) => (
                <button
                  key={idx}
                  onClick={() => handleLinkClick(link.action)}
                  className="text-sm text-gray-400 hover:text-white transition-colors text-left"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
        <p>© {year} {brandName} Inc. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
