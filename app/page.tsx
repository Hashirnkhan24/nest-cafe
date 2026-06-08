import { Suspense } from 'react';
import Hero from '@/components/sections/Hero';
import Philosophy from '@/components/sections/Philosophy';
import Experiences from '@/components/sections/Experiences';
import Combos from '@/components/sections/Combos';
import Gallery from '@/components/sections/Gallery';
import Ambience from '@/components/sections/Ambience';
import InstagramFeed from '@/components/sections/InstagramFeed';
import Reviews from '@/components/sections/Reviews';
import Events from '@/components/sections/Events';
import Location from '@/components/sections/Location';

export default function Home() {
  return (
    <div className="relative w-full flex flex-col">
      <Hero />
      <Philosophy />
      <Experiences />
      <Combos />
      <Gallery />
      <Ambience />
      <InstagramFeed />
      <Reviews />
      <Events />
      <Location />
    </div>
  );
}
