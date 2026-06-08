import { Suspense } from 'react';
import MenuExplorer from '@/components/sections/MenuExplorer';

export default function MenuPage() {
  return (
    <div className="pt-16 min-h-screen bg-cream-100">
      <Suspense fallback={
        <div className="py-32 text-center text-sm text-text-secondary font-light">
          Loading Menu Explorer...
        </div>
      }>
        <MenuExplorer />
      </Suspense>
    </div>
  );
}
