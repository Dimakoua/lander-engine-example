import React from 'react';
import { dispatcher } from 'lander-engine/core';

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  primaryCtaText?: string;
  onPrimaryCtaClick?: any[];
  secondaryCtaText?: string;
  onSecondaryCtaClick?: any[];
}

export default function CTASection({
  title = "Ready to get started?",
  subtitle = "Join thousands of satisfied customers using our platform today.",
  primaryCtaText = "Get Started Now",
  onPrimaryCtaClick,
  secondaryCtaText,
  onSecondaryCtaClick
}: CTASectionProps) {

  const handlePrimaryClick = () => {
    if (onPrimaryCtaClick) dispatcher.dispatch(onPrimaryCtaClick);
  };

  const handleSecondaryClick = () => {
    if (onSecondaryCtaClick) dispatcher.dispatch(onSecondaryCtaClick);
  };

  return (
    <section className="py-20 px-6 bg-[var(--color-primary)] text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">
          {title}
        </h2>
        <p className="text-xl md:text-2xl text-blue-100 font-light mb-10">
          {subtitle}
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          {primaryCtaText && (
            <button
              onClick={handlePrimaryClick}
              className="w-full sm:w-auto px-8 py-4 bg-white text-[var(--color-primary)] font-bold rounded-xl hover:bg-gray-50 transition-colors shadow-lg hover:shadow-xl"
            >
              {primaryCtaText}
            </button>
          )}
          {secondaryCtaText && (
            <button
              onClick={handleSecondaryClick}
              className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-colors"
            >
              {secondaryCtaText}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
