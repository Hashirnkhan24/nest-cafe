'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Coffee, BookOpen, Leaf, Heart, Wind } from 'lucide-react';

export default function Philosophy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const trigger = triggerRef.current;
    const container = containerRef.current;

    if (!trigger || !container) return;

    // Create GSAP Timeline for the scroll-tied assembly animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: trigger,
        start: 'top top',
        end: '+=300%', // Scroll distance to complete all steps
        pin: true,
        scrub: 1.2,
        snap: {
          snapTo: [0, 0.25, 0.5, 0.75, 1], // Snap to stages
          duration: { min: 0.2, max: 0.6 },
          ease: 'power2.inOut',
        },
      },
    });

    // Animate stage elements sequentially
    tl
      // Initial Stage: The Room
      .to('.room-bg', { opacity: 0.15, scale: 1.05, duration: 1 })
      .to('.text-stage-1', { opacity: 0, y: -20, duration: 0.5 }, '+=0.2')

      // Stage 2: Coffee
      .addLabel('coffee')
      .to('.text-stage-2', { opacity: 1, y: 0, duration: 0.8 }, 'coffee')
      .to('.coffee-mug', { opacity: 1, y: 0, rotate: 0, scale: 1.1, duration: 1, ease: 'back.out(1.7)' }, 'coffee')
      .to('.steam-line', { strokeDashoffset: 0, opacity: 0.8, duration: 1, stagger: 0.2 }, 'coffee+=0.3')
      .to('.text-stage-2', { opacity: 0, y: -20, duration: 0.5 }, '+=1')

      // Stage 3: Books
      .addLabel('books')
      .to('.text-stage-3', { opacity: 1, y: 0, duration: 0.8 }, 'books')
      .to('.books-stack', { opacity: 1, x: 0, y: 0, rotate: -5, duration: 1, ease: 'power3.out' }, 'books')
      .to('.book-open', { opacity: 0.8, scale: 1.05, rotate: 12, duration: 0.8 }, 'books+=0.4')
      .to('.text-stage-3', { opacity: 0, y: -20, duration: 0.5 }, '+=1')

      // Stage 4: Plants
      .addLabel('plants')
      .to('.text-stage-4', { opacity: 1, y: 0, duration: 0.8 }, 'plants')
      .to('.plant-leaf-1', { opacity: 1, scale: 1, rotate: 0, duration: 0.8, ease: 'elastic.out(1, 0.5)' }, 'plants')
      .to('.plant-leaf-2', { opacity: 1, scale: 1, rotate: 15, duration: 0.8, ease: 'elastic.out(1, 0.5)' }, 'plants+=0.2')
      .to('.plant-leaf-3', { opacity: 1, scale: 1, rotate: -25, duration: 0.8, ease: 'elastic.out(1, 0.5)' }, 'plants+=0.4')
      .to('.text-stage-4', { opacity: 0, y: -20, duration: 0.5 }, '+=1')

      // Stage 5: Final Connection Message
      .addLabel('message')
      .to('.text-stage-5', { opacity: 1, y: 0, duration: 0.8 }, 'message')
      .to('.final-heart', { opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.7)' }, 'message');

    return () => {
      // Kill all scroll triggers associated with this component
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === trigger) t.kill();
      });
    };
  }, []);

  return (
    <div ref={triggerRef} id="philosophy" className="relative h-screen bg-sage-950 overflow-hidden select-none">
      {/* Dynamic ambient grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(248,245,239,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(248,245,239,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="h-full w-full max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 items-center gap-12 relative z-10">
        {/* Left Side: Assembly Canvas */}
        <div className="col-span-1 lg:col-span-6 flex items-center justify-center h-[50vh] lg:h-[70vh] relative">
          <div className="w-full max-w-[420px] aspect-square rounded-[2rem] border border-sage-800 bg-sage-900/50 backdrop-blur-sm relative overflow-hidden flex items-center justify-center p-8 shadow-inner-lg">
            
            {/* Visual Assembly Layers */}
            {/* Layer 1: Pinned Background room effect (glowing overlay) */}
            <div className="room-bg absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(110,139,126,0.35)_0%,transparent_70%)] opacity-0 scale-90 transition-all duration-700 pointer-events-none" />

            {/* Layer 2: Coffee Setup */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="coffee-mug opacity-0 translate-y-20 rotate-12 scale-75 transition-all duration-500 flex flex-col items-center">
                {/* Steaming Coffee Cup Vector */}
                <svg width="100" height="80" viewBox="0 0 100 80" className="text-cream-200 fill-none stroke-current stroke-2">
                  {/* Steam lines */}
                  <path d="M35,-5 C35,-15 45,-15 45,-25" className="steam-line opacity-0" strokeDasharray="30" strokeDashoffset="30" />
                  <path d="M50,-8 C50,-20 60,-20 60,-32" className="steam-line opacity-0" strokeDasharray="30" strokeDashoffset="30" />
                  <path d="M65,-5 C65,-12 55,-18 55,-28" className="steam-line opacity-0" strokeDasharray="30" strokeDashoffset="30" />
                  {/* Cup Body */}
                  <path d="M25,20 L75,20 C75,50 65,65 50,65 C35,65 25,50 25,20 Z" fill="currentColor" className="text-sage-800/60" />
                  <path d="M25,20 L75,20 C75,50 65,65 50,65 C35,65 25,50 25,20 Z" />
                  {/* Cup handle */}
                  <path d="M75,28 C85,28 90,35 88,42 C86,48 80,50 74,48" />
                  {/* Plate saucer */}
                  <path d="M15,69 L85,69 C85,73 70,75 50,75 C30,75 15,73 15,69 Z" />
                </svg>
                <span className="text-[10px] uppercase tracking-widest text-sage-300 font-semibold mt-3">Single-Origin Brew</span>
              </div>
            </div>

            {/* Layer 3: Reading Books Stack */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="books-stack opacity-0 -translate-x-20 translate-y-10 scale-90 transition-all duration-700 flex flex-col items-center">
                <div className="relative">
                  {/* Flat book stack drawing */}
                  <div className="w-32 h-6 bg-sage-800 border border-sage-700 rounded shadow-md transform rotate-1 translate-y-4" />
                  <div className="w-28 h-5 bg-beige-200 border border-beige-300 rounded shadow transform -rotate-3 translate-y-1 translate-x-2" />
                  <div className="w-30 h-6 bg-sage-600 border border-sage-500 rounded shadow transform rotate-2 -translate-y-2 -translate-x-1 flex items-center justify-center">
                    <BookOpen size={14} className="text-cream-50 book-open opacity-0 scale-75 transition-all duration-300" />
                  </div>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-sage-300 font-semibold mt-8">Curated Library</span>
              </div>
            </div>

            {/* Layer 4: Floating Plants */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative w-full h-full">
                {/* Botanical leaves framing the corner */}
                <Leaf size={48} className="plant-leaf-1 absolute top-6 left-6 text-sage-500 opacity-0 scale-50 -rotate-45 origin-top-left transition-all duration-500" />
                <Leaf size={64} className="plant-leaf-2 absolute bottom-6 right-6 text-sage-400 opacity-0 scale-50 rotate-90 origin-bottom-right transition-all duration-500" />
                <Leaf size={36} className="plant-leaf-3 absolute top-12 right-12 text-sage-600 opacity-0 scale-50 -rotate-12 origin-top-right transition-all duration-500" />
              </div>
            </div>

            {/* Layer 5: Heart */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <Heart size={48} className="final-heart text-sage-400 opacity-0 scale-50 transition-all duration-700" />
            </div>

          </div>
        </div>

        {/* Right Side: Narrative Panel */}
        <div className="col-span-1 lg:col-span-6 h-[40vh] lg:h-[60vh] flex flex-col items-start justify-center relative">
          
          {/* Stage 1 Text: Introduction */}
          <div className="text-stage-1 absolute inset-0 flex flex-col justify-center gap-4">
            <span className="text-xs uppercase tracking-[0.2em] text-sage-400 font-bold">01 / The Sanctuary</span>
            <h2 className="font-serif text-3xl md:text-5xl text-cream-50 leading-tight">
              A space designed <br />to let you slow down.
            </h2>
            <p className="text-sm md:text-base text-sage-300 font-light leading-relaxed max-w-md">
              In a city that moves at lightning speed, The Nest is a deliberate pause. A sanctuary built with natural textures, quiet corners, and soft daylight to ground you.
            </p>
          </div>

          {/* Stage 2 Text: Coffee */}
          <div className="text-stage-2 absolute inset-0 flex flex-col justify-center gap-4 opacity-0 translate-y-8">
            <span className="text-xs uppercase tracking-[0.2em] text-sage-400 font-bold">02 / The Roast</span>
            <h2 className="font-serif text-3xl md:text-5xl text-cream-50 leading-tight">
              Crafted slow. <br />Poured with care.
            </h2>
            <p className="text-sm md:text-base text-sage-300 font-light leading-relaxed max-w-md">
              Our single-origin beans are sourced responsibly and roasted locally. Each pour-over is a ritual of patience, yielding clean, delicate flavor profiles.
            </p>
          </div>

          {/* Stage 3 Text: Books */}
          <div className="text-stage-3 absolute inset-0 flex flex-col justify-center gap-4 opacity-0 translate-y-8">
            <span className="text-xs uppercase tracking-[0.2em] text-sage-400 font-bold">03 / The Stories</span>
            <h2 className="font-serif text-3xl md:text-5xl text-cream-50 leading-tight">
              Turn the page, <br />stay a while.
            </h2>
            <p className="text-sm md:text-base text-sage-300 font-light leading-relaxed max-w-md">
              Our micro-library features curated fiction, architectural journals, and coffee-table collections. Grab a book, find a corner, and escape for an hour or three.
            </p>
          </div>

          {/* Stage 4 Text: Flora */}
          <div className="text-stage-4 absolute inset-0 flex flex-col justify-center gap-4 opacity-0 translate-y-8">
            <span className="text-xs uppercase tracking-[0.2em] text-sage-400 font-bold">04 / The Flora</span>
            <h2 className="font-serif text-3xl md:text-5xl text-cream-50 leading-tight">
              Surrounded by <br />living breathing green.
            </h2>
            <p className="text-sm md:text-base text-sage-300 font-light leading-relaxed max-w-md">
              Indoor plants are at the heart of our design. Fresh Monstera leaves, hanging vines, and potted ferns enrich the air and create a breathing, organic environment.
            </p>
          </div>

          {/* Stage 5 Text: Connection */}
          <div className="text-stage-5 absolute inset-0 flex flex-col justify-center gap-4 opacity-0 translate-y-8">
            <span className="text-xs uppercase tracking-[0.2em] text-sage-400 font-bold">05 / The Nest</span>
            <h2 className="font-serif text-3xl md:text-5xl text-cream-50 leading-tight">
              A physical extension <br />of home.
            </h2>
            <p className="text-sm md:text-base text-sage-300 font-light leading-relaxed max-w-md">
              More than a café, we are a neighborhood nest. A place to work, to meet, to dream, or to simply exist. We can’t wait to welcome you.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
