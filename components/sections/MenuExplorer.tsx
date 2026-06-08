'use client';

import { useState, useEffect, useTransition } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Search, Filter, ArrowUpDown, Flame, Star, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Fuse from 'fuse.js';
import { MENU_ITEMS, CATEGORIES, MenuItem } from '@/lib/menuData';

export default function MenuExplorer() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Search parameters parsing
  const initialCategory = searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('search') || '';

  // Local component states
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [debouncedSearch, setDebouncedSearch] = useState(initialSearch);
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('default');
  const [isPending, startTransition] = useTransition();

  // Debounce search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 250);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Sync state changes with URL query parameters
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory && selectedCategory !== 'All') {
      params.set('category', selectedCategory);
    }
    if (debouncedSearch) {
      params.set('search', debouncedSearch);
    }
    
    // Smooth URL navigation updates
    const query = params.toString();
    const targetUrl = query ? `${pathname}?${query}` : pathname;
    startTransition(() => {
      router.replace(targetUrl, { scroll: false });
    });
  }, [selectedCategory, debouncedSearch, pathname, router]);

  // Handle category selection
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  // Toggle dietary filters
  const toggleDietary = (diet: string) => {
    setSelectedDietary((prev) =>
      prev.includes(diet) ? prev.filter((d) => d !== diet) : [...prev, diet]
    );
  };

  // Process data: search, filter, and sort
  const getProcessedItems = (): MenuItem[] => {
    let items = [...MENU_ITEMS];

    // 1. Search Query (via Fuse.js)
    if (debouncedSearch) {
      const fuse = new Fuse(items, {
        keys: ['name', 'description', 'category'],
        threshold: 0.35,
      });
      const results = fuse.search(debouncedSearch);
      items = results.map((r) => r.item);
    }

    // 2. Category Filter
    if (selectedCategory && selectedCategory !== 'All') {
      items = items.filter((item) => item.category === selectedCategory);
    }

    // 3. Dietary Filter
    if (selectedDietary.length > 0) {
      items = items.filter((item) =>
        selectedDietary.every((diet) => item.dietary.includes(diet as any))
      );
    }

    // 4. Sorting
    if (sortBy === 'price-low') {
      items.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      items.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      items.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'popularity') {
      // Prioritize items with 'popular' or 'chef-recommendation' tags
      items.sort((a, b) => {
        const scoreA = (a.tags.includes('popular') ? 2 : 0) + (a.tags.includes('chef-recommendation') ? 1 : 0);
        const scoreB = (b.tags.includes('popular') ? 2 : 0) + (b.tags.includes('chef-recommendation') ? 1 : 0);
        return scoreB - scoreA;
      });
    }

    return items;
  };

  const processedItems = getProcessedItems();

  const dietaryOptions = [
    { label: 'Vegetarian', value: 'vegetarian' },
    { label: 'Vegan', value: 'vegan' },
    { label: 'Gluten-Free', value: 'gluten-free' },
    { label: 'Contains Nuts', value: 'contains-nuts' },
  ];

  return (
    <section id="menu-explorer" className="py-24 bg-cream-100 relative z-20 border-b border-border-subtle">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col gap-10">
        
        {/* Controls Layout */}
        <div className="flex flex-col gap-6 w-full">
          
          {/* Search bar & Sorting */}
          <div className="flex flex-col md:flex-row gap-4 w-full justify-between items-center">
            
            {/* Search Input Box */}
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
              <input
                type="text"
                placeholder="Search our menu (e.g. Latte, Truffle)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-cream-50 border border-border-subtle/80 rounded-full pl-12 pr-6 py-3.5 text-sm focus:outline-none focus:border-sage-500 focus:bg-cream-100 transition-colors shadow-sm"
              />
            </div>

            {/* Sorting Picker */}
            <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
              <ArrowUpDown size={14} className="text-sage-600" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-cream-50 border border-border-subtle/80 rounded-full px-5 py-3 text-xs uppercase tracking-wider font-semibold focus:outline-none focus:border-sage-500 cursor-pointer shadow-sm text-text-primary"
              >
                <option value="default">Sort by</option>
                <option value="popularity">Popularity</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Alphabetical</option>
              </select>
            </div>
          </div>

          {/* Category Tabs (Framer Motion layoutId active pill) */}
          <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-none border-b border-border-subtle/40 -mx-6 px-6 md:mx-0 md:px-0">
            {CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`relative px-5 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-full transition-colors duration-300 shrink-0 z-10 ${
                    isActive ? 'text-cream-50' : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {category}
                  {isActive && (
                    <motion.span
                      layoutId="activeCategoryPill"
                      className="absolute inset-0 bg-sage-600 rounded-full -z-10"
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Dietary Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[10px] uppercase tracking-wider text-text-muted font-semibold flex items-center gap-1.5 mr-2">
              <Filter size={10} />
              Dietary Preferences:
            </span>
            {dietaryOptions.map((option) => {
              const isSelected = selectedDietary.includes(option.value);
              return (
                <button
                  key={option.value}
                  onClick={() => toggleDietary(option.value)}
                  className={`text-[10px] uppercase tracking-wider font-bold px-4 py-2 rounded-full border transition-all duration-300 ${
                    isSelected
                      ? 'bg-sage-100 text-sage-800 border-sage-300/80 shadow-sm'
                      : 'bg-cream-50 text-text-secondary border-border-subtle hover:border-sage-200'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Menu Grid results */}
        <div className="w-full">
          <AnimatePresence mode="popLayout">
            {processedItems.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-center py-24 flex flex-col items-center gap-4 bg-cream-50 border border-border-subtle/50 rounded-[2rem] p-8"
              >
                <p className="text-text-secondary text-sm font-light">
                  No items matched your current search or filters.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchQuery('');
                    setSelectedDietary([]);
                  }}
                  className="bg-sage-600 text-cream-50 text-[10px] uppercase font-bold tracking-widest px-5 py-2.5 rounded-full"
                >
                  Reset Filters
                </button>
              </motion.div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              >
                {processedItems.map((item) => (
                  <motion.div
                    layout
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="bg-cream-50 border border-border-subtle/60 rounded-[1.5rem] p-4 flex flex-col justify-between hover:shadow-lg hover:border-sage-300/40 transition-all duration-500"
                  >
                    <div className="flex flex-col gap-4">
                      {/* Image Box */}
                      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-cream-100 border border-border-subtle/20">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 25vw"
                          className="object-cover"
                        />
                        {/* Quick tags badge top left */}
                        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1.5">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className={`text-[8px] uppercase tracking-widest font-extrabold px-2 py-1 rounded-full shadow-sm flex items-center gap-0.5 ${
                                tag === 'chef-recommendation'
                                  ? 'bg-sage-800 text-cream-50'
                                  : tag === 'popular'
                                  ? 'bg-amber-600 text-cream-50'
                                  : 'bg-teal-700 text-cream-50'
                              }`}
                            >
                              {tag === 'chef-recommendation' ? <Star size={8} /> : null}
                              {tag === 'popular' ? <Flame size={8} /> : null}
                              {tag === 'new' ? <Sparkles size={8} /> : null}
                              {tag.replace('-', ' ')}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Info */}
                      <div className="flex flex-col gap-2">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-serif text-base font-bold text-text-primary leading-tight">
                            {item.name}
                          </h4>
                          <span className="font-serif text-sm font-semibold text-sage-800 shrink-0">
                            ₹{item.price}
                          </span>
                        </div>
                        <p className="text-xs text-text-secondary font-light leading-relaxed line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Footer Details */}
                    <div className="flex items-center justify-between border-t border-border-subtle/50 pt-3 mt-4">
                      <span className="text-[9px] text-text-muted font-medium">
                        {item.calories} kcal
                      </span>
                      {/* Dietary short forms */}
                      <div className="flex items-center gap-1.5">
                        {item.dietary.map((diet) => (
                          <span
                            key={diet}
                            title={diet}
                            className={`text-[8px] uppercase font-bold px-1.5 py-0.5 rounded border ${
                              diet === 'vegetarian'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : diet === 'vegan'
                                ? 'bg-teal-50 text-teal-700 border-teal-200'
                                : diet === 'gluten-free'
                                ? 'bg-purple-50 text-purple-700 border-purple-200'
                                : 'bg-amber-50 text-amber-700 border-amber-200'
                            }`}
                          >
                            {diet === 'vegetarian'
                              ? 'VEG'
                              : diet === 'vegan'
                              ? 'VGN'
                              : diet === 'gluten-free'
                              ? 'GF'
                              : 'NUTS'}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
