import React from 'react';
import { dispatcher } from 'lander-engine/core';

interface PricingFeature {
  name: string;
  included: boolean;
}

interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: PricingFeature[];
  ctaText: string;
  isPopular?: boolean;
  onCtaClick?: any[];
}

interface PricingTableProps {
  title?: string;
  subtitle?: string;
  tiers?: PricingTier[];
}

export default function PricingTable({
  title = "Simple, transparent pricing",
  subtitle = "No hidden fees. No surprise charges.",
  tiers = []
}: PricingTableProps) {

  const handleCtaClick = (action: any[]) => {
    if (action) dispatcher.dispatch(action);
  };

  const defaultTiers: PricingTier[] = [
    {
      name: "Starter",
      price: "$29",
      description: "Perfect for individuals and small projects.",
      features: [
        { name: "Up to 5 Projects", included: true },
        { name: "Basic Analytics", included: true },
        { name: "24-hour Support Response", included: true },
        { name: "Custom Domains", included: false }
      ],
      ctaText: "Get Started"
    },
    {
      name: "Pro",
      price: "$79",
      description: "Ideal for growing teams and businesses.",
      isPopular: true,
      features: [
        { name: "Unlimited Projects", included: true },
        { name: "Advanced Analytics", included: true },
        { name: "1-hour Support Response", included: true },
        { name: "Custom Domains", included: true }
      ],
      ctaText: "Start Free Trial"
    }
  ];

  const displayTiers = tiers.length > 0 ? tiers : defaultTiers;

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            {title}
          </h2>
          <p className="text-xl text-gray-600 font-light">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-center">
          {displayTiers.map((tier, idx) => (
            <div
              key={idx}
              className={`relative bg-white rounded-3xl p-8 border ${tier.isPopular ? 'border-[var(--color-primary)] shadow-2xl scale-105 z-10' : 'border-gray-200 shadow-lg'}`}
            >
              {tier.isPopular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-[var(--color-primary)] text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                <p className="text-gray-500 text-sm h-10">{tier.description}</p>
              </div>

              <div className="mb-8 flex items-baseline">
                <span className="text-5xl font-extrabold text-gray-900">{tier.price}</span>
                <span className="text-gray-500 ml-2">/mo</span>
              </div>

              <ul className="mb-8 space-y-4">
                {tier.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center">
                    <span className={`mr-3 ${feature.included ? 'text-green-500' : 'text-gray-300'}`}>
                      {feature.included ? (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                      ) : (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                      )}
                    </span>
                    <span className={feature.included ? 'text-gray-700' : 'text-gray-400 line-through'}>{feature.name}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleCtaClick(tier.onCtaClick || [])}
                className={`w-full py-4 rounded-xl font-bold transition-all duration-300 ${tier.isPopular ? 'bg-[var(--color-primary)] text-white hover:bg-blue-700 shadow-md' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}
              >
                {tier.ctaText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
