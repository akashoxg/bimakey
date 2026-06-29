import React from 'react';
import { Quote } from 'lucide-react';
import { TESTIMONIALS } from '../../utils/constants';
import ScoreStars from '../shared/ScoreStars';
import SectionHeader from '../shared/SectionHeader';
import AnimatedCounter from '../ui/animated-counter';

const planColors = {
  'Health Insurance': { bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-100' },
  'Term Life Insurance': { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-100' },
  'Motor Insurance': { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100' },
};

const Testimonials = () => {
  // Repeat testimonials multiple times to ensure a seamless infinite loop
  const repeatedTestimonials = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="py-20 md:py-28 bg-brand-white overflow-hidden">
      <div className="max-w-container mx-auto px-4 md:px-8 mb-12">
        <SectionHeader
          eyebrow="Real Stories"
          title={
            <span>
              Trusted by <AnimatedCounter end={10000} formatAsK={false} suffix="+" /> Families
            </span>
          }
          align="left"
          className="mb-0"
        />
      </div>

      {/* Infinite Horizontal Floating Marquee */}
      <div className="relative w-full overflow-hidden py-4">
        {/* Gradient edge masks for smooth fade in/out on left and right */}
        <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-r from-brand-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-l from-brand-white to-transparent z-10 pointer-events-none" />

        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] gap-6 px-3 will-change-transform">
          {repeatedTestimonials.map((testimonial, index) => {
            const colors = planColors[testimonial.plan] || planColors['Health Insurance'];
            const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=1B6B5A&color=fff&size=80&font-size=0.4&bold=true`;

            return (
              <div
                key={index}
                className="w-[320px] md:w-[380px] flex-shrink-0"
              >
                <div className="bg-white p-7 rounded-2xl shadow-soft hover:shadow-card transition-all duration-300 h-full border border-gray-100 flex flex-col relative overflow-hidden group hover:-translate-y-1">
                  <div className={`absolute top-0 left-0 right-0 h-1 ${colors.bg} opacity-80 group-hover:opacity-100 transition-opacity duration-300`} aria-hidden="true" />

                  <div className="flex items-center justify-between mb-5">
                    <ScoreStars rating={testimonial.rating} size="sm" />
                    <Quote className="w-7 h-7 text-brand-teal/15 group-hover:text-brand-teal/30 transition-colors" aria-hidden="true" />
                  </div>

                  <p className="text-brand-text-secondary mb-7 flex-1 text-[15px] leading-relaxed">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>

                  <div className="border-t border-gray-100 pt-5 mt-auto flex items-center gap-3">
                    <img
                      src={avatarUrl}
                      alt=""
                      width="40"
                      height="40"
                      className="w-10 h-10 rounded-full object-cover shadow-sm"
                      loading="lazy"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-brand-navy text-sm truncate">{testimonial.name}</p>
                      <p className="text-xs text-brand-text-secondary truncate">{testimonial.city}</p>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full ${colors.bg} ${colors.text} font-semibold whitespace-nowrap`}>
                      {testimonial.plan}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
