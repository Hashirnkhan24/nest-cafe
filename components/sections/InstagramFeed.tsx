'use client';

import Image from 'next/image';
import { Heart, MessageCircle, Instagram } from 'lucide-react';

interface InstagramPost {
  id: string;
  image: string;
  likes: number;
  comments: number;
  caption: string;
  link: string;
}

export default function InstagramFeed() {
  const posts: InstagramPost[] = [
    {
      id: 'post-1',
      image: '/images/exp-coffee.png',
      likes: 312,
      comments: 18,
      caption: 'Rituals of pour-over. Sourced from Nilgiris, poured in Bandra. #specialtycoffee',
      link: 'https://www.instagram.com/thenestbandra/?hl=en',
    },
    {
      id: 'post-2',
      image: '/images/exp-food.png',
      likes: 428,
      comments: 32,
      caption: 'Poached eggs & freshly baked sourdough. The perfect weekend companion.',
      link: 'https://www.instagram.com/thenestbandra/?hl=en',
    },
    {
      id: 'post-3',
      image: '/images/room-bg.png',
      likes: 564,
      comments: 45,
      caption: 'Warm daylight filtering through the ferns. Your pocket of peace.',
      link: 'https://www.instagram.com/thenestbandra/?hl=en',
    },
    {
      id: 'post-4',
      image: '/images/exp-work.png',
      likes: 219,
      comments: 12,
      caption: 'A quiet corner, hot latte, and your favorite book. Stay as long as you like.',
      link: 'https://www.instagram.com/thenestbandra/?hl=en',
    },
    {
      id: 'post-5',
      image: '/images/hero-bg.png',
      likes: 387,
      comments: 24,
      caption: 'Double shot cortados to fuel your afternoon sessions.',
      link: 'https://www.instagram.com/thenestbandra/?hl=en',
    },
    {
      id: 'post-6',
      image: '/images/exp-food.png',
      likes: 495,
      comments: 38,
      caption: 'A stack of fresh pastries fresh out of the oven. Come grab yours!',
      link: 'https://www.instagram.com/thenestbandra/?hl=en',
    },
  ];

  return (
    <section id="instagram" className="py-24 bg-cream-100 border-b border-border-subtle relative z-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col gap-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-4 max-w-xl">
            <span className="text-xs uppercase tracking-[0.2em] text-sage-600 font-bold">Social Feed</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-text-primary tracking-tight">
              Captured @ The Nest
            </h2>
            <p className="text-sm md:text-base text-text-secondary font-light leading-relaxed">
              Tag us in your moments of calm. Share your coffee, your workspace setup, or your reads.
            </p>
          </div>
          <a
            href="https://www.instagram.com/thenestbandra/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-sage-800 hover:bg-sage-900 text-cream-50 text-xs font-semibold uppercase tracking-wider py-4 px-8 rounded-full transition-all duration-300 shadow-sm"
          >
            <Instagram size={14} />
            Follow us on Instagram
          </a>
        </div>

        {/* 3x2 Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square w-full rounded-2xl overflow-hidden bg-cream-200 border border-border-subtle/40 block"
            >
              {/* Image */}
              <Image
                src={post.image}
                alt={post.caption}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Hover overlay with engagement stats */}
              <div className="absolute inset-0 bg-sage-950/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 text-cream-50 z-10 p-4 text-center">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 text-xs font-semibold">
                    <Heart size={14} className="fill-current text-sage-300" />
                    {post.likes}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-semibold">
                    <MessageCircle size={14} className="fill-current text-sage-300" />
                    {post.comments}
                  </span>
                </div>
                <p className="text-[10px] line-clamp-2 text-sage-200 font-light mt-1">
                  {post.caption}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
