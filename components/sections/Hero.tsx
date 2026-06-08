'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const [videoActive, setVideoActive] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Setup intersection observer to pause video when out of view (Performance Rule)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (videoRef.current) {
            if (entry.isIntersecting) {
              videoRef.current.play().catch(() => {});
            } else {
              videoRef.current.pause();
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Check if video file is present (or simulate it, otherwise fall back to image poster)
    // Here we'll try to load the video and fallback gracefully if it's missing or blocked
    if (videoRef.current) {
      videoRef.current.addEventListener('canplay', () => {
        setVideoActive(true);
      });
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Framer Motion Animation Variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const, // ease-out-expo
      },
    },
  };

  return (
    <section
      ref={containerRef}
      role="banner"
      aria-label="The Nest Cafe Hero Section"
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-sage-950"
    >
      {/* Skip to Content Link for Accessibility */}
      <a
        href="#menu-explorer"
        className="absolute top-4 left-4 z-50 bg-cream-100 text-sage-900 text-xs font-semibold px-4 py-2 rounded border border-sage-200 opacity-0 focus:opacity-100 transition-opacity focus:outline-none"
      >
        Skip to content
      </a>

      {/* Video Background / Image Poster Fallback */}
      <div className="absolute inset-0 w-full h-full select-none pointer-events-none">
        <Image
          src="/images/hero-bg.png"
          alt="The Nest café warm ambient interior"
          fill
          priority
          className={`object-cover object-center transition-opacity duration-1000 ${
            videoActive ? 'opacity-0' : 'opacity-100'
          }`}
          sizes="100vw"
        />
        
        {/* HTML5 Video */}
        {!shouldReduceMotion && (
          <video
            ref={videoRef}
            src="/videos/hero.mp4"
            poster="/images/hero-bg.png"
            muted
            loop
            playsInline
            autoPlay
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              videoActive ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}
      </div>

      {/* Modern Premium Overlay (Blur + Dark Green Gradient) */}
      <div className="absolute inset-0 bg-gradient-to-t from-sage-950/90 via-sage-950/45 to-sage-950/60 backdrop-blur-[1.5px] z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-[1400px] w-full mx-auto px-6 md:px-12 flex flex-col items-center text-center text-cream-50">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6 max-w-3xl"
        >
          {/* Subtitle */}
          <motion.span
            variants={itemVariants}
            className="text-fluid-overline font-semibold text-sage-300 tracking-[0.25em]"
          >
            The Nest Café
          </motion.span>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="font-serif text-5xl md:text-7xl font-bold tracking-tight text-cream-50 leading-[1.05]"
          >
            Feels Like Home.
          </motion.h1>

          <motion.div
            variants={itemVariants}
            className="w-16 h-[2px] bg-sage-400/50 rounded-full"
          />

          {/* Body Copy */}
          <motion.p
            variants={itemVariants}
            className="text-fluid-body text-sage-200/90 font-light max-w-xl leading-relaxed"
          >
            A cozy café tucked away in Bandra, serving comfort food, specialty coffee, and slow, peaceful moments.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto"
          >
            <Link
              href="/menu"
              className="bg-cream-100 hover:bg-cream-50 text-sage-950 text-xs font-bold uppercase tracking-wider py-4 px-8 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
            >
              Explore Menu
            </Link>
            <Link
              href="#philosophy"
              className="bg-transparent hover:bg-cream-100/10 text-cream-50 border border-cream-100/30 text-xs font-bold uppercase tracking-wider py-4 px-8 rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Our Philosophy
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-sage-400 select-none cursor-pointer"
      >
        <span className="text-[9px] uppercase tracking-[0.2em] font-semibold">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ArrowDown size={14} className="text-sage-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
