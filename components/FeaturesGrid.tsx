import React from 'react';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface FeaturesGridProps {
  title?: string;
  subtitle?: string;
  features?: Feature[];
}

export default function FeaturesGrid({
  title = "Powerful Features",
  subtitle = "Everything you need to scale your business",
  features = []
}: FeaturesGridProps) {

  const defaultFeatures: Feature[] = [
    {
      icon: '🚀',
      title: 'High Performance',
      description: 'Lightning fast load times that keep your users engaged and reduce bounce rates.'
    },
    {
      icon: '🛡️',
      title: 'Enterprise Security',
      description: 'Bank-grade encryption and security protocols to keep your data safe.'
    },
    {
      icon: '📊',
      title: 'Advanced Analytics',
      description: 'Gain valuable insights with our comprehensive dashboard and reporting tools.'
    }
  ];

  const displayFeatures = features.length > 0 ? features : defaultFeatures;

  return (
    <section className="py-24 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            {title}
          </h2>
          <p className="text-xl text-gray-600 font-light">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayFeatures.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-100 transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-blue-50 text-3xl rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
