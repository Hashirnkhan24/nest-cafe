'use client';

import { useState, useEffect } from 'react';
import { MapPin, Phone, MessageSquare, Clock, Map as MapIcon, HelpCircle } from 'lucide-react';

interface BusyStatus {
  currentStatus: 'not busy' | 'a little busy' | 'very busy';
  bestTimeToVisit: string;
  live: boolean;
}

export default function Location() {
  const [busyStatus, setBusyStatus] = useState<BusyStatus>({
    currentStatus: 'not busy',
    bestTimeToVisit: '2 PM - 5 PM',
    live: true,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Attempt to fetch from real API, fallback to mock after delay
    const fetchStatus = async () => {
      try {
        const res = await fetch('/api/busy-status');
        if (res.ok) {
          const data = await res.json();
          setBusyStatus(data);
        }
      } catch (err) {
        // Fallback mock (staggered states based on current hour)
        const hour = new Date().getHours();
        let status: 'not busy' | 'a little busy' | 'very busy' = 'not busy';
        if (hour >= 11 && hour <= 14) status = 'very busy';
        else if (hour >= 17 && hour <= 20) status = 'a little busy';

        setBusyStatus({
          currentStatus: status,
          bestTimeToVisit: '3 PM - 6 PM',
          live: true,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatus();
  }, []);

  const getStatusColor = (status: 'not busy' | 'a little busy' | 'very busy') => {
    switch (status) {
      case 'not busy':
        return 'bg-emerald-500 text-cream-50';
      case 'a little busy':
        return 'bg-amber-500 text-cream-50';
      case 'very busy':
        return 'bg-rose-500 text-cream-50';
    }
  };

  return (
    <section id="location" className="py-24 bg-cream-100 relative z-20 border-b border-border-subtle">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col gap-12">
        
        {/* Section Header */}
        <div className="flex flex-col gap-4 max-w-xl">
          <span className="text-xs uppercase tracking-[0.2em] text-sage-600 font-bold">Directions</span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-text-primary tracking-tight">
            Find the Nest
          </h2>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8 bg-cream-50 border border-border-subtle p-8 md:p-12 rounded-[2rem]">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <h3 className="font-serif text-2xl font-bold text-text-primary">The Nest Café</h3>
                <div className="w-12 h-[1.5px] bg-sage-500 rounded-full mt-2" />
              </div>

              {/* Contact list */}
              <div className="flex flex-col gap-6 text-sm text-text-secondary mt-2">
                <div className="flex items-start gap-4">
                  <MapPin size={18} className="text-sage-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-text-primary">Address</p>
                    <p className="font-light mt-1">123 Hill Road, Bandra West, Mumbai 400050</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock size={18} className="text-sage-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-text-primary">Opening Hours</p>
                    <p className="font-light mt-1">Daily: 8:00 AM – 11:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 w-full border-t border-border-subtle/60 pt-6 mt-4">
              {/* Geolocation Live Occupancy Badge */}
              <div className="flex items-center justify-between bg-cream-100 rounded-xl p-4 border border-border-subtle/40">
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-sage-600" />
                  <span className="text-xs font-semibold text-text-primary">Live Busy Status</span>
                </div>
                {isLoading ? (
                  <span className="text-xs text-text-muted">Loading...</span>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full ${getStatusColor(busyStatus.currentStatus)}`}>
                      {busyStatus.currentStatus}
                    </span>
                    <span className="group relative cursor-pointer text-text-muted hover:text-sage-600">
                      <HelpCircle size={12} />
                      <span className="absolute bottom-full right-0 mb-2 w-48 p-2 rounded-lg bg-sage-900 text-cream-50 text-[10px] leading-relaxed shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-30">
                        Best time to visit today: <strong>{busyStatus.bestTimeToVisit}</strong>
                      </span>
                    </span>
                  </div>
                )}
              </div>

              {/* Action Links */}
              <div className="grid grid-cols-3 gap-2">
                <a
                  href="https://maps.google.com/?q=123+Hill+Road+Bandra+West+Mumbai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center p-3 rounded-xl bg-cream-100 hover:bg-sage-50 border border-border-subtle hover:border-sage-200 text-sage-800 transition-colors text-center"
                >
                  <MapIcon size={16} className="mb-1" />
                  <span className="text-[10px] uppercase font-bold tracking-wider">Directions</span>
                </a>
                <a
                  href="tel:+912212345678"
                  className="flex flex-col items-center justify-center p-3 rounded-xl bg-cream-100 hover:bg-sage-50 border border-border-subtle hover:border-sage-200 text-sage-800 transition-colors text-center"
                >
                  <Phone size={16} className="mb-1" />
                  <span className="text-[10px] uppercase font-bold tracking-wider">Call Us</span>
                </a>
                <a
                  href="https://wa.me/912212345678"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center p-3 rounded-xl bg-cream-100 hover:bg-sage-50 border border-border-subtle hover:border-sage-200 text-sage-800 transition-colors text-center"
                >
                  <MessageSquare size={16} className="mb-1" />
                  <span className="text-[10px] uppercase font-bold tracking-wider">WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Custom styled map panel */}
          <div className="lg:col-span-7 h-[400px] lg:h-auto rounded-[2rem] overflow-hidden border border-border-subtle relative shadow-sm">
            <iframe
              src="https://maps.google.com/maps?q=The%20Nest%20Cafe,%20123%20Hill%20Road,%20Bandra%20West,%20Mumbai%20400050&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              className="border-0 w-full h-full min-h-[400px] grayscale contrast-[1.1] brightness-[0.95]"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="The Nest Cafe Google Maps Location"
            ></iframe>
          </div>
        </div>

      </div>
    </section>
  );
}
