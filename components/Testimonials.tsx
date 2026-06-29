import React from 'react';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatarUrl?: string;
}

interface TestimonialsProps {
  title?: string;
  subtitle?: string;
  testimonials?: Testimonial[];
}

export default function Testimonials({
  title = "Trusted by innovative teams",
  subtitle = "See what our customers have to say about SaaSify.",
  testimonials = []
}: TestimonialsProps) {

  const defaultTestimonials: Testimonial[] = [
    {
      quote: "This platform has fundamentally changed how we operate. We're moving faster and breaking fewer things.",
      author: "Jane Doe",
      role: "Engineering Manager"
    },
    {
      quote: "The return on investment was apparent within the first week. Highly recommended for any growing startup.",
      author: "John Smith",
      role: "Founder & CEO"
    },
    {
      quote: "Incredibly intuitive interface and powerful features under the hood. A joy to use every day.",
      author: "Alex Chen",
      role: "Product Designer"
    }
  ];

  const displayTestimonials = testimonials.length > 0 ? testimonials : defaultTestimonials;

  return (
    <section className="py-24 px-6 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">
            {title}
          </h2>
          <p className="text-xl text-gray-400 font-light">
            {subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayTestimonials.map((testimonial, idx) => (
            <div 
              key={idx}
              className="bg-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-gray-500 transition-colors duration-300"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              <blockquote className="text-lg text-gray-300 mb-8 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>
              
              <div className="flex items-center gap-4">
                {testimonial.avatarUrl ? (
                  <img src={testimonial.avatarUrl} alt={testimonial.author} className="w-12 h-12 rounded-full object-cover bg-gray-700" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.author.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="font-bold text-white">{testimonial.author}</p>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
