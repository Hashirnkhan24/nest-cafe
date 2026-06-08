'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface SpaceCategory {
  id: string;
  label: string;
  tagline: string;
  description: string;
  image: string;
}

export default function Gallery() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const spaces: SpaceCategory[] = [
    {
      id: 'work',
      label: 'Work',
      tagline: 'Deep Focus Sanctuary',
      description: 'Ergonomic study chairs, dedicated power sockets, and high-speed fiber internet designed for productivity.',
      image: '/images/exp-work.png',
    },
    {
      id: 'meet',
      label: 'Meet',
      tagline: 'Collaboration Corners',
      description: 'Spacious shared tables and quiet modular booths for group discussion, catch-ups, and collaborative ideas.',
      image: '/images/hero-bg.png',
    },
    {
      id: 'relax',
      label: 'Relax',
      tagline: 'Sunlit Window Couches',
      description: 'Lounge seating facing our indoor botanical garden. The perfect corner to sip a slow brew and let your mind wander.',
      image: '/images/room-bg.png',
    },
    {
      id: 'read',
      label: 'Read',
      tagline: 'Our Micro-Library',
      description: 'A curated collection of novels, independent magazines, and art journals. Pull a book and escape the noise.',
      image: '/images/exp-coffee.png',
    },
    {
      id: 'create',
      label: 'Create',
      tagline: 'Creative Corners',
      description: 'Bright workspace illuminated by soft natural light, perfect for sketching, writing, and inspiration.',
      image: '/images/exp-food.png',
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const wrapper = wrapperRef.current;
    const track = trackRef.current;

    if (!wrapper || !track) return;

    // GSAP ScrollTrigger to translate vertical scroll to horizontal offset
    const tween = gsap.to(track, {
      x: () => -(track.scrollWidth - window.innerWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: wrapper,
        pin: true,
        scrub: 1,
        start: 'top top',
        end: () => `+=${track.scrollWidth - window.innerWidth}`,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative bg-sage-950 overflow-hidden">
      {/* Scroll indicator overlay */}
      <div className="absolute top-8 left-6 md:left-12 z-20 flex flex-col gap-1">
        <span className="text-[10px] uppercase tracking-[0.25em] text-sage-400 font-semibold">The Space</span>
        <h2 className="font-serif text-2xl md:text-3xl text-cream-50 font-bold">Explore Our Corners</h2>
      </div>

      <div className="absolute bottom-8 right-6 md:right-12 z-20 hidden md:flex items-center gap-3 text-sage-400 text-xs uppercase tracking-wider">
        <span>Scroll Down to Slide</span>
        <span className="w-12 h-[1px] bg-sage-500" />
      </div>

      {/* Horizontal scrolling container */}
      <div ref={trackRef} className="flex h-screen w-max items-center">
        {spaces.map((space) => (
          <div
            key={space.id}
            className="gallery-section relative h-screen w-screen flex flex-col justify-end p-8 md:p-24 overflow-hidden shrink-0 border-r border-sage-900/40"
          >
            {/* Background Image with subtle zoom/parallax styling */}
            <div className="absolute inset-0 z-0">
              <Image
                src={space.image}
                alt={space.label}
                fill
                priority
                className="object-cover object-center"
                sizes="100vw"
              />
              {/* Premium overlay with backdrop blur for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-sage-950/95 via-sage-950/40 to-sage-950/20 backdrop-blur-[0.5px]" />
            </div>

            {/* Content overlay */}
            <div className="relative z-10 max-w-xl text-cream-50 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-xs uppercase tracking-[0.2em] text-sage-400 font-semibold">
                  [{space.label}]
                </span>
                <h3 className="font-serif text-3xl md:text-5xl font-bold leading-tight">
                  {space.tagline}
                </h3>
              </div>
              <p className="text-sm md:text-base font-light text-sage-200 leading-relaxed">
                {space.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
