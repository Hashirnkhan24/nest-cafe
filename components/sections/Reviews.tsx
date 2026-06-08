'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Review {
  id: string;
  name: string;
  rating: number;
  content: string;
  source: string;
  date: string;
}

export default function Reviews() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const reviews: Review[] = [
    {
      id: 'rev-1',
      name: 'Rohan Sharma',
      rating: 5,
      content: 'The Nest is hands down the best place in Bandra to read or get work done. Their manual pour-overs are incredibly clean and the sourdough toast is delicious.',
      source: 'Google Review',
      date: '2 weeks ago',
    },
    {
      id: 'rev-2',
      name: 'Anjali Desai',
      rating: 5,
      content: 'I love the botanical aesthetic here. It feels like a greenhouse. The staff is polite, and the atmosphere is so calm and quiet compared to other cafes.',
      source: 'Google Review',
      date: '1 month ago',
    },
    {
      id: 'rev-3',
      name: 'Kabir Mehta',
      rating: 5,
      content: 'Incredibly good coffee. You can tell they take their beans seriously. The cinnamon rolls are fresh out of the oven, and the workspace seats are very comfortable.',
      source: 'Google Review',
      date: '3 weeks ago',
    },
    {
      id: 'rev-4',
      name: 'Meera Sen',
      rating: 5,
      content: 'A beautiful sanctuary. I spent three hours reading a design book from their library while sipping an iced latte. Will definitely make this my weekend ritual.',
      source: 'Google Review',
      date: '5 days ago',
    },
  ];

  // Auto-advance logic (from blueprint: auto-advance every 6 seconds, pauses on hover)
  useEffect(() => {
    if (isHovered) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      handleNext();
    }, 6000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activeIndex, isHovered]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      id="reviews"
      className="py-24 bg-cream-50 relative z-20 border-b border-border-subtle"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background radial accent */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(110,139,126,0.04)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col gap-12 items-center">
        {/* Section Header */}
        <div className="flex flex-col gap-4 text-center max-w-xl">
          <span className="text-xs uppercase tracking-[0.2em] text-sage-600 font-bold">Testimonials</span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-text-primary tracking-tight">
            Patron Reviews
          </h2>
        </div>

        {/* Carousel Card Container */}
        <div className="w-full max-w-3xl relative min-h-[280px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="bg-cream-100 rounded-[2rem] border border-border-subtle p-8 md:p-12 shadow-md w-full relative flex flex-col gap-6"
            >
              {/* Quote Mark Icon */}
              <Quote className="absolute top-8 left-8 text-sage-200/50 w-16 h-16 pointer-events-none" />

              {/* Stars */}
              <div className="flex items-center gap-1 text-amber-500 relative z-10">
                {Array.from({ length: reviews[activeIndex].rating }).map((_, idx) => (
                  <Star key={idx} size={16} className="fill-current" />
                ))}
              </div>

              {/* Review Content */}
              <p className="font-serif text-lg md:text-2xl text-text-primary italic leading-relaxed relative z-10 text-justify">
                "{reviews[activeIndex].content}"
              </p>

              {/* Reviewer Details */}
              <div className="flex justify-between items-center border-t border-border-subtle/60 pt-6 mt-2 relative z-10">
                <div>
                  <h4 className="font-bold text-sm text-text-primary">{reviews[activeIndex].name}</h4>
                  <p className="text-xs text-text-muted">
                    {reviews[activeIndex].source} • {reviews[activeIndex].date}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 hidden md:flex justify-between px-4 pointer-events-none">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full bg-cream-100 border border-border-subtle shadow-md hover:bg-sage-50 text-sage-700 hover:text-sage-800 transition-colors pointer-events-auto"
              aria-label="Previous review"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-cream-100 border border-border-subtle shadow-md hover:bg-sage-50 text-sage-700 hover:text-sage-800 transition-colors pointer-events-auto"
              aria-label="Next review"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Indicator dots */}
        <div className="flex items-center gap-2 mt-2">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === activeIndex ? 'bg-sage-600 w-6' : 'bg-sage-300 hover:bg-sage-400'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
