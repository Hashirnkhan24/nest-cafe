'use client';

import Image from 'next/image';
import { Tag, Sparkles, ArrowRight } from 'lucide-react';

interface Combo {
  id: string;
  name: string;
  tagline: string;
  items: string[];
  totalPrice: number;
  originalPrice: number;
  savings: number;
  imageLeft: string;
  imageRight: string;
  bestFor: 'breakfast' | 'lunch' | 'evening' | 'anytime';
}

export default function Combos() {
  const combos: Combo[] = [
    {
      id: 'morning-nest',
      name: 'The Morning Nest',
      tagline: 'Start your day right',
      items: ['Single-Origin Pour-Over (₹260)', 'Avocado Sourdough Toast (₹530)'],
      totalPrice: 690,
      originalPrice: 790,
      savings: 100,
      imageLeft: '/images/exp-coffee.png',
      imageRight: '/images/exp-food.png',
      bestFor: 'breakfast',
    },
    {
      id: 'midday-escape',
      name: 'The Midday Escape',
      tagline: 'Re-energize your afternoon',
      items: ['Signature Cold Coffee (₹370)', 'Truffle Mushroom Fettuccine (₹565)'],
      totalPrice: 815,
      originalPrice: 935,
      savings: 120,
      imageLeft: '/images/exp-coffee.png',
      imageRight: '/images/exp-food.png',
      bestFor: 'lunch',
    },
    {
      id: 'sundown-slow',
      name: 'The Sundown Slow',
      tagline: 'Wind down the day',
      items: ['Egyptian Chamomile Tea (₹290)', 'Skillet Chocolate Chip Cookie (₹350)'],
      totalPrice: 560,
      originalPrice: 640,
      savings: 80,
      imageLeft: '/images/exp-coffee.png',
      imageRight: '/images/exp-food.png',
      bestFor: 'evening',
    },
  ];

  return (
    <section id="combos" className="py-24 bg-cream-50 relative z-20 border-b border-border-subtle overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col gap-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-4 max-w-xl">
            <span className="text-xs uppercase tracking-[0.2em] text-sage-600 font-bold">Chef's Combos</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-text-primary tracking-tight">
              Nest Recommends
            </h2>
            <p className="text-sm md:text-base text-text-secondary font-light leading-relaxed">
              Curated pairings crafted to elevate your daily routine, serving you the perfect balance of food and craft.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs uppercase tracking-wider text-sage-600 font-semibold cursor-pointer group hover:text-sage-700 transition-colors">
            View full pairings <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </div>
        </div>

        {/* Horizontal Carousel (Mobile) and Grid (Desktop) */}
        <div className="flex overflow-x-auto md:grid md:grid-cols-3 gap-8 pb-6 md:pb-0 snap-x snap-mandatory scrollbar-none -mx-6 px-6 md:mx-0 md:px-0">
          {combos.map((combo) => (
            <div
              key={combo.id}
              className="bg-cream-100 rounded-[2rem] border border-border-subtle p-6 flex flex-col justify-between aspect-[3/4.2] snap-start shrink-0 w-[85vw] sm:w-[350px] md:w-auto relative group hover:shadow-xl hover:border-sage-300/60 transition-all duration-500 ease-out-expo"
            >
              {/* Savings Badge */}
              <div className="absolute top-4 right-4 z-20 bg-sage-600 text-cream-50 text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm">
                <Tag size={10} />
                Save ₹{combo.savings}
              </div>

              {/* Visual Panel: Stacked Items with translateY offsets */}
              <div className="relative w-full h-[180px] bg-cream-50 border border-border-subtle/50 rounded-2xl overflow-hidden mb-6 flex items-center justify-center">
                {/* Background atmosphere ring */}
                <div className="absolute inset-0 bg-radial-from-center from-sage-100/40 via-transparent to-transparent pointer-events-none" />

                {/* Left Stacked Image */}
                <div className="absolute left-10 w-24 h-24 rounded-2xl overflow-hidden border-2 border-cream-50 shadow-md transform rotate-[-8deg] -translate-y-2 group-hover:translate-y-[-6px] transition-transform duration-500">
                  <Image
                    src={combo.imageLeft}
                    alt="Beverage"
                    fill
                    sizes="100px"
                    className="object-cover"
                  />
                </div>

                {/* Plus Icon Divider */}
                <div className="absolute z-10 w-8 h-8 rounded-full bg-cream-100 border border-border-subtle shadow-sm flex items-center justify-center text-sage-600 font-bold text-lg select-none">
                  +
                </div>

                {/* Right Stacked Image */}
                <div className="absolute right-10 w-24 h-24 rounded-2xl overflow-hidden border-2 border-cream-50 shadow-md transform rotate-[6deg] translate-y-3 group-hover:translate-y-[6px] transition-transform duration-500">
                  <Image
                    src={combo.imageRight}
                    alt="Food"
                    fill
                    sizes="100px"
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Combo Info */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-sage-600 flex items-center gap-1">
                    <Sparkles size={10} />
                    Best for {combo.bestFor}
                  </span>
                  <h3 className="font-serif text-xl md:text-2xl font-bold text-text-primary tracking-wide">
                    {combo.name}
                  </h3>
                  <p className="text-xs text-text-muted italic">{combo.tagline}</p>
                </div>

                {/* Bullets */}
                <ul className="text-xs text-text-secondary flex flex-col gap-2 font-light border-t border-border-subtle/60 pt-4">
                  {combo.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-sage-500" />
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Pricing Block */}
                <div className="flex items-end justify-between border-t border-border-subtle/60 pt-4 mt-2">
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase tracking-wider text-text-muted">Total Price</span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-2xl font-bold text-sage-700">₹{combo.totalPrice}</span>
                      <span className="text-xs line-through text-text-muted">₹{combo.originalPrice}</span>
                    </div>
                  </div>
                  <button className="bg-sage-600 hover:bg-sage-700 text-cream-50 font-semibold text-[10px] uppercase tracking-widest px-4 py-2.5 rounded-full shadow-sm transition-colors duration-300">
                    Order Combo
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
