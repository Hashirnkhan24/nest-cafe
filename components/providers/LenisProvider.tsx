'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Update ScrollTrigger on Lenis scroll
    lenis.on('scroll', ScrollTrigger.update);

    // Tell GSAP ticker to run Lenis raf
    const gsapUpdate = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(gsapUpdate);
    gsap.ticker.lagSmoothing(0);

    // Cleanup on unmount
    return () => {
      gsap.ticker.remove(gsapUpdate);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
