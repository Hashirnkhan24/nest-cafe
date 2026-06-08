'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Ambience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const image = imageRef.current;
    const text = textRef.current;

    if (!section || !image || !text) return;

    // Timeline for background parallax & scale (GPU-composited via transform/will-change)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    tl.to(image, {
      yPercent: 12,
      scale: 1.12,
      filter: 'brightness(0.35)',
      ease: 'none',
    });

    // Fade-in text overlay gently
    gsap.fromTo(
      text,
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          end: 'top 20%',
          scrub: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === section) t.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[65vh] md:h-[80vh] w-full overflow-hidden flex items-center justify-center bg-sage-950"
    >
      {/* Background Parallax Image */}
      <div
        ref={imageRef}
        className="absolute inset-0 w-full h-[120%] -top-[10%] z-0 select-none pointer-events-none will-change-transform"
      >
        <Image
          src="/images/hero-bg.png"
          alt="The Nest Cafe warm aesthetic ambience"
          fill
          className="object-cover object-center filter brightness-50"
          sizes="100vw"
        />
        {/* Editorial color grade overlay */}
        <div className="absolute inset-0 bg-sage-950/20 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-sage-950/30 via-transparent to-sage-950/40" />
      </div>

      {/* Floating dust particles / subtle glow (Design Accent) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(110,139,126,0.15)_0%,transparent_60%)] pointer-events-none z-10 animate-pulse" />

      {/* Centered Editorial Quote */}
      <div
        ref={textRef}
        className="relative z-20 max-w-4xl mx-auto px-6 text-center text-cream-50 flex flex-col items-center gap-6"
      >
        <span className="text-[10px] uppercase tracking-[0.25em] text-sage-300 font-semibold">
          The Philosophy
        </span>
        <blockquote className="font-serif text-3xl md:text-5xl lg:text-6xl font-light italic leading-tight text-cream-50 max-w-3xl">
          “Luxury is in the space between the notes, in the slow pour of a fresh brew, in details that feel like home.”
        </blockquote>
        <div className="w-12 h-[1px] bg-sage-400" />
        <cite className="text-xs uppercase tracking-widest text-sage-300 not-italic font-semibold">
          — The Nest Cafe, Bandra West
        </cite>
      </div>
    </section>
  );
}
