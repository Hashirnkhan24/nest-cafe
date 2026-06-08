'use client';

import Image from 'next/image';
import { Coffee, Utensils, Laptop } from 'lucide-react';

export default function Experiences() {
  const experiences = [
    {
      id: 'coffee',
      title: 'Specialty Coffee',
      tagline: 'Single-Origin & Handcrafted',
      description: 'Slow-drip pour-overs and custom espresso profiles sourced from sustainable micro-lots.',
      image: '/images/exp-coffee.png',
      icon: Coffee,
    },
    {
      id: 'food',
      title: 'Comfort Food',
      tagline: 'Freshly Baked & Organic',
      description: 'Artisanal sourdough toast, seasonal pastas, and signature pastries baked daily in-house.',
      image: '/images/exp-food.png',
      icon: Utensils,
    },
    {
      id: 'work',
      title: 'Slow Co-Working',
      tagline: 'Connected & Inspiring',
      description: 'Equipped with fiber internet, accessible power outlets, and warm lighting to fuel your focus.',
      image: '/images/exp-work.png',
      icon: Laptop,
    },
  ];

  return (
    <section id="experiences" className="py-24 bg-cream-100 relative z-20 border-b border-border-subtle">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col gap-12">
        {/* Section Header */}
        <div className="flex flex-col gap-4 max-w-xl">
          <span className="text-xs uppercase tracking-[0.2em] text-sage-600 font-bold">The Offering</span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-text-primary tracking-tight">
            Signature Experiences
          </h2>
          <p className="text-sm md:text-base text-text-secondary font-light leading-relaxed">
            Every corner of The Nest is designed with intention. Choose your rhythm, grab a seat, and let us take care of the rest.
          </p>
        </div>

        {/* Grid Layout (auto-fit & minmax from blueprint) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {experiences.map((exp) => {
            const Icon = exp.icon;
            return (
              <div
                key={exp.id}
                className="group relative aspect-[4/3] w-full overflow-hidden rounded-[1.5rem] bg-cream-200 border border-border-subtle/40 shadow-sm cursor-pointer"
              >
                {/* Background Image with Hover Scale */}
                <Image
                  src={exp.image}
                  alt={exp.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />

                {/* Premium Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-sage-950/95 via-sage-950/40 to-transparent opacity-85 transition-opacity duration-500 group-hover:opacity-95 z-10" />

                {/* Hover Content container */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end z-20 text-cream-50">
                  <div className="flex flex-col gap-1">
                    {/* Icon + Tagline */}
                    <div className="flex items-center gap-2 text-sage-300 mb-1">
                      <Icon size={14} className="shrink-0" />
                      <span className="text-[10px] uppercase tracking-[0.15em] font-semibold">
                        {exp.tagline}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-xl md:text-2xl font-bold tracking-wide text-cream-50 leading-tight">
                      {exp.title}
                    </h3>

                    {/* Description - Slides up on hover */}
                    <p className="text-xs text-sage-200/90 font-light mt-2 max-w-[280px] leading-relaxed translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
