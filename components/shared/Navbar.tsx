'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '/menu' },
    { name: 'Events', href: '/events' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-cream-50/90 backdrop-blur-md py-4 border-b border-border-subtle shadow-sm'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex flex-col">
            <span className="font-serif text-2xl md:text-3xl font-bold tracking-wide text-sage-800 transition-colors duration-300 group-hover:text-sage-600">
              The Nest
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-text-muted mt-[-2px] transition-colors duration-300 group-hover:text-sage-500">
              Bandra West
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative text-xs uppercase tracking-[0.15em] font-semibold text-text-primary hover:text-sage-600 transition-colors duration-300 py-2"
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-sage-500 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link
              href="/#reserve"
              className="hidden sm:inline-flex items-center gap-2 bg-sage-600 hover:bg-sage-700 text-cream-50 text-xs uppercase tracking-wider font-semibold py-3 px-6 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
            >
              Book a Table
              <ArrowRight size={14} className="text-sage-200" />
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-text-primary hover:text-sage-600 md:hidden transition-colors duration-300"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-[76px] z-30 bg-cream-50/95 backdrop-blur-lg border-b border-border-subtle p-6 flex flex-col gap-6 md:hidden shadow-lg"
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-sm uppercase tracking-wider font-semibold py-2 border-b border-border-subtle/40 ${
                    pathname === link.href ? 'text-sage-600 font-bold' : 'text-text-primary'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <Link
              href="/#reserve"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-sage-600 hover:bg-sage-700 text-cream-50 text-xs uppercase tracking-wider font-semibold py-4 rounded-full transition-all"
            >
              Book a Table
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
