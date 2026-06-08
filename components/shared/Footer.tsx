'use client';

import Link from 'next/link';
import { ArrowUp, Instagram, MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-sage-900 text-sage-50 border-t border-sage-800">
      {/* Top Banner with back-to-top */}
      <div className="border-b border-sage-800 py-8 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <p className="text-xs uppercase tracking-widest text-sage-400">
            © {new Date().getFullYear()} The Nest Café. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center justify-center p-3 rounded-full bg-sage-800 hover:bg-sage-700 text-sage-200 hover:text-cream-50 transition-all duration-300 group hover:shadow-lg"
            aria-label="Scroll to top"
          >
            <ArrowUp size={16} className="transition-transform duration-300 group-hover:-translate-y-1" />
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-[1400px] mx-auto py-16 px-6 md:py-24 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Editorial Brand Profile */}
        <div className="flex flex-col gap-6">
          <Link href="/" className="flex flex-col">
            <span className="font-serif text-3xl font-bold tracking-wide text-cream-50">
              The Nest
            </span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-sage-400 mt-[-2px]">
              Bandra West
            </span>
          </Link>
          <p className="text-sm leading-relaxed text-sage-300">
            A cozy corner in Bandra serving comfort food, specialty coffee, and slow, meaningful moments. Designed as a digital and physical sanctuary.
          </p>
          <div className="flex items-center gap-4 mt-2">
            <a
              href="https://www.instagram.com/thenestbandra/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-sage-800 hover:bg-sage-600 text-sage-200 hover:text-cream-50 transition-colors duration-300"
              aria-label="Follow us on Instagram"
            >
              <Instagram size={16} />
            </a>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-sage-800 hover:bg-sage-600 text-sage-200 hover:text-cream-50 transition-colors duration-300"
              aria-label="View on Google Maps"
            >
              <MapPin size={16} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-6">
          <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-cream-50">Explore</h4>
          <nav className="flex flex-col gap-3">
            <Link href="/" className="text-sm text-sage-300 hover:text-cream-50 transition-colors duration-300">
              Home
            </Link>
            <Link href="/menu" className="text-sm text-sage-300 hover:text-cream-50 transition-colors duration-300">
              Menu Explorer
            </Link>
            <Link href="/events" className="text-sm text-sage-300 hover:text-cream-50 transition-colors duration-300">
              Private Events
            </Link>
            <Link href="/contact" className="text-sm text-sage-300 hover:text-cream-50 transition-colors duration-300">
              Contact & Map
            </Link>
          </nav>
        </div>

        {/* Contact details */}
        <div className="flex flex-col gap-6">
          <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-cream-50">Say Hello</h4>
          <div className="flex flex-col gap-4 text-sm text-sage-300">
            <div className="flex items-start gap-3">
              <MapPin size={16} className="text-sage-400 mt-1 shrink-0" />
              <span>123 Hill Road, Bandra West, Mumbai, Maharashtra 400050</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={16} className="text-sage-400 shrink-0" />
              <a href="tel:+912212345678" className="hover:text-cream-50 transition-colors">
                +91 22 1234 5678
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={16} className="text-sage-400 shrink-0" />
              <a href="mailto:hello@thenest.cafe" className="hover:text-cream-50 transition-colors">
                hello@thenest.cafe
              </a>
            </div>
          </div>
        </div>

        {/* Schedule / Opening hours & Newsletter */}
        <div className="flex flex-col gap-6">
          <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-cream-50">Hours</h4>
          <div className="flex items-start gap-3 text-sm text-sage-300">
            <Clock size={16} className="text-sage-400 mt-1 shrink-0" />
            <div>
              <p className="font-semibold text-cream-50">Open Daily</p>
              <p>8:00 AM – 11:00 PM</p>
              <p className="text-xs text-sage-400 mt-1">Kitchen closes at 10:30 PM</p>
            </div>
          </div>
          {/* Subtle Newsletter */}
          <div className="flex flex-col gap-3 mt-2">
            <p className="text-xs text-sage-400 uppercase tracking-wider">Join the Nest Club</p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="w-full bg-sage-800 border border-sage-700/60 rounded-full px-4 py-2 text-xs text-cream-50 focus:outline-none focus:border-sage-500 transition-colors"
                required
              />
              <button
                type="submit"
                className="bg-cream-100 text-sage-900 font-semibold px-4 py-2 rounded-full text-xs hover:bg-cream-50 transition-colors"
              >
                Join
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}
